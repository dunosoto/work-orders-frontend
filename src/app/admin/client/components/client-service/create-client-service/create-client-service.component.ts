import { Component, Inject, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CreateClientServiceValidator } from '../../../validators/create-client-service.validator';
import { DataFormPostInternetService, GetServiceAccess, GetServicesConections, GetTypesInternetServices, PostClientDataService, PostInternetService } from 'src/app/shared/models/admin/internet-services/internet-service.model';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddNewServiceToClientAddress } from 'src/app/shared/models/admin/client/client-address.model';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { Store } from '@ngrx/store';
import { addInternetService } from 'src/app/state-management/actions/services/services.action';
import { selectListInternetAccessServices, selectListInternetConectionsServices, selectListInternetServicesTypes } from 'src/app/state-management/selectors/internet-service/internet-services.selector';

@Component({
  selector: 'app-create-client-service',
  templateUrl: './create-client-service.component.html',
  styleUrls: ['./create-client-service.component.scss']
})
export class CreateClientServiceComponent extends CreateClientServiceValidator implements OnInit {
  public routes: string[];
  public internetServicesTypes$: Observable<GetTypesInternetServices[]>;
  public internetServicesAccess$: Observable<GetServiceAccess[]>;
  public internetServicesConections$: Observable<GetServicesConections[]>;
  public accessTypeSelected!: GetServiceAccess;
  public registerOdnManually: boolean;
  public registerOltManuallyUser: boolean;

  private _propertiesToSwal: SweetAlertOptions;
  private _clientData!: PostClientDataService;
  private _subscribers: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    // private _dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddNewServiceToClientAddress,
    private _messageService: MessageService,
    private _store: Store<ConnectState>,
  ) {
    super(formBuilder);
    this.routes = ['Orden de Trabajo', 'Fallas', 'Registrar servicio'];
    this.internetServicesTypes$ = this._store.select(selectListInternetServicesTypes);
    this.internetServicesAccess$ = this._store.select(selectListInternetAccessServices);
    this.internetServicesConections$ = this._store.select(selectListInternetConectionsServices);
    this.registerOdnManually = false;
    this.registerOltManuallyUser = false;
    this._propertiesToSwal = {
      title: '¿Está seguro de agregar el nuevo servicio?',
      text: '',
      confirmButtonText: 'Si, Agregar',
      cancelButtonText: 'No, Cancelar',
    };
    this._subscribers = new Subscription();
  }

  public ngOnInit(): void {
    this.setterValuesToFormData();
  }

  public setterValuesToFormData(): void {
    this.formData.controls.address_id.setValue(this.data.dataAddress.id);
  }

  public registerOltManually(): void {
    this.registerOltManuallyUser = true;
  }

  public registerManually(): void {
    this.registerOdnManually = true;
  }

  public createServiceToClient(): void {
    const dataFormValue: DataFormPostInternetService = this.formData.value;
    if (this.data.dataAddress.id) {
      this._clientData = {
        id: this.data.clientId ? this.data.clientId : undefined,
        addressId: dataFormValue.addressId
      }
    }

    const dataPost: PostInternetService = this.formData.value;
    dataPost.client = this._clientData;
    dataPost.technicalDatas.observation = this.formData.value.observation;

    this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          Swal.fire({
            title: '¡Guardando...!',
            html: 'Espere un momento, los datos se estan registrando',
            allowEscapeKey: false,
            allowOutsideClick: false,
            timer: 1500,
            customClass: 'swalLoading',
            didOpen: () => {
              Swal.showLoading();
              this._store.dispatch(addInternetService({ payload: dataPost }));
              const statusSuccess: Subscription = this._messageService.getStatusSuccess().subscribe(
                (res: boolean) => {
                  if (res) {
                    // this._dialogRef.close(true);
                    this._messageService.resetStatusSuccess();
                 }
                }
              );
              this._subscribers.add(statusSuccess);
            },
          });
        }
      });
  }

  public async saveAccessTypeSelected(serviceAccess: GetServiceAccess) {
    this.accessTypeSelected = serviceAccess;
    this.formData.controls.access_id.setValue(serviceAccess.id);
    if (this.accessTypeSelected) {
      await this.generateFormArrays(serviceAccess.id);
    }
  }

  public generateFormArray(): void { }


  public generateFormArrays(accessId: number): void {

    if (accessId === 2) {
      this.formData.setControl('technical_datas', this.formBuilder.group(
        {
          olt: ['', [Validators.required, Validators.minLength(2)]],
          nap: ['', Validators.required],
          port: ['', Validators.required]
        }
      ))
    }
    if (accessId === 1) {
      this.formData.setControl('technical_datas', this.formBuilder.group(
        {
          box: ['', Validators.required],
          pair: ['', Validators.required],
          node: ['', Validators.required],
          descent: ['', Validators.required],
          primary: ['', Validators.required],
        }
      ));
    }
  }

  public closeModal(): void {
    // this._dialogRef.close();
  }

}

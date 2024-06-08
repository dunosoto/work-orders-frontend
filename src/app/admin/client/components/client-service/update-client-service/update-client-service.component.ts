import { Component, Inject, OnInit } from '@angular/core';
import { CreateClientServiceValidator } from '../../../validators/create-client-service.validator';
import { Observable, Subscription } from 'rxjs';
import { GetInternetService, GetServiceAccess, GetServicesConections, GetTypesInternetServices, PutInternetService } from 'src/app/shared/models/admin/internet-services/internet-service.model';
import { SweetAlertOptions } from 'sweetalert2';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { Store } from '@ngrx/store';
import { selectListInternetAccessServices, selectListInternetConectionsServices, selectListInternetServicesTypes } from 'src/app/state-management/selectors/internet-service/internet-services.selector';
import { updateInternetService } from 'src/app/state-management/actions/services/services.action';

@Component({
  selector: 'app-update-client-service',
  templateUrl: './update-client-service.component.html',
  styleUrls: ['./update-client-service.component.scss']
})
export class UpdateClientServiceComponent extends CreateClientServiceValidator implements OnInit {

  public routes: string[];
  public internetServicesTypes$: Observable<GetTypesInternetServices[]>;
  public internetServicesAccess$: Observable<GetServiceAccess[]>;
  public internetServicesConections$: Observable<GetServicesConections[]>;
  public accessTypeSelected!: GetServiceAccess;
  public registerOdnManually: boolean;
  public registerOltManuallyUser: boolean;

  private _propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    // private _dialogRef: MatDialogRef<AddressServiceComp>,
    @Inject(MAT_DIALOG_DATA) public data: GetInternetService,
    private _messageService: MessageService,
    private _store: Store<ConnectState>,
  ) {
    super(formBuilder);
    this.routes = ['Orden de Trabajo', 'Fallas', 'Actualizar Servicio'];
    this.internetServicesTypes$ = this._store.select(selectListInternetServicesTypes);
    this.internetServicesAccess$ = this._store.select(selectListInternetAccessServices);
    this.internetServicesConections$ = this._store.select(selectListInternetConectionsServices);
    this._subscribers = new Subscription();
    this.registerOdnManually = false;
    this.registerOltManuallyUser = false;
    this._propertiesToSwal = {
      title: '¿Está seguro de guardar los cambios?',
      text: '',
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'No, Cancelar',
    }
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this.setterValuesToFormData();
  }

  public setterValuesToFormData(): void {

    const dataToPatch = {
      instance: this.data.instance,
      type_name: this.data.type.name,
      type_id: this.data.type.id,
      access_id: this.data.access.id,
      access_name: this.data.access.name,
      // observation: this.data.ftt_acesses[0] ? this.data.ftt_acesses[0].observation : this.data.wired_accesses[0].observation
    }
    this.formData.patchValue(dataToPatch);

    this.accessTypeSelected = this.data.access;
    this.generateFormArrays(this.data.access.id);
  }

  public generateFormArray(): void {

  }


  public registerOltManually(): void {
    this.registerOltManuallyUser = true;
  }

  public registerManually(): void {
    this.registerOdnManually = true;
  }

  public closeModal(): void {
    // this._dialogRef.close();
  }

  public async saveAccessTypeSelected(serviceAccess: GetServiceAccess) {
    this.accessTypeSelected = serviceAccess;
    this.formData.controls.access_id.setValue(serviceAccess.id);
    if (this.accessTypeSelected) {
      await this.generateFormArrays(serviceAccess.id);
    }
  }

  public generateFormArrays(accessId: number): void {

    // if (accessId === 2) {
    //   this.formData.setControl('technical_datas', this.formBuilder.group(
    //     {
    //       olt: [this.data.ftt_acesses[0].olt, [Validators.required, Validators.minLength(2)]],
    //       nap: [this.data.ftt_acesses[0].nap, Validators.required],
    //       port: [this.data.ftt_acesses[0].port, Validators.required]
    //     }
    //   ))
    // }
    // if (accessId === 1) {
    //   this.formData.setControl('technical_datas', this.formBuilder.group(
    //     {
    //       box: [this.data.wiredAccesses[0].box, Validators.required],
    //       pair: [this.data.wired_accesses[0].pair, Validators.required],
    //       node: [this.data.wired_accesses[0].node, Validators.required],
    //       descent: [this.data.wired_accesses[0].descent, Validators.required],
    //       primary: [this.data.wired_accesses[0].primary, Validators.required],
    //     }
    //   ));
    // }
  }

  public updateService(): void {
    const dataInternetService = this.formData.value;

    const dataToPutInternetService: PutInternetService = {
      id: this.data.id,
      client: {
        id: this.data.client.id,
        address_id: this.data.client.address.id
      },
      ...dataInternetService
    }

    const messageServiceSubscription: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          // this._propertiesToSwal = {
          //   title: 'Actualizado correctamente!',
          //   text: 'Los datos del servicio se actualizaron correctamente.',
          //   icon: 'success',
          //   showCancelButton: false,
          //   showConfirmButton: false,
          //   timer: 1500
          // }
          this._store.dispatch(updateInternetService({ payload: dataToPutInternetService }));
          // this._dialogRef.close(true);
          // this._store.select(selectLoadingInternetServices).subscribe(
          //   (res: boolean) => {
          //     if (!res) {
          //       this._messageService.showSwalBasicAlert(this._propertiesToSwal);
          //     }
          //     console.log("RES", res);

          //   }
          // )

        }
      });
    this._subscribers.add(messageServiceSubscription);
  }

}

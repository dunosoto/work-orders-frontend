import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { SweetAlertOptions } from 'sweetalert2';
import { CreateClientAdressValidator } from '../../../validators/create-client-address.validator';

import { IMarkerSelectionAnswer } from 'src/app/shared/models/google-maps/initial-value.model';
import { ClientAddress } from 'src/app/shared/models/admin/client/client-address.model';
import { ClientGet } from 'src/app/shared/models/admin/client/client.model';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { addClientAddress } from 'src/app/state-management/actions/client/client.action';

@Component({
  selector: 'app-create-client-address',
  templateUrl: './create-client-address.component.html',
  styleUrls: ['./create-client-address.component.scss']
})
export class CreateClientAddressComponent extends CreateClientAdressValidator implements OnInit {
  public routes: string[];
  public setDataAddresToForm!: ClientAddress;

  private _subscribers: Subscription;
  private _propertiesToSwal: SweetAlertOptions;

  constructor(
    // private _dialogRef: MatDialogRef<AddOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientGet,
    public formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _store: Store<ConnectState>
  ) {
    super(formBuilder);
    this.routes = ['Ordenes de Trabajo', 'Fallas', 'Agregar Dirección Domiciliaria'];
    this._subscribers = new Subscription();
    this._propertiesToSwal = {
      title: '¿Está seguro de agregar una nueva dirección para',
      text: `${this.data.name.toUpperCase() + ' ' + this.data.lastName.toUpperCase()} ?`,
      confirmButtonText: 'Si, Continuar',
      cancelButtonText: 'No, Cancelar',
    };
  }

  ngOnInit() {
    this._initialize();
    this.setterValuesToFormData();
  }

  private _initialize() {

  }

  public setterValuesToFormData(): void {
  }

  public closeModal() {
    // this._dialogRef.close();
  }

  public getAddressSelected(selectedAddress: IMarkerSelectionAnswer): void {
    this.setDataAddresToForm = {
      lat: String(selectedAddress.lat),
      lon: String(selectedAddress.lon),
      city: selectedAddress.city,
      direction: selectedAddress.direction,
      location: selectedAddress.location,
      placeId: selectedAddress.place_id,
      clientId: this.data.id,
      description: this.formData.value.description
    }
    this.formData.patchValue(this.setDataAddresToForm);
  }

  public addDirectionToClient(): void {
    const dataForm: ClientAddress[] = [this.formData.value];

    const messageSubribe: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this._store.dispatch(addClientAddress({ payload: dataForm }));
          const statusSuccess: Subscription = this._messageService.getStatusSuccess().subscribe(
            (res: boolean) => {
              if (res) {
                // this._dialogRef.close(true);
                this._messageService.resetStatusSuccess();
              }
            }
          );
          this._subscribers.add(statusSuccess);
        }
      });

    this._subscribers.add(messageSubribe);
  }

}

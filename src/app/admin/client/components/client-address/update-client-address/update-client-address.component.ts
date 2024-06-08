import { Subscription } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateClientAdressValidator } from '../../../validators/create-client-address.validator';
import { SweetAlertOptions } from 'sweetalert2';
import { Store } from '@ngrx/store';
import { ClientAddress } from 'src/app/shared/models/admin/client/client-address.model';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { IMarkerSelectionAnswer } from 'src/app/shared/models/google-maps/initial-value.model';
import { updateClientAddress } from 'src/app/state-management/actions/client/client.action';
import { ClientAddressDataComponent } from 'src/app/shared/components/client-address-data/client-address-data.component';

@Component({
  selector: 'app-update-client-address',
  templateUrl: './update-client-address.component.html',
  styleUrls: ['./update-client-address.component.scss']
})
export class UpdateClientAddressComponent extends CreateClientAdressValidator implements OnInit {
  public setDataAddresToForm!: ClientAddress;
  public routes: string[];

  private _propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    private _dialogRef: MatDialogRef<ClientAddressDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientAddress,
    private _messageService: MessageService,
    private _store: Store<ConnectState>
  ) {
    super(formBuilder);
    this.routes = ['Actualizar dirección'];
    this._subscribers = new Subscription();
    this._propertiesToSwal = {
      title: '¿Está seguro de guardar los cambios?',
      text: '',
      confirmButtonText: 'Si, Guardar',
      cancelButtonText: 'No, Cancelar',
    };
  }

  ngOnInit() {
    this._initialize();
  }

  private _initialize(): void {
    this.setterValuesToFormData();
  }

  public setterValuesToFormData(): void {
    this.formData.patchValue(this.data);
    this.setDataAddresToForm = {
      ...this.data
    };
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

  public closeModal(): void {
    this._dialogRef.close();
  }

  public updateAddressOfClient(): void {
    const dataForm: ClientAddress = this.formData.value;
    dataForm.clientId = this.data.clientId;

    const messageSubribe: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this._store.dispatch(updateClientAddress({ payload: dataForm }));
          const statusSuccess: Subscription = this._messageService.getStatusSuccess().subscribe(
            (res: boolean) => {
              if (res) {
                this._dialogRef.close(true);
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

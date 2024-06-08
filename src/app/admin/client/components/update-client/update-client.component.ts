import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SweetAlertOptions } from 'sweetalert2';
import { CreateClientValidator } from '../../validators/create-client.validator';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { ClientGet, ClientPost, ClientPut } from 'src/app/shared/models/admin/client/client.model';
import { addClient, updateClient } from 'src/app/state-management/actions/client/client.action';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientDataComponent } from '../client-data/client-data.component';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss']
})
export class UpdateClientComponent extends CreateClientValidator implements OnInit {
  public routes: string[];

  private _propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    private _dialogRef: MatDialogRef<ClientDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientGet,
    public formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _store: Store<ConnectState>
  ) {
    super(formBuilder);
    this._subscribers = new Subscription();
    this.routes = ['Actualizar Datos del Cliente'];
    this._propertiesToSwal = {
      title: '¿Está seguro de guardar los cambios?',
      text: '',
      confirmButtonText: 'Si, Guardar cambios',
      cancelButtonText: 'No, Cancelar',
    };
  }

  public ngOnInit() {
    this._initialize();
  }

  private _initialize(): void {
    this.setterValuesToFormData();
  }

  public closeModal() {
    this._dialogRef.close();
  }

  public setterValuesToFormData(): void {
    const dataToPatch = {
      ...this.data,
      phone: this.data.phone,
    }

    this.formData.patchValue(dataToPatch);
  }

  public updateClientData(): void {
    const dataClient = this.formData.value;
    
    const clientDataPut: ClientPut = {
      id: this.data.id,
      lastName: dataClient.lastName,
      firstName: dataClient.firstName,
      phone: dataClient.phone,
      identityCard: dataClient.identityCard
    }

    const messageServiceSubscription: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this._propertiesToSwal = {
            title: 'Actualizado correctamente!',
            text: 'Los datos del cliente se actualizaron correctamente.',
            icon: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            timer: 1500
          }
          this._store.dispatch(updateClient({ payload: clientDataPut }));
          this._messageService.showSwalBasicAlert(this._propertiesToSwal);
          this._dialogRef.close(true);
        }
      });
    this._subscribers.add(messageServiceSubscription);
  }
}

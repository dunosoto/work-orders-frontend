import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SweetAlertOptions } from 'sweetalert2';
import { CreateClientValidator } from '../../validators/create-client.validator';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { ClientPost } from 'src/app/shared/models/admin/client/client.model';
import { addClient } from 'src/app/state-management/actions/client/client.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent extends CreateClientValidator implements OnInit, OnDestroy {

  public routes: string[];

  private _propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    // private _dialogRef: MatDialogRef<AddOrderComponent>,
    private _store: Store<ConnectState>,
    private _messageService: MessageService,
  ) {
    super(formBuilder);
    this._subscribers = new Subscription();
    this.routes = ['Registrar Nuevo Cliente'];
    this._propertiesToSwal = {
      title: '¿Está seguro de agregar al nuevo cliente?',
      text: '',
      confirmButtonText: 'Si, Agregar',
      cancelButtonText: 'No, Cancelar',
    };
  }

  public setterValuesToFormData(): void {

  }

  public ngOnInit() {
  }

  public ngOnDestroy(): void {
    this._unsubscribe();
  }

  private _unsubscribe(): void {
    this._subscribers.unsubscribe();
  }

  public closeModal() {
    // this._dialogRef.close();
  }

  public createClient(): void {
    const dataClient = this.formData.value;

    const clientDataPost: ClientPost = {
      lastName: dataClient.lastName,
      firstName: dataClient.firstname,
      phone: dataClient.phone,
      identityCard: dataClient.identityCard
    }

    const messageServiceSubscription: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this._store.dispatch(addClient({ payload: clientDataPost }));
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
    this._subscribers.add(messageServiceSubscription);
  }

}

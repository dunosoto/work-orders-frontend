import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DataGlobalStore } from 'src/app/shared/models/admin/state-managment/data-global-store.model';
import { PostUser } from 'src/app/shared/models/user/user.model';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { selectListRoles } from 'src/app/state-management/selectors/role/role.selector';
import { SweetAlertOptions } from 'sweetalert2';
import { UserValidator } from '../../validator/user.validator';
import { createUser } from 'src/app/state-management/actions/user/user.action';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent extends UserValidator implements OnInit, OnDestroy {

  public dataGlobalStore: DataGlobalStore;
  public selectedAreasId!: number[];

  private _propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private _store: Store<ConnectState>,
    private _messageService: MessageService
  ) {
    super(formBuilder);
    this.dataGlobalStore = {
      roles$: this._store.select(selectListRoles),
    };

    this._propertiesToSwal = {
      title: '¿Está seguro de agregar al nuevo usuario?',
      text: '',
      confirmButtonText: 'Agregar',
      cancelButtonText: 'Cancelar',
    };
    this._subscribers = new Subscription();
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    this._subscribers.unsubscribe();
  }

  public addUser(): void {
    const valueFromDataForm = this.formData.value;
    const data: PostUser = {
      firstName: valueFromDataForm.name,
      lastName: valueFromDataForm.last_name,
      cellPhone: valueFromDataForm.cell_phone,
      email: valueFromDataForm.email,
      password: valueFromDataForm.password,
      passwordConfirmation: valueFromDataForm.password_confirmation,
      roleId: valueFromDataForm.role_id,
      avatar: ''
    }

    const messageService: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {

          this._store.dispatch(createUser(data));
          const statusSuccess: Subscription = this._messageService.getStatusSuccess().subscribe(
            (res: boolean) => {
              if (res) {
                this.dialogRef.close(true);
                this._messageService.resetStatusSuccess();
              }
            }
          );
          this._subscribers.add(statusSuccess);
        }
      });
    this._subscribers.add(messageService);
  }

  public closeModal(option: boolean): void {
    this.dialogRef.close(option);
  }
}

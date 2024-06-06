import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DataGlobalStore } from 'src/app/shared/models/admin/state-managment/data-global-store.model';
import { GetUserResponse, PutUser } from 'src/app/shared/models/user/user.model';
import { ConnectState } from 'src/app/state-management/app.state';
import { UserValidator } from '../../validator/user.validator';
import { selectListRoles } from 'src/app/state-management/selectors/role/role.selector';
import { SweetAlertOptions } from 'sweetalert2';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { updateUser } from 'src/app/state-management/actions/user/user.action';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditUserComponent extends UserValidator implements OnInit {

  public dataGlobalStore: DataGlobalStore;
  private propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetUserResponse,
    private _store: Store<ConnectState>,
    private messageService: MessageService
  ) {
    super(formBuilder)
    this.dataGlobalStore = {
      roles$: this._store.select(selectListRoles),
    };
    this.propertiesToSwal = {
      title: '¿Está seguro de guardar los cambios?',
      text: '',
      confirmButtonText: 'Si, Guardar Cambios',
      cancelButtonText: 'No, Cancelar',
    };
    this._subscribers = new Subscription();
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {

    const dataToPatch = {
      ...this.data,
      roleId: this.data.role.id,
      roleName: this.data.role.name,
      password: "a",
      password_confirm: "s"
    }
    this.formData.patchValue(dataToPatch);
    console.log("DATAPATCH", this.formData.value);
  }

  public save(): void {
    const data: PutUser = this.formData.value;
    this.messageService.showSwalConfirmAlert(this.propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          this._store.dispatch(updateUser(data, this.data.id));
          const statusSuccess: Subscription = this.messageService.getStatusSuccess().subscribe(
            (res: boolean) => {
              if (res) {
                this.dialogRef.close(true);
                this.messageService.resetStatusSuccess();
              }
            }
          );
          this._subscribers.add(statusSuccess);
        }
      });
  }

  public closeModal(option: boolean): void {
    this.dialogRef.close(option);
  }

}

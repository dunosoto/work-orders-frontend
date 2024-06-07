import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/shared/models/role/role.model';
import { SweetAlertOptions } from 'sweetalert2';
import { RoleDataComponent } from '../role-data/role-data.component';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { Store } from '@ngrx/store';
import { updateRole } from 'src/app/state-management/actions/role/role.action';
import { RolValidators } from '../../validators/rol.validators';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditRoleComponent extends RolValidators implements OnInit, OnDestroy {

  public formData!: FormGroup;

  private _propertiesToSwal!: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    public dialogRef: MatDialogRef<RoleDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _store: Store<ConnectState>
  ) {
    super(formBuilder);
    this._subscribers = new Subscription();
    this._propertiesToSwal = {
      title: '¿Está seguro de guardar los cambios?',
      text: '',
      confirmButtonText: 'Si, Guardar Cambios',
      cancelButtonText: 'No, Cancelar',
    }
  }

  public ngOnInit(): void {
    this.formData.patchValue(this.data);
  }

  public ngOnDestroy(): void {
    this._subscribers.unsubscribe();
  }

  public editRol(): void {
    const nameRol = this.formData.controls.name.value;
    const prefix = nameRol.substr(0, 2);
    this.formData.controls.prefix.setValue(prefix);
    const data: Role = this.formData.value;



    this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe(
        (isConfirmed: boolean) => {
          if (isConfirmed) {
            this._store.dispatch(updateRole(data));
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
        }
      )
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Group } from 'src/app/shared/models/admin/group/group.model';
import { GroupService } from 'src/app/shared/services/admin/group/group.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { SweetAlertOptions } from 'sweetalert2';
import { EditGroupComponent } from '../edit-group/edit-group.component';
import { BaseModel } from 'src/app/shared/models/base.model';
import { RoleEnum } from 'src/app/shared/enums/role.enum';

@Component({
  selector: 'app-group-data',
  templateUrl: './group-data.component.html',
  styleUrls: ['./group-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDataComponent implements OnInit, OnDestroy {

  @Input() public groupDataList!: Group[] | any;
  @Output() public reloadEventEmitter: EventEmitter<boolean> = new EventEmitter();
  public columns: string[];
  public userRole = RoleEnum;
  private _propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;

  constructor(
    private _groupService: GroupService,
    private _dialog: MatDialog,
    private _messageService: MessageService
  ) {
    this.columns = [
      'groups',
      'users',
      'action'
    ];
    this._propertiesToSwal = {
      title: '¿Está seguro de eliminar la Orden de Trabajo?',
      text: '',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    };
    this._subscribers = new Subscription();
  }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._subscribers.unsubscribe();
  }

  public deleteGroup(element: Group): void {
    const messageSubscription: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe(
        (isConfirmed: boolean) => {
          if (isConfirmed) {
            // this._store.dispatch(deleteCertificationAction({ payload: element }));
            // this._reloadWorkOrderDetailData();
            this._groupService.dropGroup(element.id)
              .subscribe(
                (res: BaseModel) => {
                  this.reloadEventEmitter.emit(true);
                }
              )
          }
        }
      )
    this._subscribers.add(messageSubscription);
  }

  public editGroup(element: Group): void {
    const dialogRef: MatDialogRef<EditGroupComponent> = this._dialog.open(EditGroupComponent, {
      width: '600px',
      height: '600px',
      data: element,
      panelClass: 'modal-form'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadEventEmitter.emit(true);
      }
    });
  }

}

import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ConnectState } from 'src/app/state-management/app.state';
import { EditRoleComponent } from '../edit-role/edit-role.component';
import { loadRoles } from 'src/app/state-management/actions/role/role.action';
import { Role } from 'src/app/shared/models/role/role.model';

@Component({
  selector: 'app-role-data',
  templateUrl: './role-data.component.html',
  styleUrls: ['./role-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoleDataComponent implements OnInit {

  @Input() public dataRols!: Role[] | any;
  @Output() public reloadEventEmitter: EventEmitter<boolean> = new EventEmitter();
  public columns: string[];

  constructor(
    public dialog: MatDialog,
    private _store: Store<ConnectState>
  ) {
    this.columns = [
      'rols',
    ];
  }

  public ngOnInit(): void { }

  public updateRol(rol: any): void {
    const dialogRef: MatDialogRef<EditRoleComponent> = this.dialog.open(EditRoleComponent, {
      width: '500px',
      height: '400px',
      data: rol,
      panelClass: 'modal-form'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadEventEmitter.emit(true);
        this._store.dispatch(loadRoles());
      }
    });
  }
}

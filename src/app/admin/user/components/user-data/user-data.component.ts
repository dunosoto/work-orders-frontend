import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GetUserResponse } from 'src/app/shared/models/user/user.model';
import { UserService } from 'src/app/shared/services/user/user.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import Swal from 'sweetalert2';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  @Input() public usersDataSource!: GetUserResponse[] | any;
  @Output() public reloadEventEmitter: EventEmitter<boolean> = new EventEmitter();
  public columns: string[];

  constructor(
    private userService: UserService,
    private dialogController: MatDialog,
  ) {
    this.columns = [
      'user',
      'rol',
      'group',
      'action'
    ];
   }

  public ngOnInit(): void { }

  public updateUser(user: GetUserResponse): void{
    const dialog: MatDialogRef<EditUserComponent> = this.dialogController.open(EditUserComponent, {
      width:'600px',
      height: '600px',
      panelClass: 'modal-form',
      data: user
    });

    dialog.afterClosed().subscribe(
      (res: boolean) => {
        if (res) this.reloadEventEmitter.emit(true);
      }
    );
  }

  public deleteUser(data: GetUserResponse, swalSuccess: SwalComponent): void{
    Swal.fire({
      title: `¿Está seguro de eliminar al usuario <b>${ data.firstName +' '+ data.lastName }</b> ?`,
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
      customClass: 'swalConfirm'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Eliminando...!',
          html: 'Espere un momento, los datos se estan eliminando',
          allowEscapeKey: false,
          allowOutsideClick: false,
          customClass: 'swalLoading',
          didOpen: () => {
            Swal.showLoading();
            this.userService.doDelete(data.id)
            .subscribe(
               (res: any )=> {
                  Swal.close();
                  swalSuccess.fire();
                  this.reloadEventEmitter.emit(true);
                },
                (error) => {
                  console.log(error);
                }
             );
          },
          willClose: () => {
            // clearInterval(timerInterval)
          }
        }).then((result) => {
        })
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }
}

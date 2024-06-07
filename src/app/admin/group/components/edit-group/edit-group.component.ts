import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { GroupDataComponent } from '../group-data/group-data.component';
import { UserService } from 'src/app/shared/services/user/user.service';
import { GroupService } from 'src/app/shared/services/admin/group/group.service';
import { ConnectState } from 'src/app/state-management/app.state';
import { Store } from '@ngrx/store';
import { GetUserResponse } from 'src/app/shared/models/user/user.model';
import { DataGlobalStore } from 'src/app/shared/models/admin/state-managment/data-global-store.model';
import { Group, GroupPost } from 'src/app/shared/models/admin/group/group.model';
import { selectListUsers } from 'src/app/state-management/selectors/user/user.selector';
import { map, startWith } from 'rxjs/operators';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { ErrorsMessage } from 'src/app/shared/models/error.model';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditGroupComponent implements OnInit {

  @ViewChild('userInput') public userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') public matAutocomplete!: MatAutocomplete;
  public groupForm!: FormGroup;
  public allUsers: GetUserResponse[] = [];
  public chipSelectedUsers: any[] = [];
  public userControl = new FormControl();
  public filteredUsers!: Observable<GetUserResponse[]>;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  public dataGlobalStore: DataGlobalStore;

  private _usersId: number[] = [];
  private _allowFreeTextAddUser = true;

  constructor(
    public dialogRef: MatDialogRef<GroupDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Group,
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _groupService: GroupService,
    private _store: Store<ConnectState>
  ) {
    this._buildForm();
    this.dataGlobalStore = {
      users$: this._store.select(selectListUsers)
    };
  }

  ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this._getAllusers();
    this._setterDataToDataForm();
  }
  private _setterDataToDataForm() {
    this.groupForm.patchValue(this.data);
    // this.groupForm.controls.areas.setValue(this.data.areas);
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(null),
      map(userControl => this._filterOnValueChange(userControl))
    );
    this.data.users.forEach(element => {
      this._usersId.push(element.id);
    });
    this.groupForm.controls.users_id.setValue(this._usersId);
  }

  private _buildForm(): void {
    this.groupForm = this._formBuilder.group({
      id: ['', []],
      prefix: ['', []],
      areas: ['', []],
      users_id: ['', []],
    })
  }

  private _getAllusers(): void {
    this._userService.doGetAll()
      .subscribe(
        (res: GetUserResponse[]) => {
          this.allUsers = res;
          this.data.users.forEach(element => {
            const userChip = this.allUsers.filter(user => user.id === element.id)
            this.chipSelectedUsers.push(userChip[0]);
            this.allUsers = this.allUsers.filter(userSelected => userSelected.id !== element.id);
          });
        }
      )
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public updateGroup(swalSuccess: SwalComponent): void {
    const dataFromForm = this.groupForm.value;
    const saveDataGroup: GroupPost = {
      prefix: dataFromForm.prefix,
      usersIds: this._usersId
    }
    Swal.fire({
      title: '¿Está seguro de guardar los cambios?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si, Guardar Cambios',
      cancelButtonText: 'No, Cancelar',
      customClass: 'swalConfirm'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Guardando...!',
          html: 'Espere un momento, los datos se estan guardando',
          allowEscapeKey: false,
          allowOutsideClick: false,
          timer: 1500,
          customClass: 'swalLoading',
          didOpen: () => {
            Swal.showLoading()
          },
          willClose: () => {
            // clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            this._groupService.editGroup(saveDataGroup, this.data)
              .subscribe(
                (res: Group) => {
                  swalSuccess.fire();
                  setTimeout(() => {
                    this.dialogRef.close(true);
                  }, 2000)
                },
                (error: ErrorsMessage) => {
                  console.log(error);
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops... Ocurrio un problema, contactese con administración',
                    text: JSON.stringify(error.error?.message),
                    showConfirmButton: true,
                    customClass: 'swalConfirm'
                  });
                }

              )
          }
        })
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

  public addUserChipList(event: MatChipInputEvent): void {
    if (this.matAutocomplete.isOpen) {
      return;
    }

    const value: string = event.value;
    if ((value || '').trim()) {
      this._selectUserByName(value.trim());
    }

    this._resetInputs();
  }

  public removeUserChipList(user: GetUserResponse): void {
    const index: number = this.chipSelectedUsers.indexOf(user);
    const indexIdUse: number = this._usersId.indexOf(user.id);
    if (index >= 0) {
      this.chipSelectedUsers.splice(index, 1);
      this._usersId.splice(indexIdUse, 1);
      this.allUsers.push(user);
      this._resetInputs();
    }
  }

  public userChipSelected(event: MatAutocompleteSelectedEvent): void {
    this._selectUserByName(event.option.value);
    this._resetInputs();
  }

  private _resetInputs(): void {
    this.userInput.nativeElement.value = '';
    this.userControl.setValue(null);
  }

  private _filterOnValueChange(userName: string | null): GetUserResponse[] {
    let result: GetUserResponse[] = [];
    let allUsersLessSelected: GetUserResponse[] = this.allUsers.filter(user => this.chipSelectedUsers.indexOf(user) < 0);
    if (userName) {
      result = this._filterUser(allUsersLessSelected, userName);
    } else {
      result = allUsersLessSelected;
    }
    return result;
  }

  private _filterUser(userList: any[], userName: String): GetUserResponse[] {
    let filteredUserList: GetUserResponse[] = [];
    const filterValue: string = userName.toLowerCase();
    let userssMatchingUsersName = userList.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
    if (userssMatchingUsersName.length || this._allowFreeTextAddUser) {
      filteredUserList = userssMatchingUsersName;
    } else {
      filteredUserList = userList;
    }
    return filteredUserList;
  }

  private _selectUserByName(userName: string): void {
    let foundUser: GetUserResponse[] = this.allUsers.filter(user => user.firstName == userName);
    const indx: number = this.allUsers.indexOf(foundUser[0]);
    this.allUsers.splice(indx, 1);
    if (foundUser.length) {
      this.chipSelectedUsers.push(foundUser[0]);
      const indexUserId: number = this._usersId.indexOf(foundUser[0].id);
      if (indexUserId >= 0) {
        this.removeUserChipList(foundUser[0]);
      } else {
        this._usersId.push(foundUser[0].id);
      }
    } else {

    }
  }

  public compareThem(o1: any, o2: any): boolean {
    return o1.name === o2.name;
  }

}

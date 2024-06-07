import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { Prefix } from 'src/app/shared/models/admin/prefix/prefix.model';
import { DataGlobalStore } from 'src/app/shared/models/admin/state-managment/data-global-store.model';
import { GetUserResponse } from 'src/app/shared/models/user/user.model';
import { MatDialogRef } from '@angular/material/dialog';
import { GroupComponent } from '../../group.component';
import { UserService } from 'src/app/shared/services/user/user.service';
import { GroupService } from 'src/app/shared/services/admin/group/group.service';
import { Store } from '@ngrx/store';
import { ConnectState } from 'src/app/state-management/app.state';
import { PrefixService } from 'src/app/shared/services/admin/prefix/prefix.service';
import { selectListUsers } from 'src/app/state-management/selectors/user/user.selector';
import { map, startWith } from 'rxjs/operators';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { GroupPost } from 'src/app/shared/models/admin/group/group.model';
import Swal from 'sweetalert2';
import { MatChipInputEvent } from '@angular/material/chips';
import { ErrorsMessage } from 'src/app/shared/models/error.model';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AddGroupComponent implements OnInit {

  @ViewChild('userInput') public userInput!: ElementRef<HTMLInputElement>;
  @ViewChild('auto') public matAutocomplete!: MatAutocomplete;
  public allUsers: GetUserResponse[] = [];
  public chipSelectedUsers: any[] = [];
  public filteredUsers!: Observable<GetUserResponse[]>;
  public groupForm!: FormGroup;
  public prefix!: Prefix;
  public dataGlobalStore: DataGlobalStore;
  public userControl = new FormControl();
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private _usersId: number[] = [];
  private allowFreeTextAddUser = true;

  constructor(
    public dialogRef: MatDialogRef<GroupComponent>,
    private _userService: UserService,
    private _formBuilder: FormBuilder,
    private _groupService: GroupService,
    private _prefixService: PrefixService,
    private _store: Store<ConnectState>
  ) {
    this._buildForm();
    this.dataGlobalStore = {
      users$: this._store.select(selectListUsers)
    };
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {
    this._getAllUsers();
    this._getPrefix();
    this.filteredUsers = this.userControl.valueChanges.pipe(
      startWith(null),
      map(userControl => this._filterOnValueChange(userControl))
    );
  }

  private _buildForm(): void {
    this.groupForm = this._formBuilder.group({
      prefix: ['', [Validators.required]],
      users: ['', [Validators.required]],
    })
  }

  private _getPrefix(): void {
    this._prefixService.getPrefix()
      .subscribe(
        (res: Prefix) => {
          this.prefix = res;
          this.groupForm.controls.prefix.setValue(this.prefix.num);
        }
      );
  }

  private _getAllUsers(): void {
    this._userService.doGetAll()
      .subscribe(
        (res: GetUserResponse[]) => {
          this.allUsers = res;
        }
      )
  }

  public closeModal(): void {
    this.dialogRef.close();
  }

  public addGroup(swalSuccess: SwalComponent): void {
    const data = this.groupForm.value;
    const newGroup: GroupPost = {
      prefix: data.prefix,
      usersIds: this._usersId
    };
    Swal.fire({
      title: '¿Está seguro de registrar al nuevo grupo?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: 'Si, Registrar',
      cancelButtonText: 'No, Cancelar',
      customClass: 'swalConfirm'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Registrando...!',
          html: 'Espere un momento, los datos se estan registrando',
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
            this._groupService.addGroup(newGroup)
              .subscribe(
                (res: any) => {
                  swalSuccess.fire();
                  setTimeout(() => {
                    this.dialogRef.close(true);
                  }, 2000)
                },
                (error: ErrorsMessage) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops... Ocurrio un problema, contactese con administración',
                    text: JSON.stringify(error.error?.message),
                    showConfirmButton: true,
                    customClass: 'swalConfirm'
                  });
                }
              );
          }
        })
      } else if (result.isDenied) {
        // Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  public addUserChipList(event: MatChipInputEvent): void {
    if (this.matAutocomplete.isOpen) {
    }

    const value = event.value;
    if ((value || '').trim()) {
      this._selectUserByName(value.trim());
    }

    this._resetInputs();
  }

  public removeUserChipList(user: any): void {
    const index = this.chipSelectedUsers.indexOf(user);
    const indexIdUse = this._usersId.indexOf(user.id);
    if (index >= 0) {
      this.chipSelectedUsers.splice(index, 1);
      this._usersId.splice(indexIdUse, 1)
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
    let allUsersLessSelected = this.allUsers.filter(user => this.chipSelectedUsers.indexOf(user) < 0);
    if (userName) {
      result = this._filterUser(allUsersLessSelected, userName);
    } else {
      result = allUsersLessSelected;
    }
    return result;
  }

  private _filterUser(userList: any[], userName: String): GetUserResponse[] {
    let filteredUserList: GetUserResponse[] = [];
    const filterValue = userName.toLowerCase();
    let userssMatchingUsersName = userList.filter(user => user.name.toLowerCase().indexOf(filterValue) === 0);
    if (userssMatchingUsersName.length || this.allowFreeTextAddUser) {
      filteredUserList = userssMatchingUsersName;
    } else {
      filteredUserList = userList;
    }
    return filteredUserList
  }

  private _selectUserByName(userName: string): void {
    let foundUser = this.allUsers.filter(user => user.firstName === userName || user.lastName === userName);
    if (foundUser.length) {
      this.chipSelectedUsers.push(foundUser[0]);
      const indexUserId = this._usersId.indexOf(foundUser[0].id);
      if (indexUserId >= 0) {
        console.log('este id ya esta en el array');
      } else {
        this._usersId.push(foundUser[0].id);
      }
    } else {

    }
  }

}

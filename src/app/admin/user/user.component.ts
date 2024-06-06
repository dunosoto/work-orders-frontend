import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterModel } from 'src/app/shared/models/admin/filter.model';
import { GetUserResponse } from 'src/app/shared/models/user/user.model';
import { CustomPaginator } from 'src/app/shared/ts/custom-paginator';
import { loadUsers } from 'src/app/state-management/actions/user/user.action';
import { ConnectState } from 'src/app/state-management/app.state';
import { selectListUsers, selectLoadingUsers } from 'src/app/state-management/selectors/user/user.selector';
import { AddUserComponent } from './components/add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit {

  public loading$: Observable<boolean>;
  public usersDataSource$: Observable<GetUserResponse[]>;
  public filtersObject: FilterModel[];
  public textToSearch: string;

  constructor(
    private dialogController: MatDialog,
    private store: Store<ConnectState>
  ) {
    this.loading$ = this.store.select(selectLoadingUsers);
    this.usersDataSource$ = this.store.select(selectListUsers);
    this.textToSearch = "";
    this.filtersObject = [
      {
        iconName: 'filter_list',
        options: [
          {
            name: 'Todos'
          },
          {
            name: 'Inactivos'
          }
        ]
      },
    ]
  }

  public ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

  public addUser(): void {
    const dialog: MatDialogRef<AddUserComponent> = this.dialogController.open(AddUserComponent, {
      width: '600px',
      height: '600px',
      panelClass: 'modal-form',
      data: [{

      }]
    });

    dialog.afterClosed().subscribe(
      (res: boolean) => {
        if (res) this.getUsers();
      }
    );

  }

  public getUsers(): void {
    this.store.dispatch(loadUsers());
  }

  public getTextToSearch(textToSearch: string): void {
    this.textToSearch = textToSearch;
  }

}

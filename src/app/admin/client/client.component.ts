import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClientGet, ClientGetWithParams } from 'src/app/shared/models/admin/client/client.model';
import { ConnectState } from 'src/app/state-management/app.state';
import { selectListClients, selectLoadingClients } from 'src/app/state-management/selectors/client/client.selector';
import { CreateClientComponent } from './components/create-client/create-client.component';
import { loadClients } from 'src/app/state-management/actions/client/client.action';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  public clientsData$: Observable<ClientGet[]>;
  public loading$: Observable<boolean>;
  public textToSearch: string;

  constructor(
    private _store: Store<ConnectState>,
    private _matDialog: MatDialog
  ) {
    this.loading$ = this._store.select(selectLoadingClients)
    this.clientsData$ = this._store.select(selectListClients);
    this.textToSearch = "";
  }

  public ngOnInit(): void {
  }

  public getTextToSearch(textToSearch: string): void {
    this.textToSearch = textToSearch;
  }

  public addNewClient() {
    const dialogProperties: MatDialogConfig = {
      panelClass: 'modal-form',
      width: '600px',
      height: '600px',
    };
    const dialogRef: MatDialogRef<CreateClientComponent> = this._matDialog.open(CreateClientComponent, dialogProperties);
    dialogRef.afterClosed().subscribe(
      (res: any) => {
        if (res) {
          this.getAllCLients();
        }
      }
    );
  }

  public getAllCLients(): void {
    const paramsClientsGet: ClientGetWithParams = {
      name: '',
      lastName: ''
    }
    this._store.dispatch(loadClients({ payload: paramsClientsGet }));
  }
}

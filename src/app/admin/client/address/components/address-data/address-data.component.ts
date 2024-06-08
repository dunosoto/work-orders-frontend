import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UpdateClientAddressComponent } from '../../../components/client-address/update-client-address/update-client-address.component';
import { Store } from '@ngrx/store';
import { ClientGet } from 'src/app/shared/models/admin/client/client.model';
import { ClientAddress } from 'src/app/shared/models/admin/client/client-address.model';
import { ConnectState } from 'src/app/state-management/app.state';
import { loadClientById } from 'src/app/state-management/actions/client/client.action';

@Component({
  selector: 'app-address-data',
  templateUrl: './address-data.component.html',
  styleUrls: ['./address-data.component.scss']
})
export class AddressDataComponent implements OnInit {

  @Input() public clientData!: ClientGet | null;
  @Output() public selectedAddressByUserEmitter: EventEmitter<ClientAddress>;
  public indexSelected: number;
  public columns: string[] = [
    'department',
    'province',
    'location',
    'action'
  ];
  constructor(
    private matDialog: MatDialog,
    private _store: Store<ConnectState>
  ) {
    this.selectedAddressByUserEmitter = new EventEmitter();
    this.indexSelected = -1;
  }

  public ngOnInit(): void {
  }

  public selectedAddressByUser(element: ClientAddress, index: number) {
    this.selectedAddressByUserEmitter.emit(element);
    this.indexSelected = index;
  }

  public updateAddressToClient(element: ClientAddress) {

    const dataToUpdate: ClientAddress = {
      ...element,
      clientId: this.clientData?.id
    }

    const dialogProperties: MatDialogConfig = {
      panelClass: 'modal-form',
      width: '900px',
      height: '600px',
      data: dataToUpdate
    };
    const dialogRef: MatDialogRef<UpdateClientAddressComponent> = this.matDialog.open(UpdateClientAddressComponent, dialogProperties);
    dialogRef.afterClosed().subscribe(
      (res: boolean) => {
        if (res) {
          const clientDataById: ClientGet = {
            id: this.clientData?.id
          } as ClientGet;
          this._store.dispatch(loadClientById({ payload: clientDataById }));
        }
      }
    );
  }
}

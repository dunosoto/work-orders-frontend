import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ServiceAccessType } from 'src/app/shared/enums/service-access-type.enum';
import { GetInternetService } from 'src/app/shared/models/admin/internet-services/internet-service.model';
import { UpdateClientServiceComponent } from '../../../components/client-service/update-client-service/update-client-service.component';
import { ConnectState } from 'src/app/state-management/app.state';

@Component({
  selector: 'app-address-service',
  templateUrl: './address-service.component.html',
  styleUrls: ['./address-service.component.scss']
})
export class AddressServiceComponent implements OnInit {

  @Input() clientService!: GetInternetService | null;
  @Output() updteClienServiceEventEmitter: EventEmitter<boolean>;

  public serviceAccessType = ServiceAccessType;

  constructor(
    public matDialog: MatDialog,
    private _store: Store<ConnectState>
  ) {
    this.updteClienServiceEventEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  public updateService(service: GetInternetService): void {
    const dialogProperties: MatDialogConfig = {
      panelClass: 'modal-form',
      width: '500px',
      height: '600px',
      data: service
    };
    const dialogRef: MatDialogRef<UpdateClientServiceComponent> = this.matDialog.open(UpdateClientServiceComponent, dialogProperties);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    }
    );
  }


}

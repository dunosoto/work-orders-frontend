import { Component, OnInit, Output, Input, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ClientGet } from 'src/app/shared/models/admin/client/client.model';
import { ClientService } from 'src/app/shared/services/admin/client/client.service';
import { MessageService } from 'src/app/shared/services/message/message.service';
import { SweetAlertOptions } from 'sweetalert2';
import { UpdateClientComponent } from '../update-client/update-client.component';


@Component({
  selector: 'app-client-data',
  templateUrl: './client-data.component.html',
  styleUrls: ['./client-data.component.scss']
})
export class ClientDataComponent implements OnInit {

  @Input() clientsData!: ClientGet[] | null;
  @Output() reloadEventEmitter: EventEmitter<boolean>;
  private _propertiesToSwal: SweetAlertOptions;
  private _subscribers: Subscription;
  public columns: string[] = [
    'name',
    'last-name',
    'telephone',
    'category',
    'action'
  ];

  constructor(
    public dialog: MatDialog,
    private _messageService: MessageService,
    private _clientService: ClientService
  ) {
    this.reloadEventEmitter = new EventEmitter();
    this._propertiesToSwal = {
      title: '¿Está seguro de eliminar al cliente?',
      text: '',
      confirmButtonText: 'Si, Eliminar',
      cancelButtonText: 'No, Cancelar',
    };
    this._subscribers = new Subscription();
  }

  ngOnInit(): void {
  }

  public ngOnDestroy(): void {
    this._subscribers.unsubscribe();
  }

  public updateClientData(client: ClientGet) {
    const dialogProperties: MatDialogConfig = {
      panelClass: 'modal-form',
      width: '600px',
      height: '600px',
      data: client
    };
    const dialogRef: MatDialogRef<UpdateClientComponent> = this.dialog.open(UpdateClientComponent, dialogProperties);
    dialogRef.afterClosed().subscribe(
      (res: boolean) => {
        if (res) {
          this.reloadEventEmitter.emit(true);
        }
      }
    );
  }

  public deleteClient(client: ClientGet): void {
    const messageService: Subscription = this._messageService.showSwalConfirmAlert(this._propertiesToSwal)
      .subscribe((isConfirmed: boolean) => {
        if (isConfirmed) {
          const clientServiceSubscription: Subscription = this._clientService.delete(client)
            .subscribe(
              (res: ClientGet) => {
                this.reloadEventEmitter.emit(true);
              }
            )
          this._subscribers.add(clientServiceSubscription);
        }
      });
    this._subscribers.add(messageService);
  }
}

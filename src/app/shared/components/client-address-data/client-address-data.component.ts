import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClientAddress } from '../../models/admin/client/client-address.model';

@Component({
  selector: 'app-client-address-data',
  templateUrl: './client-address-data.component.html',
  styleUrls: ['./client-address-data.component.scss']
})
export class ClientAddressDataComponent implements OnInit {
  @Input() address: ClientAddress;
  @Input() index!: number;
  @Input() indexAddressSelected!: number;
  @Output() selectAddressEventEmitter: EventEmitter<ClientAddress> = new EventEmitter();

  constructor() {
    this.address = {} as ClientAddress;
  }

  ngOnInit() {
  }


}

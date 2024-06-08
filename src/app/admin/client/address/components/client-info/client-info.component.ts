import { Component, Input, OnInit } from '@angular/core';
import { ClientGet } from 'src/app/shared/models/admin/client/client.model';

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  @Input() public clientData!: ClientGet | null;
  constructor() { }

  ngOnInit() {
  }


}

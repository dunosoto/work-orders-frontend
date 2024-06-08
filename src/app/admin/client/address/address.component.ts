import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { CreateClientAddressComponent } from '../components/client-address/create-client-address/create-client-address.component';
import { CreateClientServiceComponent } from '../components/client-service/create-client-service/create-client-service.component';
import { ClientGet } from 'src/app/shared/models/admin/client/client.model';
import { GetInternetService } from 'src/app/shared/models/admin/internet-services/internet-service.model';
import { AddNewServiceToClientAddress, ClientAddress } from 'src/app/shared/models/admin/client/client-address.model';
import { IGoogleMapsConfig } from 'src/app/shared/models/google-maps/initial-value.model';
import { ConnectState } from 'src/app/state-management/app.state';
import { selectClientDataDetail, selectLoadingClientDataDetail } from 'src/app/state-management/selectors/client/client.selector';
import { selectListInternetServices } from 'src/app/state-management/selectors/internet-service/internet-services.selector';
import { loadClientById } from 'src/app/state-management/actions/client/client.action';
import { loadInternetServices } from 'src/app/state-management/actions/services/services.action';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  private _clientId!: number;
  public clientData!: ClientGet;
  public clientData$: Observable<ClientGet>;
  public clientServicesData$: Observable<GetInternetService[]>;
  public selectedAdressByUser!: ClientAddress;
  public loading$: Observable<boolean>;


  @ViewChild('myGoogleMap', { static: false }) public map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) public info!: MapInfoWindow;

  public initialValuesToConfigGoogleMap: IGoogleMapsConfig;
  public center!: google.maps.LatLngLiteral;
  public markers: any[] = [];
  public infoContent = '';
  public markerOptions: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
    draggable: false,
    // icon: 'assets/icon/olt.svg'
  };

  constructor(
    private activateRoute: ActivatedRoute,
    private _store: Store<ConnectState>,
    public matDialog: MatDialog,
    private _router: Router
  ) {
    this.activateRoute.params.subscribe(
      (res: Params) => {
        this._clientId = res.id;
      }
    );
    this.loading$ = this._store.select(selectLoadingClientDataDetail);
    this.clientServicesData$ = this._store.select(selectListInternetServices);
    this.clientData$ = this._store.select(selectClientDataDetail);

    this.initialValuesToConfigGoogleMap = {
      height: '300px',
      width: '100%',
      zoom: 12,
      options: {
        zoomControl: true,
        scrollwheel: true,
        disableDoubleClickZoom: true,
        streetViewControl: false,
        mapTypeId: 'roadmap',
        mapTypeControlOptions: {
          mapTypeIds: ["moon"],
        },
        maxZoom: 30,
        minZoom: 8,
      }
    };
  }

  public ngOnInit(): void {
    this._initialize();
  }

  private _initialize(): void {

    const clientDataById: ClientGet = {
      id: this._clientId
    } as ClientGet;
    this._store.dispatch(loadClientById({ payload: clientDataById }));

    this.clientData$?.subscribe(
      (res: ClientGet) => {
        this.clientData = res;
        if (res.addresses && res.addresses.length > 0) {
          this._addMarkersForClientServices(res.addresses);
        }
      }
    )
  }

  private _addMarkersForClientServices(addresses: ClientAddress[]): void {
    this.center = {
      lat: Number(addresses[0].lat),
      lng: Number(addresses[0].lon),
    }
    addresses?.forEach(address => {
      this.markers.push(
        {
          position: {
            lat: Number(address.lat),
            lng: Number(address.lon),
          }
        }
      )
    });
  }

  public getSelectedAddressByUser(adressSelected: ClientAddress): void {
    this.selectedAdressByUser = adressSelected;
  }

  public addNewAddressToClient() {
    const dialogProperties: MatDialogConfig = {
      panelClass: 'modal-form',
      width: '900px',
      height: '600px',
      data: this.clientData
    };
    const dialogRef: MatDialogRef<CreateClientAddressComponent> = this.matDialog.open(CreateClientAddressComponent, dialogProperties);
    dialogRef.afterClosed().subscribe(
      (res: boolean) => {
        if (res) {
          const clientDataById: ClientGet = {
            id: this.clientData.id
          } as ClientGet;
          this._store.dispatch(loadClientById({ payload: clientDataById }));
        }
      }
    );
  }

  public addNewServiceToAddress(): void {
    const data: AddNewServiceToClientAddress = {
      dataAddress: this.selectedAdressByUser,
      clientId: this._clientId
    }
    const dialogProperties: MatDialogConfig = {
      panelClass: 'modal-form',
      width: '800px',
      height: '600px',
      data: data
    };
    const dialogRef: MatDialogRef<CreateClientServiceComponent> = this.matDialog.open(CreateClientServiceComponent, dialogProperties);
    dialogRef.afterClosed().subscribe(
      (res: boolean) => {
        if (res) {
          this.loadInternetServiceToStore();
        }
      }
    );
  }

  public getUpdateServiceEventEmitter(event: boolean): void {
    if (event) {
      // this.loadInternetServiceToStore();
    }
  }

  public loadInternetServiceToStore(): void {
    this._store.dispatch(loadInternetServices());
  }

  public goToListClients(): void {
    this._router.navigate(['/co4/admin/clientes/']);
  }

  public workOrderGroupTrackBy(index: number): number {
    return index;
  }
}

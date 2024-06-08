import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { GoogleMap, MapGeocoder, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { IGoogleMapsConfig, IMarkerSelectionAnswer } from '../../models/google-maps/initial-value.model';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {

  @Input() public latitude!: number | string;
  @Input() public longitude!: number | string;

  @Output() public sendAddressSelectedEventEmitter: EventEmitter<IMarkerSelectionAnswer>;
  @ViewChild('myGoogleMap', { static: false }) public map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) public info!: MapInfoWindow;
  @ViewChild('mapSearchField') public searchField!: ElementRef;

  public initialValuesToConfigGoogleMap: IGoogleMapsConfig;
  public center!: google.maps.LatLngLiteral;
  public infoContent: string;

  public marker: any = {};
  public markerOptions: google.maps.MarkerOptions;

  constructor(
    private _geocoder: MapGeocoder
  ) {
    this.sendAddressSelectedEventEmitter = new EventEmitter();
    this.infoContent = '';
    this.markerOptions = {
      draggable: false,
      // icon: 'assets/icon/olt.svg'
    };
    this.initialValuesToConfigGoogleMap = {
      height: '',
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

  public ngAfterViewInit(): void {
    const searchBox = new google.maps.places.SearchBox(
      this.searchField.nativeElement,
    );
    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(
      this.searchField.nativeElement,
    );
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (places?.length === 0) {
        return;
      }
      const bounds = new google.maps.LatLngBounds();
      places?.forEach(place => {
        if (!place.geometry || !place.geometry.location) {
          return;
        }
        if (place.geometry.viewport) {
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    });
  }

  ngOnInit() {
    this._initilize();
  }

  private _initilize(): void {
    if (this.latitude && this.longitude) {
      this.marker = ({
        position: {
          lat: Number(this.latitude),
          lng: Number(this.longitude),
        },
      });
      this.center = {
        lat: Number(this.latitude),
        lng: Number(this.longitude),
      };
    } else {
      this._setGeolocation();
    }
  }

  public dropMarker(eventClick: google.maps.MapMouseEvent) {
    this.marker = ({
      position: {
        lat: eventClick.latLng?.lat(),
        lng: eventClick.latLng?.lng(),
      },
      // clickable: true,
    });
    this._geocoder.geocode({
      location: { lat: this.marker.position.lat, lng: this.marker.position.lng }
    }).subscribe(({ results }) => {
      if (results) {
        const locationSelected: IMarkerSelectionAnswer = {
          lat: eventClick.latLng?.lat(),
          lon: eventClick.latLng?.lng(),
          name: results[0].address_components[1].long_name,
          city: results[0].address_components[4] ? results[0].address_components[4].long_name : results[0].address_components[0].long_name,
          direction: results[0].formatted_address,
          place_id: results[0].place_id,
          location: results[0].address_components[2].long_name
        }
        this.sendAddressSelectedEventEmitter.emit(locationSelected);
      }
    });
  }

  private _setGeolocation(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
  }

  public openInfo(marker: MapMarker, content: string): void {
    this.infoContent = content;
    this.info.open(marker)
  }

}

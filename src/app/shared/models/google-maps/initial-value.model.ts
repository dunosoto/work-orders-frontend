export interface IGoogleMapsConfig {
  width: string;
  height: string;
  zoom: number;
  center?: google.maps.LatLngLiteral | undefined;
  options: google.maps.MapOptions;
}

export interface IMarkerSelectionAnswer {
  lat: number | undefined;
  lon: number | undefined;
  name: string;
  city: string;
  direction: string;
  place_id: string;
  location: string;
}

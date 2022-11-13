export interface RouteParams {
  origin: google.maps.LatLng,
  destination: google.maps.LatLng,
  waypoints: {
    location: google.maps.LatLng,
    stopover: boolean;
  }[]
}

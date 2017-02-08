import {Component} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  CameraPosition,
  GoogleMapsMarkerOptions,
  GoogleMapsMarker, AnimateCameraOptions
} from 'ionic-native';

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class Map {
  map: GoogleMap;
  constructor() {

  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');

    this.map = new GoogleMap(element);
    this.map.setMyLocationEnabled(true);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
      console.log('Map: ', this.map);
    })
      .catch(err => console.log("Error: ", err));

    this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK)
      .subscribe((evt) => this.locateMe());
  }

  locateMe() {
    this.map.getMyLocation().then((location) => {
      console.log('My locaation: ', location);
      var msg = ["Current your location:\n",
        "latitude:" + location.latLng.lat,
        "longitude:" + location.latLng.lng,
        "speed:" + location.speed,
        "time:" + location.time,
        "bearing:" + location.bearing].join("\n");
      let markerOptions: GoogleMapsMarkerOptions = {
        'position': location.latLng,
        'title': msg
      };
      this.map.addMarker(markerOptions).then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
      let myLocation: GoogleMapsLatLng = new GoogleMapsLatLng(location.latLng.lat, location.latLng.lng);
      let position: AnimateCameraOptions = {
        target: myLocation,
        zoom: 18,
        tilt: 30,
        duration: 1000
      };
      this.map.animateCamera(position);
    }).catch(err => {
      console.log('Error: ', err);
    });
  }
}

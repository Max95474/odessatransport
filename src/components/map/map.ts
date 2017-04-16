import {Component} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  // CameraPosition,
  // GoogleMapsMarkerOptions,
  // GoogleMapsMarker,
  AnimateCameraOptions
} from 'ionic-native';
import { Events, NavParams } from 'ionic-angular';
import { RoutesService } from "../../services/RoutesService";

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class Map {
  map: GoogleMap;
  constructor(public events: Events,
              private navParams: NavParams,
              private routesService: RoutesService) {
    const routeId = this.navParams.get('routeId');
    if(routeId) {
      this.showRoute(routeId);
    }
    events.subscribe('menu:opened', () => {
      this.map.setClickable(false);
    });
    events.subscribe('menu:closed', () => {
      this.map.setClickable(true);
    });
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  loadMap() {
    let element: HTMLElement = document.getElementById('map');

    this.map = new GoogleMap(element);
    this.map.setMyLocationEnabled(true);
    this.map.setClickable(true);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');
    })
      .catch(err => console.log("Error: ", err));

    this.map.on(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK)
      .subscribe((evt) => this.locateMe());
  }
  locateMe() {
    this.map.getMyLocation().then((location) => {
      let myLocation: GoogleMapsLatLng = new GoogleMapsLatLng(location.latLng.lat, location.latLng.lng);
      let position: AnimateCameraOptions = {
        target: myLocation,
        zoom: 17,
        tilt: 30,
        duration: 1000
      };
      this.map.animateCamera(position);
    }).catch(err => {
      console.log('Error: ', err);
    });
  }
  showRoute(id: string) {
    this.routesService.getRouteById(id)
      .then(route => console.log('Route to show: ', route))
      .catch(err => console.log("Error: ", err))
  }
}

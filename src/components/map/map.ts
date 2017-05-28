import {Component} from '@angular/core';
import {
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapsLatLng,
  // CameraPosition,
  // GoogleMapsMarkerOptions,
  // GoogleMapsMarker,
  AnimateCameraOptions,
  GoogleMapsPolyline, GoogleMapsMarkerOptions, GoogleMapsMarker
} from 'ionic-native';
import { Events, NavParams } from 'ionic-angular';
import { RoutesService } from "../../services/RoutesService";
import {Segment} from "../../models/segment";
import {Route} from "../../models/route";
import {State} from "../../models/state";

@Component({
  selector: 'map',
  templateUrl: 'map.html'
})
export class Map {
  map: GoogleMap;
  routeId: string;
  routeLine: GoogleMapsPolyline;
  currentRoute: Route;
  transportStates: Array<State>;
  stateMarkers: Array<GoogleMapsMarker> = [];
  updateInterval: any;
  constructor(public events: Events,
              private navParams: NavParams,
              private routesService: RoutesService) {
    this.routeId = this.navParams.get('routeId');

    events.subscribe('menu:opened', () => {
      if(this.map) this.map.setClickable(false);
    });
    events.subscribe('menu:closed', () => {
      if(this.map) this.map.setClickable(true);
    });
  }

  ngAfterViewInit() {
    this.loadMap();
    if(this.routeId) {
      this.showRoute(this.routeId);
    }
  }

  ngOnDestroy() {
    clearInterval(this.updateInterval);
    this.map.clear();
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
    this.map.clear();
    this.routesService.getRouteById(id)
      .then(route => {
        this.currentRoute = route;
        let odessa: GoogleMapsLatLng = new GoogleMapsLatLng(46.451117, 30.734253);
        route.segments.forEach(segment => this.showSegment(segment));
        const position: AnimateCameraOptions = {
          target: odessa,
          zoom: 12,
          tilt: 30,
          duration: 1000
        };
        this.map.animateCamera(position).then(() => console.log('Camera moved'));
        this.updateInterval = setInterval(() => this.updateState(), 7000);
      })
      .catch(err => console.log("Error: ", err))
  }
  private showSegment(segment: Segment) {
    this.map.addPolyline({
      points: segment.points.map(point => new GoogleMapsLatLng(point.lat, point.lng)),
      'color' : '#005EFF',
      'width': 3,
      'geodesic': true
    }).then(polyline => this.routeLine = polyline);
  }
  private updateState() {
    console.log('Updating state...');
    this.routesService.getState(this.currentRoute.transport.map(transport => transport.id))
      .then(states => {
        this.stateMarkers.forEach(marker => marker.remove());
        Promise.all(states.map(state => {
          const markerOptions: GoogleMapsMarkerOptions = ({
            position: new GoogleMapsLatLng(parseFloat(state.lat), parseFloat(state.lng)),
            title: `${state.speed} km/h - ${state.ts}`
          });
          return this.map.addMarker(markerOptions)
            .then(marker => {
              this.stateMarkers.push(marker);
              return marker;
            })
        })).then(markers => this.transportStates = markers)
      })
      .catch(err => console.log("Error: ", err))
  }
}

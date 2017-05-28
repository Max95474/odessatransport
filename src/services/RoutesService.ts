import { Injectable } from '@angular/core';
import {Route} from "../models/route";
import {Loader} from "./Loader";
import {State} from "../models/state";

@Injectable()
export class RoutesService {
  routes: Array<Route>;
  constructor(private loader: Loader) {
    this.routes = [];
  }
  getRouteById(routeId: string): Promise<Route> {
    return new Promise((resolve, reject) => {
      const route = this.routes.find(route => route.id == routeId);
      if(route) return resolve(route);
      this.loader.loadRoute(routeId)
        .then(route => {
          this.routes.push(route);
          resolve(route)
        }).catch(err => reject(err))
    })
  }
  getState(transportKeys: Array<string>): Promise<Array<State>> {
    return this.loader.getState(transportKeys)
  }
}

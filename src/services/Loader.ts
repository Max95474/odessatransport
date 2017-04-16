import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Route} from "../models/route";

import 'rxjs/add/operator/toPromise';

const SERVER_URL = 'http://192.168.1.4:3000';

@Injectable()
export class Loader {
  constructor(private http: Http) {}
  loadRoutes(): Promise<Array<Route>> {
    return this.http.get(`${SERVER_URL}/route/list`)
      .toPromise()
      .then(response => {
        return response.json() as Array<Route>;
      })
  }
  loadRoute(id: string): Promise<Route> {
    return this.http.get(`${SERVER_URL}/route/${id}`)
      .toPromise()
      .then(response => response.json() as Route)
  }
}

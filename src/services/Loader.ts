import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Route} from "../models/route";

import 'rxjs/add/operator/toPromise';
import {State} from "../models/state";

const SERVER_URL = 'http://192.168.88.136:3000';

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
  getState(transportKeys: Array<string>): Promise<Array<State>> {
    const url = `${SERVER_URL}/state${this.arrayToQueryString('imei[]', transportKeys)}`;
    console.log("URL: ", url);
    return this.http.get(url)
      .toPromise()
      .then(response => response.json() as Array<State>)
  }
  private arrayToQueryString(key, values): string {
    let result = '?';
    values.forEach((value, index) => result += `${key}=${index === values.length - 1 ? value : value + '&'}`);
    return result;
  }
}

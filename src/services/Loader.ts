import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Route} from "../models/route";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class Loader {
  constructor(private http: Http) {
    console.log('Loader initialized');
  }
  loadRoutes(): Promise<Array<Route>> {
    return this.http.get('http://192.168.88.136:3000/route/list')
      .toPromise()
      .then(response => {
        return response.json() as Array<Route>;
      })
  }
}

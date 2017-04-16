import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Loader } from "../../services/Loader";
import { Route } from "../../models/route";
import { HomePage } from "../../pages/home/home";

@Component({
  selector: 'routes-list',
  templateUrl: 'routes_list.html'
})
export class RoutesList {
  private routes: Array<Route>;
  // private loading: any;
  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public loader: Loader) {
    // TODO: update ionic to fix error with loading.dismiss()
    // this.loading = this.loadingCtrl.create({
    //   content: 'Loading routes...',
    //   dismissOnPageChange: true,
    //   duration: 1000
    // });
    // this.loading.present();
    loader.loadRoutes().then(routes => {
      this.routes = routes;
      // this.loading.dismiss();
    }).catch(err => {
      console.log("Error: ", err);
      // this.loading.dismiss();
    })
  }
  openRoute(routeId) {
    this.navCtrl.push(HomePage, {routeId})
  }
}

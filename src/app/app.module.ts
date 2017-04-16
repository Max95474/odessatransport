import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RoutesPage } from '../pages/routes/routes';
import { Map } from '../components/map/map';
import { RoutesList } from '../components/routes_list/routes_list';
import { Loader } from "../services/Loader";
import { RoutesService } from "../services/RoutesService";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RoutesPage,
    Map,
    RoutesList
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RoutesPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Loader,
    RoutesService
  ]
})
export class AppModule {}

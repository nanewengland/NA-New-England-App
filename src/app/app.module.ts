import { NgModule,
         ErrorHandler }          from '@angular/core';
import { IonicApp,
         IonicModule,
         IonicErrorHandler }     from 'ionic-angular';
import 'rxjs/add/operator/map';
import { ToastController }       from 'ionic-angular';
import { MyApp }                 from './app.component';
import { InAppBrowser }          from '@ionic-native/in-app-browser';
import { Geolocation }           from '@ionic-native/geolocation';
import { SharedModule }          from './shared/shared.module'
import { HomeModule }            from '../pages/home/home.module';
import { TabsModule }            from '../pages/tabs/tabs.module';
import { MapSearchModule }       from '../pages/map-search/map-search.module';
import { SettingsModule }        from '../pages/settings/settings.module';
import { ContactModule }         from '../pages/contact/contact.module';
import { AboutModule }         from '../pages/about/about.module';
import { LocationSearchModule }  from '../pages/location-search/location-search.module';
import { AddressSearchModule }   from '../pages/address-search/address-search.module';
import { DatetimeModule } from '../pages/datetime/datetime.module';
import { MeetinglistModule }  from '../pages/meetinglist/meetinglist.module';
import { JustfortodayModule } from '../pages/justfortoday/justfortoday.module';
import { EventsPageModule } from '../pages/events/events.module'
import { JftProvider } from '../providers/jft/jft';
import { EventsProvider} from '../providers/events/events'
import { MeetingListProvider }   from '../providers/meeting-list/meeting-list';
import { ServiceGroupsProvider } from '../providers/service-groups/service-groups';
import { GeolocateProvider }     from '../providers/geolocate/geolocate';
import { WordpressModule } from '../pages/wordpress/wordpress.module';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    SharedModule,
    HomeModule,
    TabsModule,
    MapSearchModule,
    SettingsModule,
    ContactModule,
    AboutModule,
    AddressSearchModule,
    DatetimeModule,
    JustfortodayModule,
    LocationSearchModule,
    EventsPageModule,
    MeetinglistModule,
    WordpressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser,
    Geolocation,
    ToastController,
    JftProvider,
    EventsProvider,
    MeetingListProvider,
    ServiceGroupsProvider,
    GeolocateProvider
    ]
})
export class AppModule {}

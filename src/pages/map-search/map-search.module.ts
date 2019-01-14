import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { SharedModule }         from '../../app/shared/shared.module';
import { MapSearchComponent }   from './map-search-component/map-search.component';
import { AgmCoreModule }        from '@agm/core';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { Geolocation }          from '@ionic-native/geolocation';
import { PipesModule }          from '../../pipes/pipes.module';
import { AgmMarkerSpiderModule } from 'agm-spiderfeir';

//import { AgmMarkerSpiderModule } from 'agm-oms';

@NgModule({
  declarations: [
    MapSearchComponent
  ],
  imports: [
  	CommonModule,
  	SharedModule,
    PipesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDrv19Tafr_IpBWPLxC2K-GfEEg-G03VDA'
    }),
    AgmJsMarkerClustererModule,
    AgmMarkerSpiderModule
  ],
  exports: [
    MapSearchComponent
  ],
  entryComponents:[
  	MapSearchComponent
  ]
})
export class MapSearchModule {}

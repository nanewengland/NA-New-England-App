import { Component, ViewChild }       from '@angular/core';
import { LoadingController }          from 'ionic-angular';
import { Storage }                    from '@ionic/storage';
import { ToastController }            from 'ionic-angular';
import { Geolocation }                from '@ionic-native/geolocation';
import { MouseEvent,
         LatLngLiteral,
         LatLngBounds,
         LatLng,
         AgmCircle  }                 from '@agm/core';
import { MeetingListProvider }        from '../../../providers/meeting-list/meeting-list';
import { TranslateService }           from '@ngx-translate/core';
import { InAppBrowser }               from '@ionic-native/in-app-browser';

declare const google: any;

@Component({
  templateUrl: 'map-search.html'
})

export class MapSearchComponent {

  timeDisplay        : string  = "";
  meetingList        : any     = [];
  loader                       = null;
  zoom               : number  = 8;
  mapLatitude        : any     =  35.000 ;
  mapLongitude       : any     = -80.879 ;
  autoRadius         : any;
  map                : any     = null ;
  mapBounds          : LatLngBounds;
  myLatLng           : LatLng;
  circleRadiusMeters : number  = 0 ;
  format             : any;

  @ViewChild('circle', {read: AgmCircle}) circle: AgmCircle;


  constructor(private MeetingListProvider : MeetingListProvider,
              public  loadingCtrl         : LoadingController,
              private geolocation         : Geolocation,
              private toastCtrl           : ToastController,
              private storage             : Storage,
              private translate           : TranslateService,
              private iab                 : InAppBrowser   ) {

  }

    previous;
    clickedMarker(infowindow) {
        if (this.previous) {
            this.previous.close();
        }
        this.previous = infowindow;
    }

    spiderIcon(event: any) {
        this.format = event;
        var marker = this.format.marker;
        var status = this.format.status;
        if (status == 'SPIDERFIABLE') {
            marker.icon = 'assets/img/marker-na-red.png';
        } else if (status == 'UNSPIDERFIABLE') {
            marker.icon = 'assets/img/marker-na.png';
        } else if (status == 'SPIDERFIED') {
            marker.icon = 'assets/img/marker-na-red.png';
        }
    }

  mapReady(event: any) {
    this.map = event;

    this.storage.get('timeDisplay')
    .then(timeDisplay => {
        if(timeDisplay) {
          this.timeDisplay = timeDisplay;
        } else {
          this.timeDisplay = "12hr";
        }
        this.storage.get('searchRange')
        .then(searchValue => {
            if(searchValue) {
              this.autoRadius = searchValue;
            } else {
              this.autoRadius = 25;
            }
          this.storage.get('savedLat').then(value => {
            if(value) {
              this.mapLatitude = value;
              this.storage.get('savedLng').then(value => {
                if(value) {
                  this.mapLongitude = value;

                  this.mapLatitude = parseFloat(this.mapLatitude);
                  this.mapLongitude = parseFloat(this.mapLongitude);
                  this.getMeetings();
                } else {
                  this.locatePhone();
                }
              });
            } else {
              this.locatePhone();
            }
          });
        });
      });
  }

  getMeetings(){
    this.translate.get('LOADINGMAP').subscribe(value => {this.presentLoader(value);})

    this.MeetingListProvider.getAutoRadiusMeetings(this.mapLatitude, this.mapLongitude, this.autoRadius).subscribe((data)=>{

      if (JSON.stringify(data) == "{}") {  // empty result set!
        this.meetingList = JSON.parse("[]");
      } else {
        this.meetingList  = data;
        this.meetingList  = this.meetingList.filter(meeting => meeting.latitude = parseFloat(meeting.latitude));
        this.meetingList  = this.meetingList.filter(meeting => meeting.longitude = parseFloat(meeting.longitude));
        this.meetingList.filter(i => i.start_time = this.convertTo12Hr(i.start_time));

      }

var i : any;
    var dist : number = 0;
    for (i = 0; i < this.meetingList.length - 1; i++) {
      if (parseFloat(this.meetingList[i].distance_in_km) > dist) {
        dist = parseFloat(this.meetingList[i].distance_in_km);
      }
      }
      this.dismissLoader();
      this.circleRadiusMeters = dist * 1000;
    });
  }

  public radiusChange() {
    var tempMapBounds = new google.maps.LatLngBounds();

    this.circle.getBounds().then( value => {

      tempMapBounds.extend(value.getNorthEast());
      tempMapBounds.extend(value.getSouthWest());

      this.mapBounds = tempMapBounds;
    });

  }

  markerDragEnd($event: MouseEvent) {

    this.mapLatitude = $event.coords.lat;
    this.mapLongitude = $event.coords.lng;
    this.mapLatitude = parseFloat(this.mapLatitude);
    this.mapLongitude = parseFloat(this.mapLongitude);
    this.getMeetings();
  }

  public openMapsLink(destLatitude, destLongitude) {
    const browser = this.iab.create('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude, '_system');

  }


  presentLoader(loaderText) {
    if (!this.loader) {
      this.loader = this.loadingCtrl.create({
        content: loaderText
      });
      this.loader.present();
    }
  }

  dismissLoader() {
    if(this.loader){
      this.loader.dismiss();
      this.loader = null;
    }
  }

  locatePhone() {
    this.translate.get('LOCATING').subscribe(
      value => {
        this.presentLoader(value);
      }
    )
    this.geolocation.getCurrentPosition({timeout: 5000}).then((resp) => {

      this.mapLatitude = resp.coords.latitude;
      this.mapLongitude = resp.coords.longitude;

      this.storage.set('savedLat', this.mapLatitude);
      this.storage.set('savedLng', this.mapLongitude);

      this.dismissLoader();
      this.getMeetings();
    }).catch((error) => {
      this.dismissLoader();
    });
  }

   public convertTo12Hr(timeString){
     if (this.timeDisplay == "12hr") {
       var H = +timeString.substr(0, 2);
       var h = H % 12 || 12;
       var ampm = (H < 12 || H === 24) ? " AM" : " PM";
       timeString = h + timeString.substr(2, 3) + ampm;
       return timeString;
     } else {
      return timeString.slice(0, -3);
     }
   }


}

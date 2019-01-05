import { Component }            from '@angular/core';
import { LoadingController }    from 'ionic-angular';
import { App, NavController }   from 'ionic-angular';
import { EventsProvider }       from "../../../providers/events/events";
import 'rxjs/add/operator/timeout';
import { TranslateService }     from '@ngx-translate/core';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html'
})

export class EventsComponent {

   events : string;
   loader = null;

  constructor ( private EventsProvider  : EventsProvider ,
                public loadingCtrl      : LoadingController,
                private translate       : TranslateService ) {
    // EventsComponent constructor
    this.translate.get('EVENTSLOADER').subscribe(
      value => {
        // value is our translated string
        this.presentLoader(value);
      }
    )
    this.getEvents();
  }

  getEvents(){
    this.EventsProvider
      .getEvents()
      .subscribe((data)=>{
          this.loader.dismiss();
          var elem = document.createElement('div');
          elem.innerHTML = data;
          var a = elem.getElementsByTagName("A");
          for(var i=0;i<a.length;i++)
			a[i].removeAttribute("href");
          var tmp = elem.getElementsByClassName("nerna-event");
          this.events= tmp[0].innerHTML;
        }
    );
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
}

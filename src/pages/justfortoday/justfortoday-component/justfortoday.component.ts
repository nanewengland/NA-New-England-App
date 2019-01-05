 import { Component }              from '@angular/core';
import { LoadingController }      from 'ionic-angular';
import { App, NavController }     from 'ionic-angular';
import { JftProvider }            from '../../../providers/jft/jft';
import 'rxjs/add/operator/timeout';
import { TranslateService }       from '@ngx-translate/core';

@Component({
  selector: 'page-justfortoday',
  templateUrl: 'justfortoday.html'
})

export class JustfortodayComponent {

   jft : string;
   loader = null;

  constructor ( private JftProvider   : JftProvider,
                public loadingCtrl    : LoadingController,
                private translate     : TranslateService ) {
    // JustForTodayComponent constructor
    this.translate.get('JFTLOAD').subscribe(
      value => {
        // value is our translated string
        this.presentLoader(value);
      }
    )
    this.getJFT();
  }

  getJFT(){
    this.JftProvider
      .getJFT()
      .subscribe((data)=>{
          this.jft = data;
          this.dismissLoader();
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

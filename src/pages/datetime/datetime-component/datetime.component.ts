import { Component }   from '@angular/core';
import { Storage }     from '@ionic/storage';
import   moment        from 'moment';

@Component({
  templateUrl: 'datetime.html'
})

export class DatetimeComponent {

  cleanDate               : any;
  momentCleanDate         : any;
  cleanTimeInDays         : any;
  cleanTimeInWeeks        : any;
  cleanTimeInMonths       : any;
  cleanTimeInYears        : any;
  cleanTimeHumanize       : any;

  constructor( private storage     : Storage  ) {
    this.cleanDate = moment().startOf('day').format();
  }

  ngOnInit() {
    this.storage.get('cleanDate')
    .then(value => {
        if(value) {
          this.cleanDate = moment(value).startOf('day').format();
        } else {
          console.log("ngOnInit: no storage :this.cleanDate", this.cleanDate);
        }
    });
  }

  getCleanTime(){
    this.momentCleanDate = moment(this.cleanDate).startOf('day');

    this.cleanTimeInDays   = moment().diff(this.momentCleanDate, 'days');
    this.cleanTimeInWeeks  = moment().diff(this.momentCleanDate, 'weeks');
    this.cleanTimeInMonths = moment().diff(this.momentCleanDate, 'months');
    this.cleanTimeInYears  = moment().diff(this.momentCleanDate, 'years');

    this.storage.set('cleanDate', this.cleanDate);
  }


}

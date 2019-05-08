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
  cleanTimeDateDiff       : any;
  intervals               : any;

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
    this.cleanTimeDateDiff = this.getCleanTimeDateDiff();
    this.storage.set('cleanDate', this.cleanDate);
  }

  getCleanTimeDateDiff() {
    var b = this.momentCleanDate,
        a = moment(),
        out = [];
        this.intervals = ['years','months','weeks','days'];
    for(var i=0; i < this.intervals.length; i++){
      var diff = a.diff(b, this.intervals[i]);
      b.add(diff, this.intervals[i]);
      out.push(diff + ' ' + this.intervals[i]);
    }
    return out.join(', ');
  };

}

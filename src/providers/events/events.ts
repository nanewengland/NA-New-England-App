import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EventsProvider {

  constructor(public http: HttpClient) {
  }

  getEventsUrl : string = "https://nerna.org/nerna_scripts/nernacal/nerna-events.php";

  getEvents() {
    var events = this.http.get(this.getEventsUrl, {responseType: 'text'});
    return events;
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EventsProvider {

  constructor(public http: HttpClient) {
  }

  getEventsUrl : string = "https://www.crna.org/crna_docs/crna-events.php";

  getEvents() {
    var events = this.http.get(this.getEventsUrl, {responseType: 'text'});
    return events;
  }

}

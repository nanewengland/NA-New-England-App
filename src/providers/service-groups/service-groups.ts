import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ServiceGroupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServiceGroupsProvider {

  constructor(public http: HttpClient) {
  }

  getApiUrlServiceGroups : string = "https://www.nerna.org/main_server/client_interface/json/?switcher=GetServiceBodies";

  getAllServiceGroups() {
    return this.http.get(this.getApiUrlServiceGroups);
  }





}

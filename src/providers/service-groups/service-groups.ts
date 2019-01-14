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

  getApiUrlServiceGroups : string = "https://crna.org/crna_docs/serviceBodies.php";

  getAllServiceGroups() {
    return this.http.get(this.getApiUrlServiceGroups);
  }





}

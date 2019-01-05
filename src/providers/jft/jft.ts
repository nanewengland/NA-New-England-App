import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class JftProvider {

  constructor(public http: HttpClient) {
  }

  getJFTUrl : string = "http://www.jftna.org/jft/";

  getJFT() {
    var JFT = this.http.get(this.getJFTUrl, {responseType: 'text'});
    return JFT;
  }

}

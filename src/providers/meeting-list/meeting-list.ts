import { HttpClient  } from '@angular/common/http';
import { Injectable }  from '@angular/core';

@Injectable()
export class MeetingListProvider {

  meetings : any;
  italiaBMLT : any = "https://www.nerna.org/main_server/client_interface/json/";
  tomatoBMLT : string = "https://tomato.na-bmlt.org/main_server/client_interface/json/";

  constructor(public http: HttpClient) {
  }

    getApiUrl : string = this.italiaBMLT + "?switcher=GetSearchResults&services[]=2&services[]=1&services[]=3&services[]=4&services[]=6&services[]=7&services[]=8&services[]=9&services[]=10&services[]=11&services[]=12&services[]=13&services[]=14&services[]=15&sort_keys=longitude,latitude";

    getAllItalianMeetings() {
        return this.http.get(this.getApiUrl);
    }

    getCircleMeetings(lat, long, radius) {
        var getApiUrlCircleMap : string = this.italiaBMLT + "?switcher=GetSearchResults&services[]=2&services[]=1&services[]=3&services[]=4&services[]=6&services[]=7&services[]=8&services[]=9&services[]=10&services[]=11&services[]=12&services[]=13&services[]=14&services[]=15&geo_width_km=" + radius + "&long_val=" + long + "&lat_val=" + lat + "&sort_keys=longitude,latitude&callingApp=na-italia.org";

        return this.http.get(getApiUrlCircleMap);
    }

  getAutoRadiusMeetings(lat, long, radius) {
    var getAutoRadiusMeetingsURL : string = this.tomatoBMLT
                                      + "?switcher=GetSearchResults&geo_width_km="
                                      + "-"
                                      + radius
                                      + "&long_val="
                                      + long
                                      + "&lat_val="
                                      + lat
                                      + "&sort_keys=longitude,latitude&callingApp=ionic-bmltapp";
    return this.http.get(getAutoRadiusMeetingsURL);
  }

  getAddressMeetings(lat, long, radius) {
    var getAddressMeetingsURL : string = this.tomatoBMLT
                                      + "?switcher=GetSearchResults&geo_width_km="
                                      + "-"
                                      + radius
                                      + "&long_val="
                                      + long
                                      + "&lat_val="
                                      + lat
                                      + "&sort_keys=longitude,latitude&callingApp=ionic-bmltapp";
    return this.http.get(getAddressMeetingsURL);
  }

  getNearestMeeting(lat, long) {
    var getAddressMeetingsURL : string = this.tomatoBMLT
                                      + "?switcher=GetSearchResults&geo_width_km="
                                      + "-1"
                                      + "&long_val="
                                      + long
                                      + "&lat_val="
                                      + lat
                                      + "&sort_keys=longitude,latitude&callingApp=ionic-bmltapp";
    return this.http.get(getAddressMeetingsURL);
  }

  getMeetingsByAreaProvider(areaID) {
    var getMeetingsByAreaURL : string = this.tomatoBMLT
                                      + "?switcher=GetSearchResults&services="
                                      + areaID
                                      + "&sort_keys=weekday_tinyint,start_time&callingApp=ionic-bmltapp";
    return this.http.get(getMeetingsByAreaURL);

  }

}

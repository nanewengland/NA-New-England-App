import { Component }              from '@angular/core';
import { Platform }               from 'ionic-angular';
import { Storage }               from '@ionic/storage';
import { MeetingListProvider }    from '../../../providers/meeting-list/meeting-list';
import { ServiceGroupsProvider }  from '../../../providers/service-groups/service-groups';
import { TranslateService }       from '@ngx-translate/core';
import { LoadingController }      from 'ionic-angular';
import { firstBy }                from 'thenby';

@Component({
    selector: 'page-meetinglist',
    templateUrl: 'meetinglist.html'
})
export class MeetinglistComponent {

    meetingList               : any;
    meetingListArea           : any;
    meetingListCity           : any;
    meetingsListAreaGrouping  : string;
    meetingsListCityGrouping  : string;
    shownGroup                            = null;
    loader                                = null;
    serviceGroupNames         : any;
    HTMLGrouping              : any;
    timeDisplay               : string  = "";

    constructor ( private MeetingListProvider   : MeetingListProvider,
                  private ServiceGroupsProvider : ServiceGroupsProvider,
                  private storage               : Storage,
                  public loadingCtrl            : LoadingController,
                  public plt                    : Platform,
                  private translate             : TranslateService )
    {
        // MeetiningListComponent constructor
        this.translate.get('LOADINGMEETINGS').subscribe(
            value => {
                // value is our translated string
                this.presentLoader(value);
            }
        )

        this.storage.get('timeDisplay')
            .then(timeDisplay => {
                if (timeDisplay) {
                    this.timeDisplay = timeDisplay;
                } else {
                    this.timeDisplay = "12hr";
                }
            });
        this.HTMLGrouping = "area";
        this.loader.present();
        this.meetingsListAreaGrouping = 'service_body_bigint';
        this.meetingsListCityGrouping = 'location_sub_province';
        this.getServiceGroupNames();
    }

// TODO:
    public openMapsLink(destLatitude, destLongitude) {
        // ios
        if (this.plt.is('ios')) {
            window.open('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude + ')', '_system');
        };
        // android
        if (this.plt.is('android')) {
            window.open('https://www.google.com/maps/search/?api=1&query=' + destLatitude + ',' + destLongitude + ')', '_system');
        };
    }

    getServiceGroupNames() {
        this.ServiceGroupsProvider.getAllServiceGroups().subscribe((serviceGroupData)=>{
            this.serviceGroupNames = serviceGroupData;
            this.getAllMeetings();
        });
    }

    getServiceNameFromID(id) {
        var obj = this.serviceGroupNames.find(function (obj) { return obj.id === id; });
        return obj.name;
    }

    getAllMeetings(){
        this.MeetingListProvider.getAllItalianMeetings().subscribe((data)=>{
            this.meetingList = data;
            this.meetingList = this.meetingList.filter(meeting => meeting.service_body_bigint = this.getServiceNameFromID(meeting.service_body_bigint));



            this.meetingListArea = this.meetingList.concat();
            this.meetingListArea.filter(i => i.start_time_set = this.convertTo12Hr(i.start_time));
            this.meetingListArea.sort((a, b) => a.service_body_bigint.localeCompare(b.service_body_bigint));
            this.meetingListArea = this.groupMeetingList(this.meetingListArea, this.meetingsListAreaGrouping);
            for (var i = 0; i < this.meetingListArea.length; i++) {
                this.meetingListArea[i].sort(
                    firstBy("weekday_tinyint")
                        .thenBy("start_time")
                );
            }

            this.meetingListCity = this.meetingList.concat();
            this.meetingListCity.filter(i => i.start_time_set = this.convertTo12Hr(i.start_time));
            this.meetingListCity.sort((a, b) => a.location_sub_province.localeCompare(b.location_sub_province));
            this.meetingListCity = this.groupMeetingList(this.meetingListCity, this.meetingsListCityGrouping);
            for (var i = 0; i < this.meetingListCity.length; i++) {
                this.meetingListCity[i].sort(
                    firstBy("weekday_tinyint")
                        .thenBy("start_time")
                );
            }

            this.dismissLoader();
        });
    }

    groupMeetingList(meetingList, groupingOption) {
        // A function to convert a flat json list to an javascript array
        var groupJSONList = function(inputArray, key) {
            return inputArray.reduce(function(ouputArray, currentValue) {
                (ouputArray[currentValue[key]] = ouputArray[currentValue[key]] || []).push(currentValue);
                return ouputArray;
            }, {});
        };


        // Convert the flat json to an array grouped by and indexed by the meetingsListGroupingOne field,
        var groupedByGroupingOne = groupJSONList( meetingList, groupingOption);

        // Make the array a proper javascript array, index by number
        var groupedByGroupingOneAsArray = Object.keys(groupedByGroupingOne).map(function(key) {
            return groupedByGroupingOne[key];
        });

        meetingList = groupedByGroupingOneAsArray;
        return meetingList;
    }

    toggleGroup(group) {
        if (this.isGroupShown(group)) {
            this.shownGroup = null;
        } else {
            this.shownGroup = group;
        }
    };

    isGroupShown(group) {
        return this.shownGroup === group;
    };

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

    public convertTo12Hr(timeString){
        if (this.timeDisplay == "12hr") {
            var H = +timeString.substr(0, 2);
            var h = H % 12 || 12;
            var ampm = (H < 12 || H === 24) ? " AM" : " PM";
            timeString = h + timeString.substr(2, 3) + ampm;
            return timeString;
        } else {
            return timeString.slice(0, -3);
        }
    }

}

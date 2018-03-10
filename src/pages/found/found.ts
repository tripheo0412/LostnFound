import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";

/**
 * Generated class for the FoundPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-found',
  templateUrl: 'found.html',
})
export class FoundPage {
  lnf: string;
  type: string;
  location: string;
  dayTo: string;
  monthTo: string;
  yearTo: string;
  dayFrom: string;
  monthFrom: string;
  yearFrom: string;
  leap: boolean;
  checkFeb: boolean;
  check30: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public media: MediaProvider) {
    this.type = 'phone';
    this.location = 'Helsinki';
    this.monthFrom = '01';
    this.monthTo = '01';
    this.dayTo = '01';
    this.dayFrom = '01';
    this.yearTo = '1989';
    this.yearFrom = '1989';
    this.leap = false;
    this.checkFeb = false;
    this.check30 = false;
  }

  monthChangeFrom(val: any) {
    this.monthFrom = val;
    if (val == '02') {
      this.checkFeb = true;
    } else if (val == '04' || val == '06' || val == '09' || val == '11') {
      this.check30 = true;
      this.checkFeb = false;
    } else {
      this.checkFeb = false;
      this.check30 = false;
    }
    console.log('Month Change:', val, this.checkFeb,this.check30);
  }

  dayChangeFrom(val: any) {
    this.dayFrom = val;
    console.log('Day Change:', val);
  }

  yearChangeFrom(val: any) {
    this.yearFrom = val;
    if ((((val % 4 == 0) && (val % 100 != 0)) || (val % 400 == 0)) && this.monthFrom == '02') {
      this.leap = true;
    }else {
      this.leap = false;
    }
    console.log('Year Change:', val, this.checkFeb,this.check30,this.leap);
  }

  monthChangeTo(val: any) {
    this.monthTo = val;
    if (val == '02') {
      this.checkFeb = true;
    } else if (val == '04' || val == '06' || val == '09' || val == '11') {
      this.check30 = true;
      this.checkFeb = false;
    } else {
      this.checkFeb = false;
      this.check30 = false;
    }
    console.log('Month Change:', val, this.checkFeb,this.check30);
  }

  dayChangeTo(val: any) {
    this.dayTo = val;
    console.log('Day Change:', val);
  }

  yearChangeTo(val: any) {
    this.yearTo = val;
    if ((((val % 4 == 0) && (val % 100 != 0)) || (val % 400 == 0)) && this.monthFrom == '02') {
      this.leap = true;
    }else {
      this.leap = false;
    }
    console.log('Year Change:', val, this.checkFeb,this.check30,this.leap);
  }

  check29() {
    if (this.checkFeb) {
      if (this.leap) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  found(){
    let id = [];
    let title = '#$%^lnf*typemedia*categorylost*type'
      +this.type
      +'*location'
      +this.location;
    console.log(title);
    let seq = this.media.searchFile('#$%^lnf*typemedia*categorylost*type'
      +this.type
      +'*location'
      +this.location);
    seq.subscribe((resp: any) => {
      console.log(resp.length);
      if (resp.length == 0){
        //danh cho upload
      } else {
        for (let i = 0; i < resp.length; i++){
          let startyear = resp[i].title.indexOf("yearfromstart") + 13;
          let endyear = resp[i].title.indexOf("yearfromend");
          let year = resp[i].title.substring(startyear,endyear).replace('*','');
          if (Number(this.yearTo) >= Number(year.substr(0,4))){
            if (Number(this.yearFrom) <= Number(year.substr(4,4))){
              id[i] = resp[i].file_id;
              console.log(id[i]);
            }
          }
        }
      }
    });
  }

  lost() {
    this.media.searchFile('#$%^lnf#$%^media#$%^');
  }
  addItemTest() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundPage');
  }


}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lost',
  templateUrl: 'lost.html',
})
export class LostPage {

  type: string;
  location: string;
  day: string;
  month: string;
  leap: boolean;
  checkFeb: boolean;
  check30: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.type = 'phone';
    this.location = 'hel';
    this.leap = false;
    this.checkFeb = false;
    this.check30 = false;
  }

  monthChange(val: any) {
    this.month = val;
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
  dayChange(val: any) {
    console.log('Day Change:', val);
  }
  yearChange(val: any) {
    if ((((val % 4 == 0) && (val % 100 != 0)) || (val % 400 == 0)) && this.month == '02') {
      this.leap = true;
    }else {
      this.leap = false;
    }
    console.log('Year Change:', val, this.checkFeb,this.check30,this.leap);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LostPage');
  }

}

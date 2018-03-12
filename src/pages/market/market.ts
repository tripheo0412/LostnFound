import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../providers/user/user";
import { DatePipe } from "@angular/common";
import {MarketProvider} from "../../providers/market/market";


@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
  providers: [DatePipe]
})
export class MarketPage {
  marketitems = [];
  fileid = [];
  name: any;
  profile: any;
  image: any;
  time: any;
  content: any;
  constructor(public navCtrl: NavController,
              public media: MediaProvider,
              public navPam: NavParams,
              public user: User,
              public pipe: DatePipe,
              public market: MarketProvider) {
    this.media.searchFile('#$%^lnf*catmedia*categoryfound*').toPromise().then((resp: any) => {
      for (let i=0;i< resp.length;i++){
        let start = resp[i].title.indexOf('*yearto')-4;
        let year = resp[i].title.substr(start,4);
        console.log(year);
        if ((2018 - Number(year)) > 1) {
          this.fileid.push(resp[i].file_id);
        }
      }
      console.log(this.fileid);
      this.marketitems = this.market.input(this.fileid);
      console.log(this.marketitems);
    })

  }
}

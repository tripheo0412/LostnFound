import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../providers/user/user";
import { DatePipe } from "@angular/common";


@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
  providers: [DatePipe]
})
export class CardsPage {
  cardItems = [];
  name: any;
  profile: any;
  image: any;
  time: any;
  content: any;
  constructor(public navCtrl: NavController,
              public media: MediaProvider,
              public navPam: NavParams,
              public user: User,
              public pipe: DatePipe) {
    let fileId = this.navPam.get('param1');
    fileId = fileId.filter(item => item !== null);
    console.log(fileId);
    


  }
}

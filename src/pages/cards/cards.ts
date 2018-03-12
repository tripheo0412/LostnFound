import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../providers/user/user";
import { DatePipe } from "@angular/common";
import {CardProvider} from "../../providers/card/card";


@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html',
  providers: [DatePipe]
})
export class CardsPage {
  carditem = [];
  reset = [];
  fileId = [];
  constructor(public navCtrl: NavController,
              public media: MediaProvider,
              public navPam: NavParams,
              public user: User,
              public pipe: DatePipe,
              public card: CardProvider,
              ) {
    this.fileId = this.navPam.get('param1');
    this.fileId = this.fileId.filter(item => item !== null);
    console.log(this.fileId);
    this.carditem = card.input(this.fileId);


  }
  ionViewDidLeave() {

    this.carditem = this.reset;
    console.log(this.carditem);
  }

}

import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../providers/user/user";
import { DatePipe } from "@angular/common";


@IonicPage()
@Component({
  selector: 'page-market',
  templateUrl: 'market.html',
  providers: [DatePipe]
})
export class MarketPage {
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
    for (let i = 0; i < fileId.length; i++){
      console.log(localStorage.getItem('token'));
      this.media.requestFile(fileId[i]).toPromise().then((resp0: any) => {
        this.time = this.pipe.transform(resp0.time_added, 'dd:MM:yy') ;
        this.image = 'http://media.mw.metropolia.fi/wbma/uploads/'+resp0.filename;
        this.content = resp0.description;
        console.log(resp0.user_id);
        this.user.getUser(resp0.user_id).toPromise().then ((resp1: any) => {
          this.name = resp1.username;
          console.log(resp1.user_id);
          this.media.searchFile('#$%^lnf#$%^profile#$%^'+resp1.user_id).toPromise().then((resp2: any) => {
            this.profile = 'http://media.mw.metropolia.fi/wbma/uploads/'+resp2[0].filename;
            console.log(this.time);
            console.log(this.content);
            console.log(this.profile);
            console.log(this.image);
            console.log(this.name);
            this.cardItems[i] = {
              user: {
                avatar: this.profile,
                name: this.name
              },

              date: this.time,
              image: this.image,
              content: this.content

            }
          })
        })
      })

    }
  }
}

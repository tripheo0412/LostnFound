import {Component, Injector} from '@angular/core';
import {IonicPage,  NavParams, ViewController} from 'ionic-angular';
import {CallNumber} from "@ionic-native/call-number";

/**
 * Generated class for the CardModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-card-modal',
  templateUrl: 'card-modal.html',
})
export class CardModalPage {
  phone = this.navParams.get('phone');
  image = this.navParams.get('image');
  type = this.navParams.get('type');
  location = this.navParams.get('location');
  content  = this.navParams.get('content');
  datefrom = this.navParams.get('datefrom');
  dateto = this.navParams.get('dateto');
  src = this.navParams.get('src');
  constructor(private callNumber: CallNumber,public injector: Injector, public navParams: NavParams, public viewCtrl: ViewController) {

  }

  get navParam(): NavParams {
    return this.injector.get(NavParams);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  call(phone){
    this.callNumber.callNumber(phone, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  gender: string;
  gaming: string;
  toppings: Array<string>;
  petAlertOpts: any;
  petData: any;
  pets: Array<string>;
  hairColorData: any;
  hairColor: any;
  skittlesData: any;
  skittles: Array<any>;
  notifications: string = 'mute_1';
  rating: number = 2;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.gender = 'f';
    this.gaming = 'n64';

    this.petAlertOpts = {
      title: 'Like Pets?',
      subTitle: 'Select your favorite'
    };

    this.toppings = ['bacon', 'xcheese'];

    this.petData = [
      { text: 'Bird', value: 'bird' },
      { text: 'Cat', value: 'cat' },
      { text: 'Dog', value: 'dog' },
      { text: 'Honey Badger', value: 'honeybadger' },
    ];

    this.hairColorData = [
      { text: 'Brown', value: 'brown' },
      { text: 'Blonde', value: 'blonde' },
      { text: 'Black', value: 'black' },
      { text: 'Red', value: 'red' }
    ];

    // Pre-selected object with different object reference
    this.hairColor = { text: 'Brown', value: 'brown' };

    this.skittlesData = [
      { text: 'Red', value: 'red' },
      { text: 'Orange', value: 'orange' },
      { text: 'Yellow', value: 'yellow' },
      { text: 'Green', value: 'green' },
      { text: 'Purple', value: 'purple' }
    ];

    // Pre-selected object with different object reference
    this.skittles = [
      { text: 'Red', value: 'red' },
      { text: 'Purple', value: 'purple' }
    ];

    this.pets = ['cat', 'dog'];
  }

  compareFn(option1: any, option2: any) {
    return option1.value === option2.value;
  }

  monthChange(val: any) {
    console.log('Month Change:', val);
  }

  yearChange(val: any) {
    console.log('Year Change:', val);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundPage');
  }

}

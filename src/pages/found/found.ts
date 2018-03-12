import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {Camera} from "@ionic-native/camera";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ItemCreatePage} from "../item-create/item-create";

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
  @ViewChild('fileInput') fileInput;

  file: File;

  isReadyToSave: boolean;

  imageURI:any;

  item: any;
  public foundId = [];
  public lostId = [];
  form: FormGroup;
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
              public media: MediaProvider,
              public camera: Camera,
              public formBuilder: FormBuilder,
              public toastCtrl: ToastController)   {
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
    this.form = formBuilder.group({
      profilePic: [''],
      name: ['', Validators.required],
      about: ['']
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
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
    if (((val % 4 == 0) && (val % 100 != 0)) || (val % 400 == 0)) {
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
    if (((val % 4 == 0) && (val % 100 != 0)) || (val % 400 == 0)) {
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

  retFound(title) {
    if (this.foundId.length == 0){
      this.navCtrl.push('ItemCreatePage',{
        param1: title
      });
      let toast = this.toastCtrl.create({
        message: `
          Please upload image of founded and write a brief description.
        `,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      this.navCtrl.push('CardsPage',{
        param1: this.foundId
      });
      let toast = this.toastCtrl.create({
        message: `
          Woohoo there are some matching items \n
          Take a look !
        `,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  found(){
    let foundId = [];
    let foundTitle = '#$%^lnf*typemedia*categoryfound*type'
      +this.type
      +'*location'
      +this.location
      +'*yearfrom'
      +this.yearFrom
      +'*'+this.yearTo
      +'*yearto*monthfrom'
      +this.monthFrom
      +'*'+this.monthTo
      +'*monthto*dayfrom'
      +this.dayFrom
      +'*'+this.dayTo
      +'dayto'
    ;
    console.log(foundTitle);
    let seq = this.media.searchFile('#$%^lnf*typemedia*categorylost*type'
      +this.type
      +'*location'
      +this.location);
    seq.toPromise().then((resp: any) => {
      console.log(resp.length);
      if (resp.length == 0){
        this.navCtrl.push('ItemCreatePage',{
          param1: foundTitle
        });
        let toast = this.toastCtrl.create({
          message: `
          Please upload image of founded and write a brief description.
        `,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      } else {
        for (let i = 0; i < resp.length; i++){
          let startyear = resp[i].title.indexOf("yearfrom") + 8;
          let endyear = resp[i].title.indexOf("yearto");
          let year = resp[i].title.substring(startyear,endyear).replace('*','');
          if (Number(this.yearTo) == Number(year.substr(0,4))){
              let startmonth = resp[i].title.indexOf("monthfrom") + 9;
              let endmonth = resp[i].title.indexOf("monthto");
              let month = resp[i].title.substring(startmonth,endmonth).replace('*','');
              if (Number(this.monthTo) == Number(month.substr(0,2))){
                  let startday = resp[i].title.indexOf("dayfrom") + 7;
                  let endday = resp[i].title.indexOf("dayto");
                  let day = resp[i].title.substring(startday,endday).replace('*','');
                  if (Number(this.dayTo) >= Number(day.substr(0,2))){
                    foundId[i] =resp[i].file_id;
                      console.log(foundId[i]);
                  }
              } else if (Number(this.monthTo) > Number(month.substr(0,2))) {
                foundId[i] = resp[i].file_id;
                console.log(foundId[i]);
              }
          } else if (Number(this.yearTo) > Number(year.substr(0,4))) {
            foundId[i] = resp[i].file_id;
            console.log(foundId[i]);
          }
        }
        this.foundId = foundId;
        this.retFound(foundTitle);
      }
    });
  }
  retLost(title){
    console.log(this.lostId.length)
    if (this.lostId.length == 0){
      this.navCtrl.push('ItemCreatePage',{
        param1: title
      });
      let toast = this.toastCtrl.create({
        message: "Unfortunately, your item has not been found yet. Please upload your image and write a brief description."
        ,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      this.navCtrl.push('CardsPage',{
        param1: this.lostId
      });
      let toast = this.toastCtrl.create({
        message: `
          Woohoo there are some matching items
          Take a look !
        `,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }
  lost() {
    let lostId =[];
    let lostTitle = '#$%^lnf*typemedia*categorylost*type'
      +this.type
      +'*location'
      +this.location
      +'*yearfrom'
      +this.yearFrom
      +'*'+this.yearTo
      +'*yearto*monthfrom'
      +this.monthFrom
      +'*'+this.monthTo
      +'*monthto*dayfrom'
      +this.dayFrom
      +'*'+this.dayTo
      +'dayto'
    ;
    let seq = this.media.searchFile('#$%^lnf*typemedia*categoryfound*type'
      +this.type
      +'*location'
      +this.location);
    seq.toPromise().then((resp: any) => {
      console.log(resp.length);
      if (resp.length == 0){
        this.navCtrl.push('ItemCreatePage',{
          param1: lostTitle
        });
        let toast = this.toastCtrl.create({
          message: "Unfortunately, your item has not been found yet. Please upload your image and write a brief description."
          ,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      } else {
        for (let i = 0; i < resp.length; i++){
          let startyear = resp[i].title.indexOf("yearfrom") + 8;
          let endyear = resp[i].title.indexOf("yearto");
          let year = resp[i].title.substring(startyear,endyear).replace('*','');
          if (Number(this.yearFrom) == Number(year.substr(4,4))){
            console.log('nam bang');
            let startmonth = resp[i].title.indexOf("monthfrom") + 9;
            let endmonth = resp[i].title.indexOf("monthto");
            let month = resp[i].title.substring(startmonth,endmonth).replace('*','');
            if (Number(this.monthFrom) == Number(month.substr(2,2))){
              console.log('thang bang');
              let startday = resp[i].title.indexOf("dayfrom") + 7;
              let endday = resp[i].title.indexOf("dayto");
              let day = resp[i].title.substring(startday,endday).replace('*','');
              if (Number(this.dayFrom) <= Number(day.substr(2,2))){
                console.log('no bang ma');
                lostId[i] =resp[i].file_id;
                console.log(lostId[i]);
              }
            } else if (Number(this.monthFrom) < Number(month.substr(2,2))) {
              console.log('thang ko bang');
              lostId[i] = resp[i].file_id;
              console.log(lostId[i]);
            }
          } else if (Number(this.yearFrom) < Number(year.substr(4,4))) {
            console.log('nam ko bang');
            lostId[i] = resp[i].file_id;
            console.log(lostId[i]);
          }

        }
        console.log(this.lostId.length);
        this.lostId = lostId;
        this.retLost(lostTitle);
      }
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundPage');
  }
  openCity(evt, cityName){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }
}

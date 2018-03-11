import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {MediaProvider} from "../../providers/media/media";
import {Camera} from "@ionic-native/camera";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
              public formBuilder: FormBuilder)   {
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
    let foundId = [];
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
      }
    });
    return foundId;
  }

  lost() {
    let lostId = [];
    let seq = this.media.searchFile('#$%^lnf*typemedia*categoryfound*type'
      +this.type
      +'*location'
      +this.location);
    seq.subscribe((resp: any) => {
      console.log(resp.length);
      if (resp.length == 0){
        //danh cho upload
      } else {
        for (let i = 0; i < resp.length; i++){
          let startyear = resp[i].title.indexOf("yearfrom") + 8;
          let endyear = resp[i].title.indexOf("yearto");
          let year = resp[i].title.substring(startyear,endyear).replace('*','');
          if (Number(this.yearFrom) == Number(year.substr(4,4))){
            let startmonth = resp[i].title.indexOf("monthfrom") + 9;
            let endmonth = resp[i].title.indexOf("monthto");
            let month = resp[i].title.substring(startmonth,endmonth).replace('*','');
            if (Number(this.monthFrom) == Number(month.substr(2,2))){
              let startday = resp[i].title.indexOf("dayfrom") + 7;
              let endday = resp[i].title.indexOf("dayto");
              let day = resp[i].title.substring(startday,endday).replace('*','');
              if (Number(this.dayFrom) <= Number(day.substr(2,2))){
                lostId[i] =resp[i].file_id;
                console.log(lostId[i]);
              }
            } else if (Number(this.monthFrom) < Number(month.substr(2,2))) {
              lostId[i] = resp[i].file_id;
              console.log(lostId[i]);
            }
          } else if (Number(this.yearFrom) < Number(year.substr(4,4))) {
            lostId[i] = resp[i].file_id;
            console.log(lostId[i]);
          }
        }
      }
    });
    return lostId;
  }
  addItemTest() {

  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        quality:100
      }).then((data) => {
        this.imageURI = data;
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {

      console.log('initiated');
      this.fileInput.nativeElement.click();
      console.log('sucess');
    }
  }

  processWebImage(event: any) {
    this.file = event.target.files[0];
    console.log(event.target.files[0]);
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  done() {
    if (!this.form.valid) { return; }
    console.log(this.file);
    const body: FormData = new FormData();
    body.append('file',this.file);
    body.append('title',this.form.value.name);
    this.media.uploadFile(body);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoundPage');
  }


}

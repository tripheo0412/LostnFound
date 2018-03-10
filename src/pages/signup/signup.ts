import {Component, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IonicPage, NavController, ToastController, ViewController} from 'ionic-angular';

import {User} from '../../providers/providers';
import {MainPage} from '../pages';
import {Camera} from "@ionic-native/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MediaProvider} from "../../providers/media/media";
import {WelcomePage} from "../welcome/welcome";
import {LoginPage} from "../login/login";
import {HttpHeaders} from "@angular/common/http";
import {Api} from "../../providers/api/api";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string, email: string } = {
    username: 'Test Human',
    password: 'test',
    email: 'test@example.com'
  };
  @ViewChild('fileInput') fileInput;

  promises = [];

  private loginErrorString: string;

  user_id: any;

  file: File;

  isReadyToSave: boolean;

  imageURI: any;

  item: any;

  form: FormGroup;

  // Our translated text strings
  private signupErrorString: string;

  constructor(public navCtrl: NavController,
              public api: Api,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService, public viewCtrl: ViewController, formBuilder: FormBuilder, public camera: Camera, public media: MediaProvider) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    })
    ////////////////
    this.form = formBuilder.group({
      profilePic: [''],
    });

    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
  }


  ///////////////////////
  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        quality: 100
      }).then((data) => {
        this.imageURI = data;
        this.form.patchValue({'profilePic': 'data:image/jpg;base64,' + data});
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
      this.form.patchValue({'profilePic': imageData});
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    return 'url(' + this.form.controls['profilePic'].value + ')'
  }

  /**
   * The user is done and wants to create the item, so return it
   * back to the presenter.
   */


  done() {
    console.log(this.file);
    const body: FormData = new FormData();
    body.append('file', this.file);
    body.append('title', '#$%^lnf#$%^profile#$%^' + this.user_id);
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }
    this.api.settings = settings;
    this.media.uploadFile(body);
    this.navCtrl.push(MainPage);

  }

  test() {
    this.user.signup(this.account).toPromise().then(response => {
      this.user.login(this.account).toPromise().then(response1 =>{
        this.done();
      })
    })
  }


  doSignup() {
    // Attempt to login in through our User service

    this.user.signup(this.account).subscribe((resp: any) => {
      console.log(resp.user_id);
      this.user_id = resp.user_id;
      console.log((this.user_id));
      this.user.login(this.account).subscribe((data: any)=> {
        this.done();
      });

    }, (err) => {

      this.navCtrl.push(WelcomePage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}

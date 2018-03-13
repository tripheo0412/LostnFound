import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import {WelcomePage} from "../welcome/welcome";
import {Api} from "../../providers/api/api";
import {MediaProvider} from "../../providers/media/media";
import { Facebook} from '@ionic-native/facebook';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  isLoggedIn:boolean = false;
  users: any;
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              public api: Api,
              public media: MediaProvider,
              private fb: Facebook) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
    fb.getLoginStatus()
    .then(res => {
      console.log(res.status);
      if(res.status === "connect") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log(e));
  }
  fblogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      console.log(res);
      if(res.status === "connected") {

        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
        console.log(this.getUserDetail(res.authResponse.userID));
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }
  fblogout() {
    this.fb.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
  }
  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
    .then(res => {
      console.log(res);
      this.users = res;
      let account = {
        username: res.name,
        email: res.email,
        password: res.email
      }
      this.api.get('http://media.mw.metropolia.fi/wbma/users/username/'+res.name).toPromise().then((resp: any) => {
        if (resp.available == true){
          this.user.signup(account).toPromise().then(response => {
            console.log(response);
            this.user.login(account).toPromise().then((response1: any) =>{
              console.log(response1.user.user_id)
              console.log(this.users.picture);
              const body: FormData = new FormData();
              body.append('file', this.users.picture);
              body.append('title', '#$%^lnf#$%^profile#$%^' + response1.user.user_id+'*phone0449209829');
              this.media.uploadFile(body);
              this.navCtrl.push(MainPage);
            })
          }, (err) => {
            this.navCtrl.push(WelcomePage);
            // Unable to sign up
            let toast = this.toastCtrl.create({
              message: 'Error try again',
              duration: 3000,
              position: 'top'
            });
            toast.present();
          })
        } else {
          this.user.login(account).subscribe((resp) => {
            this.navCtrl.push(MainPage);
          }, (err) => {
            this.navCtrl.push('WelcomePage');
            // Unable to log in
            let toast = this.toastCtrl.create({
              message: this.loginErrorString,
              duration: 3000,
              position: 'top'
            });
            toast.present();
          });
        }
      })

    })
    .catch(e => {
      console.log(e);
    });
  }



  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      this.navCtrl.push('WelcomePage');
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  navSignup(){
    this.navCtrl.push('SignupPage');
  }
}

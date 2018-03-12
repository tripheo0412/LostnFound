import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { User } from '../../providers/providers';
import { MainPage } from '../pages';
import {WelcomePage} from "../welcome/welcome";
import {Api} from "../../providers/api/api";
import {MediaProvider} from "../../providers/media/media";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };
  isLoggedIn:boolean = false;
  users: any;
  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              private fb: Facebook,
              public api: Api,
              public media: MediaProvider) {

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
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
          this.navCtrl.push('MainPage');
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
        this.api.get('users/username/'+this.users.name).toPromise().then((resp: any) => {
          if (resp.available == true) {
            let account = {
              username: this.users.name,
              password: this.users.name+'facebook',
              email: this.users.email
            }
            this.user.signup(account).toPromise().then((resp: any) => {
              this.user.login(account).toPromise().then((resp: any) => {
                const body: FormData = new FormData();
                body.append('file', this.users.picture.data);
                body.append('title', '#$%^lnf#$%^profile#$%^' + resp.user.user_id);
                this.media.uploadFile(body);
              })

            })
          } else {
            let account = {
              username: this.users.name,
              password: this.users.name+'facebook'
            }
            this.user.login(account).toPromise().then((resp: any) => {
              console.log(resp);
            })
          }
        })
      })
      .catch(e => {
        console.log(e);
      });
  }

  fblogout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.navCtrl.push('MainPage');
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

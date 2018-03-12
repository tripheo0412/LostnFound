import {HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';
import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { HttpModule } from '@angular/http';


/*
  Generated class for the CardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardProvider {
  finish = [];
  done: boolean;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  constructor(public http: HttpClient, public mod: HttpModule) {
    console.log('Hello CardProvider Provider');
    this.done =false;
  }

  drawCard(id) {
    const settings = {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    };
    let promise = new Promise((resolve, reject) => {
      let drawCard: any;
      this.http.get(this.apiUrl+/media/+id,settings).toPromise().then((resp: any) => {
        let image = this.mediaUrl+resp.filename;
        let content = resp.description;
        let time = resp.time_added;
        this.http.get(this.apiUrl+'/users/'+resp.user_id,settings).toPromise().then((resp: any) => {
          let name = resp.username;
          let body = {
            title: '#$%^lnf#$%^profile#$%^'+resp.user_id
          }
          this.http.post(this.apiUrl+'/media/search/',body,settings).toPromise().then((resp: any) => {
            let avatar: string;
            for (let i = 0; i< resp.length; i++){
              if (resp[i].length != 0 ){
                avatar = this.mediaUrl+resp[i].filename;
              }
              avatar = avatar;
            }
            drawCard = {
              name: name,
              avatar: avatar,
              date: time,
              image: image,
              content: content
            }
            console.log(drawCard);
            this.finish.push(drawCard);
            resolve();
          })
        })
      })
    })
    return promise;
    }


    input(fileid = []){
      for (let i =0; i< fileid.length; i++){
        this.drawCard(fileid[i])
      }
      return this.finish;
    }
}

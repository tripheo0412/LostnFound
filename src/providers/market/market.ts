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
export class MarketProvider {
  finish = [];
  done: boolean;
  apiUrl = 'http://media.mw.metropolia.fi/wbma';
  mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
  constructor(public http: HttpClient, public mod: HttpModule) {
    console.log('HelloMarketProvider Provider');
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
        let start = resp.title.indexOf('type') + 4;
        let end = resp.title.indexOf('*location');
        let type = resp.title.slice(start,end);
        let start1 = resp.title.indexOf('location') + 8;
        let end1 = resp.title.indexOf('*year');
        let location = resp.title.slice(start1,end1);
        let yearstart = resp.title.indexOf('yearfrom') +8;
        let yearend= resp.title.indexOf('*yearto');
        let year = resp.title.slice(yearstart,yearend);
        let yearfrom = year.slice(0,4);
        let yearto = year.slice(5,9);
        let monthstart = resp.title.indexOf('monthfrom') +9;
        let monthend= resp.title.indexOf('*monthto');
        let month = resp.title.slice(monthstart,monthend);
        let monthfrom = month.slice(0,2);
        let monthto = month.slice(3,5);
        let daystart = resp.title.indexOf('dayfrom') +7;
        let dayend= resp.title.indexOf('*dayto');
        let day = resp.title.slice(daystart,dayend);
        let dayfrom = day.slice(0,2);
        let dayto = day.slice(3,5);
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
              content: content,
              type: type,
              location: location,
              src: 'assets/icon/cardicon/'+type+'-icon.png',
              datefrom: yearfrom+'-'+monthfrom+'-'+dayfrom ,
              dateto: yearto+'-'+monthto+'-'+dayto
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

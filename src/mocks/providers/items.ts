import { Injectable } from '@angular/core';
import { Item } from '../../models/item';
import {MediaProvider} from "../../providers/media/media";
import {User} from "../../providers/user/user";

@Injectable()
export class Items {
  items: Item[] = [];
  constructor(public media: MediaProvider,
              public user: User) {
  }

  getList() {

    let name;
    let profile;
    let description;
    let items = [];
    let phone;
    this.user.getCurrentUser().toPromise().then((resp: any) => {
      this.media.requestFileByUser(resp.user_id).toPromise().then((resp: any) => {
        for (let i = 0; i < resp.length; i++) {
          console.log(resp[i].title);
          let id = resp[i].file_id;
          if (resp[i].title.search('profile') > -1){
            console.log('found');
            phone = resp[i].title.substr(resp[i].title.lastIndexOf('phone') +5,10);
            console.log(phone);
          } else {
            let start = resp[i].title.indexOf('type') + 4;
            let end = resp[i].title.indexOf('*location');
            name = resp[i].title.slice(start,end);
            profile = 'http://media.mw.metropolia.fi/wbma/uploads/'+resp[i].filename;
            description = resp[i].description;
            items[i-1] = {
              "name": name,
              "profilePic": profile,
              "about": description,
              "phone": phone,
              "id": id
            }
          }
        }
        for (let item of items) {
          this.items.push(new Item(item));
        }
      })
    })
    console.log('run get list');
    console.log(this.items);
  }

  reset(){
    console.log('run reset');
    this.items = [];
    console.log(this.items);
    return this.items;
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: Item) {
    this.items.push(item);
  }

  delete(item: Item) {
    this.items.splice(this.items.indexOf(item), 1);
    this.media.deleteFile(item.id).subscribe((resp: any)=> {
      console.log(resp);
    });
  }
}

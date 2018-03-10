import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  constructor(public api: Api){

  }

  deleteFile(id) {
    this.api.delete('media/'+id,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  requestFile(id) {
    this.api.get('media/'+id,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  requestFileByUser(id) {
    this.api.get('media/user/'+id,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  requestFileByCurrentUser() {
    this.api.get('media/user',this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  searchFile(title) {
    const body = {
      title: title
    }
    let seq = this.api.post('media/search',body,this.api.settings);
    seq.subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
    return seq;
  }

  updateFile(id, des) {
    const body = {
      description: des
    }
    this.api.put('media/'+id,body,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  uploadFile(body) {
    this.api.post('media',body,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }
}

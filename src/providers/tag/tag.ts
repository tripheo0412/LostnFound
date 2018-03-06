import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from "../api/api";

/*
  Generated class for the TagProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TagProvider {

  constructor(public api: Api) {
    console.log('Hello TagProvider Provider');
  }
  deleteTag(tagId) {
    this.api.delete('tags/'+tagId,this.api.settings).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
      }
    )
  }

  postTag(fileId, tag){
    const body = {
      file_id: fileId,
      tag: tag
    }
    this.api.post('tags',body,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  listFileByTag(tag) {
    var body = tag;
    body = body.replace(/\s+/g,'').toLowerCase();
    this.api.get('tags/'+body).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  listTag() {
    this.api.get('tags').subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }
}

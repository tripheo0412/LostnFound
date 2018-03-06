import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";

/*
  Generated class for the CommentProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CommentProvider {

  constructor(public api: Api) {
    console.log('Hello CommentProvider Provider');
  }
  deleteComment(id){
    this.api.delete('comments/'+id,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  postComment(fileId, comment) {
    const body = {
      file_id: fileId,
      comment: comment
    }
    this.api.post('comments',body,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }

  listCommentByFile(id) {
    this.api.get('comments/file/'+id,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }
}

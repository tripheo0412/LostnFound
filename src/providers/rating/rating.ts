import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Api} from "../api/api";

/*
  Generated class for the RatingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RatingProvider {

  constructor(public api: Api) {
    console.log('Hello RatingProvider Provider');
  }
  newRating(fileId, rating){
    const body = {
      file_id: fileId,
      rating: rating
    }
    this.api.post('ratings',body,this.api.settings).subscribe(res => {
        console.log(res);
      }, err => {
        console.log(err);
      }
    )
  }
}

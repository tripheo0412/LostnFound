import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'http://media.mw.metropolia.fi/wbma';
  settings =
    {
      headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
    }
  constructor(public http: HttpClient) {
  }
  get(endpoint: string, params?: any, reqOpts?: any) {
    this.settings =
      {
        headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
      }
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, this.settings);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    this.settings =
      {
        headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
      }
    return this.http.post(this.url + '/' + endpoint, body, this.settings);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    this.settings =
      {
        headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
      }
    return this.http.put(this.url + '/' + endpoint, body, this.settings);
  }

  delete(endpoint: string, reqOpts?: any) {
    this.settings =
      {
        headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
      }
    return this.http.delete(this.url + '/' + endpoint, this.settings);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    this.settings =
      {
        headers: new HttpHeaders().set('x-access-token', localStorage.getItem('token'))
      }
    return this.http.put(this.url + '/' + endpoint, body, this.settings);
  }
}


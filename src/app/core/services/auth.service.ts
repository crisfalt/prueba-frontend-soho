import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginModel, LoginResultModel} from '../models/auth.model';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

export interface ResponseLogin {
  data: LoginResultModel;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  signIn( data: LoginModel ): Observable<LoginResultModel> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ResponseLogin>(
      environment.url_endpoint + 'login',
      JSON.stringify(data),
      { headers }
      ).pipe(
        map( response => response.data )
      );
  }
}

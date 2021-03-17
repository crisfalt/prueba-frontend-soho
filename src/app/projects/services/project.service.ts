import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {ProjectModel} from '../models/project-model';
import {map} from 'rxjs/operators';
import {LoginModel, LoginResultModel} from '../../core/models/auth.model';
import {ResponseLogin} from '../../core/services/auth.service';

export interface Response {
  data: ProjectModel[];
}

export interface ResponseShow {
  data: ProjectModel;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor( private http: HttpClient ) {}

  getProjects( token: string ): Observable<ProjectModel[]> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.get<Response>(
      environment.url_endpoint + 'projects',
      { headers }
    ).pipe(
      map( response => response.data )
    );
  }

  getProject( id: string, token: string ): Observable<ProjectModel> {
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + token });
    return this.http.get<ResponseShow>(
      environment.url_endpoint + 'projects/' + id,
      { headers }
    ).pipe(
      map( response => response.data )
    );
  }

  create( data: ProjectModel, token: string ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });

    return this.http.post(
      environment.url_endpoint + 'projects',
      JSON.stringify(data),
      { headers }
    )
  }

  update( id: string, data: ProjectModel, token: string ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });

    return this.http.put(
      environment.url_endpoint + 'projects/' + id,
      JSON.stringify(data),
      { headers }
    )
  }

  delete( id: string, token: string ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    });

    return this.http.delete(
      environment.url_endpoint + 'projects/' + id,
      { headers }
    )
  }

  getProjectsPublic(): Observable<ProjectModel[]> {
    const headers = new HttpHeaders();
    return this.http.get<Response>(
      environment.url_endpoint + 'projects/list',
      { headers }
    ).pipe(
      map( response => response.data )
    );
  }
}

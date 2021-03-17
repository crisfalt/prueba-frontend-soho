import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../../models/project-model';
import {StorageMap} from '@ngx-pwa/local-storage';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.sass']
})
export class ListProjectComponent implements OnInit {

  projects: ProjectModel[] = []
  token: string = null

  constructor( private projectService: ProjectService, private storage: StorageMap ) { }

  ngOnInit(): void {
    console.log( this.projects.length );
    this.getToken().then( () => {
      this.loadProjects().then()
    })
  }

  loadProjects(): Promise<void> {
    return new Promise<void>( resolve => {
      this.projectService.getProjects( this.token ).subscribe( ( projects ) => {
        this.projects = projects
        console.log( projects );
        resolve()
      });
    })
  }

  getToken(): Promise<void> {
    return new Promise<void>( resolve => {
      /* Get token */
      this.storage.watch('soho.token').subscribe(( token: string) => {
        console.log( token );
        this.token = token
        resolve()
      });
    })
  }

}

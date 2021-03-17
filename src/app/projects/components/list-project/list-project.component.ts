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
    this.loadProjects().then()
  }

  loadProjects(): Promise<void> {
    return new Promise<void>( resolve => {
      this.projectService.getProjectsPublic().subscribe( ( projects ) => {
        this.projects = projects
        resolve()
      });
    })
  }

}

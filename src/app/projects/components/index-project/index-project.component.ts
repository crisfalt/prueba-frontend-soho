import { Component, OnInit } from '@angular/core';
import {ProjectModel} from '../../models/project-model';
import {ProjectService} from '../../services/project.service';
import {StorageMap} from '@ngx-pwa/local-storage';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-index-project',
  templateUrl: './index-project.component.html',
  styleUrls: ['./index-project.component.sass'],
  providers: [ ConfirmationService, MessageService ]
})
export class IndexProjectComponent implements OnInit {

  loading = false
  cols: { field: string, header: string, width: string}[];
  projects: ProjectModel[] = []
  token: string = null

  constructor( private projectService: ProjectService,
               private router: Router,
               private confirmationService: ConfirmationService,
               private messageService: MessageService,
               private storage: StorageMap ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'code', header: 'Código', width: '20%'},
      { field: 'name', header: 'Nombre del proyecto', width: '25%'},
      { field: 'description', header: 'Descripción', width: '25%'},
      { field: 'created_at', header: 'Fecha de creación', width: '12%'},
    ];

    this.getToken().then( () => {
      this.loading = true
      this.loadProjects().then( () => {
        this.loading = false
      })
    })
  }

  loadProjects(): Promise<void> {
    return new Promise<void>( resolve => {
      this.projectService.getProjects( this.token ).subscribe( ( projects ) => {
        this.projects = projects
        resolve()
      });
    })
  }

  getToken(): Promise<void> {
    return new Promise<void>( resolve => {
      /* Get token */
      this.storage.watch('soho.token').subscribe(( token: string) => {
        this.token = token
        resolve()
      });
    })
  }

  edit( id: number ): void {
    this.router.navigate( [ '/project/edit/', id ] )
  }

  create(): void {
    this.router.navigate( [ 'project/create' ] )
  }

  delete( id: string, name: string ): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea borrar el proyecto "' + name + '"?',
      accept: () => {
        this.projectService.delete( id, this.token ).subscribe(
          ( response ) => {
            if ( response !== null ) {
              this.loadProjects().then()
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Problema en la operación',
                detail: 'No fue posible eliminar el proyecto',
                life: 20000
              });
            }
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Problema en la operación',
              detail: 'No fue posible eliminar el proyecto',
              life: 20000
            });
          });
      }
    });
  }
}

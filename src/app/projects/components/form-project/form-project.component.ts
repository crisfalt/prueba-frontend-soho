import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectModel} from '../../models/project-model';
import {ProjectService} from '../../services/project.service';
import {StorageMap} from '@ngx-pwa/local-storage';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.sass'],
  providers: [ ConfirmationService, MessageService ]
})
export class FormProjectComponent implements OnInit {

  projectForm: FormGroup;
  projectId: string = null
  project: ProjectModel = null
  loading = false
  token: string = null

  constructor( private fb: FormBuilder,
               private projectService: ProjectService,
               private storage: StorageMap,
               private router: Router,
               private confirmationService: ConfirmationService,
               private messageService: MessageService,
               private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.loading = true
    this.projectId = this.route.snapshot.paramMap.get( 'id' )

    this.projectForm = this.fb.group({
      code: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });

    if ( this.projectId === null ) {
      this.getToken().then( () => {
        this.loading = false
      })
    } else {
      this.getToken().then( () => {
        this.loadProject()
      })
    }
  }

  loadProject(): void {
    this.projectService.getProject( this.projectId, this.token ).subscribe(
      ( project: ProjectModel ) => {
        this.project = project
        if ( project !== null ) {
          this.projectForm.get( 'code' ).setValue( project.code )
          this.projectForm.get( 'name' ).setValue( project.name )
          this.projectForm.get( 'description' ).setValue( project.description )
        }
        this.loading = false
      },
    )
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

  save(): void {
    this.project = this.projectForm.value
    console.log( this.project );
    if ( this.projectId === null ) {
      this.projectService.create( this.project, this.token ).subscribe(
        ( response ) => {
          if (response !== null) {
            this.router.navigate(['/project/index'])
          }
        }
      )
    } else {
      this.projectService.update( this.projectId, this.project, this.token ).subscribe(
        ( response ) => {
          if (response !== null) {
            this.router.navigate(['/project/index'])
          }
        }
      )
    }
  }

  delete(): void {
    this.confirmationService.confirm({
      message: '¿Está seguro de que desea borrar el proyecto "' + this.project.name + '"?',
      accept: () => {
        this.projectService.delete( this.projectId, this.token ).subscribe(
          ( response ) => {
            if ( response !== null ) {
              this.router.navigate(['/project/index'])
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

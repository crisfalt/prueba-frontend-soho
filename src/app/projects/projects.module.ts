import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { IndexProjectComponent } from './components/index-project/index-project.component';
import { FormProjectComponent } from './components/form-project/form-project.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ListProjectComponent } from './components/list-project/list-project.component';

@NgModule({
  declarations: [IndexProjectComponent, FormProjectComponent, ListProjectComponent],
  exports: [
    ListProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProjectsRoutingModule,
    ProgressSpinnerModule,
    TableModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    InputTextareaModule,
    ToastModule,
    ConfirmDialogModule
  ]
})
export class ProjectsModule { }

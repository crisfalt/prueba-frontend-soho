import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexProjectComponent} from './components/index-project/index-project.component';
import {FormProjectComponent} from './components/form-project/form-project.component';

const routes: Routes = [
  {
    path: 'index',
    component: IndexProjectComponent
  },
  {
    path: 'create',
    component: FormProjectComponent
  },
  {
    path: 'edit/:id',
    component: FormProjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }

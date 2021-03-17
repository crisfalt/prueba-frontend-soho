import { NgModule } from '@angular/core';
import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NotfoundComponent} from './core/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./index/index.module').then(m => m.IndexModule)
      },
      {
        path: 'project',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
      },
    ]
  },
  { path: '403', component: NotfoundComponent },
];

const routerOptions: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {LoginModel, LoginResultModel} from '../../models/auth.model';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {StorageMap} from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent {

  loginModel: LoginModel = null

  constructor( private authService: AuthService,
               private storage: StorageMap,
               private router: Router ) { }

  login(): void {
    this.loginModel = {
      email: 'crisfalt@gmail.com',
      password: 'test'
    }

    this.authService.signIn( this.loginModel ).subscribe(
      ( result: LoginResultModel ) => {
        environment.token = null
        this.storage.set('soho.token', result.access_token ).subscribe();
        this.router.navigate( ['/project/index'] )
      },
      ( err ) => {
      }
    )
  }
}

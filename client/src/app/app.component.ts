import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStateService } from './shared/services/app-state.service';
import { AuthService } from './shared/services/auth.service';
import { User } from './api';
import { UserControllerService } from './api'; 
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';
import { GeolocationService } from './shared/services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  tokenParam: String;
  user: User;

  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private appState: AppStateService,
    private userService: UserControllerService,
    private translate: TranslateService,
    private language: LanguageService,
    private geolocation: GeolocationService
  ) { }

  ngOnInit() {
    this.translate.setDefaultLang('en');
    this.activateRoute.queryParams.subscribe(params => {
      this.tokenParam = params['token'];
      // van token localstorageba
      console.log('localstorage getitem'+localStorage.getItem('token')+ !!localStorage.getItem('token'));
      console.log('tokenparam'+ !!this.tokenParam);
      if (!!localStorage.getItem('token') || !!this.tokenParam) {
        if (!!this.tokenParam) {
          localStorage.setItem('token', params['token']);
        }
        this.getCurrentUser();
      // nincs token localstorageba
      } else {
        if (!!this.tokenParam) {
          localStorage.setItem('token', params['token']);
        } else {
          this.geolocation.getLocation();
        }

      }
    });

  }

  getCurrentUser() {
    this.userService.getCurrentUserUsingGET().subscribe(
      user => {
      this.appState.user = user;
      localStorage.setItem('user', JSON.stringify(user));
      if (!!user && !!user.language) {
        console.log(user);
        console.log(user.language);
        this.translate.use(user.language.toLowerCase());
      //  this.language.setLanguage(user.language.toLowerCase());
      //  console.log('beallitottam a nyelvet a user tabla alapjan');
      } else {
        this.geolocation.getLocation();
      }
     }
   );
  }

}


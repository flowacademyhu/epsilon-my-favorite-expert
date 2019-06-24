import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStateService } from './shared/services/app-state.service';
import { AuthService } from './shared/services/auth.service';
import { User } from './api';
import { UserControllerService } from './api'; 
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './shared/services/language.service';

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
    private appStateService: AppStateService,
    private userService: UserControllerService,
    private translate: TranslateService,
    private language: LanguageService
  ) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.tokenParam = params['token'];
      if (this.tokenParam != null) {
      localStorage.setItem('token', params['token']);
      this.userService.getCurrentUserUsingGET().subscribe(
         user => {
         this.appStateService.user = user;
         localStorage.setItem('user', JSON.stringify(user));
        }
      );
      }
    });

this.language.getLanguage();
  }

 
}

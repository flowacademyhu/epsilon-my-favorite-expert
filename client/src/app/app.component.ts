import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppStateService } from './shared/services/app-state.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tokenParam: String;
  constructor(
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private appStateService: AppStateService
  ) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.tokenParam = params['token'];
      if (this.tokenParam != null) {
      localStorage.setItem('token', params['token']);
      this.authService.getLoggedInUser().subscribe(
         user => {
         this.appStateService.user = user;
        }
      );
      }
    });
  }
}

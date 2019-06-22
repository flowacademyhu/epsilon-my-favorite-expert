import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStateService } from 'src/app/shared/services/app-state.service';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { User } from 'src/app/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  state: any;
  user: User;

  constructor(private translate: TranslateService, private appState: AppStateService, private geolocation: GeolocationService) {
    this.state = this.appState;
    translate.setDefaultLang(localStorage.getItem('language'));
   }

   switchLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnInit() {
    
  }
  logout() {
    this.state.user = null;
    this.appState.user.accessToken = null;
  }
}

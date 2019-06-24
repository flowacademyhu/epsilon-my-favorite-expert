import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStateService } from 'src/app/shared/services/app-state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  state: AppStateService;
  constructor(private translate: TranslateService, private appState: AppStateService) {
    translate.setDefaultLang('en');
    this.state = this.appState;
   }

   switchLanguage(language: string) {
   this.translate.use(language);
  }

  logout() {
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   this.state = undefined;
  }
  ngOnInit() {
  }
}

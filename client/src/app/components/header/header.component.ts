import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppStateService } from 'src/app/shared/services/app-state.service';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';
import { User, UsersResourceService } from 'src/app/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  state: any;
  user: User;

  constructor(private translate: TranslateService, private appState: AppStateService, private geolocation: GeolocationService,
    private userResource: UsersResourceService) {
    this.state = this.appState;
   }
   
   switchLanguage(language: string) {
    this.userResource.saveLanguageUsingPOST(language).subscribe((user: User)=>{
      console.log(user.language)
    });
   this.translate.use(language);
  }

  ngOnInit() {
    
  }
  logout() {
   this.appState = null;
   localStorage.removeItem('token');
  }
}

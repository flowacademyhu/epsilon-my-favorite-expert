import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GeolocationService } from 'src/app/shared/services/geolocation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private translate: TranslateService, private geolocation: GeolocationService) {
    translate.setDefaultLang('en');
   }

   switchLanguage(language: string) {
    this.translate.use(language);
}

  ngOnInit() {
    this.geolocation.getLocation();
  }

}

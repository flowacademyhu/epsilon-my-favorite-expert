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
    
   }

  

  ngOnInit() {
   

  }

}

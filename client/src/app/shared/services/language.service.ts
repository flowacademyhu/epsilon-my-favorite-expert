import { Injectable } from '@angular/core';
import { GeolocationService } from './geolocation.service';
import { AppStateService } from './app-state.service';
import { TranslateService } from '@ngx-translate/core';
import { UsersResourceService, UserControllerService } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private location: GeolocationService, private appstate: AppStateService, private translate: TranslateService,
    private userService: UserControllerService) { }

  getLanguage(){
    if(localStorage.getItem('token') == undefined){
      return this.translate.setDefaultLang(localStorage.getItem('language'));
    } else if (this.appstate.user$ == undefined) {
      this.userService.getCurrentUserUsingGET().subscribe((user)=> {
        if (user.language == undefined) {
         return this.translate.setDefaultLang(localStorage.getItem('language'));
        } else {
         return  this.translate.setDefaultLang(user.language);
        }
      })
    }
  }

}

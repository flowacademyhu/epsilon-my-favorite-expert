import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
   }

   switchLanguage(language: string) {
    this.translate.use(language);
}

  ngOnInit() {
  }

}

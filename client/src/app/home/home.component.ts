import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class LoginComponent implements OnInit {
  toggleNavbar = true;
  constructor(private translate: TranslateService) { 
    translate.setDefaultLang('en');
  }
  
  switchLanguage(language: string) {
    this.translate.use(language);
}
  ngOnInit() {
  }
}

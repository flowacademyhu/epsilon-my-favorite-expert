import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
  }

  switchLanguage(lang: string) {
    this.translate.use(lang).subscribe(change => {
      console.log(`Lang changed to: ${lang} ${change}`);
    });
  }

}

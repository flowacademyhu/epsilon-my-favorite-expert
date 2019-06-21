import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertResourceService, UserControllerService } from 'src/app/api';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  constructor(
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      if (params == null) {
        console.log();
      } else {
        localStorage.setItem('token', params['token']);
      }
    });
  }

  switchLanguage(lang: string) {

  }
}

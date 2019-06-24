import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertResourceService, UserControllerService } from 'src/app/api';
import {AppStateService} from 'src/app/shared/services/app-state.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  state: any;
  constructor(private appState: AppStateService, private activatedRoute: ActivatedRoute) {
    this.state = this.appState;
   }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
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

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { AppStateService } from 'src/app/shared/services/app-state.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  state: any;
  constructor(private appState: AppStateService) {
    this.state = this.appState;
   }
  ngOnInit() {
  }
}

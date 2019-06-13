import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { ExpertService } from 'src/app/shared/services/expert.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  /* constructor(private route: ActivatedRoute, private experservice: ExpertService) { 
    console.log('called constructor');
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  */
token: any;
expertlist: any[];

  constructor(private route: ActivatedRoute, private userservice: UserService,
    private expertservice: ExpertService) {
    console.log('called constructor');
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
   });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
    this.userservice.saveToken(this.token);
  }
  get() {
    this.expertservice.getSMT(this.token).subscribe((valami: string) => {
      console.log(valami);
    });
}
}

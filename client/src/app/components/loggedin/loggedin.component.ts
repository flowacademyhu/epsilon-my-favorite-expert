import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

token: any;


  constructor(private route: ActivatedRoute, private userservice: UserService) {
    
   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
    this.userservice.saveToken(this.token);
   
  }

}

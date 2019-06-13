import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertService } from 'src/app/expert.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  token: string;
  constructor(private route: ActivatedRoute, private experservice: ExpertService) { 
    console.log('called constructor');
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  }

  ngOnInit() {
  }
  get() {
    this.experservice.getSMT(this.token).subscribe((valami: string) => {
      console.log(valami);
    });
  }
}

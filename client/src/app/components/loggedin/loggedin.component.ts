import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {
  receivedData: any;
  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.receivedData = this.dataservice.getData();
  }
}

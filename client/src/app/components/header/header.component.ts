import { Component, OnInit } from '@angular/core';

let headerDisplay: any = localStorage.getItem('token');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {

  isLoggedin() {
    if (headerDisplay !== null) {
      return true;
      
    } else {
      return false;
    }
 }

  constructor() { }

  ngOnInit() {
  }

 

}

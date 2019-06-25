import { Component, OnInit, Input } from '@angular/core';
import { Expert } from '../../../api/model/expert';
import { User } from '../../../api/model/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: any;

  experts: Expert[] = [];

  showFavorites = false;
  

  constructor() { }

  ngOnInit() {
   
  }
 
  }
  


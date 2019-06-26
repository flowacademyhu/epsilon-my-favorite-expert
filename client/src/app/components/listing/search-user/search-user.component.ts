import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/model/user';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users: User[] = [];
  listOrSearch = false;
  constructor() { }

  ngOnInit() {
  }

  listAllUsers() {
    this.listOrSearch = false;
  }
  search() {
    this.listOrSearch = true;
  }
}

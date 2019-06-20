import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users: User[] = [];
  listOrSearch = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getAllUsers() {
    this.loadData();
  }
  loadData() {
    this.userService.listAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      });
  }
  listAllUsers() {
    this.listOrSearch = false;
  }
  search() {
    this.listOrSearch = true;
  }
}

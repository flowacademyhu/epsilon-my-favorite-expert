import { Component, OnInit } from '@angular/core';
import { User } from '../../../api/model/user';
import { UsersResourceService, ExpertResourceService } from 'src/app/api';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css']
})
export class SearchUserComponent implements OnInit {
  users: any[];
  id: string;
  username: string;
  experts: any[];
  listOrSearch = false;
  showFavorites = false;
  constructor(private usersservice: UsersResourceService, private experservice: ExpertResourceService) { }

  ngOnInit() {
  }
  getAllUsers() {
    this.loadData();
  }
  loadData() {
    this.usersservice.getAllUsingGET1()
    .subscribe((users) => {
      this.users = users;
    });
  }

  listAllUsers() {
    this.listOrSearch = false;
  }
  search() {
    this.listOrSearch = true;
  }
  getAllExperts() {
    if (this.showFavorites === true) {
      this.showFavorites = false;
    } else {
      this.showFavorites = true;
    }
  }
  getExpert() {
    this.usersservice.findExpertsByUsersUsingGET(this.id)
    .subscribe((experts) => {
      this.experts = experts;
    });
  }
}

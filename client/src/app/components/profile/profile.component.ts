import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/models/user.model';
import { Address } from 'src/app/models/address.model';
import { Expert } from 'src/app/models/expert.model';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  favoriteExperts: Expert[];
  

  constructor(private userservice: UserService, private expertService: ExpertService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  false;
    this.user = new User();
    this.user.address = new Address();
   }
  
  isAddressBlank():boolean {
    if (this.user.address == undefined) {
      return true;
    }
    return this.user.address.country==undefined ||
    this.user.address.city==undefined||
    this.user.address.street==undefined||
    this.user.address.number==undefined;
  }

  ngOnInit() {
    this.router.events.subscribe((asd) => {
      this.loadData();
    })
    this.loadData();

  }

  loadData() {
    forkJoin(this.userservice.getCurrentUser(), this.expertService.getFavoriteExperts())
    .subscribe(([currentUser, experts]) => {
      this.user = currentUser;
      this.favoriteExperts = experts;
    });
  }
 

}

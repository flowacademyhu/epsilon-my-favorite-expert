import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/models/user.model';
import { Address } from 'src/app/models/address.model';
import { Expert } from 'src/app/models/expert.model';
import { ExpertService } from 'src/app/shared/services/expert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  favoriteExperts: Expert[];
  

  constructor(private userservice: UserService,private expertService: ExpertService) {

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
    this.userservice.getCurrentUser().subscribe(
      (data: any) => {
        this.user = data;
        console.log(this.user);
      }
    );
    this.expertService.getFavoriteExperts().subscribe(
      (data: any) => {
        this.favoriteExperts = data;
      }
    );

  }
 

}

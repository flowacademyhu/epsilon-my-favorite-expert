import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  

  constructor(private userservice: UserService) { }
  
  isAddressBlank() {
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
        // this.user.address.country='hungary';
        // this.user.address.city = 'Szeged';
        // this.user.address.number = 'Git falva';
        // this.user.address.street = 'UjSzeged';
      }
    );
  }

}

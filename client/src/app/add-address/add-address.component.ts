import { Component, OnInit } from '@angular/core';
import { Address } from '../models/address.model';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  address : Address;
  constructor(private userService: UserService,
    private router: Router) { 
    this.address = new Address();
  }

  ngOnInit() {
    this.address.country='';
    this.address.city='';
    this.address.number='';
    this.address.street='';

  }

  addAddress(){
    this.userService.addAddress(this.address).subscribe((data:User) => {
      console.log(data);
    });
    this.router.navigate(['profile']);
  }


}

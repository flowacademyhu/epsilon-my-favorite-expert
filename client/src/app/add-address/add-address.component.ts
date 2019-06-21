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
    this.fillAddressFields();
  }

  addAddress(){
    this.userService.addAddress(this.address).subscribe((data:User) => {
      console.log(data);
    });
    this.router.navigate(['profile']);
  }
  fillAddressFields() {
    const tempAddress = new Address();
    tempAddress.country = localStorage.getItem('country');
    tempAddress.city = localStorage.getItem('city');
    tempAddress.street = localStorage.getItem('street');
    tempAddress.number = localStorage.getItem('number');
    if (!this.isAddressBlank(tempAddress)) {
      this.address = tempAddress;
    }

  }

  isAddressBlank(address: Address):boolean {
    if (this.address == undefined) {
      return true;
    }
    return this.address.country == undefined ||
    this.address.city == undefined||
    this.address.street == undefined||
    this.address.number == undefined;
  }

  switchLanguage(lang: string) {

  }

}

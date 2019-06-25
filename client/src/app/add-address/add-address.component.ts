import { Component, OnInit } from '@angular/core';
import { Address } from '../../app/api/model/address';
import { Router } from '@angular/router';
import { User } from '../../app/api/model/user';
import { UsersResourceService } from '../api';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {

  address : Address;
  constructor(private usersService: UsersResourceService,
    private router: Router) { 
    this.address = <Address>{};
  }

  ngOnInit() {
    this.fillAddressFields();
  }

  addAddress(){
    this.usersService.saveAddressUsingPOST(this.address).subscribe((data:User) => {
      console.log(data);this.router.navigate(['profile']);
    },(error)=> {alert("Hibás cím!")});
    
  }
  fillAddressFields() {
    let tempAddress : Address = {
      city: '',
      country: '',
      street: '',
      number: ''
    };
    tempAddress.country = localStorage.getItem('country');
    tempAddress.city = localStorage.getItem('city');
    tempAddress.street = localStorage.getItem('street');
    tempAddress.number = localStorage.getItem('number');
    if (!this.isAddressBlank(tempAddress)) {
      this.address = tempAddress;
    }

  }

  isAddressBlank(address: Address):boolean {
    if (!address) {
      return true;
    }
    return !address.country &&
    !address.city&&
    !address.street&&
    !address.number;
  }

}

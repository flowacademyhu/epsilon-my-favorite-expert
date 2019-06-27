import { Component, OnInit } from '@angular/core';
import { Address } from '../../../app/api/model/address';
import { Router } from '@angular/router';
import { User } from '../../api/model/user';
import { UsersResourceService } from '../../api';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  showAlert = false;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  address : Address;
  constructor(private usersService: UsersResourceService,
    private router: Router) { 
    this.address = <Address>{};
  }

  ngOnInit() {
    this.fillAddressFields();
  }

  addAddress(){
    this.usersService.saveAddressUsingPOST(this.address).subscribe((data: User) => {
    }, (error) => {
      setTimeout(() => this.staticAlertClosed = true, 4000);
      this._success.subscribe((message) => this.successMessage = message);
      this._success.pipe(
      debounceTime(5000)
    );
      this.showAlert = true;
      this.staticAlertClosed = false;
    });
  }
  fillAddressFields() {
    let tempAddress: Address = {
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

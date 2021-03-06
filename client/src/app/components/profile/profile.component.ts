import { Component, OnInit } from '@angular/core';
import { User } from '../../api/model/user';
import { Address } from '../../api/model/address';
import { Expert } from '../../api/model/expert';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserControllerService, ExpertResourceService } from 'src/app/api';
import { GeolocationService} from 'src/app/shared/services/geolocation.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  favoriteExperts: Expert[];
  
  constructor(private usersservice: UserControllerService, private expertService: ExpertResourceService,
    private geolocation: GeolocationService, private translate: TranslateService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () =>  false;
    this.user = <User>{};
    this.user.address = <Address>{};
   }

   isAddressBlank():boolean {
    if (!this.user.address) {
      return true;
    }
    return !this.user.address.country ||
    !this.user.address.city ||
    !this.user.address.street ||
    !this.user.address.number;
  }

  ngOnInit() {
    this.router.events.subscribe((emptydata) => {
      this.loadData();
    });
    this.loadData();  
  

  }

  loadData() {
    forkJoin(this.usersservice.getCurrentUserUsingGET(), this.expertService.getFavoriteExpertsUsingGET())
    .subscribe(([currentUser, experts]) => {
      this.user = currentUser;
      this.favoriteExperts = experts;
    });
  }
  
  saveAddressLocalStorage() {
    localStorage.setItem('country', this.user.address.country);
    localStorage.setItem('city', this.user.address.city);
    localStorage.setItem('street', this.user.address.street);
    localStorage.setItem('number', this.user.address.number);

  }

 

}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertResourceService, UserControllerService, User, Expert, Address, UsersResourceService } from 'src/app/api';
import {AppStateService} from 'src/app/shared/services/app-state.service';
import { forkJoin } from 'rxjs';
import { CommunicationService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.css']
})
export class LoggedinComponent implements OnInit {

  @Input()
  expert: Expert;

  experts: Expert[] = [];
  favoriteExpert: Expert[] = [];
  isMapView = false;
  keyWords = '';
  inputCharacterChanges = 0;

  @Input()
  isFavoriteExpert: boolean;
  
  user: User;
  favoriteExperts: Expert[];

  expertService: any;
  constructor(private appState: AppStateService, private activatedRoute: ActivatedRoute, 
    private userController: UserControllerService, private expertResource: ExpertResourceService, private router: Router, 
    private communicationService: CommunicationService, private userResources: UsersResourceService) {
    this.user = <User>{};
    this.user.address = <Address>{};
    
   }
   state = this.appState;
  ngOnInit() {
    this.loadData();
    this.router.events.subscribe((emptydata) => {
      this.loadData();
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (!!params == null) {
        localStorage.setItem('token', params['token']);
      }
    });

  }

  loadData() {
    forkJoin(this.userController.getCurrentUserUsingGET(), this.expertResource.getFavoriteExpertsUsingGET())
    .subscribe(([currentUser, experts]) => {
      this.user = currentUser;
      this.favoriteExperts = experts;
    });
  }

  removeFromFavorite() {
    this.isFavoriteExpert = !this.isFavoriteExpert;
   this.communicationService.removeFromFavorite(this.expert);
   this.userResources.deleteExpertFromUserUsingDELETE(this.expert.id).subscribe((data: any) => {
        console.log('sikeresen torolve');
      });

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
}

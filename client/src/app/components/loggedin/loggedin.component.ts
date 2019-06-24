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

  experts: Expert[] = [];
  favoriteExpert: Expert[] = [];
  isMapView = false;
  keyWords = '';
  inputCharacterChanges = 0;

  @Input()
  isFavoriteExpert: boolean;

  @Input()
  expert: Expert;

  user: User;
  favoriteExperts: Expert[];

  state: any;
  expertService: any;
  constructor(private appState: AppStateService, private activatedRoute: ActivatedRoute, 
    private userController: UserControllerService, private expertResource: ExpertResourceService, private router: Router, 
    private communicationService: CommunicationService, private userResources: UsersResourceService) {
    this.state = this.appState;
    this.user = <User>{};
    this.user.address = <Address>{};
    
   }
  ngOnInit() {
    this.router.events.subscribe((emptydata) => {
      this.loadData();
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if (params == null) {
        console.log();
      } else {
        localStorage.setItem('token', params['token']);
      }
    });

   
    this.loadData();  
    console.log(this.experts.length);
    
  }

  loadData() {
    forkJoin(this.userController.getCurrentUserUsingGET(), this.expertResource.getFavoriteExpertsUsingGET())
    .subscribe(([currentUser, experts]) => {
      this.user = currentUser;
      this.favoriteExperts = experts;
    });
  }

  switchLanguage(lang: string) {

  }

  removeFromFavorite() {
    this.isFavoriteExpert = !this.isFavoriteExpert;
   this.communicationService.removeFromFavorite(this.expert);
   this.userResources.deleteExpertFromUserUsingDELETE(this.expert.id).subscribe((data: any) => {
        console.log('sikeresen torolve');
      });

  }

  
  addToFavorite() {
    this.isFavoriteExpert = !this.isFavoriteExpert;
   this.communicationService.addToFavorite(this.expert);
     this.userResources.addExpertToUserUsingPUT(this.expert.id).subscribe(
      (data: any) => {
        console.log('sikeresen hozzaadva a kedvencekhez');
      }
    );
  }

  getFavoriteExperts() {
    this.expertService.getFavoriteExpertsUsingGET().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      }
    );
  }
}

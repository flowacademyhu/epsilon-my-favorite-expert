import { Component, OnInit, Input } from '@angular/core';
import { ExpertResourceService, Expert, UserControllerService } from 'src/app/api';
import { CommunicationService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
  experts: Expert[] = [];
  favoriteExpert: Expert[] = [];
  isMapView = false;
  keyWords = '';
  inputCharacterChanges = 0;

  constructor(private usersservice: UserControllerService, 
    private expertService: ExpertResourceService, 
    private communicationService: CommunicationService) { }

  ngOnInit() {
    this.loadData();
    this.communicationService.addExpertSubject.subscribe(
      (expert: Expert) => {
        this.favoriteExpert.push(expert);
        console.log('favoriteExpert added');
      }
    );
    this.communicationService.removeExpertSubject.subscribe(
      (expert: Expert) => {
        this.favoriteExpert = this.favoriteExpert.filter(obj => obj !== expert);
        console.log('favoriteExpert removed');
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
  getAllExperts() {
    this.loadData();
  }
  loadData() {
    this.expertService.getAllUsingGET().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      });
      this.expertService.getFavoriteExpertsUsingGET().subscribe(
        (data: Expert[]) => {
          this.favoriteExpert = data;
        });
  }

  isFavoriteExpert(expert: Expert): boolean {
    return !!this.favoriteExpert.find(exp => exp.id === expert.id);
  }
  addToFavorite(expert: Expert) {
    this.favoriteExpert.push(expert);
    this.isFavoriteExpert(expert);
  }
  removeFromFavorite(expert : Expert) {
    this.favoriteExpert = this.favoriteExpert.filter(obj => obj !== expert);
    this.isFavoriteExpert(expert);

  }

  switchLanguage(lang: string) {

  }

  switchToMap() {
    this.isMapView = !this.isMapView;
  }

  keyWordtextChanged() {
    this.inputCharacterChanges++;
    console.log(this.inputCharacterChanges);
    if (this.inputCharacterChanges % 3 === 0 || this.experts.length === 0) {
    this.expertService.findExpertTestUsingGET(this.keyWords.replace(' ', '_')).subscribe((data: Expert[]) => {
      this.experts = data;
    });
  }
  }

  sortByNameASC() {
    this.experts.sort((a,b) => {
      if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
    });
  }
  sortByNameDESC() {
    this.experts.sort((a,b) => {
      if(a.name < b.name) { return 1; }
    if(a.name > b.name) { return -1; }
    return 0;
    });
  }
  sortByDistanceASC() {
    this.experts.sort((a,b) => {
      if(a.distanceMeter < b.distanceMeter) { return -1; }
    if(a.distanceMeter > b.distanceMeter) { return 1; }
    return 0;
    });
  }
  sortByDistanceDESC() {
    this.experts.sort((a,b) => {
      if(a.distanceMeter < b.distanceMeter) { return 1; }
    if(a.distanceMeter > b.distanceMeter) { return -1; }
    return 0;
    });
  }

}

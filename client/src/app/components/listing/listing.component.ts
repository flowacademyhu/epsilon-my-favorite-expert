import { Component, OnInit, Input } from '@angular/core';
import { ExpertResourceService, Expert } from 'src/app/api';
import { CommunicationService } from 'src/app/shared/services/communication.service';
import { Profile } from 'selenium-webdriver/firefox';

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
  suggestTerm: String[];

  constructor(private expertService: ExpertResourceService, private communicationService: CommunicationService) { }

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
  addToFavorite(expert : Expert) {
    this.favoriteExpert.push(expert);
    this.isFavoriteExpert(expert);
  }
  removeFromFavorite(expert : Expert) {
    this.favoriteExpert = this.favoriteExpert.filter(obj => obj !== expert);
    this.isFavoriteExpert(expert);

  }

  

  switchToMap() {
    this.isMapView = !this.isMapView;
  }

  keyWordtextChanged() {
    this.inputCharacterChanges++;
    console.log(this.inputCharacterChanges);
    this.expertService.findExpertTestUsingGET(this.keyWords.replace(' ', '_')).subscribe((data: Expert[]) => {
      this.experts = data;
    });
    this.searchFromArray(this.experts,this.keyWords);
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

  searchFromArray(experts: Expert[], regex) {
    this.suggestTerm = [];
    for (const expert of experts) {
      if (this.suggestTerm.length >= 3) {
        return;
      }
     this.searchIn(expert.name, regex);
     for (const profession of expert.profession) {
      this.searchIn(profession, regex);
    }
    if (this.suggestTerm.length >= 3) {
      return;
    }
     this.searchIn(expert.address.country, regex);
     this.searchIn(expert.address.city,regex);
     this.searchIn(expert.address.street, regex);
    }
  }

  searchIn(field: string, regex: string): void {
    if (field.toLowerCase().match(regex.toLowerCase())) {
      this.suggestTerm.push(field);
    }
  }

}

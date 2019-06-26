import { Component, OnInit, Input } from '@angular/core';
import { ExpertResourceService, Expert, User, UsersResourceService } from 'src/app/api';
import { CommunicationService } from 'src/app/shared/services/communication.service';
import { forkJoin } from 'rxjs';


export enum FilterOrder {
  ASC = 'ASC',
  DESC = 'DESC',
  DIST_ASC = 'DIST_ASC',
  DIST_DESC = 'DIST_DESC'
}

export enum FilterType {
  ALL = 'ALL',
  FAVORITE = 'FAVORITE',
  USERSFAVORITE = 'USERSFAVORITE',
  COMMON = 'USERS',
  ALL_FRIENDS_FAVORITE = 'ALL_FRIENDS_FAVORITE'
}

export class Filter {
  constructor(
    public mapView: boolean,
    public expertSearchValue?: string,
    public userSearchValue?: string,
    public order?: FilterOrder,
    public type?: FilterType,
    public userid?: string
  ) {
  }
}

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
  experts: Expert[] = [];
  favoriteExpert: Expert[] = [];
  users: User[] = [];
  friends: User[] = [];
  isMapView = false;
  keyWords = '';
  keyWordsUserSearch = '';
  inputCharacterChanges = 0;
  suggestTerm: String[];
  private filter: Filter = new Filter(false);
  isUserFavoriteFilterActive: boolean = false;
  isUserCommonFilterActive: boolean = false;

  constructor(private expertService: ExpertResourceService,
     private communicationService: CommunicationService,
     private userService: UsersResourceService) { }

  ngOnInit() {
    this.loadData();
    this.communicationService.addExpertSubject.subscribe(
      (expert: Expert) => {
        this.favoriteExpert.push(expert);
      }
    );
    this.communicationService.removeExpertSubject.subscribe(
      (expert: Expert) => {
        this.favoriteExpert = this.favoriteExpert.filter(obj => obj !== expert);
      }
    );
    this.communicationService.addFriendSubject.subscribe((user: User) => {
      this.friends.push(user);
    });
    this.communicationService.removeFriendSubject.subscribe( (user: User) => {
      this.friends = this.friends.filter(friend => friend.id != user.id);
    });
    this.communicationService.commonFilterSubject.subscribe((user: User) => {
      // TODO MENTES
      this.filter.userid = user.id;
      this.filter.type = FilterType.COMMON;
      this.storeFilters();
    });
    this.communicationService.userExpertFilterSubject.subscribe((user: User) => {
      // TODO MENTES
      this.filter.userid = user.id;
      this.filter.type = FilterType.USERSFAVORITE;
      this.storeFilters();
    });
    this.loadFilters();
  }

  private loadFilters() {
    if (localStorage.getItem('filters')) {
      this.filter = JSON.parse(localStorage.getItem('filters'));
      this.processFilters();
    }
  }

  private processFilters() {
    if (this.filter.expertSearchValue) {
      this.keyWords = this.filter.expertSearchValue;
      this.keyWordtextChanged(); // TODO: meghivja-e az elozo sor a change-et?
    }
    if (this.filter.userSearchValue) {
      this.keyWordsUserSearch = this.filter.userSearchValue;
      this.userKeyWordtextChanged(); // TODO: meghivja-e az elozo sor a change-et?
    }
    switch (this.filter.type) {
      case FilterType.ALL:
        this.getAllExperts();
        break;
      case FilterType.ALL_FRIENDS_FAVORITE:
        this.getAllFriendsExperts();
        break;
      case FilterType.COMMON:
        // TODO userben van, prop binding kell, kell egy event binding is, ami jelzi, hogy visszajott az adat
        this.isUserCommonFilterActive = true;
        break;
      case FilterType.FAVORITE:
        this.getFavoriteExperts();
        break;
      case FilterType.USERSFAVORITE:
        // TODO: userben van
        this.isUserFavoriteFilterActive = true;
        break;
      default:
        break;
    }
    if (this.filter.mapView) {
      this.loadMap();
    }
  }
  loadMap() {
    this.isMapView = true;
    console.log('AAAAAAAAAAA mapView' + this.isMapView);
  }

  isUserCommonButtonFiltered(user: User) {
    if (!!this.isUserCommonFilterActive) {
    return user.id === this.filter.userid;
    } else {
      return false;
    }
  }

  isUserFriendsFiltered(user: User) {
    if (!!this.isUserFavoriteFilterActive) {
    return user.id === this.filter.userid;
    } else {
      return false;
    }
  }


  private sortByFiler() {
    switch (this.filter.order) {
      case FilterOrder.ASC:
        this.sortByNameASC();
        break;
      case FilterOrder.DESC:
        this.sortByNameDESC();
        break;
      case FilterOrder.DIST_ASC:
        this.sortByDistanceASC();
        break;
      case FilterOrder.DIST_DESC:
        this.sortByDistanceDESC();
        break;
      default:
        break;
    }
  }

  private storeFilters() {
    localStorage.setItem('filters', JSON.stringify(this.filter));
  }

  getFavoriteExperts() {
    this.filter.type = FilterType.FAVORITE;
    this.storeFilters();
    this.expertService.getFavoriteExpertsUsingGET().subscribe(
      (data: Expert[]) => {
        this.experts = data;
        this.sortByFiler();
      }
    );
  }
  getAllExperts() {
    this.filter.type = FilterType.ALL;
    this.storeFilters();
    this.loadData();
  }
  loadData() {
    forkJoin(this.expertService.getAllUsingGET(),
    this.expertService.getFavoriteExpertsUsingGET())
    .subscribe(
      ([experts, favoriteExperts]) => {
        this.experts = experts;
        this.favoriteExpert = favoriteExperts;
        this.sortByFiler();
      });

    this.getAllUser();
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
    this.filter.mapView = this.isMapView;
    this.storeFilters();
  }

  keyWordtextChanged() {
    this.filter.expertSearchValue = this.keyWords;
    this.storeFilters();
    this.inputCharacterChanges++;
    console.log(this.inputCharacterChanges);
    this.expertService.findExpertTestUsingGET(this.keyWords.replace(' ', '_')).subscribe((data: Expert[]) => {
      this.experts = data;
    });
    this.searchFromArray(this.experts, this.keyWords);
  }

  sortByNameASC() {
    this.filter.order = FilterOrder.ASC;
    this.storeFilters();
    this.experts.sort((a,b) => {
      if(a.name < b.name) { return -1; }
    if(a.name > b.name) { return 1; }
    return 0;
    });
  }
  sortByNameDESC() {
    this.filter.order = FilterOrder.DESC;
    this.storeFilters();
    this.experts.sort((a,b) => {
      if(a.name < b.name) { return 1; }
    if(a.name > b.name) { return -1; }
    return 0;
    });
  }
  sortByDistanceASC() {
    this.filter.order = FilterOrder.DIST_ASC;
    this.storeFilters();
    this.experts.sort((a,b) => {
      if(a.distanceMeter < b.distanceMeter) { return -1; }
    if(a.distanceMeter > b.distanceMeter) { return 1; }
    return 0;
    });
  }
  sortByDistanceDESC() {
    this.filter.order = FilterOrder.DIST_DESC;
    this.storeFilters();
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

  handleIncomingExperts(experts: Expert[]) {
    this.experts = experts;
  }

  getAllUser() {
    this.userService.getAllUsingGET1().subscribe((users: User[]) => {
      this.users = users;
    });
    this.userService.findFollowersByUsersUsingGET().subscribe((friends: User[]) => {
      this.friends = friends;
    });
  }
  getFriends() {
   
    this.userService.findFollowersByUsersUsingGET().subscribe((friends: User[]) => {
      this.users = friends;
    });
    //this.users = this.friends;
  }

  userKeyWordtextChanged() {
    this.filter.userSearchValue = this.keyWordsUserSearch;
    this.storeFilters();
    if(this.keyWordsUserSearch === '') {
      this.getAllUser();
    }
    this.userService.searchUserWithQueryUsingGET(this.keyWordsUserSearch.replace(' ', '_')).subscribe((data: User[]) => {
      this.users = data;
    });
  }

  isFriend(user: User) {
    return !!this.friends.find(friend => friend.id === user.id);
  }

  getAllFriendsExperts() {
    this.expertService.findAllFollowersExpertsUsingGET().subscribe((expert: Expert[]) => {
      this.experts = expert;
      this.sortByFiler();
    });
  }

}


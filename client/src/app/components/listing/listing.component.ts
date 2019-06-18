import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { Expert } from 'src/app/models/expert.model';
import { CommunicationService } from 'src/app/shared/services/communication.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})

export class ListingComponent implements OnInit {
  experts: Expert[] = [];
  favoriteExpert: Expert[] = [];
  constructor(private expertService: ExpertService, private communicationService: CommunicationService) { }

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
    this.expertService.getFavoriteExperts().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      }
    );
  }
  getAllExperts() {
    window.location.reload();
    this.expertService.listAllExperts().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      }
    );
  }
  loadData() {
    this.expertService.listAllExperts().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      });
      this.expertService.getFavoriteExperts().subscribe(
        (data: Expert[]) => {
          this.favoriteExpert = data;
        });
  }

  isFavoriteExpert(expert: Expert): boolean {
    for (let i = 0; i < this.favoriteExpert.length; i++) {
      if (expert.id === this.favoriteExpert[i].id) {
        return true;
      }
    }
    return false;
  }
  addToFavorite(expert : Expert) {
    this.favoriteExpert.push(expert);
    this.isFavoriteExpert(expert);
  }
  removeFromFavorite(expert : Expert) {
    this.favoriteExpert = this.favoriteExpert.filter(obj => obj !== expert);
    this.isFavoriteExpert(expert);

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { Expert } from 'src/app/models/expert.model';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  experts: Expert[] = [];
  favoriteExpert: Expert[] = [];
  constructor(private expertService: ExpertService) { }

  ngOnInit() {
    this.loadData();
  }

  getFavoriteExperts() {
    this.expertService.getFavoriteExperts().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      }
    );
  }
  getAllExperts() {
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
      console.log(true);
        return true;
      }
    }
    console.log('false');
    return false;
  }

}

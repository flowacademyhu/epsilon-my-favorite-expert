import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { Expert } from 'src/app/models/expert.model';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
  experts: any[];
  constructor(private expertService: ExpertService) { }

  ngOnInit() {
    this.expertService.listAllExperts().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      });
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

}

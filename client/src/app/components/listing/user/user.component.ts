import { Component, OnInit, Input } from '@angular/core';
import { ExpertService } from 'src/app/shared/services/expert.service';
import { Expert } from 'src/app/models/expert.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: any;

  experts: Expert[] = [];

  showFavorites = false;

  constructor(private expertService: ExpertService) { }

  ngOnInit() {
    this.loadData();
  }
  getAllExperts() {
    this.loadData();
    if (this.showFavorites === false){
        this.showFavorites = true;
        this.expertService.getFavoriteExperts().subscribe(
          (data: Expert[]) => {
            this.experts = data;
          }
        );
    } else {
      this.showFavorites = false;
    }
  }
  loadData() {
    this.expertService.listAllExperts().subscribe(
      (data: Expert[]) => {
        this.experts = data;
      });
  }
}

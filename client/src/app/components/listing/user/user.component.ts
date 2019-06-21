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

  favoriteExpert: Expert[] = [];

  showFavorites = false;

  constructor(private expertService: ExpertService) { }

  ngOnInit() {
  }
  getAllExperts() {
    this.loadData();
    if (this.showFavorites === false){
        this.showFavorites = true;
    } else {
      this.showFavorites = false;
    }
  }
  loadData() {
      this.expertService.getFavoriteExperts().subscribe(
        (data: Expert[]) => {
          this.favoriteExpert = data;
        });
  }
}

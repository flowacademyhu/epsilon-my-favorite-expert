import { Component, OnInit, Input } from '@angular/core';
import { Expert } from 'src/app/models/expert.model';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {
  @Input()
  expert: Expert;

  @Input()
  isFavoriteExpert: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  removeFromFavorite() {
    this.userService.removeFromFavorite(this.expert);
    this.isFavoriteExpert == false;
  }

  addToFavorite() {
    this.userService.addToFavorite(this.expert);
    this.isFavoriteExpert == true;

  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Expert } from 'src/app/models/expert.model';
import { UserService } from 'src/app/shared/services/user.service';
import { ListingComponent } from '../listing.component';
import { Observable, observable } from 'rxjs';
import { CommunicationService } from 'src/app/shared/services/communication.service';

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
  constructor(private userService: UserService,private communicationService: CommunicationService) { }

  ngOnInit() {
  }

  removeFromFavorite() {
    this.isFavoriteExpert = !this.isFavoriteExpert;
   this.communicationService.removeFromFavorite(this.expert);
   this.userService.removeFromFavorite(this.expert).subscribe((data: any) => {
        console.log('sikeresen torolve');
      });

  }
  addToFavorite() {
    this.isFavoriteExpert = !this.isFavoriteExpert;
   this.communicationService.addToFavorite(this.expert);
     this.userService.addToFavorite(this.expert).subscribe(
      (data: any) => {
        console.log('sikeresen hozzaadva a kedvencekhez');
      }
    );
  }
}

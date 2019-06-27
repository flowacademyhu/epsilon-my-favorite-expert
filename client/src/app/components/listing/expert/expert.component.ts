import { Component, OnInit, Input } from '@angular/core';
import { Expert } from '../../../api/model/expert';
import { UsersResourceService } from '../../../api/api/usersResource.service';
import { CommunicationService } from 'src/app/shared/services/communication.service';
import { TranslateService } from '@ngx-translate/core';

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
  constructor(private userService: UsersResourceService,private communicationService: CommunicationService,
    private translate: TranslateService) {
     }

  ngOnInit() {
  }

  removeFromFavorite() {
    this.isFavoriteExpert = !this.isFavoriteExpert;
   this.communicationService.removeFromFavorite(this.expert);
   this.userService.deleteExpertFromUserUsingDELETE(this.expert.id).subscribe((data: any) => {
      });

  }
  addToFavorite() {
    this.isFavoriteExpert = !this.isFavoriteExpert;
   this.communicationService.addToFavorite(this.expert);
     this.userService.addExpertToUserUsingPUT(this.expert.id).subscribe(
      (data: any) => {
      }
    );
  }
}

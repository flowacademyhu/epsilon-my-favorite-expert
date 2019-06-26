import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Expert } from '../../../api/model/expert';
import { UsersResourceService, User } from 'src/app/api';
import { CommunicationService } from 'src/app/shared/services/communication.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: User;

  @Input()
  isFriend: boolean;

  @Input()
  isUserCommonFilterActive: boolean;

  @Input()
  isUserFavoriteFilterActive: boolean;

  @Output() sendUserExperts = new EventEmitter<Expert[]>();

  showFavorites = false;

  constructor(private userResource: UsersResourceService,
    private communicationService: CommunicationService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    if (this.isUserCommonFilterActive) {
      this.commonExperts();
    }
    if (this.isUserFavoriteFilterActive) {
      this.getExperts();
    }
  }

  getExperts() {
    this.userResource.findAllExpertOfUserUsingGET(this.user.id).subscribe((experts: Expert[]) => {
      this.sendUserExperts.next(experts);
    });
    this.communicationService.userExpert(this.user);
    }
    commonExperts() {
    // TODO FIND COMMON EXPERTS
    this.userResource.findUsersExpertsUnionUsingGET(this.user.id).subscribe((experts: Expert[])=> {
      this.sendUserExperts.next(experts);
    });
    this.communicationService.commonFilter(this.user);

    }
    addFriend() {
      this.isFriend = !this.isFriend;
      this.communicationService.addFriend(this.user);
      this.userResource.addFollowerToUserUsingPUT(this.user.id).subscribe((user: User) => {
      });
    }

    removeFriend() {
      //TODO isFriend bolean
      this.isFriend = !this.isFriend;

      this.communicationService.removeFriend(this.user);
      //TODO remove in server
      this.userResource.deleteFollowerFromUserUsingDELETE(this.user.id).subscribe(() => {
        
      });

    }
  }


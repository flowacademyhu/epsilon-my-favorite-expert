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
  isFriend : boolean;

  @Output() sendUserExperts = new EventEmitter<Expert[]>();

  showFavorites = false;

  constructor(private userResource: UsersResourceService,
    private communicationService: CommunicationService) { }

  ngOnInit() {
  }

  getExperts() {
    this.userResource.findAllExpertOfUserUsingGET(this.user.id).subscribe((experts: Expert[]) => {
      this.sendUserExperts.next(experts);
    });
    }
    commonExperts() {
    // TODO FIND COMMON EXPERTS
    this.userResource.findUsersExpertsUnionUsingGET(this.user.id).subscribe((experts: Expert[])=> {
      this.sendUserExperts.next(experts);
    })
    }
    addFriend() {
      this.isFriend = !this.isFriend;
      this.communicationService.addFriend(this.user);
      //TODO add in server
      this.userResource.addFollowerToUserUsingPUT(this.user.id);
    }

    removeFriend() {
      //TODO isFriend bolean
      this.isFriend = !this.isFriend;

      this.communicationService.removeFriend(this.user);
      //TODO remove in server
      this.userResource.deleteFollowerFromUserUsingDELETE(this.user.id);

    }
  }


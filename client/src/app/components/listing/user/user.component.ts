import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Expert } from '../../../api/model/expert';
import { UsersResourceService, User } from 'src/app/api';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: User;

  @Output() sendUserExperts = new EventEmitter<Expert[]>();

  showFavorites = false;

  constructor(private userResource: UsersResourceService) { }

  ngOnInit() {
  }

  getExperts() {
    this.userResource.findAllExpertOfUserUsingGET(this.user.id).subscribe((experts: Expert[]) => {
      this.sendUserExperts.next(experts);
    });
    }
    commonExperts() {
    // TODO FIND COMMON EXPERTS
    
    }
  }

  


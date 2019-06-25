import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Expert } from '../../../api/model/expert';
import { UsersResourceService } from 'src/app/api';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  user: any;

  @Output() sendUserExperts = new EventEmitter<Expert[]>();

  showFavorites = false;

  constructor(private userResource: UsersResourceService) { }

  ngOnInit() {
  }

  getExperts() {
    // TODO LIST ALL FAVORITE EXPERTS
    this.userResource.findExpertsByUsersUsingGET(this.user.name).subscribe((experts: Expert[]) => {
      this.sendUserExperts.next(experts);
    });

    }
  }

  


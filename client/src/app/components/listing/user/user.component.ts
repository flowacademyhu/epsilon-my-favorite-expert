import { Component, OnInit, Input } from '@angular/core';
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


  showFavorites = false;

  constructor(private userResource: UsersResourceService) { }

  ngOnInit() {
  }

  getExperts() {
    // TODO LIST ALL FAVORITE EXPERTS
    this.userResource.findExpertsByUsersUsingGET(this.user.id).subscribe((experts: Expert[]) => {
      
    }) 

    }
  }

  


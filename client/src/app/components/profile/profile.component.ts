import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;

  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.userservice.getByToken().subscribe(
      (data: any) => {
        this.user = data;
        console.log(this.user)
      }
      
    )
  
  }

}

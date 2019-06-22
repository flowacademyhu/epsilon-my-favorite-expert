import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserControllerService } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private user: UserControllerService
  ) {}

  getLoggedInUser(): any {
    return this.user.getCurrentUserUsingGET();
  }

}

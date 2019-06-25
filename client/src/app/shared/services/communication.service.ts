import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Expert } from '../../api/model/expert';
import { User } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public addExpertSubject = new Subject<Expert>();
  public removeExpertSubject = new Subject<Expert>();
  public addFriendSubject = new Subject<User>();
  public removeFriendSubject = new Subject<User>();
  constructor() { }

  public addToFavorite(expert: Expert) {
    this.addExpertSubject.next(expert);
  }
  public removeFromFavorite(expert: Expert) {
    this.removeExpertSubject.next(expert);
  }

  public addFriend(user: User) {
    this.addFriendSubject.next(user);
  }
  public removeFriend(user: User) {
    this.removeFriendSubject.next(user);
  }
}

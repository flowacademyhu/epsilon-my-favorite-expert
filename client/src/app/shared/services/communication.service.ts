import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Expert } from '../../api/model/expert';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  public addExpertSubject = new Subject<Expert>();
  public removeExpertSubject = new Subject<Expert>();
  constructor() { }

  public addToFavorite(expert: Expert) {
    this.addExpertSubject.next(expert);
  }
  public removeFromFavorite(expert: Expert) {
    this.removeExpertSubject.next(expert);
  }
}

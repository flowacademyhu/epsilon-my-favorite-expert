import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from 'src/app/models/address.model';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { Expert } from 'src/app/models/expert.model';

const BASE_URI = 'http://localhost:8080/auth/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${BASE_URI}/get`);
  }
  addAddress(address: Address) {
    return this.http.post(`${BASE_URI}/save-address`,address);
  }
  addToFavorite(expert: Expert) {
    return this.http.put(`${BASE_URI}/add-expert/${expert.id}`, expert);
  }
  removeFromFavorite(expert: Expert) {
    return this.http.put(`${BASE_URI}/delete-expert/${expert.id}`, expert);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Expert } from 'src/app/models/expert.model';

const BASE_URI = 'http://localhost:8080/auth/expert';
@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(private http: HttpClient) { }

  // getSMT(token: string) {
  //   console.log(token);
  //   const headers = new HttpHeaders({
  //     'Authorization' : token,
  //     'Content-Type' : 'application/json',
  //   });
  //   const defaults = {headers: headers};
  //     return this.http.get('http://localhost:8080/auth/expert/list');
  // }
  addExpert(expert: Expert) {
    console.log("expert:" + expert.name + expert.address+expert.phone+expert.profession);
      return this.http.post(`${BASE_URI}/add`, expert);
  }

  listAllExperts() {
    return this.http.get(`${BASE_URI}/getall`);
  }
  getFavoriteExperts() {
    return this.http.get(`${BASE_URI}/favorite`);
  }
}


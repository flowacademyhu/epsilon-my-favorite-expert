import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Address } from 'src/app/models/address.model';

const BASE_URI = 'http://localhost:8080/auth/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    return this.http.get(`${BASE_URI}/get`);
  }
  addAddress(address: Address) {
    return this.http.post(`${BASE_URI}/save-address`,address);
  }
}


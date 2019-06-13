import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  token = '';

  getToken(){
    return this.token;
  }

  saveToken(token){
    this.token = token;
    console.log("servicetoken: " + this.token);
  }

  getByToken(){
    return this.http.get(`http://localhost:8080/auth/user/get/` + this.token);
  }

  getSMT(token: string) {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     "Authorization": "Bearer " + token
    //   })
    // };
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': token,
      'Content-Type': 'application/json',
  });
  const defaults = {headers: headers};
    return this.http.get('http://localhost:8080/auth/user/getall',defaults);
  }
}

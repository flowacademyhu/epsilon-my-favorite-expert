import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(private http: HttpClient) { }

  getSMT(token: string) {
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization' : token,
      'Content-Type' : 'application/json',
    });
    const defaults = {headers: headers};
      return this.http.get('http://localhost:8080/auth/expert/list');
  }
  addExpert(token: string) {
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization' : token,
      'Content-Type' : 'application/json',
    });
    const defaults = {headers: headers};
      return this.http.post('http://localhost:8080/auth/expert/add',defaults,);
  }
  }
}

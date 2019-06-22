import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ILocation } from 'src/app/ilocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  location: ILocation;
  constructor(private http: HttpClient) { }

  getLocation(){
  navigator.geolocation.getCurrentPosition((pos) => {
    console.log(pos.coords);
    let httpParams = new HttpParams();
    this.location = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    };
    localStorage.setItem('locationLon', this.location.lon.toString());
    localStorage.setItem('locationLat', this.location.lat.toString());

    httpParams = httpParams.set('lat', pos.coords.latitude.toString())
    httpParams = httpParams.set('lon', pos.coords.longitude.toString())
    httpParams = httpParams.set('format', 'json')
    this.http.get<any>('https://nominatim.openstreetmap.org/reverse', {params: httpParams})
      .subscribe((countryData) => {
        console.log(countryData);
        console.log(countryData.address.country_code);
    });
  });
}
}

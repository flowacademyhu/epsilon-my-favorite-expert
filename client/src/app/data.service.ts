import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ilist } from './components/Ilist';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  receivedData = [
    {name: 'Hajnal Andor', mesterseg: 'kőműves', email: 'hajn@hajnalmail.com'},
    {name: 'Varga Alexandra', mesterseg: 'ács', email: 'wundersindi@T-systemsmail.com'},
    {name: 'Hajnal Andor', mesterseg: 'kőműves', email: 'hajn@hajnalmail.com'},
    {name: 'Varga Alexandra', mesterseg: 'ács', email: 'wundersindi@T-systemsmail.com'} 
  ];
  constructor() { }
  getData(){
    return this.receivedData;
  }
}

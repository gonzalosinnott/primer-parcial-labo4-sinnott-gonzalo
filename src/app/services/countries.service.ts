import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) { }

  getCountries() { 
    return this.http.get("https://restcountries.com/v3.1/region/europe");
  } 
  
  getCountryByName(name:any) { 
    var api = "https://restcountries.com/v3.1/name/" + name;	
    return this.http.get(api);
  }   
}

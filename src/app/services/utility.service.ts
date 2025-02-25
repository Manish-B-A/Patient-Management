import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  quote;
  constructor(private httpClient: HttpClient) { }

  getQuote(){
    //wol3TEufLDGEMBaE7Vdzxw==jMw8me9HbJpv8SN3

    return this.httpClient.get('https://api.api-ninjas.com/v1/quotes', {headers:{'X-Api-Key': 'wol3TEufLDGEMBaE7Vdzxw==jMw8me9HbJpv8SN3'}})
    
  }

  
}

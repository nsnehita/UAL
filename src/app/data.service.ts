import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from './Flight';

@Injectable()
export class DataService {
  baseUrl: string = "http://localhost:3000";
  flights:  Flight[];

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this.baseUrl + '/flights').subscribe((res: Flight[]) => {
      this.flights =  res ;
    });
  }


  get_flights() {
    //return this.httpClient.get(this.baseUrl + '/flights');
    return this.flights;
  }



}

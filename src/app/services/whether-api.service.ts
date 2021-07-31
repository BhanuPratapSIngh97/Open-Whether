import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WhetherApiService {

  constructor(
    private http: HttpClient
  ) { }

  getWhetherReport(city){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=736c70971e6f607697e02c45d6a60b99') 
  }
}

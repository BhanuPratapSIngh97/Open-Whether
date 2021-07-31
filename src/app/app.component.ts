import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WhetherApiService } from './services/whether-api.service';
import { NotifierService } from 'angular-notifier';
import { country as Country } from './country.metadata'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private readonly notifier: NotifierService;
  title = 'Open-Whether';
  City : String = 'City Name';
  Country : String = 'IN';
  Temp : String = "00°";
  Humidity : String;
  Description : String = 'Description';
  Weather : String;
  Wind_Speed : String = '0 Km/h';
  icon = 'Clear';
  Date : String = 'Mon Jan 01 2020 00:00:00';
  newDate : String = 'Mon Jan 01 2020 00:00:00';
  time : String = 'day';
  pic_arr = ['Clouds','Haze','Rain','Thunderstorm','day','Drizzle','Mist','Clear','night']
  constructor(
    private whetherService : WhetherApiService,
    notifierService: NotifierService
  ){
    this.notifier = notifierService
  }
  ngOnInit(){
    this.getWhetherReport('delhi');
  }


  onSubmit(form:NgForm){ //use form:HTMLFontElement to get whole code of Form
    let city;
    if(form.value.cityname){
      city = form.value.cityname;
    }
    this.getWhetherReport(city);
  }

  getWhetherReport(city){
    this.whetherService.getWhetherReport(city).subscribe((res)=>{
        if(res){
                this.Date = ((new Date()).toString()).split("GMT")[0];
                this.newDate = (((new Date()).toString()).split("GMT")[0]).split(" ")[4].split(":")[0];
                if(+this.newDate >= 6 && +this.newDate <= 19 ){
                  this.time = 'day'
                }else{
                  this.time = 'night'
                }
                this.City = res['name'];
                let c = res['sys']['country'];
                Country.map(obj=>{
                  if(c == obj.key){
                    this.Country = obj.value;
                  }
                })
                this.Temp =(Math.round(res['main']['temp'] - 273.15)+'°');
                this.Humidity = res['main']['humidity']+'%';
                this.Description = res['weather'][0]['description'];
                this.Weather = res['weather'][0]['main'];
                this.Wind_Speed = (res['wind']['speed'] * 10).toFixed(2) +' Km/h' ;
               this.pic_arr.includes(res['weather'][0]['main'])?  this.icon = res['weather'][0]['main'] :  this.icon = 'Clear';
        }
        else{
          this.notifier.notify('error','Please Enter a Valid City Name..!')        
        }
      })
  }

}

import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { DataService } from './data.service';
import { Flight } from './flight';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  angularForm: FormGroup; 
  message: string;

  private flights: Flight[] = [];

  constructor(private dataService: DataService, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.angularForm = this.fb.group({
      flightNumber: [''],
      origin: [''],
      destination: [''],
      fdate: ['', Validators.required],

    }, {
        //Validation rules
      });

  }





  get_flights() {
    // (Flight Number || (Origin && Destination)) && Date 
    if (this.angularForm.value['flightNumber'] || (this.angularForm.value['origin'] && this.angularForm.value['destination'])) {
      //console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.angularForm.value))
      ///this.dataService.get_flights().subscribe((res: Flight[]) => {
        this.flights = this.filterFlights(this.dataService.get_flights() );
      //});
    }
    else {
      this.message = "Please enter Date along with either flight number or both origin & destination codes!"
      return;
    }
  }


  filterFlights(webResp: Flight[]){
    let results: Flight[] = [];
    let flightNumber = this.angularForm.value['flightNumber'] ;
    let origin = this.angularForm.value['origin'].toUpperCase() ;    
    let destination = this.angularForm.value['destination'].toUpperCase();
    let fdate = this.angularForm.value['fdate'];

    for (let index = 0; index < webResp.length; index++) {
      const f :Flight  = webResp[index];
      if(flightNumber && f.flightNumber != flightNumber) continue;
      if(origin && f.origin != origin) continue;
      if(destination && f.destination != destination) continue;
      if(f.departure.startsWith(fdate) ||   f.arrival.startsWith(fdate )) 
            results.push(f);
    }

    if(results.length == 0)
      this.message = "No results found";
      else
      this.message = results.length +" results found";


    return results;
  }






}

import { Component } from '@angular/core';
import { Patient } from './classes/patient';
import { PatientService } from './services/patient.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Patient Manager Evaluation';
  title2 = 'Patients';
  disclaimer = 'This app was developed for evaluation purposes.';
  copyright = 'Copyright (c) ' + new Date().getFullYear().toString();
  author =  'Emil Cobarrubia';
  email = 'emil.cobarrubia@gmail.com';

  //@ViewChild(MatSidenav) sidenav: MatSidenav;
  events: string[] = [];
  opened: boolean = true;



  displayedColumns: string[] = ['pid', 'firstName', 'lastName','birthDate', 'gender'];
  
  //declarations
  dataSource: Patient[] = [];
  
  columnsToDisplay: string[] = ['pid', 'firstName', 'lastName','birthDate', 'gender'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  //expandedElement: Patient | null;

  constructor(private patientService: PatientService){
    //No need to call this.getPatients() in constructor as it's not best practice.
    //Keep constructor lean and use it to initalize params
    //Do not use constructor to call functions that make HTTP requests or load data.
    //This allows for better error handling
    //load data on ngOnInit.

  }

  ngOnInit(): void{

    //Load data and perform logic on OnInit()
    this.getPatients();
  }

  getPatients(): void {

    //Asynchronous call
    this.patientService.getPatients().subscribe(patients => this.dataSource=patients);
  }

}

import { Component, OnInit } from '@angular/core';
import {NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../classes/patient';

import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';


@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  imports: [NgFor, NgIf , UpperCasePipe, RouterModule ]
})
export class DashboardComponent implements OnInit {
  patients: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(patients => this.patients=patients);
  }
}
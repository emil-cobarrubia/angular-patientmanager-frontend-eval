import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientTableComponent } from './components/patient-table/patient-table.component';
import { AssignmentDetailsComponent } from './components/assignment-details/assignment-details.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';

const routes: Routes = [
  { path: '', redirectTo: '/patients', pathMatch: 'full' }, //default routing
  { path: 'dashboard', component: DashboardComponent }, //URL "suffix" to component
  { path: 'patients', component: PatientTableComponent },
  {path: 'assignmentdetails', component: AssignmentDetailsComponent},
  {path: 'aboutme', component: AboutmeComponent}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) //start listening for browser location changes
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
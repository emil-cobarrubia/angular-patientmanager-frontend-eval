import { Component, Inject, OnInit } from '@angular/core';
import { Genders } from '../../data/gender-data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { Patient } from '../../classes/patient';
import { FormGroup, FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PatientService } from '../../services/patient.service';
import { NgForm } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-patient-add-modify',
  templateUrl: './patient-add-modify.component.html',
  styleUrl: './patient-add-modify.component.css'
})
export class PatientAddModifyComponent implements OnInit {
  genders = Genders;
  title: string = "";
  inputParams: any;

  frmMain = this.formBuilder.group
  (
    {
      //defaultvalues
      firstName: this.formBuilder.control(''), 
      lastName: this.formBuilder.control(''), 
      birthDate: this.formBuilder.control(''),
      gender: this.formBuilder.control('')
    }
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private dialogRef: MatDialogRef<PatientAddModifyComponent>, 
    private formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private patientService: PatientService)
  {
  }

  getPatientById(pid: number): void{
    this.patientService.getPatient(pid).subscribe(
      (patients: any)=>{ 
        if(patients.length == 0)
          return;

        let patient = patients[0];

        let firstName: any = patient.firstName;
        let lastName: any = patient.lastName;
        let gender: any;

        switch(patient.gender)
        {
          case "Male": {
            gender = "M";
            break;
          }
          case "Female": {
            gender = "F";
            break;
          }
          default: {
            gender = "U"
            break;
          }
        }

        let birthDate: any = new Date(patient.birthDate);

        this.frmMain.controls.firstName.setValue(firstName);
        this.frmMain.controls.lastName.setValue(lastName);
        this.frmMain.controls.gender.setValue(gender);
        this.frmMain.controls.birthDate.setValue(birthDate);
      });
  }

  ngOnInit(): void {
    this.inputParams = this.data;

    //Edit Mode
    if(this.inputParams.pid != null)
      this.getPatientById(this.inputParams.pid);

  }

  cancelDialog(): void{
    this.dialogRef.close();
  }

  save(): void{
    let birthDate: any = this.frmMain.value.birthDate;
    
    let firstName = this.frmMain.value.firstName;
    let lastName = this.frmMain.value.lastName;
    let gender = this.frmMain.value.gender;

    if(firstName == null || firstName == "" || lastName == null || lastName == "")
    {
      this.openSnackBar("Please fill in required fields.", "OK");
      return;
    }

    let p = {
      pid: this.inputParams.pid,
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      birthDate: birthDate.getFullYear() + "-" + birthDate.getMonth() + "-" + birthDate.getDay()
    };
    
    //New Patient
    if(this.inputParams.pid == null)
    {
      this.patientService.addPatient(p).subscribe((result)=>{ 
        this.inputParams.parentForm.getPatients();
        this.openSnackBar(p.firstName + " " + p.lastName + " added.", "Close");
      }
      );
    }
    else //Update Patient
    {
      this.patientService.updatePatient(p).subscribe(
        (result)=>
        { 
          this.inputParams.parentForm.getPatients();
          this.openSnackBar(p.firstName + " " + p.lastName + " updated.", "Close");
        }
      );

      this.dialogRef.close();
    }
    
    this.clear();
  }

  clear(): void {
    this.frmMain.reset();
    this.frmMain.controls.firstName.setErrors(null);
    this.frmMain.controls.lastName.setErrors(null);
    this.frmMain.controls.gender.setErrors(null);
    this.frmMain.controls.birthDate.setErrors(null);
  }

  openSnackBar(message: string, action: string): void
  {
    this.snackBar.open(message, action);
  }
}

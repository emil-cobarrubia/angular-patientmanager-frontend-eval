import { Component,  EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Patient } from '../../classes/patient';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { PatientService } from '../../services/patient.service';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PatientAddModifyComponent } from '../patient-add-modify/patient-add-modify.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmActionComponent } from '../confirm-action/confirm-action.component';
import { FileuploadService } from '../../services/fileupload.service';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class PatientTableComponent {
  displayedColumns: string[] = ['pid', 'firstName', 'lastName','birthDate', 'ageYears', 'gender', 'actions'];
  progress!: number;
  message!: string;
  dataSource: any;
  refreshUsers$ = new BehaviorSubject<boolean>(true); //observable subscribable.  Initial value is true
  title!: string;
  okToDelete!: boolean;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  
  @Output() public onUploadFinished = new EventEmitter();
  
  constructor(private patientService: PatientService, 
    private http: HttpClient, private dialogRef: MatDialog, private snackBar: MatSnackBar, private fileUploadService: FileuploadService)
    {

    }

  addNewPatientDialog(): void
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";

    var response = this.dialogRef.open(PatientAddModifyComponent, 
                                        { data: 
                                          {
                                            title: "New Patient",
                                            parentForm: this
                                          }
                                        }
                                      );
    response.afterClosed().subscribe(item=>
      {
        this.getPatients();
        console.log();
      }
      )
  }

  modifyPatientDialog(pid: number): void
  {
    var response = this.dialogRef.open(PatientAddModifyComponent, 
                                        { data: 
                                          {
                                            pid: pid,
                                            title: "Edit Patient"
                                          }
                                        }
                                      );
  }

  //Initialization
  ngOnInit(): void
  {
    //Load data and perform logic on OnInit()
    this.getPatients();
  }

  getPatients(): void 
  {
    //Asynchronous call
    this.patientService.getPatients().subscribe
    (patients => 
      {
        this.dataSource = new MatTableDataSource<Patient>(patients);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      
    );
  }

  filter(data: Event) 
  {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }

  deleteAllPatients(): void
  {
    if(this.dataSource.length == 0)
    {
      this.openSnackBar("No records to delete.", "OK");
      return;
    }
    this.patientService.deleteAllPatients().subscribe
    (result =>
      { 
        this.getPatients();
        this.openSnackBar("All Patients Deleted.", "Close");
      }
    );
  }

  confirmDeleteAllPatients(): void
  {
    this.okToDelete = false;
    var response = this.dialogRef.open(ConfirmActionComponent, 
                                                              { data: 
                                                                {
                                                                  title: "Delete All Patients",
                                                                  message: "Are you sure you want to delete ALL patients?",
                                                                  parentForm: this
                                                                }
                                                              }
                                      );
    response.afterClosed().subscribe
    (result=>
      {
        //this.okToDelete = result;
        if(this.okToDelete)
          this.deleteAllPatients();
      }
    )
  }

  confirmDeletePatient(patient: any): void
  {
    this.okToDelete = false;
    var response = this.dialogRef.open(ConfirmActionComponent, 
                                                              { data: 
                                                                {
                                                                  title: "Delete Patient",
                                                                  message: "Are you sure you want to delete " + patient.firstName + " " + patient.lastName + "?",
                                                                  parentForm: this
                                                                }
                                                              }
                                      );
    
    response.afterClosed().subscribe
    (result=>
      {
        //this.okToDelete = result;
        if(this.okToDelete)
          this.deletePatient(patient);
      }
    )
  }

  deletePatient(patient: any): void
  {
    this.patientService.deletePatient(patient.pid).subscribe
    (patients => 
        {
          this.getPatients();
          this.openSnackBar(patient.firstName + " " + patient.lastName + " has been deleted.", "Close");
        }
    );
  }

  openSnackBar(message: string, action: string): void
  {
    this.snackBar.open(message, action);
  }

  uploadFile(files: any)
  {
    if (files.length === 0) 
    {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.fileUploadService.uploadFile(formData).subscribe({
            next: (event?) => {
            if (event.type === HttpEventType.UploadProgress)
            {
              let total = (event.total == null) ? 1 : event.total;
              this.progress = Math.round(100 * event.loaded / total);
            }
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.getPatients();
              
              this.onUploadFinished.emit(event.body);
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
  }

  // uploadFile = (files: any) => 
  // {
  //   if (files.length === 0) 
  //   {
  //     return;
  //   }
  //   let fileToUpload = <File>files[0];
  //   const formData = new FormData();
  //   formData.append('file', fileToUpload, fileToUpload.name);
    
  //   this.http.post('https://localhost:7191/api/FileUpload', formData, {reportProgress: true, observe: 'events'})
  //     .subscribe({
  //       next: (event?) => {
  //       if (event.type === HttpEventType.UploadProgress)
  //       {
  //         let total = (event.total == null) ? 1 : event.total;
  //         this.progress = Math.round(100 * event.loaded / total);
  //       }
  //       else if (event.type === HttpEventType.Response) {
  //         this.message = 'Upload success.';
  //         this.getPatients();
          
  //         this.onUploadFinished.emit(event.body);
  //       }
  //     },
  //     error: (err: HttpErrorResponse) => console.log(err)
  //   });
  // }
}

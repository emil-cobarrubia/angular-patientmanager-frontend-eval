import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PatientTableComponent } from '../patient-table/patient-table.component';

@Component({
  selector: 'app-button-file-upload',
  templateUrl: './button-file-upload.component.html',
  styleUrl: './button-file-upload.component.css'
})

export class ButtonFileUploadComponent implements OnInit {
  progress!: number;
  message!: string;
  
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    
    this.http.post('https://localhost:7191/api/FileUpload', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
        {
          let total = (event.total == null) ? 1 : event.total;
          this.progress = Math.round(100 * event.loaded / total);
        }
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });

    
  }
 }

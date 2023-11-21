import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private fileUploadUrl = "https://localhost:7191/api/FileUpload";

  constructor(private http: HttpClient) 
  {
  }

  uploadFile(data: any): Observable<any>
  { 
    return this.http.post(this.fileUploadUrl, data, {reportProgress: true, observe: 'events'}).pipe(
           tap((x) => this.log(`File Uploaded/`)),
           catchError(this.handleError<any>('Error uploading file.'))
    );
  }

  private log(message: string)
  {
     console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) 
  {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}

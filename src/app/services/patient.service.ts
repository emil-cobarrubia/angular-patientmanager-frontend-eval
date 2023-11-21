import { Patient } from '../classes/patient';
import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // private patientsUrl: string;
  private patientsUrl = "https://localhost:7191/api/Patients";
  // private patientsUrl: string;

  constructor(private http: HttpClient) 
  {
  }

  //Asynchronous calls using Observables.
  //Observables are like promises except that it deals with groups of calls over time.
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.patientsUrl); 
  }

  //Asynchronous function
  getPatient(id: number): Observable<Patient> {
    const url = `${this.patientsUrl}?id=${id}`;
    return this.http.get<Patient>(url).pipe(
      tap(_ => this.log(`fetched patient id=${id}`)),
      catchError(this.handleError<Patient>(`getPatient id=${id}`))
    );
  }

  /* GET patients whose name contains search term */
  searchPatients(term: string): Observable<Patient[]> {
  if (!term.trim()) {
    // if not search term, return empty patient array.
    return of([]);
  }
  return this.http.get<Patient[]>(`${this.patientsUrl}?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found patients matching "${term}"`) :
       this.log(`no patients matching "${term}"`)),
    catchError(this.handleError<Patient[]>('searchPatients', []))
  );
}

  /** PUT: update the patient on the server */
updatePatient(patient: any): Observable<any> {
  return this.http.put(`${this.patientsUrl}?id=${patient.pid}`, patient, this.httpOptions).pipe(
    tap(_ => this.log(`updated patient id=${patient.pid}`)),
    catchError(this.handleError<any>('updatePatient'))
  );
}

/** POST: add a new patient to the server */
addPatient(patient: any): Observable<Patient> {
  return this.http.post<Patient>(this.patientsUrl, patient, this.httpOptions).pipe(
    tap((newPatient: Patient) => this.log(`added patient w/`)),
    catchError(this.handleError<Patient>('addPatient'))
  );
}

/** DELETE: delete the patient from the server */
deletePatient(id: number): Observable<Patient> {
  const url = `${this.patientsUrl}?id=${id}`;

  return this.http.delete<Patient>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted patient id=${id}`)),
    catchError(this.handleError<Patient>('deletePatient'))
  );
}

deleteAllPatients(): Observable<Patient> {
  const url = `${this.patientsUrl}`;

  return this.http.delete<Patient>(url, this.httpOptions).pipe(
    tap(_ => this.log(`All patients deleted`)),
    catchError(this.handleError<Patient>('deletePatient'))
  );
}

  private log(message: string){
    console.log(message);
  }

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}


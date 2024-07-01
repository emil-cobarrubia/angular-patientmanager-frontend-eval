import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from './material/material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { PatientTableComponent } from './components/patient-table/patient-table.component';
import { ButtonFileUploadComponent } from './components/button-file-upload/button-file-upload.component';
import { PatientAddModifyComponent } from './components/patient-add-modify/patient-add-modify.component';
import { AssignmentDetailsComponent } from './components/assignment-details/assignment-details.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { ConfirmActionComponent } from './components/confirm-action/confirm-action.component';
import { SidenavEnhComponent } from './components/sidenav-enh/sidenav-enh.component';


@NgModule({ declarations: [
        AppComponent,
        SvgIconComponent,
        PatientTableComponent,
        ButtonFileUploadComponent,
        PatientAddModifyComponent,
        AssignmentDetailsComponent,
        AboutmeComponent,
        ConfirmActionComponent,
        SidenavEnhComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule, AppRoutingModule, MaterialModule, MatIconModule, BrowserAnimationsModule, ReactiveFormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }

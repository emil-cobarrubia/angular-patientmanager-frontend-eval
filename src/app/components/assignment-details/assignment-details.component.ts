import { Component } from '@angular/core';

@Component({
  selector: 'app-assignment-details',
  templateUrl: './assignment-details.component.html',
  styleUrl: './assignment-details.component.css'
})
export class AssignmentDetailsComponent {

  constructor(){

  }

  downloadFile(): void
  {
    window.location.href="https://drive.google.com/file/d/1UAib_oir3grSEu575AjZunOQgCEjqdHC/view?usp=drive_link";
  }
}

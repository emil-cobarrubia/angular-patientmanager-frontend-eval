import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrl: './aboutme.component.css'
})
export class AboutmeComponent {

  goToLinkedIn(): void{
    window.location.href="https://www.linkedin.com/in/emil-cobarrubia-064aab10";
  }

}

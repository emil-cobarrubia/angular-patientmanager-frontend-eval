import { Component, signal } from '@angular/core';
import { MatList } from '@angular/material/list';

export type MenuItem = {
  icon: string;
  title: string;
  route: string;
};

@Component({
  selector: 'app-sidenav-enh',
  templateUrl: './sidenav-enh.component.html',
  styleUrl: './sidenav-enh.component.css'
})

export class SidenavEnhComponent {
  menuItems = signal<MenuItem[]>([
    {
      icon: "account_box",
      title: "Patients",
      route: "patients"
    },
    {
      icon: "assignment",
      title: "Assignment Details",
      route: "assignmentdetails"
    },
    {
      icon: "person",
      title: "Contact Info",
      route: "aboutme"
    }
  ]);
}

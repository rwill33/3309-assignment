import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Service } from './services/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  public items: MenuItem[];

  constructor(private service: Service) {
    this.items = [
      {
        label: "Accounts",
        icon: 'pi pi-user',
        items: [
          {
            label: 'Sign Up',
            routerLink: 'sign-up'
          },
          {
            label: 'Log In',
            routerLink: 'sign-in'
          },
          {
            label: 'Sign Out',
            command: () => {
              this.service.loggedIn = false;
            },
            routerLink: 'sign-in'
          }
        ]
      }
    ];
  }
}

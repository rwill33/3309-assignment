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
  public showCart: boolean = false;

  constructor(public service: Service)  {
    this.items = [
      {
        label: "Accounts",
        icon: 'pi pi-user',
        items: [
          {
            label: 'Log In',
            routerLink: 'sign-in'
          },
          {
            label: 'Sign Up',
            routerLink: 'sign-up'
          },
          {
            label: 'Sign Out',
            command: () => {
              this.service.loggedIn = false;
            },
            routerLink: 'sign-in'
          }
        ]
      },
      {
        label: 'Products',
        icon: 'pi pi-shopping-bag',
        routerLink: 'products'
      },
      {
        label: "Stores",
        icon: 'pi pi-home',
        items: [
          {
            label: "Create Store",
            routerLink: 'store-create'
          },
          {
            label: "Your Store(s)",
            routerLink: 'user-stores'
          },
          {
            label: "search stores",
            routerLink: 'view-store'
          }
        ]
      },
      {
        label: "Orders",
        icon: 'pi pi-dollar',
        routerLink: 'orders'
      }
    ];
  }
}

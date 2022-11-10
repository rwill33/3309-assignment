import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  public items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: "Item",
        items: [
          {
            label: 'Item 2'
          }
        ]
      }
    ];
  }
}

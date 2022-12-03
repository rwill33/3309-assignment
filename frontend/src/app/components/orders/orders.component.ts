import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public service: Service) { }

  async ngOnInit(): Promise<void> {
    if (this.service.customerOrders.length == 0) {
      this.service.customerOrders = await this.service.getCustomerOrders().toPromise();
    }
  }

}

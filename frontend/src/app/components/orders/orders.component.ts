import { formatDate } from '@angular/common';
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
    let orders = await this.service.getCustomerOrders().toPromise();
    orders.forEach((order:any) => {
      const format = 'dd/MM/yyyy';
      const myDate = order.datePlaced;
      const locale = 'en-US';
      order.datePlaced = formatDate(myDate, format, locale);
      order.amount = `$${order.amount.toFixed(2)}`;
    });
    this.service.customerOrders = orders;
  }

}

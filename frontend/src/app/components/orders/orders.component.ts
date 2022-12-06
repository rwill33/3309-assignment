import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  fields = ['datePlaced', 'amount'];
  order?: any;
  products?: any;
  showMoreInfoOnOrder: boolean = false;
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

  async viewOrderDetails(orderNo: number){
    let response = await this.service.getOrderDetailsById(orderNo).toPromise();
    this.order = response[0];
    this.products = await this.service.getOrderProductsById(orderNo).toPromise();
    console.log(this.order);
    console.log(this.products);
    this.showMoreInfoOnOrder = true;
  }

  formatMyDate(date: any) {
    const format = 'dd/MM/yyyy';
    const locale = 'en-US';
    return formatDate(date, format, locale);
  }

}

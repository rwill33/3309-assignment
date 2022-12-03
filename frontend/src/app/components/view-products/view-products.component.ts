import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  @Input() products!: any[];
  @Input() isCartView!: boolean;
  sortOptions: SelectItem[] = [];
  sortOrder: number = 1;
  sortField: string = '';
  searchString = '';
  sortKey: any;

  constructor(private service: Service, private messageService: MessageService, private router: Router, private appComponent: AppComponent) { }

  async ngOnInit() {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  public async addToCart(product: any) {
    await this.service.addCartItem({
      username: this.service.username,
      productId: product.productID,
      quantity: 1
    }).toPromise();
    this.service.cart.push(product);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: product.name + ' added to cart!', life: 3000 });
  }

  public async deleteFromCart(product: any) {
    await this.service.deleteCartItem(product.productID).toPromise();
    loop1: for (let i = 0; i < this.service.cart.length; i++) {
      if (this.service.cart[i].productID == product.productID) {
        this.service.cart = this.service.cart.splice(i, 1);
        break loop1;
      }
    }
    this.messageService.add({ severity: 'success', summary: 'Success', detail: product.name + ' delted from cart!', life: 3000 });
  }

  public buyCart() {
    this.appComponent.showCart = false;
    this.router.navigate(['buy']);
  }

  public getTotalPrice() {
    let sum: number = 0;
    for (let i = 0; i < this.service.cart.length; i++) {
      sum += this.service.cart[i].price;
    }
    return sum;
  }
}

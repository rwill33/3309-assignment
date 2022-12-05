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
  @Input() isAddProduct!: boolean;
  @Input() storeId!: number;
  sortOptions: SelectItem[] = [];
  sortOrder: number = 1;
  sortField: string = '';
  searchString = '';
  sortKey: any;
  showMoreInfoOnProduct: boolean = false;
  productReviews: any[] = [];

  constructor(private service: Service, private messageService: MessageService, private router: Router, private appComponent: AppComponent) { }

  async ngOnInit() {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' },
      {label: 'sort alphabetically', value: 'alpha'}
    ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }else if(value === 'alpha'){
     


    }

    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  public async addProductToStore(product: any){
    console.log(product);
    product.storeId = this.storeId;
    await this.service.addProductToStore(product).toPromise();
  }

  public async addToCart(product: any) {
    await this.service.addCartItem({
      username: this.service.username,
      productId: product.productID,
      quantity: 1
    }).toPromise();
    this.service.cart = await this.service.getCartItems().toPromise();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: product.name + ' added to cart!', life: 3000 });
  }

  public async deleteFromCart(product: any) {
    await this.service.deleteCartItem(product.productId).toPromise();
    this.service.cart = await this.service.getCartItems().toPromise();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: product.name + ' deleted from cart!', life: 3000 });
  }

  public buyCart() {
    this.appComponent.showCart = false;
    this.router.navigate(['buy']);
  }

  public getTotalPrice() {
    let total: number = 0;
    this.service.cart.forEach((item) => {
      total += item.quantity * item.price;
    })
    return total;
  }

  public getQuantityTotal() {
    let total: number = 0;
    this.service.cart.forEach((item) => {
      total += item.quantity;
    })
    return total;
  }

  public async openProduct(product: any) {
    this.productReviews = await this.service.getProductReview(product.productID).toPromise();
    this.showMoreInfoOnProduct = true;
  }
}

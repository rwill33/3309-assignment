import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';


@Component({
  selector: 'app-user-stores',
  templateUrl: './user-stores.component.html',
  styleUrls: ['./user-stores.component.css']
})
export class UserStoresComponent implements OnInit {
  public storeOrders: any[] = [];
  public store?: any;
  public storeProducts?: any;
  public orders?: any;
  public bestSellers?: any;
  public totalSales?: any;
  showMoreInfoOnStore:boolean = false;
  fields = ['storeName', 'storeId', 'city', 'country', 'description', 'postalCode', 'province', 'streetAddress1', 'streetAddress2'];
  constructor(public service: Service) {
    this.populateUserStores();
  }

  ngOnInit(): void {
  }

  public async populateUserStores() {
    if (this.service.stores.length == 0) {
      this.service.stores = await this.service.getUserStores().toPromise();
    }
    for (let i = 0; i < this.service.stores.length; i++) {
      this.storeOrders.push(await this.service.getStoreOrders(this.service.stores[i].storeId).toPromise());
    }
  }

  viewStoreDetails(id: any) {
    this.getStoreDetails(id);
    this.getStoreProducts(id);
    this.getStoreOrders(id);
    this.getBestSellers(id);
    this.getTotalSales(id);
    this.showMoreInfoOnStore = true;
  }

  async getStoreDetails(id:number){
    let response = await this.service.getStoreById(id).toPromise();
    this.store = response[0];
    console.log(this.store);
  }

  async getStoreProducts(id: number) {
    this.storeProducts = await this.service.getStoreProducts(id).toPromise();
    console.log(this.storeProducts);
  }

  async getStoreOrders(id: number) {
    this.orders = await this.service.getStoreOrders(id).toPromise();
    console.log(this.orders);
  }

  async getBestSellers(id: number) {
    this.bestSellers = await this.service.findBestSeller(id).toPromise();
    console.log(this.bestSellers);
  }

  async getTotalSales(id: number) {
    let response = await this.service.getAnnualStore(id).toPromise();
    this.totalSales = response[0];
    console.log(this.totalSales);
  }
}

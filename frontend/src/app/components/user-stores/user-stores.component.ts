import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-user-stores',
  templateUrl: './user-stores.component.html',
  styleUrls: ['./user-stores.component.css']
})
export class UserStoresComponent implements OnInit {
  public storeOrders: any[] = [];

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

}

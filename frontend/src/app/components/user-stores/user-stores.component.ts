import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-user-stores',
  templateUrl: './user-stores.component.html',
  styleUrls: ['./user-stores.component.css']
})
export class UserStoresComponent implements OnInit {
  public userStores: any[] = [];

  constructor(private service: Service) {
    this.populateUserStores();
  }

  ngOnInit(): void {
  }

  public async populateUserStores() {
    this.userStores = await this.service.getUserStores().toPromise();
  }

}

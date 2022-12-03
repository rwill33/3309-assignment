import { Component, Input, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-view-stores',
  templateUrl: './view-stores.component.html',
  styleUrls: ['./view-stores.component.css']
})
export class ViewStoresComponent implements OnInit {
  @Input() stores!: any[];
  public storeFields: string[];

  constructor() {
    this.storeFields = ['storeName', 'storeId', 'city', 'country', 'description', 'postalCode', 'province', 'streetAddress1', 'streetAddress2']
  }

  ngOnInit(): void {
  }

}

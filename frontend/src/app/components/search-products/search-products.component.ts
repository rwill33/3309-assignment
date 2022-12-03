import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {

  constructor(public service: Service) { }

  async ngOnInit() {
    if (this.service.products.length == 0) {
      this.service.products = await this.service.getAllProducts().toPromise();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  products: any[] = [];

  constructor(private service: Service) { }

  async ngOnInit() {
    this.products = await this.service.getAllProducts().toPromise();
  }
}

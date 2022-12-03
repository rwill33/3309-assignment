import { Component, Input, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {
  @Input() products!: any[];
  sortOptions: SelectItem[] = [];
  sortOrder: number = 1;
  sortField: string = '';
  searchString = '';
  sortKey: any;

  constructor(private service: Service) { }

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

}

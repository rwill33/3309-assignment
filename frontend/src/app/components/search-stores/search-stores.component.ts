import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/services/service.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-search-stores',
  templateUrl: './search-stores.component.html',
  styleUrls: ['./search-stores.component.css']
})
export class SearchStoresComponent implements OnInit {
  storeName:any;
  stores:any;
items:any;
showMoreInfoOnStore:boolean = false;


  constructor(
    private service: Service,

  ) { }

  ngOnInit(): void {
    this.service.getAllStores().subscribe(
      (response: any) => {
    this.stores = response;
      },
      (error) => {
        console.log(error);
      });


  }

  getStoreDetails(id:number){

    this.service.getStoreProducts(id).subscribe(
      (response: any) => {
    this.items = response;

      },
      (error) => {

      });
      



      this.showMoreInfoOnStore = true;


  }
  searchStore(){
    this.service.findStoreNames(this.storeName).subscribe(
      (response: any) => {
    this.stores=response;
    
    
      },
      (error) => {
    
      });
  }

}

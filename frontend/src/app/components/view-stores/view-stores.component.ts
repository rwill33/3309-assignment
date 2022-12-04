import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from 'src/app/services/service.service';
import { Router } from '@angular/router';
//import{PopupModule} from 'ng2-opd-popup'
@Component({
  selector: 'app-view-stores',
  templateUrl: './view-stores.component.html',
  styleUrls: ['./view-stores.component.css'],
  
})
export class ViewStoresComponent implements OnInit {
  @Input() objects!: any[];
  @Input() fields!: string[];
  showMoreInfoOnStore:boolean = false;
stores: any;
storeName: string =""
obj:any;
items:any;
incomes:any;

  constructor(
    private service: Service,
  ) {
  }

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

    this.service.findBestSellar(id).subscribe(
      (response: any) => {
    this.items = response;
   
      },
      (error) => {
     
      });
      this.service.getAnnualStore(id).subscribe(
        (response: any) => {
      this.incomes = response;
     
        },
        (error) => {
       
        });




      this.showMoreInfoOnStore = true;
      

  }

 

}

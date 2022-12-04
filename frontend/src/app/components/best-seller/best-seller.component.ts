import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {
  storeName : string = "";
  obj:any;
  constructor(private service: Service, private fb: FormBuilder, private messageService: MessageService, private router: Router) {

   }

  ngOnInit(): void {
  }

  bestSeller(){
this.service.findStoreId(this.storeName).subscribe(
  (response: any) => {
 this.obj = response;
 console.log(this.obj.storeId);
this.service.findBestSellar(this.obj.storeId).subscribe(
  (response: any) => {


    
  },
  (error) => {
 
  });

    },
    (error) => {
 
    });
  





  }

}

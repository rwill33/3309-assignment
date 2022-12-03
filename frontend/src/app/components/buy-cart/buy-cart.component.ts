import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-buy-cart',
  templateUrl: './buy-cart.component.html',
  styleUrls: ['./buy-cart.component.css']
})
export class BuyCartComponent implements OnInit {
  public buyForm;
  public addressType: string = 'n';

  constructor(public service: Service, private fb: FormBuilder, private messageService: MessageService, private router: Router) {
    this.buyForm = this.fb.group({
      addressNo: [null],
      username: [this.service.username, Validators.required],
      streetAddress1: [null, Validators.required],
      streetAddress2: [null],
      postalCode: [null, Validators.required],
      city: [null, Validators.required],
      province: [null],
      country: [null, Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.service.savedAddresses.length == 0) {
      this.service.savedAddresses = await this.service.getCustomerAddresses().toPromise();
    }
  }

  public async buy() {
    if (this.buyForm.valid == true) {
      if (!this.hasAddress()) {
        await this.service.addCustomerAddresses(this.buyForm.value).toPromise();
      }
      await this.service.buyCart().toPromise();
      this.service.cart = [];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your order has been placed!', life: 3000 });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not all field are valid.', life: 3000 });
    }
  }

  public hasAddress() {
    let has: boolean = false;
    loop1: for (let i = 0; i < this.service.savedAddresses.length; i++) {
      if (this.service.savedAddresses[i] == this.buyForm.value) {
        has = true;
        break loop1;
      }
    }
    return has;
  }

  public changeButton() {
    if (this.addressType == 'e') {
      this.buyForm.setValue(this.service.savedAddresses[0]);
    }
  }
}

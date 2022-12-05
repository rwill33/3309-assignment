import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public allUsers: any[] = [];
  public signInForm;

  constructor(private service: Service, private fb: FormBuilder, private messageService: MessageService, private router: Router) {
    this.getAllUsers();

    this.signInForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public async getAllUsers() {
    this.allUsers = await this.service.getUsers().toPromise();
  }

  public async signIn() {
    if (this.signInForm.valid == true) {
      if (this.checkValidUser()) {
        this.service.username = this.signInForm.controls.username.value!;
        this.service.loggedIn = true;
        let tempCart = await this.service.getCartItems().toPromise();
        await this.allFieldsCart(tempCart);
        this.router.navigate(['products']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid username or password.', life: 3000 });
      }
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not all field are valid.', life: 3000 });
    }
  }

  public async allFieldsCart(tempCart: any[]) {
    // if (this.service.products.length == 0) {
    //   this.service.products = await this.service.getAllProducts().toPromise();
    // }
    // for (let i = 0; i < tempCart.length; i++) {
    //   loop1: for (let j = 0; this.service.products.length; j++) {
    //     if (this.service.products[j].productID == tempCart[i].productId) {
    //       this.service.cart.push(this.service.products[j]);
    //       break loop1;
    //     }
    //   }
    // }
    this.service.cart = await this.service.getCartItems().toPromise();
  }

  public checkValidUser(): boolean {
    let isValid: boolean = false;
    loop1: for (let i = 0; i < this.allUsers.length; i++) {
      if (this.allUsers[i].username == this.signInForm.controls.username.value && this.allUsers[i].password == this.signInForm.controls.password.value) {
        isValid = true;
      }
    }
    return isValid;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUpForm;

  constructor(private service: Service, private fb: FormBuilder, private messageService: MessageService, private router: Router) {
    this.signUpForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      fName: [null, Validators.required],
      lName: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  public async save() {
    if (this.signUpForm.valid == true) {
      const signedUp = await this.service.putUser(this.signUpForm.value).toPromise();
      this.router.navigate(['login']);
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not all field are valid.', life: 3000 });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.css']
})
export class StoreCreateComponent implements OnInit {
  public createStoreForm;

  constructor(private service: Service, private fb: FormBuilder, private messageService: MessageService, private router: Router) {
    this.createStoreForm = this.fb.group({
      storeName: [null, Validators.required],
      username: [this.service.username, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public async create() {
    if (this.createStoreForm.valid == true) {
      await this.service.putStore(this.createStoreForm.value).toPromise();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Store created!', life: 3000 });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Not all field are valid.', life: 3000 });
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-stores',
  templateUrl: './view-stores.component.html',
  styleUrls: ['./view-stores.component.css']
})
export class ViewStoresComponent implements OnInit {
  @Input() objects!: any[];
  @Input() fields!: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

}

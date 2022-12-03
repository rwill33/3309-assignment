import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyCartComponent } from './buy-cart.component';

describe('BuyCartComponent', () => {
  let component: BuyCartComponent;
  let fixture: ComponentFixture<BuyCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyCartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

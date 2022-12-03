import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStoresComponent } from './user-stores.component';

describe('UserStoresComponent', () => {
  let component: UserStoresComponent;
  let fixture: ComponentFixture<UserStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

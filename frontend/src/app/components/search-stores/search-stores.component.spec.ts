import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStoresComponent } from './search-stores.component';

describe('SearchStoresComponent', () => {
  let component: SearchStoresComponent;
  let fixture: ComponentFixture<SearchStoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchStoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

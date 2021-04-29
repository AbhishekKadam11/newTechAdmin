import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderListComponent } from './product-order-list.component';

describe('ProductOrderListComponent', () => {
  let component: ProductOrderListComponent;
  let fixture: ComponentFixture<ProductOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductOrderListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

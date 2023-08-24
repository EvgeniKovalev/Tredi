import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductMediaManagementComponent } from './product-media-management.component';

describe('ProductMediaManagementComponent', () => {
  let component: ProductMediaManagementComponent;
  let fixture: ComponentFixture<ProductMediaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductMediaManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductMediaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

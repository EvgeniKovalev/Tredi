import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PimComponent } from './pim.component';

describe('PimComponent', () => {
  let component: PimComponent;
  let fixture: ComponentFixture<PimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

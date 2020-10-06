import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOptionListComponent } from './payment-option-list.component';

describe('PaymentOptionListComponent', () => {
  let component: PaymentOptionListComponent;
  let fixture: ComponentFixture<PaymentOptionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOptionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

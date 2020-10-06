import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateFormComponent } from './order-state-form.component';

describe('OrderStateFormComponent', () => {
  let component: OrderStateFormComponent;
  let fixture: ComponentFixture<OrderStateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStateFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

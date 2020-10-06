import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderUpdatestateComponent } from './order-updatestate.component';

describe('OrderUpdatestateComponent', () => {
  let component: OrderUpdatestateComponent;
  let fixture: ComponentFixture<OrderUpdatestateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderUpdatestateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderUpdatestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

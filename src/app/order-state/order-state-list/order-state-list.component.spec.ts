import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderStateListComponent } from './order-state-list.component';

describe('OrderStateListComponent', () => {
  let component: OrderStateListComponent;
  let fixture: ComponentFixture<OrderStateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderStateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

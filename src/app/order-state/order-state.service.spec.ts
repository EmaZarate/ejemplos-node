import { TestBed } from '@angular/core/testing';

import { OrderStateService } from './order-state.service';

describe('OrderStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrderStateService = TestBed.get(OrderStateService);
    expect(service).toBeTruthy();
  });
});

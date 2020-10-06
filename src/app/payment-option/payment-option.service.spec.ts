import { TestBed } from '@angular/core/testing';

import { PaymentOptionService } from './payment-option.service';

describe('PaymentOptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentOptionService = TestBed.get(PaymentOptionService);
    expect(service).toBeTruthy();
  });
});

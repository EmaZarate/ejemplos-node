import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PaymentOptionService } from './payment-option.service';

@Injectable({ providedIn: 'root' })
export class PaymentOptionResolver implements Resolve<Observable<any>> {
    constructor(
        private paymentOptionService: PaymentOptionService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return id != null ? this.paymentOptionService.getOne(parseInt(id, 10)) : this.paymentOptionService.getAll();
    }
}

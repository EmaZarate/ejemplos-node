import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderStateService } from './order-state.service';

@Injectable({ providedIn: 'root' })
export class OrderStateResolver implements Resolve<Observable<any>> {
    constructor(
        private orderStateService: OrderStateService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return id != null ? this.orderStateService.getOne(parseInt(id, 10)) : this.orderStateService.getAll();
    }
}

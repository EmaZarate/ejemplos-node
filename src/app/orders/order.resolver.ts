import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OrderService } from './order.service';

@Injectable({ providedIn: 'root' })
export class OrderResolver implements Resolve<Observable<any>> {
    constructor(
        private orderService: OrderService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return id != null ? this.orderService.getById(parseInt(id, 10)) : this.orderService.getAll();
    }
}

import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SaleService } from './sale.service';

@Injectable({ providedIn: 'root' })
export class SaleResolver implements Resolve<Observable<any>> {
    constructor(
        private saleService: SaleService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return this.saleService.getOne(parseInt(id, 10));
    }
}

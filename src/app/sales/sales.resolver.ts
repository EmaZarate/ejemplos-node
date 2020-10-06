import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SaleService } from './sale.service';

@Injectable({ providedIn: 'root' })
export class SalesResolver implements Resolve<Observable<any>> {
    constructor(
        private saleService: SaleService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.saleService.getAll();
    }
}

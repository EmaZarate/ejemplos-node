import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { PriceListService } from './price-list.service';

@Injectable({ providedIn: 'root' })
export class PriceListResolver implements Resolve<Observable<any>> {
    constructor(
        private priceListService: PriceListService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return this.priceListService.getOne(parseInt(id, 10));
    }
}

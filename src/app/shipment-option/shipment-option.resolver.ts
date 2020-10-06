import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ShipmentOptionService } from './shipment-option.service';

@Injectable({ providedIn: 'root' })
export class ShipmentOptionResolver implements Resolve<Observable<any>> {
    constructor(
        private shipmentOptionService: ShipmentOptionService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return id != null ? this.shipmentOptionService.getOne(parseInt(id, 10)) : this.shipmentOptionService.getAll();
    }
}

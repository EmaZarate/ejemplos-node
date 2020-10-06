import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from './customer.service';


@Injectable({providedIn: 'root'})
export class CustomerResolver implements Resolve<Observable<any>> {
    constructor(
        private customerService: CustomerService
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        const id = route.paramMap.get('id');
        return id != null ? this.customerService.getOne(parseInt(id, 10)) : this.customerService.getAll();
    }
}

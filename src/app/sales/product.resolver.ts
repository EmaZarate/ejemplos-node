import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from '../product/product.service';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Observable<any>> {
    constructor(
        private productService: ProductService
    ) { }

    resolve() {
        return this.productService.getAll();
    }
}

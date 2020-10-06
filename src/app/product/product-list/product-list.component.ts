import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  filter: FormControl = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.filteredProducts$.subscribe(
      res => this.products = res
    );
    this.filter.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((search) => this.productService.updateFilter(search));
  }

  goToDetail = (idProduct: number) => this.router.navigate([idProduct, 'detail'], {relativeTo: this.route});


}

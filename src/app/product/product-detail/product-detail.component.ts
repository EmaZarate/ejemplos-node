import { MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Category } from 'src/app/category/category.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  isEditing = false;
  hasPackings: any;
  hasPriceListItems: any;
  stillEditingProduct = false;
  stillEditingPacking = false;
  product: Product = new Product({name: '', packings: [], category: new Category({name: ''})});
  categories: Category[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private snackbar: MatSnackBar
  ) { }



  ngOnInit() {
    this.isEditing = this.route.snapshot.url.toString().includes('detail');
    if (this.isEditing) {

      this.product = this.route.snapshot.data.product;
    }
    this.categories = this.route.snapshot.data.categories;
  }

  checkForPackings(eventState: any) {
    this.hasPackings = eventState;
  }
  checkForPriceListItems(eventState: any) {
    this.hasPriceListItems = eventState;
  }

  onPackingCreated = () => this.updateProductInfo().subscribe(res => this.product = res);

  updateProductInfo = () => this.productService.getOne(this.product.id);

  updateProduct = (product: Product) => {
    this.isEditing ?
      this.productService.updateProduct(product)
        .pipe(
          switchMap(this.updateProductInfo))
        .subscribe(res => this.product = res )
    : this.productService.addProduct(product).subscribe((this.navigateToDetail));
  }

  navigateToDetail = (id: any) => this.router.navigate(['../', id, 'detail'], {relativeTo: this.route});

  setProductEditingState(eventState: boolean) {
    this.stillEditingProduct = eventState;
  }

  setPackingEditingState(eventState: boolean) {
    this.stillEditingPacking = eventState;
  }

  goBack() {
    const errms = 3000;
    if (this.stillEditingProduct || this.stillEditingPacking) {
      this.snackbar.open('Los cambios realizados no fueron guardados y se descartarán al salir', 'Volver', { duration: errms })
                  .onAction().subscribe(() => {
                    this.router.navigate(['/product']);
                  });
    } else if (!this.hasPackings && this.isEditing) {
      this.snackbar.open('Si no se cargan empaques al producto, éste no se verá reflejado en la aplicación', 'Volver', { duration: errms })
                    .onAction().subscribe(() => {
                      this.router.navigate(['/product']);
                    });
    } else if (!this.hasPriceListItems && this.isEditing) {
      this.snackbar.open('Si no se cargan precios al empaque, éste no se verá reflejado en la aplicación', 'Volver', { duration: errms })
                    .onAction().subscribe(() => {
                      this.router.navigate(['/product']);
                    });
    } else {
      this.router.navigate(['/product']);
    }
  }

}

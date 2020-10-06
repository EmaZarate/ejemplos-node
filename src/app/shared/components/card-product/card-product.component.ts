import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Product } from 'src/app/product/product.model';
import { Category } from 'src/app/category/category.model';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/product/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css']
})
export class CardProductComponent implements OnInit, OnDestroy {

  @Input() canEdit = false;
  @Input() canDelete = false;
  @Input() product: Product;

  @Input() categories: Category[];
  @Output() stillEditingProduct: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() finishEdit: EventEmitter<Product> = new EventEmitter<Product>();

  nameControl: FormControl = new FormControl();
  skuControl: FormControl = new FormControl();
  imgControl: FormControl = new FormControl();
  categoryControl: FormControl = new FormControl();

  isEditing = false;
  private unsubscribe$ = new Subject<void>();


  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    public productService: ProductService
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.isEditing = this.route.snapshot.url.toString().includes('new');

    this.generateValidators();
    this.imgControl.setValue(this.product.img);
    this.categoryControl.setValue(
      this.product.category ? this.product.category.id : 0
    );
    this.nameControl.setValue(this.product.name);
    this.skuControl.setValue(this.product.sku);
  }

  submitChanges = () => {
    const errorTimer = 3000;
    if (this.isValid()) {
      const newProduct = { ...this.product };
      newProduct.category.id = this.categoryControl.value;
      newProduct.category.name = this.categories.find((c) => c.id == this.categoryControl.value).name;
      newProduct.img = this.imgControl.value;
      newProduct.name = this.nameControl.value;
      newProduct.sku = this.skuControl.value;

      this.finishEdit.emit(newProduct);
    } else {
      this.snackBar.open('Hay campos inválidos o incompletos', null, {
        duration: errorTimer
      });
    }
  }

  isValid = () => this.categoryControl.valid && this.nameControl.valid && this.skuControl.value;

  generateValidators = () => {
    this.categoryControl.setValidators(Validators.required);
    this.nameControl.setValidators(Validators.required);
    this.skuControl.setValidators(Validators.required);
  }

  updateState = () => {
    if (this.isEditing) {
      this.submitChanges();
      this.isEditing = false;
      this.stillEditingProduct.emit(false);
    } else {
      this.isEditing = !this.isEditing;
      this.stillEditingProduct.emit(true);
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.stillEditingProduct.emit(false);
  }

  imageUploaded = (image: any) => this.imgControl.setValue(image);

  openDialog = (name: string, id: number) => {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Eliminar producto: ',
        name,
        id
      }
    }).afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res: any) => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete = (id: number) => {
    this.productService.delete(id)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res: Product[]) => {
      this.router.navigate(['product']);
    }
    );
  }

}

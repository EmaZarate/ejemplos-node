import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Product } from 'src/app/product/product.model';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { SalePackings } from '../salePackings.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PriceList } from 'src/app/price-list/price-list.model';
import { Sale } from '../sale.model';
import { SalePrice } from '../salePrice.model';
import { SaleService } from '../sale.service';
import { MatSnackBar } from '@angular/material';
import { Packing } from 'src/app/product/packing.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.css']
})
export class SalesFormComponent implements OnInit, OnDestroy {

  salesForm: FormGroup;
  priceListForm: FormGroup;
  salePackingForm: FormGroup;

  private unsubscribe$ = new Subject<void>();

  get name() { return this.salesForm.get('name'); }

  get product() { return this.salePackingForm.get('product'); }
  get packing() { return this.salePackingForm.get('packing'); }
  get quantity() { return this.salePackingForm.get('quantity'); }

  get DynamicPriceListArray() { return this.priceListForm.get('priceListArray') as FormArray; }

  products: Product[];
  sale: Sale;
  priceLists: PriceList[];
  packingsForProduct: any[];
  tableData: TableLayout;
  headerRows: string[] = ['productName', 'packingName', 'quantity'];
  packingsSelected: SalePackings[] = new Array<SalePackings>();
  packingsDataTable: Array<any> = new Array();
  isEdit = false;
  alertDuration = 1500;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private saleService: SaleService,
    private snackBar: MatSnackBar
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.salesForm = this.salesModelCreate();
    this.salePackingForm = this.salePackingsModelCreate();
    this.priceListForm = this.modelCreatePrice();
    this.packing.disable();
    this.products = this.route.snapshot.data.products;
    this.priceLists = this.route.snapshot.data.priceLists;
    this.sale = this.route.snapshot.data.sale;
    this.tableData = this.createTableData();
    if (this.sale) {
      this.isEdit = true;
      this.sale.packings.forEach((packing: SalePackings) => {
        this.addPackingInTable(packing.productID, packing.packingID, packing.quantity);
      });
      this.sale.priceLists.forEach((priceList: SalePrice, index: number) => {
        this.addPriceList();
        this.patchPriceListItem(priceList, index);
      });
      this.name.patchValue(this.sale.name);
    }
    this.product.valueChanges
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(val => {
      const product: Product = this.products.find((x: Product) => x.id == val);
      if (product) {
        this.packingsForProduct = product.packings;
        this.packing.enable();
      } else {
        this.packing.disable();
      }
    });
  }

  salesModelCreate = () => this.fb.group({
    name: ['', Validators.required]
  })

  salePackingsModelCreate = () => this.fb.group({
    packing: ['', Validators.required],
    product: ['', Validators.required],
    quantity: ['', Validators.required]
  })

  modelCreatePrice() {
    const priceLists: Array<FormGroup> = [];
    return this.fb.group({
      priceListArray: this.fb.array(priceLists)
    });
  }

  modelCreatePricelistItem() {
    return this.fb.group({
      priceListID: [undefined, Validators.required],
      price: ['', Validators.required]
    });
  }

  patchPriceListItem(pL: SalePrice, i: number) {
    ((this.priceListForm.controls.priceListArray as FormArray).controls[i] as FormGroup).get('priceListID').patchValue(pL.priceListID);
    ((this.priceListForm.controls.priceListArray as FormArray).controls[i] as FormGroup).get('price').patchValue(pL.price);
  }

  onDelete = (id: number) => {
    const newDataTable: any[] = this.tableData.data.filter((x: any) => x.id != id);
    this.tableData = {
      ...this.tableData, data: newDataTable
    };
  }

  patchPackingInData(dataTable: any) {
     const prod: Product = this.products.find((x: Product) => x.id == dataTable.productID);
     prod.packings.push({id: dataTable.id, name: dataTable.packingName, quantity: dataTable.packingQuantity, priceLists: [] });
  }

  addPriceList() {
    const priceFormArray = this.priceListForm.get('priceListArray') as FormArray;
    if (priceFormArray.length >= this.priceLists.length) {
      this.snackBar.open('No hay más listas de precios para añadir.', null, { duration: this.alertDuration });
      return;
    }
    priceFormArray.push(this.modelCreatePricelistItem());
  }

  removePriceList(index: number) {
    (this.priceListForm.controls.priceListArray as FormArray).removeAt(index);
  }

  selectPriceList(index: number) {
     if (this.hasDuplicates(this.priceListForm.controls.priceListArray.value)) {
       ((this.priceListForm.controls.priceListArray as FormArray).controls[index] as FormGroup).get('priceListID').patchValue('');
       return this.snackBar.open('No se puede continuar, existen listas de precios repetidas.', null, { duration: this.alertDuration });
     }
  }

  addNewPacking() {
    if (this.salePackingForm.valid) {
      this.addPackingInTable(this.product.value, this.packing.value, this.quantity.value);
    }
  }

  addPackingInTable(idProd: number, idPacking: number, quantity: number) {
    const product: Product = this.products.find((prod: Product) => prod.id == idProd);
    const packingForProd: Packing = product.packings.find((packing: Packing) => packing.id == idPacking);
    const newSalePacking: any = {
        id: packingForProd.id,
        productID: product.id,
        packingID: packingForProd.id,
        productName: product.name,
        packingName: packingForProd.name,
        quantity
      };
    const packings: SalePackings[] = [...this.tableData.data, newSalePacking];
    this.tableData = {
        ...this.tableData, data: packings
      };
    product.packings =  product.packings.filter((x: Packing) => x.id != packingForProd.id );
    this.clearSalePackingForm();
  }

  clearSalePackingForm() {
    this.product.patchValue('');
    this.packing.patchValue('');
    this.quantity.patchValue('');
  }

  private hasDuplicates = (array: SalePrice[]): boolean => {
    array = array.filter((x: SalePrice) => x.priceListID != undefined);
    const ids: number[] = array.map(((pl: SalePrice) => pl.priceListID));
    return (new Set(ids)).size !== ids.length;
  }

  isListPriceValid() {
    return (this.priceListForm.controls.priceListArray as FormArray).valid;
  }

  saveSale() {
    if (this.salesForm.valid && this.isListPriceValid() && (this.tableData.data.length > 0)) {
      const packings: SalePackings[] = this.tableData.data.map((x: SalePackings) => new SalePackings({ ...x }));
      const id = 0;
      const name: string = this.name.value;
      const isDeleted = false;
      const priceLists: SalePrice[] = this.priceListForm.controls.priceListArray.value.map((x: SalePrice) => new SalePrice({ ...x }));
      const sale: Sale = new Sale({ id, name, isDeleted, packings, priceLists });
      if (this.isEdit) {
        sale.id = this.sale.id;
        this.saleService.updateSale(sale).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
          this.nextSaveSale();
        });
      } else {
        this.saleService.addSale(sale).pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
          this.nextSaveSale();
        });
      }
    } else {
      this.snackBar.open('No se puede continuar, completar todos los campos', null, { duration: this.alertDuration });
    }
  }

  nextSaveSale() {
    this.router.navigate(['/sales']);
  }

  havePackage(lenght: number) {
    if (lenght <= 0) {
      return 'none';
    }
  }

  createTableData() {
    return {
      title: 'Producto',
      canEdit: false,
      canRemove: true,
      data: this.packingsDataTable,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    };
  }
}

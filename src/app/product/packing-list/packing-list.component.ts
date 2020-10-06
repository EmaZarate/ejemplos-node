import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { Packing } from '../packing.model';
import { switchMap } from 'rxjs/operators';
import { PriceList } from 'src/app/price-list/price-list.model';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.css']
})
export class PackingListComponent implements OnInit, OnChanges {

  isEditingPriceList = false;
  isAddingPacking = false;

  @Input() isEditing = false;
  @Input() product: Product;

  @Output() stillEditingPacking = new EventEmitter<boolean>();
  @Output() newPackingEmitter = new EventEmitter<any>();
  @Output() hasPackings = new EventEmitter<boolean>();
  @Output() hasPriceListItems = new EventEmitter<boolean>();


  newPackingName: FormControl = new FormControl();
  newPackingQuantity: FormControl = new FormControl();
  productId = 0;

  packingForm: FormGroup;

  tableData: TableLayout;

  priceLists: PriceList[];
  unSelectedPricelists: PriceList[];

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.tableData = {
      title: 'Lista de precio',
      canEdit: true,
      canRemove: false,
      data: this.product.packings,
      functionRemove: null,
      headerRows: ['id', 'name', 'price']
    };
    this.priceLists = this.route.snapshot.data.priceLists;
    this.packingForm = this.generateForm();
    this.packingForm.disable();
    if (this.product.packings.length > 0) {
      this.hasPackings.emit(true);
    } else {
      this.hasPackings.emit(false);
    }
  }

  ngOnChanges(changes) {
    if (changes.product && !changes.product.firstChange) {
      this.packingForm = this.generateForm();
      this.packingForm.disable();
    }
  }

  priceListModelCreate = (id: number = 0, price = '') => {
    return this.fb.group({
      id: [id, [Validators.required, , Validators.min(0)]],
      price: [price, [Validators.required, Validators.min(0)]]
    });
  }

  packingModelCreate = (id: number = 0, namePacking: string = '', priceLists: Array<FormGroup> = []) => {
    return this.fb.group({
      id: [id],
      name: [namePacking, Validators.required],
      priceLists: this.fb.array(priceLists)
    });
  }

  productModelCreate = (packingsArray: FormGroup[] = []) => {
    return this.fb.group({
      packings: this.fb.array(packingsArray)
    });
  }

  changePackingFormState = () => {
    this.isEditingPriceList = !this.isEditingPriceList;
    this.packingForm.enabled ? this.packingForm.disable() : this.packingForm.enable();
    if (this.isEditingPriceList) {
      this.stillEditingPacking.emit(true);
    } else {
      this.stillEditingPacking.emit(false);
    }
  }

  cancelEditing() {
    this.isEditingPriceList = false;
    this.stillEditingPacking.emit(false);
  }

  updatePacking = (packingIndex: number) => {
    if (!this.isEditingPriceList) { return; }

    const arrayPriceList = ((this.packingForm.controls.packings as FormArray).controls[packingIndex].get('priceLists') as FormArray);
    if (this.hasDuplicates(arrayPriceList.value)) {
      this.snackBar.open('No se puede continuar, existen listas de precios repetidas.', null, { duration: 1500 });
      return;
    }

    // Validate prices
    if (arrayPriceList.value.find(x => x.price == 0)) {
      this.snackBar.open('No se puede cargar el precio con valor 0.', null, { duration: 1500 });
      return;
    }

    const packingFormItem = (this.packingForm.controls.packings as FormArray).controls[packingIndex];
    if (!packingFormItem.valid) {
      this.snackBar.open('No se puede continuar, existen valores inválidos o faltantes.', null, { duration: 1500 });
      return;
    }

    const newPacking: Packing = new Packing(packingFormItem.value);
    this.productService.updatePacking(this.product.id, newPacking)
      .pipe(switchMap(this.updateDataProduct))
      .subscribe(res => {
        this.product = res;
        this.changePackingFormState();
      });
  }

  private hasDuplicates = (array: PriceList[]): boolean => {
    const ids = array.map((pl => pl.id));
    return (new Set(ids)).size !== ids.length;
  }

  removePriceList = (packingIndex, priceListIndex) => {
    const priceList = ((this.packingForm.controls.packings as FormArray).controls[packingIndex].get('priceLists') as FormArray);
    priceList.removeAt(priceListIndex);
    this.checkPriceListArray(priceList.length);
  }

  generateForm = (): FormGroup => {
    const packingsListArray = [];
    if (this.product.packings.length > 0) {
      this.product.packings.forEach((packing) => {
        const priceListArray = [];
        if (packing.priceLists) {
          packing.priceLists.forEach((priceList) => {
            priceListArray.push(this.priceListModelCreate(priceList.id, priceList.price.toString()));
          });
        }
        packingsListArray.push(this.packingModelCreate(packing.id, packing.name, priceListArray));
        this.checkPriceListArray(priceListArray.length);
      });

    }
    return this.productModelCreate(packingsListArray);
  }

  checkPriceListArray(priceList?) {
    if (priceList > 0) {
      this.hasPriceListItems.emit(true);
    } else {
      this.hasPriceListItems.emit(false);
    }
  }

  addPriceList = (packingIndex: number) => {
    const arrayPriceList = ((this.packingForm.controls.packings as FormArray).controls[packingIndex].get('priceLists') as FormArray);
    if (arrayPriceList.length === this.priceLists.length) {
      this.snackBar.open('No hay más listas de precios para añadir', null, { duration: 1500 });
      return;
    } // ERROR NO HAY MAS LISTAS DE PRECIOS PARA AÑADIR
    const res = this.priceListModelCreate();
    if (res && this.priceLists.length > 0) {
      res.controls.id.setValue(this.priceLists[0].id);
    }
    arrayPriceList.push(res);
    this.checkPriceListArray(arrayPriceList.length);
  }

  addNewPacking = () => this.isAddingPacking = true;

  cancelNewPacking = () => {
    this.isAddingPacking = false;
    this.newPackingName.reset();
    this.newPackingQuantity.reset();
  }

  submitNewPacking = () => {
    this.productService.addPacking(
      this.product.id,
      new Packing({ name: this.newPackingName.value, quantity: this.newPackingQuantity.value, priceLists: [] })
      )
      .subscribe(res => {
        this.newPackingEmitter.emit();
        this.hasPackings.emit(true);
        this.cancelNewPacking();
      });

  }

  deletePacking = (packing: Packing) => {
    this.productService.removePacking(this.product.id, packing.id)
      .pipe(switchMap(this.updateDataProduct))
      .subscribe(res => {
        this.product = res;
        if (this.product.packings.length == 0) {
          this.hasPackings.emit(false);
        }
      });
  }

  updateDataProduct = () => {
    return this.productService.getOne(this.product.id);
  }

}

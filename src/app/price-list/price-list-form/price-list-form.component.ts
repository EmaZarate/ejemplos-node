import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceListService } from '../price-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { PriceList } from '../price-list.model';

@Component({
  selector: 'app-price-list-form',
  templateUrl: './price-list-form.component.html',
  styleUrls: ['./price-list-form.component.css']
})
export class PriceListFormComponent implements OnInit {

  priceListForm: FormGroup;
  formInfo: FormLayout;

  isEditing: boolean;
  priceList: PriceList = new PriceList({ id: 0, code: '', minimumLimit: 0 });

  get code() { return this.priceListForm.get('code'); }
  get minimumLimit() { return this.priceListForm.get('minimumLimit'); }

  constructor(
    private fb: FormBuilder,
    private priceListService: PriceListService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.priceListForm = this.modelCreate();

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.formInfo = {
        submitText: 'Actualizar',
        title: 'Lista de precio',
        subtitle: 'Editar Lista de precios',
        isEditing: true
      };
      this.priceList = this.route.snapshot.data.priceList;
      this.code.patchValue(this.priceList.code);
      this.minimumLimit.patchValue(this.priceList.minimumLimit);

    } else {
      this.formInfo = {
        submitText: 'Guardar',
        title: 'Lista de precio',
        subtitle: 'Crear nueva lista de precios',
        isEditing: false
      };
    }
  }

  modelCreate = () => this.fb.group({
    code: ['', Validators.required],
    minimumLimit: ['', Validators.required]
  })

  onSubmit = () => {
    if (!this.priceListForm.valid) { return; }
    const priceListModified = new PriceList({ code: this.code.value, id: this.priceList.id, minimumLimit: this.minimumLimit.value });

    this.isEditing
      ? this.priceListService.update(priceListModified)
        .subscribe(this.goToList)
      : this.priceListService.add(priceListModified)
        .subscribe(this.goToList);



  }

  goToList = () => this.router.navigate(['prices']);
}

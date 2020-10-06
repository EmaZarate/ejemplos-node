import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { PaymentOption } from '../payment-option.model';
import { PaymentOptionService } from '../payment-option.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-option-form',
  templateUrl: './payment-option-form.component.html',
  styleUrls: ['./payment-option-form.component.css']
})
export class PaymentOptionFormComponent implements OnInit {

  paymentOptionForm: FormGroup;
  formInfo: FormLayout;

  isEditing: boolean;
  paymentOption: PaymentOption = new PaymentOption({ id: 0, name: '', percent: 100 });

  get name() { return this.paymentOptionForm.get('name'); }
  get slider() { return this.paymentOptionForm.get('slider'); }

  constructor(
    private fb: FormBuilder,
    private paymentOptionService: PaymentOptionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.paymentOptionForm = this.modelCreate();

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.formInfo = {
        submitText: 'Actualizar',
        title: 'Opciones de pago',
        subtitle: 'Editar opción de pago',
        isEditing: true
      };
      this.paymentOption = this.route.snapshot.data.paymentOption;
      this.name.patchValue(this.paymentOption.name);

    } else {
      this.formInfo = {
        submitText: 'Guardar',
        title: 'Opciones de pago',
        subtitle: 'Crear nueva opción de pago',
        isEditing: false
      };
    }
  }

  modelCreate = () => this.fb.group({
    name: ['', Validators.required],
    slider: [100]
  })

  onSubmit = () => {
    if (!this.paymentOptionForm.valid) { return; }
    const paymentOptionModified = new PaymentOption({ name: this.name.value, id: this.paymentOption.id, percent: this.slider.value });

    this.isEditing
      ? this.paymentOptionService.update(paymentOptionModified)
        .subscribe(this.goToList)
      : this.paymentOptionService.add(paymentOptionModified)
        .subscribe(this.goToList);



  }


  onUpdateSlider = (val) => this.slider.patchValue(val);

  goToList = () => this.router.navigate(['payment']);
}

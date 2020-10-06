import { Component, OnInit } from '@angular/core';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShipmentOption } from '../shipment-option.model';
import { ShipmentOptionService } from '../shipment-option.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shipment-option-form',
  templateUrl: './shipment-option-form.component.html',
  styleUrls: ['./shipment-option-form.component.css']
})
export class ShipmentOptionFormComponent implements OnInit {

  sliderValue = 0;

  shipmentOptionForm: FormGroup;
  formInfo: FormLayout;

  isEditing: boolean;
  shipmentOption: ShipmentOption = new ShipmentOption({ id: 0, name: '', percent: 100 });

  get name() { return this.shipmentOptionForm.get('name'); }
  get slider() { return this.shipmentOptionForm.get('slider'); }

  constructor(
    private fb: FormBuilder,
    private shipmentOptionService: ShipmentOptionService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.shipmentOptionForm = this.modelCreate();

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.formInfo = {
        submitText: 'Actualizar',
        title: 'Opción de envío',
        subtitle: 'Editar opción de envío',
        isEditing: true
      };
      this.shipmentOption = this.route.snapshot.data.shipmentOption;
      this.name.patchValue(this.shipmentOption.name);
      this.slider.patchValue(this.shipmentOption.percent);

    } else {
      this.formInfo = {
        submitText: 'Guardar',
        title: 'Opción de envío',
        subtitle: 'Crear nueva opción de envío',
        isEditing: false
      };
    }
  }

  modelCreate = () => this.fb.group({
    name: ['', Validators.required],
    slider: [100]
  })

  onSubmit = () => {
    if (!this.shipmentOptionForm.valid) { return; }
    const shipmentOptionModified = new ShipmentOption({ name: this.name.value, id: this.shipmentOption.id, percent: this.slider.value });

    this.isEditing
      ? this.shipmentOptionService.update(shipmentOptionModified)
        .subscribe(this.goToList)
      : this.shipmentOptionService.add(shipmentOptionModified)
        .subscribe(this.goToList);



  }

  onUpdateSlider = (val) => this.slider.patchValue(val);

  goToList = () => this.router.navigate(['shipment']);

}

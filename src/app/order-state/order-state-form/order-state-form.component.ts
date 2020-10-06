import { Component, OnInit } from '@angular/core';
import { OrderState } from '../order-state.model';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderStateService } from '../order-state.service';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';

@Component({
  selector: 'app-order-state-form',
  templateUrl: './order-state-form.component.html',
  styleUrls: ['./order-state-form.component.css']
})
export class OrderStateFormComponent implements OnInit {
  orderStateForm: FormGroup;
  formInfo: FormLayout;

  isEditing: boolean;
  orderState: OrderState = new OrderState({id: 0, name: ''});

  get name() { return this.orderStateForm.get('name'); }

  constructor(
    private fb: FormBuilder,
    private orderStateService: OrderStateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.orderStateForm = this.modelCreate();

    this.isEditing = this.route.snapshot.url.toString().includes('edit');

    if (this.isEditing) {
      this.formInfo = {
        submitText: 'Actualizar',
        title: 'Estado de Orden',
        subtitle: 'Editar estado de orden',
        isEditing: true
      };
      this.orderState = this.route.snapshot.data.orderState;
      this.name.patchValue(this.orderState.name);

    } else {
      this.formInfo = {
        submitText: 'Guardar',
        title: 'Estado de Orden',
        subtitle: 'Crear nuevo estado de una orden',
        isEditing: false
      };
    }
  }

  modelCreate = () => this.fb.group({
    name: ['', Validators.required]
  })

  onSubmit = () => {
    if (!this.orderStateForm.valid) { return; }
    const orderStateModified = new OrderState({ name: this.name.value, id: this.orderState.id });

    this.isEditing
    ? this.orderStateService.update(orderStateModified)
      .subscribe(this.goToList)
    : this.orderStateService.add(orderStateModified)
      .subscribe(this.goToList);



  }

  goToList = () => this.router.navigate(['states']);

}

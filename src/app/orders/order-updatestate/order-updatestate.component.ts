import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-updatestate',
  templateUrl: './order-updatestate.component.html',
  styleUrls: ['./order-updatestate.component.css']
})
export class OrderUpdatestateComponent implements OnInit {

  updateStateForm: FormGroup;
  formInfo: FormLayout;
  orderState: string;
  stateName: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.orderState = this.route.snapshot.params.state;
    this.updateStateForm = this.modelCreate();
    this.formInfo = {
      title: 'Actualizar orden',
      subtitle: 'Actualizar el estado de una orden',
      submitText: 'Confirmar',
      isEditing: false,
      isOrderForm: true
    };
  }

  modelCreate = () => this.fb.group({

  })

  onSubmit() {
    switch (this.route.snapshot.params.state) {
      case 'confirmed': this.stateName = 'Aceptado'; break;
      case 'canceled': this.stateName = 'Cancelado'; break;
      case 'deliver': this.stateName = 'En reparto'; break;
      case 'deliverready': this.stateName = 'Listo para retirar'; break;
      case 'give': this.stateName = 'Entregado'; break;
      case 'canceledforuser': this.stateName = 'Rechazado por Cliente'; break;
      default: return;
    }
    this.orderService.updateStateOrder(this.route.snapshot.params.id, this.stateName).subscribe( (res) => {
      this.snackBar.open('El estado se ha actualizado correctamente.', null, { duration: 2500 });
      this.goToList();
    });
  }

  goToList = () => this.router.navigate(['orders']);

}

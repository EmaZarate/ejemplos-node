import { Component, OnInit } from '@angular/core';
import { PaymentOption } from '../payment-option.model';
import { ActivatedRoute } from '@angular/router';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { PaymentOptionService } from '../payment-option.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-option-list',
  templateUrl: './payment-option-list.component.html',
  styleUrls: ['./payment-option-list.component.css']
})
export class PaymentOptionListComponent implements OnInit {

  headerRows = ['id', 'name', 'percent'];
  data: PaymentOption[];

  tableData: TableLayout;
  constructor(
    private route: ActivatedRoute,
    private paymentOptionService: PaymentOptionService
  ) {


    this.data = this.route.snapshot.data.paymentOptions;
  }

  ngOnInit() {
    this.tableData = {
      title: 'Opción de pago',
      canEdit: true,
      canRemove: true,
      data: this.data,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    };
  }

  onDelete = (id: number) => {
    this.paymentOptionService.delete(id)
      .pipe(switchMap(this.updateDataTable))
      .subscribe(res => {
        this.tableData.data = res;
        this.tableData = { ...this.tableData };
      }
      );
  }

  updateDataTable = () => this.paymentOptionService.getAll();

}

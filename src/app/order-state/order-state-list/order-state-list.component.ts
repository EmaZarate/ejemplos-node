import { Component, OnInit } from '@angular/core';
import { OrderState } from '../order-state.model';
import { ActivatedRoute } from '@angular/router';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { OrderStateService } from '../order-state.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-order-state-list',
  templateUrl: './order-state-list.component.html',
  styleUrls: ['./order-state-list.component.css']
})
export class OrderStateListComponent implements OnInit {

  headerRows = ['id', 'name'];
  data: OrderState[];

  tableData: TableLayout;


  dataFromApi$;

  constructor(
    private route: ActivatedRoute,
    private orderStateService: OrderStateService
  ) {
    this.data = this.route.snapshot.data.orderStates;
  }

  ngOnInit() {
    this.tableData = {
      title: 'Estado de orden',
      canEdit: false,
      canRemove: false,
      data: this.data,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    };
  }

  onDelete = (id: number) => {
    this.orderStateService.delete(id)
      .pipe(switchMap(this.updateDataTable))
      .subscribe(res => {
          this.tableData.data = res;
          this.tableData = {...this.tableData};
        }
      );
  }

  updateDataTable = () => this.orderStateService.getAll();



}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Order } from '../order.model';
import { FormControl } from '@angular/forms';
import { OrderService } from '../order.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {

  headerRows = ['id', 'businessName', 'total', 'state', 'mercadopagopaymentid'];
  data: Order[];
  filter: FormControl = new FormControl();
  tableData: TableLayout;
  debounceTime = 400;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    this.data = this.route.snapshot.data.orders;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.prepareDataTable();
    this.orderService.filteredOrders$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(
      res => {
        this.data = res;
        this.prepareDataTable();

      }
    );
    this.filter.valueChanges
      .pipe(debounceTime(this.debounceTime), distinctUntilChanged())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((search) => { this.orderService.updateFilter(search); }
      );
  }

  prepareDataTable() {
    this.tableData = {
      title: 'Lista de órdenes',
      canEdit: false,
      canRemove: false,
      canUpdateState: true,
      canSeeDetail: true,
      data: this.data,
      functionRemove: null,
      headerRows: this.headerRows
    };
  }
}

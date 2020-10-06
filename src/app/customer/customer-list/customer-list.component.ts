import { Component, OnInit } from '@angular/core';
import { Customer } from '../customer.model';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  headerRows = ['id', 'businessName', 'username', 'cellphone', 'isNotLocked'];
  data: Customer[];
  tableData: TableLayout;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.data = this.route.snapshot.data.customers;
  }

  ngOnInit() {
    this.tableData = {
      title: 'Cliente',
      canEdit: false,
      canRemove: false,
      functionRemove: null,
      data: this.data,
      headerRows: this.headerRows,
      canLock: true,
      functionLock: this.onLock,
      propertyToCheck: 'isNotLocked',
      canResetPassword: true
    };
  }



  onLock = (id: number, isLocking) => {
    if (isLocking) {
      this.customerService.delete(id)
        .pipe(switchMap(this.updateDataTable))
        .subscribe(res => {
          this.tableData.data = res;
          this.tableData = { ...this.tableData };
        }
        );
    } else {
      this.customerService.unlock(id)
        .pipe(switchMap(this.updateDataTable))
        .subscribe(res => {
          this.tableData.data = res;
          this.tableData = {...this.tableData};
        });
    }

  }

  updateDataTable = () => this.customerService.getAll();

}

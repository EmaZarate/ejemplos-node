import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Sale } from '../sale.model';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { SaleService } from '../sale.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  data: Sale[];
  headerRows = ['id', 'name'];
  tableData: TableLayout;

  constructor(private route: ActivatedRoute, private saleService: SaleService) {
    this.data = this.route.snapshot.data.sales;
   }

  ngOnInit() {
    this.tableData = {
      title: 'Promoción',
      canEdit: true,
      canRemove: true,
      data: this.data,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    };
  }

  onDelete = (id: number) => {
    this.saleService.delete(id)
      .subscribe(res => {
          this.tableData.data = res;
          this.tableData = {...this.tableData};
        }
      );
  }

}

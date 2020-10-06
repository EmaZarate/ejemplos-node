import { Component, OnInit } from '@angular/core';
import { PriceList } from '../price-list.model';
import { ActivatedRoute } from '@angular/router';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { PriceListService } from '../price-list.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-price-list-list',
  templateUrl: './price-list-list.component.html',
  styleUrls: ['./price-list-list.component.css']
})
export class PriceListListComponent implements OnInit {

  headerRows = ['id', 'code', 'minimumLimit'];
  data: PriceList[];

  tableData: TableLayout;


  dataFromApi$;

  constructor(
    private route: ActivatedRoute,
    private priceListService: PriceListService
  ) {
    this.data = this.route.snapshot.data.priceLists;
  }

  ngOnInit() {
    this.tableData = {
      title: 'Lista de precio',
      canEdit: true,
      canRemove: false,
      data: this.data,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    };
  }

  onDelete = (id: number) => {
    this.priceListService.delete(id)
      .pipe(switchMap(this.updateDataTable))
      .subscribe(res => {
          this.tableData.data = res;
          this.tableData = {...this.tableData};
        }
      );
  }

  updateDataTable = () => this.priceListService.getAll();
}

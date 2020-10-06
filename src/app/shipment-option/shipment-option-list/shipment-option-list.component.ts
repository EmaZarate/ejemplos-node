import { Component, OnInit } from '@angular/core';
import { ShipmentOption } from '../shipment-option.model';
import { ActivatedRoute } from '@angular/router';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';
import { switchMap } from 'rxjs/operators';
import { ShipmentOptionService } from '../shipment-option.service';

@Component({
  selector: 'app-shipment-option-list',
  templateUrl: './shipment-option-list.component.html',
  styleUrls: ['./shipment-option-list.component.css']
})
export class ShipmentOptionListComponent implements OnInit {

  headerRows = ['id', 'name', 'percent'];
  data: ShipmentOption[];
  tableData: TableLayout;


  constructor(
    private route: ActivatedRoute,
    private shipmentOptionService: ShipmentOptionService
  ) {
    this.data = this.route.snapshot.data.shipmentOptions;
  }

  ngOnInit() {
    this.tableData = {
      title: 'Opción de envío',
      canEdit: true,
      canRemove: true,
      data: this.data,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    };
  }

  onDelete = (id: number) => {
    this.shipmentOptionService.delete(id)
      .pipe(switchMap(this.updateDataTable))
      .subscribe(res => {
          this.tableData.data = res;
          this.tableData = {...this.tableData};
        }
      );
  }

  updateDataTable = () => this.shipmentOptionService.getAll();
}

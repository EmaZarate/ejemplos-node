import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../order.service';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  tableData: TableLayout;
  data;
  subtitle = 'Andina | Dorrego 1600 | Efectivo | Retiro en sucursal';
  headerRows = ['productName', 'price', 'quantity', 'packing'];
  businessName;
  branchAddress;
  paidType;
  shipmentOption;
  orderID;
  title;


  constructor(
    private route: ActivatedRoute,
    private router: Router) {
          this.data = this.route.snapshot.data.order;
     }

  ngOnInit() {
    this.prepareOrder();
  }


  prepareOrder() {
        this.businessName = this.data.businessName;
        this.branchAddress = this.data.branchAddress;
        this.paidType = this.data.paidType;
        this.shipmentOption = this.data.shipmentOption;
        this.orderID = this.data.orderID;
        this.title = 'Orden #' + this.orderID;
        this.tableData = {
          title: 'Lista de órdenes',
          canEdit: false,
          canRemove: false,
          canUpdateState: true,
          canSeeDetail: false,
          canSeeAction: false,
          data: this.data.items,
          functionRemove: () => {},
          headerRows: this.headerRows
        };
      }
}

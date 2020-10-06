import { Component, OnInit } from '@angular/core';
import { DashboardCard } from 'src/app/shared/models/DashboardCard.model';

@Component({
  selector: 'app-dashboard-import',
  templateUrl: './dashboard-import.component.html',
  styleUrls: ['./dashboard-import.component.css']
})
export class DashboardImportComponent implements OnInit {

  dashboardOptions: DashboardCard[] = [
    {
      content: '',
      icon: 'shopping_basket',
      title: 'Importar masivamente productos',
      navigateToRelative: 'products'
    },
    {
      content: '',
      icon: 'group',
      title: 'Importar masivamente a clientes',
      navigateToRelative: 'clients'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}

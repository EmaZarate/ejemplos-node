import { Component, OnInit } from '@angular/core';
import { Category } from '../category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { TableLayout } from 'src/app/shared/models/TableLayout.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  headerRows = ['id', 'name'];
  data: Category[];
  tableData: TableLayout;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService
  ) {
    this.data = this.route.snapshot.data.categories;
  }

  ngOnInit() {
    this.tableData = {
      title: 'Categoría',
      canEdit: true,
      canRemove: true,
      data: this.data,
      functionRemove: this.onDelete,
      headerRows: this.headerRows
    };
  }

  onDelete = (id: number) => {
    this.categoryService.delete(id)
      .pipe(switchMap(this.updateDataTable))
      .subscribe(res => {
        this.tableData.data = res;
        this.tableData = {...this.tableData};

        }
      );
  }

  updateDataTable = () => this.categoryService.getAll();


}

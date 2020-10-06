import { AfterViewInit, Component, ViewChild, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatDialog, MatPaginatorIntl } from '@angular/material';
import { TableDataSource } from './table-datasource';
import { HeaderCell } from '../../models/HeaderCell';
import { DataSource } from '@angular/cdk/table';

import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { TableLayout } from '../../models/TableLayout.model';
import { LockDialogComponent } from '../lock-dialog/lock-dialog.component';


export class GenericDataSource extends DataSource<any> {

  constructor(private paginator: MatPaginator, private sort: MatSort, private data: any[]) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() { }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: any[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: any[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {

      const isAsc = this.sort.direction === 'asc';
      return compare(a[this.sort.active], b[this.sort.active], isAsc);
      // switch (this.sort.active) {
      //   case 'name': return compare(a.name, b.name, isAsc);
      //   case 'id': return compare(+a.id, +b.id, isAsc);
      //   default: return 0;
      // }
    });
  }
}
/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnChanges {

  constructor(
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) { }

  @Input() tableData: TableLayout;
  @Input() isPercent: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: GenericDataSource;
  itemsLength = 0;
  columnsToDisplay: string[];

  ngAfterViewInit() {


    this.dataSource = new GenericDataSource(this.paginator, this.sort, this.tableData.data);
    this.itemsLength = this.tableData.data.length;
    this.cdRef.detectChanges();
  }

  ngOnChanges(changes) {
    if (this.tableData.canSeeAction == false) {
      if (changes.tableData.currentValue.headerRows) {
        this.columnsToDisplay =
          (this.tableData.canEdit || this.tableData.canRemove || this.tableData.canLock || this.tableData.canUpdateState)
            ? [...this.tableData.headerRows]
            : this.tableData.headerRows;
      }
    } else {
      if (changes.tableData.currentValue.headerRows) {
        this.columnsToDisplay =
          (this.tableData.canEdit || this.tableData.canRemove || this.tableData.canLock || this.tableData.canUpdateState)
            ? [...this.tableData.headerRows, 'acciones']
            : this.tableData.headerRows;
      }

    }
    if (changes.tableData && !changes.tableData.firstChange && changes.tableData.currentValue.data) {
      this.dataSource = new GenericDataSource(this.paginator, this.sort, changes.tableData.currentValue.data);
      this.itemsLength = changes.tableData.currentValue.data.length;
      this.cdRef.detectChanges();
    }
  }

  openDialog = (name: string, id: number) => {
    this.dialog.open(DeleteDialogComponent, {
      data: {
        title: this.tableData.title,
        name,
        id
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.tableData.functionRemove(id);
      }
    });
  }

  openLockDialog = (isLocking: boolean, name: string, id: number) => {
    this.dialog.open(LockDialogComponent, {
      data: {
        isLocking,
        name,
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.tableData.functionLock(id, isLocking);
      }
    });
  }


  navigateToEdit = (id) => this.router.navigate([id, 'edit'], { relativeTo: this.route });
}

export class PaginatorEspañol extends MatPaginatorIntl {
  itemsPerPageLabel = 'Items por página';
  nextPageLabel = 'Siguiente';
  previousPageLabel = 'Previa';
  firstPageLabel = 'Primera página';
  lastPageLabel = 'Última página';

  public getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // Si el índice de inicio excede la longitud de la lista, no intente
    // arreglar el índice final hasta el final
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  }
}



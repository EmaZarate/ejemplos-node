import { Component, OnInit } from '@angular/core';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { FormControl } from '@angular/forms';
import { ImportService } from '../import.service';
import { FileImport } from '../file-import.model';
import { FileInput } from 'ngx-material-file-input';
import { FileService } from '../file.service';
import { ImportResult } from '../import-result.model';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products-import',
  templateUrl: './products-import.component.html',
  styleUrls: ['./products-import.component.css']
})
export class ProductsImportComponent implements OnInit {

  displayedColumns: string[] = ['rowNum', 'description'];
  formInfo: FormLayout;
  fileControl: FormControl = new FormControl();
  fileBase64: string;
  importResults: ImportResult;
  isLoading = false;
  snackBarRef: Subscription;
  alertDuration = 45000;

  constructor(
    private importService: ImportService,
    private fileService: FileService,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.fileControl.valueChanges
      .subscribe(this.readFile);
  }

  readFile = (value: FileInput) => {
    if (value) {
      if (!this.validFile(value.files[0].name)) {
        this.fileControl.reset();
        this.fileControl.setErrors({ invalidType: true });
        return;
      }

      this.fileService.getBase64FromFile(value.files[0])
        .then((fileReaded: string) => this.fileBase64 = fileReaded);
    }
  }

  importFile = () => {
    this.isLoading = true;
    const fileUploaded: FileImport = {
      base64: this.fileBase64
    };

    this.importService.importProducts(fileUploaded)
    .subscribe((result) => {
      if (result) {
        this.isLoading = false;
        this.importResults = result;
        this.snackBarRef = this.snackbar.open('La importación de productos fue exitosa', 'Cerrar', { duration: this.alertDuration })
                                        .onAction().subscribe(() => {
                                          this.router.navigate(['../../product']);
                                        });
      } else {
        this.isLoading = false;
        this.snackBarRef = this.snackbar.open('No se pudieron cargar los productos', 'Cerrar', { duration: this.alertDuration })
                                        .onAction().subscribe(() => {
                                          this.router.navigate(['../import']);
                                        });
      }
  }, (err) => {
    this.isLoading = false;
    this.snackbar.open('La importación de productos falló', 'Cerrar', { duration: this.alertDuration });
  });
  }

  validFile = (fileName: string) => {
    return fileName.includes('.xls') || fileName.includes('.xlsx');
  }

}

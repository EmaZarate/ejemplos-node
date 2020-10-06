import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormLayout } from 'src/app/shared/models/FormLayout.model';
import { FormControl } from '@angular/forms';
import { ImportResult } from '../import-result.model';
import { ImportService } from '../import.service';
import { FileService } from '../file.service';
import { FileInput } from 'ngx-material-file-input';
import { FileImport } from '../file-import.model';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients-import',
  templateUrl: './clients-import.component.html',
  styleUrls: ['./clients-import.component.css']
})
export class ClientsImportComponent implements OnInit {


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

    this.importService.importClients(fileUploaded)
      .subscribe((result) => {
          if (result) {
            this.isLoading = false;
            this.importResults = result;
            this.snackBarRef = this.snackbar.open('La importación de clientes fue exitosa', 'Cerrar', { duration: this.alertDuration })
                                            .onAction().subscribe(() => {
                                              this.router.navigate(['../../customer']);
                                            });
          } else {
            this.isLoading = false;
            this.snackBarRef = this.snackbar.open('No se pudieron cargar los clientes', 'Cerrar', { duration: this.alertDuration })
                                            .onAction().subscribe(() => {
                                              this.router.navigate(['../import']);
                                            });
          }
      }, (err) => {
        this.snackbar.open('La importación de clientes falló', 'Cerrar', { duration: this.alertDuration });
      });
  }

  validFile = (fileName: string) => {
    return fileName.includes('.xls') || fileName.includes('.xlsx');
  }

}

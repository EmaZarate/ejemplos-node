import { Injectable } from '@angular/core';
import { FileImport } from './file-import.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ImportResult } from './import-result.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImportService {
  private importUrl = environment.baseUrl + 'import';
  constructor(
    private httpClient: HttpClient
  ) { }

  importProducts = (file: FileImport): Observable<ImportResult> =>
    this.httpClient.post<ImportResult>(this.importUrl + '/Products', file, httpOptions)

  importClients = (file: FileImport): Observable<ImportResult> =>
    this.httpClient.post<ImportResult>(this.importUrl + '/Clients', file, httpOptions)
}

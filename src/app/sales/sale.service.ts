import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SaleFactory, Sale } from './sale.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private readonly saleFactory = new SaleFactory();
  private saleUrl = environment.baseUrl + 'sale';

  constructor(
    private httpClient: HttpClient
  ) { }

  public addSale = (sale: Sale) => {
    return this.httpClient.post(this.saleUrl, this.saleFactory.mapToApi(sale), httpOptions);
  }

  public updateSale = (sale: Sale) => {
    return this.httpClient.put(this.saleUrl, this.saleFactory.mapToApi(sale), httpOptions);
  }

  public getOne = (idSale: number): Observable<Sale> => {
    return this.httpClient.get<Sale>(`${this.saleUrl}/${idSale}`).pipe(map((s) => this.saleFactory.mapFromApi(s)));
  }

  public getAll = (): Observable<Sale[]> => {
    return this.httpClient.get<Sale[]>(`${this.saleUrl}`).pipe(map((s) => this.saleFactory.mapArrayFromApi(s)));
  }

  public delete = (idSale: number): Observable<Sale[]> => {
    return this.httpClient.delete<Sale[]>(`${this.saleUrl}/${idSale}`).pipe(map((s) => this.saleFactory.mapArrayFromApi(s)));
  }


}

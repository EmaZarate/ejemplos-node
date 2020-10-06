import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PriceListFactory, PriceList } from './price-list.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};


@Injectable({
  providedIn: 'root'
})
export class PriceListService {
  private readonly priceListFactory = new PriceListFactory();
  private priceListUrl = environment.baseUrl + 'priceLists';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAll(): Observable<PriceList[]> {
    return this.httpClient.get(this.priceListUrl).pipe(map((c: any[]) => this.priceListFactory.mapArrayFromApi(c)));
  }

  public getOne(id: number): Observable<PriceList> {
    return this.httpClient.get(this.priceListUrl + '/' + id).pipe(map((p) => this.priceListFactory.mapFromApi(p)));
  }

  public add(priceList: PriceList) {
    return this.httpClient.post(this.priceListUrl, this.priceListFactory.mapToApi(priceList), httpOptions);
  }

  public update(priceList: PriceList) {
    return this.httpClient.put(this.priceListUrl, this.priceListFactory.mapToApi(priceList), httpOptions);
  }

  public delete(id: number) {
    return this.httpClient.delete(this.priceListUrl + '/' + id);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PaymentOptionFactory, PaymentOption } from './payment-option.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};


@Injectable({
  providedIn: 'root'
})

export class PaymentOptionService {
  private readonly paymentOptionFactory = new PaymentOptionFactory();
  private paymentOptionUrl = environment.baseUrl + 'paymentOptions';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAll(): Observable<PaymentOption[]> {
    return this.httpClient.get(this.paymentOptionUrl).pipe(map((c: any[]) => this.paymentOptionFactory.mapArrayFromApi(c)));
  }

  public getOne(id: number): Observable<PaymentOption> {
    return this.httpClient.get(this.paymentOptionUrl + '/' + id).pipe(map((c) => this.paymentOptionFactory.mapFromApi(c)));
  }

  public add(paymentOption: PaymentOption) {
    return this.httpClient.post(this.paymentOptionUrl, this.paymentOptionFactory.mapToApi(paymentOption), httpOptions);
  }

  public update(paymentOption: PaymentOption) {
    return this.httpClient.put(this.paymentOptionUrl, this.paymentOptionFactory.mapToApi(paymentOption), httpOptions);
  }

  public delete(id: number) {
    return this.httpClient.delete(this.paymentOptionUrl + '/' + id);
  }


}

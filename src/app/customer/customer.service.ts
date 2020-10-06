import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerFactory, Customer } from './customer.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json'})
  };

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly customerFactory = new CustomerFactory();
    private customerUrl = environment.baseUrl + 'customer';
    private fiscalConditionUrl = environment.baseUrl + 'FiscalCondition';

    constructor(
      private httpClient: HttpClient,
    ) { }

    public getAll(): Observable<Customer[]> {
      return this.httpClient.get(this.customerUrl).pipe(map((c: any[]) => this.customerFactory.mapArrayFromApi(c)));
    }

    public getOne(id: number): Observable<Customer> {
      return this.httpClient.get(this.customerUrl + '/' + id).pipe(map((c) => this.customerFactory.mapFromApi(c)));
    }

    public delete(id: number) {
      return this.httpClient.delete(this.customerUrl + '/' + id);
    }

    public unlock(id: number) {
      const req = {
        id
      };
      return this.httpClient.post(this.customerUrl + '/unlock', req, httpOptions);
    }

    public add(customer: Customer) {
      return this.httpClient.post(this.customerUrl, this.customerFactory.mapToApi(customer), httpOptions);
    }

    public update(customer: Customer) {
      return this.httpClient.put(this.customerUrl, this.customerFactory.mapToApi(customer), httpOptions);
    }

    public resetPassword(customer: Customer) {
      return this.httpClient.post(this.customerUrl + '/resetpassword', this.customerFactory.mapToApi(customer), httpOptions);
    }

    public getAllFiscalConditions() {
      return this.httpClient.get(this.fiscalConditionUrl);
    }
}

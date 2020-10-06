import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderStateFactory, OrderState } from './order-state.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json'})
};

@Injectable({
  providedIn: 'root'
})
export class OrderStateService {
  private readonly orderStateFactory = new OrderStateFactory();
  private orderStateUrl = environment.baseUrl + 'orderStates';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAll(): Observable<OrderState[]> {
    return this.httpClient.get(this.orderStateUrl).pipe(map((c: any[]) => this.orderStateFactory.mapArrayFromApi(c)));
  }

  public getOne(id: number): Observable<OrderState> {
    return this.httpClient.get(this.orderStateUrl + '/' + id).pipe(map((c) => this.orderStateFactory.mapFromApi(c)));
  }

  public delete(id: number) {
    return this.httpClient.delete(this.orderStateUrl + '/' + id);
  }

  public add(orderState: OrderState) {
    return this.httpClient.post(this.orderStateUrl, this.orderStateFactory.mapToApi(orderState), httpOptions);
  }

  public update(orderState: OrderState) {
    return this.httpClient.put(this.orderStateUrl, this.orderStateFactory.mapToApi(orderState), httpOptions);
  }
}

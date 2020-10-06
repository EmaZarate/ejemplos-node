import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Order, OrderFactory } from './order.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};

@Injectable({
  providedIn: 'root'
})

export class OrderService {
  allOrders: Order[];
  private readonly orderFactory = new OrderFactory();
  private orderUrl = environment.baseUrl + 'order';

  private filteredOrders = new BehaviorSubject<Order[]>(this.allOrders);
  filteredOrders$: Observable<Order[]> = this.filteredOrders.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAll(): Observable<Order[]> {
    return this.httpClient.get(this.orderUrl)
      .pipe(
        map((c: any[]) => this.orderFactory.mapArrayFromApi(c)),
        tap((orders) => {
          this.filteredOrders.next(orders);
          this.allOrders = orders;
        }));
  }
public getById(OrderId: number): any {

    const result = this.httpClient.get(this.orderUrl + '/getbyid/' + OrderId)
      .pipe(
        map((c: any) => this.orderFactory.mapFromApiById(c)));
    return result;
  }

  public updateStateOrder(id: number, state: string) {
    const request = {
      orderId: id,
      orderState: state
    };
    return this.httpClient.post(this.orderUrl + '/updatestate', request, httpOptions);
  }

  updateFilter = (search: string) => {
    search = search.toLowerCase();
    const newFilteredOrders = [
      ...this.allOrders.filter((p) =>
        p.state.toLowerCase().includes(search))
    ];
    this.filteredOrders.next(newFilteredOrders);
  }
}

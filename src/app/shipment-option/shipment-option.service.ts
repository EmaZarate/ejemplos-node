import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ShipmentOptionFactory, ShipmentOption } from './shipment-option.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};


@Injectable({
  providedIn: 'root'
})
export class ShipmentOptionService {
  private readonly shipmentOptionFactory = new ShipmentOptionFactory();
  private shipmentOptionUrl = environment.baseUrl + 'shipmentOptions';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAll(): Observable<ShipmentOption[]> {
    return this.httpClient.get(this.shipmentOptionUrl).pipe(map((ship: any[]) => this.shipmentOptionFactory.mapArrayFromApi(ship)));
  }

  public getOne(id: number): Observable<ShipmentOption> {
    return this.httpClient.get(this.shipmentOptionUrl + '/' + id).pipe(map((ship) => this.shipmentOptionFactory.mapFromApi(ship)));
  }

  public delete(id: number) {
    return this.httpClient.delete(this.shipmentOptionUrl + '/' + id);
  }

  public add(shipmentOption: ShipmentOption) {
    return this.httpClient.post(this.shipmentOptionUrl, this.shipmentOptionFactory.mapToApi(shipmentOption), httpOptions);
  }

  public update(shipmentOption: ShipmentOption) {
    return this.httpClient.put(this.shipmentOptionUrl, this.shipmentOptionFactory.mapToApi(shipmentOption), httpOptions);
  }
}

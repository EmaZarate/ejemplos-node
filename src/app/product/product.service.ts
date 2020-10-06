import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductFactory, Product } from './product.model';
import { Packing, PackingFactory } from './packing.model';
import { map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private readonly productFactory = new ProductFactory();
  private readonly packingFactory = new PackingFactory();
  private productUrl = environment.baseUrl + 'product';

  allProducts: Product[];

  private filteredProducts = new BehaviorSubject<Product[]>(this.allProducts);
  filteredProducts$: Observable<Product[]> = this.filteredProducts.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) { }

  public updatePacking = (idProduct: number, packing: Packing) => {
    const updateUrl = `${this.productUrl}/${idProduct}`;

    return this.httpClient.put(updateUrl, this.packingFactory.mapToApi(packing), httpOptions);
  }

  public addPacking = (idProduct: number, packing: Packing) => {
    const addUrl = `${this.productUrl}/${idProduct}`;

    return this.httpClient.post(addUrl, this.packingFactory.mapToApi(packing), httpOptions);
  }

  public removePacking = (idProduct: number, idPacking: number) => {
    const deleteUrl = `${this.productUrl}/${idProduct}/${idPacking}`;

    return this.httpClient.delete(deleteUrl);
  }

  public getAll = (): Observable<Product[]> => {
    return this.httpClient.get<Product[]>(this.productUrl)
      .pipe(
        map((p: Product[]) => this.productFactory.mapArrayFromApi(p)),
        tap((products: Product[]) => {
          this.filteredProducts.next(products);
          this.allProducts = products;
        }));
  }

  public getOne = (idProduct: number): Observable<Product> => {
    return this.httpClient.get<Product>(`${this.productUrl}/${idProduct}`).pipe(map((p: Product) => this.productFactory.mapFromApi(p)));
  }

  public updateProduct = (product: Product) => {
    return this.httpClient.put(this.productUrl, this.productFactory.mapToApi(product), httpOptions);
  }

  public addProduct = (product: Product) => {
    return this.httpClient.post(this.productUrl, this.productFactory.mapToApi(product), httpOptions);
  }

  updateFilter = (search: string) => {
    search = search.toLowerCase();
    const newFilteredProducts = [
      ...this.allProducts.filter((p) =>
        p.name.toLowerCase().includes(search)
        || p.category.name.toLowerCase().includes(search))
    ];
    this.filteredProducts.next(newFilteredProducts);
  }

  public delete = (idProduct: number): Observable<Product[]> => {
    return this.httpClient.delete<Product[]>(`${this.productUrl}/${idProduct}`);
  }


}

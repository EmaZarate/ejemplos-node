import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { CategoryFactory, Category } from './category.model';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json'})
};


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly categoryFactory = new CategoryFactory();
  private categoryUrl = environment.baseUrl + 'category';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAll(): Observable<Category[]> {
    return this.httpClient.get(this.categoryUrl).pipe(map((c: Category[]) => this.categoryFactory.mapArrayFromApi(c)));
  }

  public getOne(id: number): Observable<Category> {
    return this.httpClient.get(this.categoryUrl + '/' + id).pipe(map((c: Category) => this.categoryFactory.mapFromApi(c)));
  }

  public add(category: Category) {
    return this.httpClient.post(this.categoryUrl, this.categoryFactory.mapToApi(category), httpOptions);
  }

  public update(category: Category) {
    return this.httpClient.put(this.categoryUrl, this.categoryFactory.mapToApi(category), httpOptions);
  }

  public delete(id: number) {
    return this.httpClient.delete(this.categoryUrl + '/' + id);
  }
}

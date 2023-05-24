import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/categories/category.model';
import { Lookup } from '../models/Lookups/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiURL: string = 'https://localhost:7085/api/Categories'

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {

    return this.http.get<Category[]>(`${this.apiURL}/GetCategories`);
  }

  getCategory(id: number): Observable<Category> {

    return this.http.get<Category>(`${this.apiURL}/GetCategory/${id}`);
  }

  createCategory(category: Category): Observable<Category> {

    return this.http.post<Category>(`${this.apiURL}/CreateCategory`, category);
  }

  editCategory(category: Category): Observable<any> {

    return this.http.put<Category>(`${this.apiURL}/EditCategory/${category.id}`, category);
  }

  deleteCategory(categoryId: number): Observable<any> {

    return this.http.delete<Category>(`${this.apiURL}/DeleteCategory/${categoryId}`);
  }

  getCategoriesLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiURL}/GetCategoriesLookup`);
  }
}

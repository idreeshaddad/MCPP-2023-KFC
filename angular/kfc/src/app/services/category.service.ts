import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

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
}

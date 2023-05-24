import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductList } from '../models/products/productList.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiURL: string = 'https://localhost:7085/api/Products'

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductList[]> {

    return this.http.get<ProductList[]>(`${this.apiURL}/GetProducts`);
  }

  // getProduct(id: number): Observable<Product> {

  //   return this.http.get<Product>(`${this.apiURL}/GetProduct/${id}`);
  // }

  // createProduct(product: Product): Observable<Product> {

  //   return this.http.post<Product>(`${this.apiURL}/CreateProduct`, product);
  // }

  // editProduct(product: Product): Observable<any> {

  //   return this.http.put<Product>(`${this.apiURL}/EditProduct/${product.id}`, product);
  // }

  deleteProduct(productId: number): Observable<any> {

    return this.http.delete<ProductList>(`${this.apiURL}/DeleteProduct/${productId}`);
  }
}

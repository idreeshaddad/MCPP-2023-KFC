import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetails } from '../models/orders/orderDetails.model';
import { OrderList } from '../models/orders/orderList.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiURL: string = 'https://localhost:7085/api/Orders'

  constructor(private http: HttpClient) { }

  getOrders(): Observable<OrderList[]> {

    return this.http.get<OrderList[]>(`${this.apiURL}/GetOrders`);
  }

  getOrder(orderId: number): Observable<OrderDetails> {

    return this.http.get<OrderDetails>(`${this.apiURL}/GetOrder/${orderId}`);
  }
}

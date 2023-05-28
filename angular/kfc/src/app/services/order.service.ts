import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/orders/order.model';
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

  createOrder(order: Order): Observable<any> {

    return this.http.post<Order>(`${this.apiURL}/CreateOrder`, order);
  }

  getOrderForEdit(orderId: number): Observable<Order> {

    return this.http.get<Order>(`${this.apiURL}/GetOrderForEdit/${orderId}`);
  }

  editOrder(order: Order): Observable<any> {

    return this.http.put<Order>(`${this.apiURL}/EditOrder/${order.id}`, order);
  }

  deleteOrder(orderId: number): Observable<any> {

    return this.http.delete<Order>(`${this.apiURL}/DeleteOrder/${orderId}`);
  }
}

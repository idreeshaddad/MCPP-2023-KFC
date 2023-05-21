import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerList } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL: string = 'https://localhost:7085/api/Customers'

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerList[]> {

    return this.http.get<CustomerList[]>(`${this.apiURL}/GetCustomers`);
  }
}

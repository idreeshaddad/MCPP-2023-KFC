import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../models/customers/customer.model';
import { CustomerDetails } from '../models/customers/customerDetails.model';
import { CustomerList } from '../models/customers/customerList.model';
import { Lookup } from '../models/Lookups/lookup.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiURL: string = `${environment.apiUrl}/Customers`;

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<CustomerList[]> {

    return this.http.get<CustomerList[]>(`${this.apiURL}/GetCustomers`);
  }

  getCustomer(customerId: number): Observable<CustomerDetails> {

    return this.http.get<CustomerDetails>(`${this.apiURL}/GetCustomer/${customerId}`);
  }

  createCustomer(customer: Customer): Observable<any> {

    return this.http.post<any>(`${this.apiURL}/CreateCustomer`, customer);
  }

  getCustomerForEdit(customerId: number): Observable<Customer> {

    return this.http.get<Customer>(`${this.apiURL}/GetCustomerForEdit/${customerId}`);
  }

  editCustomer(customer: Customer): Observable<any> {

    return this.http.put<any>(`${this.apiURL}/EditCustomer/${customer.id}`, customer);
  }

  deleteCustomer(customerId: number): Observable<any> {

    return this.http.delete<any>(`${this.apiURL}/DeleteCustomer/${customerId}`);
  }

  getCustomersLookup(): Observable<Lookup[]> {

    return this.http.get<Lookup[]>(`${this.apiURL}/GetCustomersLookup`);
  }
}

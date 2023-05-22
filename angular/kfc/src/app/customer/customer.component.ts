import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerList } from '../models/customers/customerList.model';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customerDS: CustomerList[] = [];
  customerColumns: string[] = ['id', 'fullName', 'age', 'phoneNumber', 'actions'];

  constructor(
    private customerSvc: CustomerService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loadCustomers();
  }

  //#region Private Functions

  private loadCustomers(): void {

    this.customerSvc.getCustomers().subscribe({
      next: (customerFromApi: CustomerList[]) => {
        this.customerDS = customerFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}

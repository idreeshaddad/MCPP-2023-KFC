import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerList } from '../models/customers/customerList.model';
import { CustomerService } from '../services/customer.service';
import { DeleteCustomerComponent } from './delete-customer/delete-customer.component';

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

  openDeleteDialog(customer: CustomerList) {

    const dialogRef = this.dialog.open(DeleteCustomerComponent, {
      data: customer
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.customerSvc.deleteCustomer(customer.id).subscribe({
            next: () => {
              this.loadCustomers();
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`${customer.fullName} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
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

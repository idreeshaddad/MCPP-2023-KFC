import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderList } from '../models/orders/orderList.model';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  productDS: OrderList[] = [];

  constructor(
    private orderSvc: OrderService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loadOrders();
  }

  //#region Private Functions

  private loadOrders(): void {

    this.orderSvc.getOrders().subscribe({
      next: (productsFromApi: OrderList[]) => {
        this.productDS = productsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}

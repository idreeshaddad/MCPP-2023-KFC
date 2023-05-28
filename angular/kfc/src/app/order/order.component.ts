import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderList } from '../models/orders/orderList.model';
import { OrderService } from '../services/order.service';
import { DeleteOrderComponent } from './delete-order/delete-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orderDS: OrderList[] = [];
  orderColumns: string[] = ['id', 'customer', 'orderDate', 'totalPrice', 'note', 'actions'];

  constructor(
    private orderSvc: OrderService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loadOrders();
  }

  openDeleteDialog(order: OrderList) {

    const dialogRef = this.dialog.open(DeleteOrderComponent, {
      data: order
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.orderSvc.deleteOrder(order.id).subscribe({
            next: () => {
              this.loadOrders();
              this.snackBar.open(`Order #${order.id} has been deleted successfully`);
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`Order #${order.id} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
  }

  //#region Private Functions

  private loadOrders(): void {

    this.orderSvc.getOrders().subscribe({
      next: (ordersFromApi: OrderList[]) => {
        this.orderDS = ordersFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}

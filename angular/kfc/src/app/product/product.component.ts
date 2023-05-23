import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductList } from '../models/products/productList.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productDS: ProductList[] = [];
  productColumns: string[] = ['id', 'name', 'productName', 'actions'];

  constructor(
    private productSvc: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  //#region Private Functions

  private loadProducts(): void {

    this.productSvc.getProducts().subscribe({
      next: (productsFromApi: ProductList[]) => {
        this.productDS = productsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}

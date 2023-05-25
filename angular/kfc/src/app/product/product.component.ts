import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from '../models/products/product.model';
import { ProductService } from '../services/product.service';
import { DeleteProductComponent } from './delete-product/delete-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productDS: Product[] = [];
  productColumns: string[] = ['id', 'name', 'categoryName', 'actions'];

  constructor(
    private productSvc: ProductService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.loadProducts();
  }

  openDeleteDialog(product: Product) {

    const dialogRef = this.dialog.open(DeleteProductComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe({
      next: (result: boolean) => {

        if (result) {
          this.productSvc.deleteProduct(product.id).subscribe({
            next: () => {
              this.loadProducts();
              this.snackBar.open(`${product.name} has been deleted successfully`);
            },
            error: (err: HttpErrorResponse) => {
              this.snackBar.open(`${product.name} cannot be deleted. ${err.message}`);
            }
          });
        }

      }
    });
  }

  //#region Private Functions

  private loadProducts(): void {

    this.productSvc.getProducts().subscribe({
      next: (productsFromApi: Product[]) => {
        this.productDS = productsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}

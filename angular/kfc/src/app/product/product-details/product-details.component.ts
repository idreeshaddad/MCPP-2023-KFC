import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/products/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private productSvc: ProductService,
    private activatedRoute: ActivatedRoute) { }

  productId!: number;
  product?: Product;

  ngOnInit(): void {

    this.getProductsIdFromUrl();

    if (this.productId) {

      this.loadProducts();
    }
  }

  //#region Private Functions

  private getProductsIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadProducts(): void {

    this.productSvc.getProduct(this.productId).subscribe({
      next: (productsFromApi: Product) => {
        this.product = productsFromApi;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      }
    });
  }

  //#endregion


}

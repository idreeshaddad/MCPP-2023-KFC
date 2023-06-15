import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/products/product.model';
import { UploaderImage } from 'src/app/directives/image-uploader/UploaderImage.data';
import { ImageUploaderConfig } from 'src/app/directives/image-uploader/image-uploader.config';
import { UploaderMode, UploaderStyle, UploaderType } from 'src/app/directives/image-uploader/uploader.enums';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  images: UploaderImage[] = [];
  uploaderConfig = new ImageUploaderConfig(UploaderStyle.Normal, UploaderMode.Details, UploaderType.Multiple);

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

        if (productsFromApi.images) {
          this.images = productsFromApi.images;
        }

      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      }
    });
  }

  //#endregion


}

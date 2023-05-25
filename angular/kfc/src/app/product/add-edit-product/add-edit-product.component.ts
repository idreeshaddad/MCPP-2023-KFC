import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PageMode } from 'src/app/enum/pageMode.enum';
import { Lookup } from 'src/app/models/Lookups/lookup.model';
import { Product } from 'src/app/models/products/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  productForm!: FormGroup;
  categoryLookup: Lookup[] = [];

  productId!: number;
  product!: Product;
  pageMode: PageMode = PageMode.add;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private productSvc: ProductService,
    private categorySvc: CategoryService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.buildForm();

    this.loadCategories();

    this.getProductIdFromUrl();

    if (this.pageMode == PageMode.edit) {

      this.loadProduct();
    }

  }

  create(): void {

    if (this.productForm.valid) {
      this.createProduct();
      this.router.navigate(['product']);
    }
  }

  createAndAddMore(): void {

    if (this.productForm.valid) {
      this.createProduct();
      this.productForm.reset();
    }
  }

  save(): void {

    if (this.productForm.valid) {
      this.saveProduct();
      this.router.navigate(['product']);
    }
  }

  //#region Private Functions

  private buildForm(): void {

    this.productForm = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      price: ['', Validators.required],
      categoryId: ['', Validators.required]
    });
  }

  private loadCategories() {

    this.categorySvc.getCategoriesLookup().subscribe({
      next: (categoryDtoFromApi: Lookup[]) => {
        this.categoryLookup = categoryDtoFromApi;
      }
    });
  }

  private getProductIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.productId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.edit;
    }
  }

  private loadProduct(): void {

    this.productSvc.getProduct(this.productId).subscribe({
      next: (productFromApi: Product) => {

        this.product = productFromApi;
        this.patchProductForm();

      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private patchProductForm() {

    this.productForm.patchValue({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      categoryId: this.product.categoryId
    });
  }

  private createProduct(): void {

    this.productSvc.createProduct(this.productForm.value).subscribe({
      next: (productFromApi: Product) => {
        this.snackBar.open("Product has been created Successfully");
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private saveProduct(): void {

    this.productSvc.editProduct(this.productForm.value).subscribe({
      next: (productFromApi: Product) => {
        this.snackBar.open("Product has been updated Successfully");
        this.router.navigate(['product']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion

}

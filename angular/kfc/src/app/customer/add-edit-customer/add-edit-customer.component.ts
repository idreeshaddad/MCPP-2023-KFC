import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageUploaderConfig } from 'src/app/directives/image-uploader/image-uploader.config';
import { UploaderMode } from 'src/app/directives/image-uploader/uploaderMode.enum';
import { PageMode } from 'src/app/enum/pageMode.enum';
import { Customer } from 'src/app/models/customers/customer.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.css']
})
export class AddEditCustomerComponent implements OnInit {

  uploaderConfig: ImageUploaderConfig = {
    mode: UploaderMode.Profile
  }

  customerForm!: FormGroup;

  customerId!: number;
  customer!: Customer;
  pageMode: PageMode = PageMode.add;

  pageModeEnum = PageMode;

  constructor(
    private fb: FormBuilder,
    private customerSvc: CustomerService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.buildForm();

    this.getCustomerIdFromUrl();

    if (this.pageMode == PageMode.edit) {

      this.loadCustomer();
    }
  }

  submitForm() {

    if (this.customerForm.valid) {

      if (this.pageMode == PageMode.add) {

        this.createCustomer();
      }
      else {
        this.editCustomer();
      }
    }
  }

  customerImageUploaded() {
    alert("Customer Image Uploaded");
  }

  //#region Private Functions

  private buildForm(): void {

    this.customerForm = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    });
  }

  private getCustomerIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.pageMode = PageMode.edit;
    }
  }

  private loadCustomer(): void {

    this.customerSvc.getCustomerForEdit(this.customerId).subscribe({
      next: (customerFromApi: Customer) => {
        this.customer = customerFromApi;
        this.patchCustomerForm();
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      }
    });
  }
  private patchCustomerForm() {

    this.customerForm.patchValue({
      id: this.customer.id,
      firstName: this.customer.firstName,
      lastName: this.customer.lastName,
      phoneNumber: this.customer.phoneNumber,
      dateOfBirth: this.customer.dateOfBirth,
    });
  }

  private createCustomer(): void {

    this.customerSvc.createCustomer(this.customerForm.value).subscribe({
      next: () => {
        this.snackBar.open("Customer has been created Successfully");
        this.router.navigate(['customer']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  private editCustomer(): void {

    this.customerSvc.editCustomer(this.customerForm.value).subscribe({
      next: () => {
        this.snackBar.open("Customer has been updated Successfully");
        this.router.navigate(['customer']);
      },
      error: (err: HttpErrorResponse) => {
        this.snackBar.open(err.message);
      }
    });
  }

  //#endregion


}

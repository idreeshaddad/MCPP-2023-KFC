import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImageUploaderConfig } from 'src/app/directives/image-uploader/image-uploader.config';
import { UploaderMode, UploaderStyle, UploaderType } from 'src/app/directives/image-uploader/uploader.enums';
import { UploaderImage } from 'src/app/directives/image-uploader/UploaderImage.data';
import { CustomerDetails } from 'src/app/models/customers/customerDetails.model';
import { OrderList } from 'src/app/models/orders/orderList.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {

  customerId!: number;
  customer?: CustomerDetails;

  orderDS: OrderList[] = [];
  orderColumns: string[] = ['id', 'totalPrice', 'note', 'orderDate', 'actions'];

  images: UploaderImage[] = [];
  uploaderConfig = new ImageUploaderConfig(UploaderStyle.Profile, UploaderMode.Details, UploaderType.Single);

  constructor(private customerSvc: CustomerService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.getCustomerIdFromUrl();

    if (this.customerId) {

      this.loadCustomer();
    }
  }

  //#region Private Functions

  private getCustomerIdFromUrl(): void {

    if (this.activatedRoute.snapshot.paramMap.get('id')) {

      this.customerId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    }
  }

  private loadCustomer(): void {

    this.customerSvc.getCustomer(this.customerId).subscribe({
      next: (customerFromApi: CustomerDetails) => {
        this.customer = customerFromApi;
        this.orderDS = this.customer.orders;
        this.images = this.customer.images;
      },
      error: (err: HttpErrorResponse) => {
        console.error(err.error);
      }
    });
  }

  //#endregion

}

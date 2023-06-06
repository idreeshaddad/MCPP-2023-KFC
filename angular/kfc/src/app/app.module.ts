import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { DeleteCategoryComponent } from './category/delete-category/delete-category.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DeleteCustomerComponent } from './customer/delete-customer/delete-customer.component';
import { ProductComponent } from './product/product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { OrderComponent } from './order/order.component';
import { DeleteOrderComponent } from './order/delete-order/delete-order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import { AddEditOrderComponent } from './order/add-edit-order/add-edit-order.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    AddEditCategoryComponent,
    CategoryDetailsComponent,
    DeleteCategoryComponent,
    CustomerComponent,
    CustomerDetailsComponent,
    AddEditCustomerComponent,
    DeleteCustomerComponent,
    ProductComponent,
    DeleteProductComponent,
    AddEditProductComponent,
    ProductDetailsComponent,
    OrderComponent,
    DeleteOrderComponent,
    OrderDetailsComponent,
    AddEditOrderComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 2500,
        panelClass: ['bg-dark', 'text-light']
      },
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

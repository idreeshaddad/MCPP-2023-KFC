import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { CategoryDetailsComponent } from './category/category-details/category-details.component';
import { CategoryComponent } from './category/category.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { CustomerDetailsComponent } from './customer/customer-details/customer-details.component';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';
import { AddEditProductComponent } from './product/add-edit-product/add-edit-product.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, },

  { path: 'category', component: CategoryComponent, },
  { path: 'category/details/:id', component: CategoryDetailsComponent, },
  { path: 'category/add', component: AddEditCategoryComponent, },
  { path: 'category/edit/:id', component: AddEditCategoryComponent, },

  { path: 'customer', component: CustomerComponent, },
  { path: 'customer/details/:id', component: CustomerDetailsComponent, },
  { path: 'customer/add', component: AddEditCustomerComponent, },
  { path: 'customer/edit/:id', component: AddEditCustomerComponent, },

  { path: 'product', component: ProductComponent },
  { path: 'product/details/:id', component: ProductDetailsComponent, },
  { path: 'product/add', component: AddEditProductComponent, },
  { path: 'product/edit/:id', component: AddEditProductComponent, },

  { path: 'order', component: OrderComponent },
  // { path: 'order/details/:id', component: OrderDetailsComponent, },
  // { path: 'order/add', component: AddEditOrderComponent, },
  // { path: 'order/edit/:id', component: AddEditOrderComponent, },

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

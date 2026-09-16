import { Routes } from '@angular/router';
import { Products } from './products/products';
import { AddProduct } from './add-product/add-product';
import { UpdateProduct } from './update-product/update-product';

// Links each URL to the page (component) it shows
export const routes: Routes = [
  { path: '', component: Products },               // home page: list of products
  { path: 'add', component: AddProduct },          // /add: add product form
  { path: 'update/:id', component: UpdateProduct }, // /update/<_id>: edit that product
];

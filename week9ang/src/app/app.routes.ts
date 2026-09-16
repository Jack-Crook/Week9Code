import { Routes } from '@angular/router';
import { Products } from './products/products';
import { AddProduct } from './add-product/add-product';
import { UpdateProduct } from './update-product/update-product';

export const routes: Routes = [
  { path: '', component: Products },
  { path: 'add', component: AddProduct },
  { path: 'update/:id', component: UpdateProduct },
];

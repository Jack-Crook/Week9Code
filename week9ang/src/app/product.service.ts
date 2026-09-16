import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

// A service holds code shared by several components.
// This one makes all the HTTP requests to the Express server.
// providedIn: 'root' means one copy is shared across the whole app.
@Injectable({ providedIn: 'root' })
export class ProductService {
  // HttpClient is Angular's tool for sending HTTP requests
  private http = inject(HttpClient);

  // Base address of the Express products routes
  private apiUrl = 'http://localhost:3000/products';

  // GET /products: get all products
  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // POST /products: add a new product
  addProduct(product: Product) {
    return this.http.post(this.apiUrl, product);
  }

  // PUT /products/:id: update the product with this _id
  updateProduct(id: string, product: Product) {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // DELETE /products/:id: remove the product with this _id
  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}

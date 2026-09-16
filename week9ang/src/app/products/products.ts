import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

// Products page: shows all products in a table
@Component({
  imports: [RouterLink],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  // Get the service that talks to the Express server
  private productService = inject(ProductService);

  // Signals are values that update the page automatically when they change
  products = signal<Product[]>([]);
  message = signal('');

  // ngOnInit runs once when the page first opens
  ngOnInit() {
    this.loadProducts();
  }

  // Ask the server for all products and put them in the table
  loadProducts() {
    // subscribe() sends the request. next runs on success, error runs on failure.
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.message.set('');
      },
      error: () => {
        this.message.set('Could not load products. Is the Express server running on port 3000?');
      },
    });
  }

  // Delete a product by its _id, then reload the list so it disappears
  deleteProduct(id?: string) {
    // Stop if there is no _id
    if (!id) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: () => {
        this.message.set('Could not delete product.');
      },
    });
  }
}

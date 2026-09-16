import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  imports: [RouterLink],
  selector: 'app-products',
  styleUrl: './products.css',
  templateUrl: './products.html',
})
export class Products implements OnInit {
  private productService = inject(ProductService);

  products: Product[] = [];
  message = '';

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.message = '';
      },
      error: () => {
        this.message = 'Could not load products. Is the Express server running on port 3000?';
      },
    });
  }

  deleteProduct(id?: string) {
    if (!id) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: () => {
        this.message = 'Could not delete product.';
      },
    });
  }
}

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  imports: [FormsModule],
  selector: 'app-add-product',
  styleUrl: './add-product.css',
  templateUrl: './add-product.html',
})
export class AddProduct {
  private productService = inject(ProductService);
  private router = inject(Router);

  product: Product = {
    Id: 0,
    Name: '',
    Description: '',
    Price: 0,
    units: 0,
    type: '',
  };

  message = '';

  addProduct() {
    const product: Product = {
      ...this.product,
      Id: Number(this.product.Id),
      Price: Number(this.product.Price),
      units: Number(this.product.units),
    };

    this.productService.addProduct(product).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.message = err.error?.error || 'Could not add product.';
      },
    });
  }
}

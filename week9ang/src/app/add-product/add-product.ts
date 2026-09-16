import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

// Add Product page: a form to create a new product
@Component({
  imports: [FormsModule], // FormsModule gives us ngModel for the form inputs
  selector: 'app-add-product',
  styleUrl: './add-product.css',
  templateUrl: './add-product.html',
})
export class AddProduct {
  private productService = inject(ProductService);
  private router = inject(Router); // used to change page after saving

  // Starting values for the form. ngModel keeps this in sync with the inputs.
  product: Product = {
    Id: 0,
    Name: '',
    Description: '',
    Price: 0,
    units: 0,
    type: '',
  };

  // Error message shown under the form
  message = signal('');

  // Runs when the form is submitted
  addProduct() {
    // Copy the form data and make sure the number fields are real numbers
    const product: Product = {
      ...this.product,
      Id: Number(this.product.Id),
      Price: Number(this.product.Price),
      units: Number(this.product.units),
    };

    // Send it to the server. On success go back to the products list.
    this.productService.addProduct(product).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        // Show the server's error (for example, duplicate Id) if it sent one
        this.message.set(err.error?.error || 'Could not add product.');
      },
    });
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

// Update Product page: loads one product into a form so it can be edited
@Component({
  imports: [FormsModule], // FormsModule gives us ngModel for the form inputs
  selector: 'app-update-product',
  styleUrl: './update-product.css',
  templateUrl: './update-product.html',
})
export class UpdateProduct implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute); // gives access to the current URL
  private router = inject(Router);        // used to change page after saving

  // The _id of the product being edited (taken from the URL)
  id = '';

  // The product shown in the form. It's a signal so the form updates when data loads.
  product = signal<Product>({
    Id: 0,
    Name: '',
    Description: '',
    Price: 0,
    units: 0,
    type: '',
  });
  message = signal('');

  // Runs once when the page opens
  ngOnInit() {
    // Read the :id part of the URL, for example /update/abc123
    this.id = this.route.snapshot.paramMap.get('id') || '';

    // Get all products, then find the one with a matching _id
    this.productService.getProducts().subscribe({
      next: (items) => {
        const found = items.find((item) => item._id === this.id);
        if (found) {
          // Put a copy of the product into the form
          this.product.set({ ...found });
        } else {
          this.message.set('Product not found.');
        }
      },
      error: () => {
        this.message.set('Could not load product.');
      },
    });
  }

  // Runs when the form is submitted
  updateProduct() {
    // Copy the form data and make sure the number fields are real numbers
    const product: Product = {
      ...this.product(),
      Id: Number(this.product().Id),
      Price: Number(this.product().Price),
      units: Number(this.product().units),
    };

    // Send the changes to the server. On success go back to the products list.
    this.productService.updateProduct(this.id, product).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.message.set(err.error?.error || 'Could not update product.');
      },
    });
  }
}

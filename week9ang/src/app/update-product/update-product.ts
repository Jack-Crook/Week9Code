import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  imports: [FormsModule],
  selector: 'app-update-product',
  styleUrl: './update-product.css',
  templateUrl: './update-product.html',
})
export class UpdateProduct implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  id = '';
  product: Product = {
    Id: 0,
    Name: '',
    Description: '',
    Price: 0,
    units: 0,
    type: '',
  };
  message = '';

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';

    this.productService.getProducts().subscribe({
      next: (items) => {
        const found = items.find((item) => item._id === this.id);
        if (found) {
          this.product = { ...found };
        } else {
          this.message = 'Product not found.';
        }
      },
      error: () => {
        this.message = 'Could not load product.';
      },
    });
  }

  updateProduct() {
    const product: Product = {
      ...this.product,
      Id: Number(this.product.Id),
      Price: Number(this.product.Price),
      units: Number(this.product.units),
    };

    this.productService.updateProduct(this.id, product).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.message = err.error?.error || 'Could not update product.';
      },
    });
  }
}

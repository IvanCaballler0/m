import { Component, Input } from '@angular/core';
import { Product } from '@models/product.model';
import { CartService } from '@core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-card">
      <div class="product-image">
        <img [src]="product.image" [alt]="product.name" />
        <span class="product-category">{{ product.category }}</span>
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.description }}</p>
        <div class="product-rating" *ngIf="product.rating">
          <span class="stars">★ {{ product.rating }}</span>
        </div>
        <div class="product-footer">
          <span class="product-price">${{ product.price | number:'1.2-2' }}</span>
          <button 
            class="add-to-cart-btn" 
            (click)="addToCart()"
            [disabled]="product.stock === 0">
            {{ product.stock > 0 ? 'Agregar al carrito' : 'Sin stock' }}
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    }

    .product-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .product-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .product-category {
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .product-info {
      padding: 16px;
    }

    .product-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
    }

    .product-description {
      font-size: 14px;
      color: #666;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    .product-rating {
      margin-bottom: 12px;
    }

    .stars {
      color: #ffc107;
      font-weight: bold;
    }

    .product-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .product-price {
      font-size: 20px;
      font-weight: 700;
      color: #2ecc71;
    }

    .add-to-cart-btn {
      background: #3498db;
      color: white;
      padding: 8px 16px;
      border-radius: 4px;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    .add-to-cart-btn:hover:not(:disabled) {
      background: #2980b9;
    }

    .add-to-cart-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  constructor(private cartService: CartService) {}

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }
}

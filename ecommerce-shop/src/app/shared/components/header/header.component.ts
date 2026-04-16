import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-container">
        <div class="logo">
          <a routerLink="/products" routerLinkActive="active">
            <span class="logo-icon">🛒</span>
            <span class="logo-text">Ecommerce Shop</span>
          </a>
        </div>
        <nav class="nav">
          <a routerLink="/products" routerLinkActive="active" class="nav-link">
            Productos
          </a>
        </nav>
        <div class="cart-icon" (click)="goToCart()">
          <span class="cart-badge">{{ cartService.cartCount() }}</span>
          <span class="cart-symbol">🛒</span>
          <span class="cart-total">${{ cartService.cartTotal() | number:'1.2-2' }}</span>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px 0;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .header-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo a {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      color: white;
      font-size: 24px;
      font-weight: bold;
    }

    .logo-icon {
      font-size: 28px;
    }

    .nav {
      display: flex;
      gap: 20px;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background 0.3s ease;
    }

    .nav-link:hover,
    .nav-link.active {
      background: rgba(255, 255, 255, 0.2);
    }

    .cart-icon {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      transition: background 0.3s ease;
    }

    .cart-icon:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #e74c3c;
      color: white;
      font-size: 12px;
      font-weight: bold;
      min-width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .cart-symbol {
      font-size: 20px;
    }

    .cart-total {
      font-weight: 600;
    }
  `]
})
export class HeaderComponent {
  constructor(public cartService: CartService) {}

  goToCart(): void {
    // Navegación programática se puede implementar aquí
    window.location.href = '/cart';
  }
}

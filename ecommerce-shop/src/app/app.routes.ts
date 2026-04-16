import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () => import('@features/products/pages/products-page.component')
      .then(m => m.ProductsPageComponent),
    title: 'Productos - Ecommerce Shop'
  },
  {
    path: 'cart',
    loadComponent: () => import('@features/cart/pages/cart-page.component')
      .then(m => m.CartPageComponent),
    title: 'Carrito - Ecommerce Shop'
  },
  {
    path: '**',
    redirectTo: 'products'
  }
];

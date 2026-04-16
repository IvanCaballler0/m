import { Injectable, signal } from '@angular/core';
import { Product } from '@models/product.model';
import { of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([]);
  private loading = signal<boolean>(false);
  private page = signal<number>(1);
  private hasMore = signal<boolean>(true);

  private mockProducts: Product[] = [
    { id: 1, name: 'Laptop Pro', description: 'Laptop de alta gama para profesionales', price: 1299.99, image: 'https://via.placeholder.com/300x200?text=Laptop', category: 'Electrónica', stock: 50, rating: 4.5 },
    { id: 2, name: 'Smartphone X', description: 'Teléfono inteligente de última generación', price: 899.99, image: 'https://via.placeholder.com/300x200?text=Smartphone', category: 'Electrónica', stock: 100, rating: 4.7 },
    { id: 3, name: 'Auriculares Wireless', description: 'Auriculares con cancelación de ruido', price: 199.99, image: 'https://via.placeholder.com/300x200?text=Auriculares', category: 'Accesorios', stock: 200, rating: 4.3 },
    { id: 4, name: 'Teclado Mecánico', description: 'Teclado mecánico RGB para gaming', price: 149.99, image: 'https://via.placeholder.com/300x200?text=Teclado', category: 'Accesorios', stock: 75, rating: 4.6 },
    { id: 5, name: 'Monitor 4K', description: 'Monitor Ultra HD de 27 pulgadas', price: 449.99, image: 'https://via.placeholder.com/300x200?text=Monitor', category: 'Electrónica', stock: 30, rating: 4.4 },
    { id: 6, name: 'Ratón Gaming', description: 'Ratón ergonómico de alta precisión', price: 79.99, image: 'https://via.placeholder.com/300x200?text=Raton', category: 'Accesorios', stock: 150, rating: 4.2 },
    { id: 7, name: 'Cámara DSLR', description: 'Cámara profesional para fotografía', price: 1599.99, image: 'https://via.placeholder.com/300x200?text=Camara', category: 'Fotografía', stock: 20, rating: 4.8 },
    { id: 8, name: 'Tablet Pro', description: 'Tablet de 10 pulgadas con stylus', price: 699.99, image: 'https://via.placeholder.com/300x200?text=Tablet', category: 'Electrónica', stock: 60, rating: 4.5 },
    { id: 9, name: 'Altavoz Bluetooth', description: 'Altavoz portátil resistente al agua', price: 129.99, image: 'https://via.placeholder.com/300x200?text=Altavoz', category: 'Accesorios', stock: 120, rating: 4.1 },
    { id: 10, name: 'Smartwatch', description: 'Reloj inteligente con monitor de salud', price: 299.99, image: 'https://via.placeholder.com/300x200?text=Smartwatch', category: 'Accesorios', stock: 80, rating: 4.4 },
    { id: 11, name: 'Impresora Láser', description: 'Impresora multifunción láser', price: 349.99, image: 'https://via.placeholder.com/300x200?text=Impresora', category: 'Oficina', stock: 40, rating: 4.3 },
    { id: 12, name: 'Disco Duro SSD', description: 'SSD de 1TB de alta velocidad', price: 119.99, image: 'https://via.placeholder.com/300x200?text=SSD', category: 'Almacenamiento', stock: 200, rating: 4.7 },
  ];

  getLoading() {
    return this.loading();
  }

  getHasMore() {
    return this.hasMore();
  }

  async loadProducts(pageSize: number = 12): Promise<Product[]> {
    this.loading.set(true);
    
    // Simular llamada a API con delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const currentPage = this.page();
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const newProducts = this.mockProducts.slice(startIndex, endIndex);
    
    if (newProducts.length === 0 || endIndex >= this.mockProducts.length) {
      this.hasMore.set(false);
    }
    
    this.products.update(current => [...current, ...newProducts]);
    this.page.update(p => p + 1);
    this.loading.set(false);
    
    return newProducts;
  }

  resetProducts(): void {
    this.products.set([]);
    this.page.set(1);
    this.hasMore.set(true);
  }

  getProductById(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  getAllProducts(): Product[] {
    return this.products();
  }
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

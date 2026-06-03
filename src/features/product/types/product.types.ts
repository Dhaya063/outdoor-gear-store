export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface ProductVariant {
  color: string;
  size: string;
  stock: number;
}

export interface CartItem {
  productId: number;
  title: string;
  image: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  stock: number;
}
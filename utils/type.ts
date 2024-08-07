export interface Category {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
}

export interface OrderProduct {
  productId: number;
  orderId: number;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  crossedPrice?: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  category: Category;
  user: User;
  flag: boolean;
  size?: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
  orders: OrderProduct[];
}

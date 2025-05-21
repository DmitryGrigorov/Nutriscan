import { Models } from 'appwrite';

export interface Product extends Models.Document {
  categoryId: string;
  name: string;
  description: string;
  price: number;
  slug: string;
  stock: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

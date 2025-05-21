import { Models } from 'appwrite';

export interface Category extends Models.Document {
  name: string;
  description: string;
  slug: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl: string;
}

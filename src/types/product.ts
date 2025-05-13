export interface Product {
  id: number;
  name: string;
 description?: string | null;
  price: number;
  imageUrl: string;
  stock: number;
  createdAt: string;
  image?: string;
}

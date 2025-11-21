export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const API_BASE = 'https://dummyjson.com';

export async function fetchProducts(limit: number = 100): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products?limit=${limit}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }
    
    const data: ProductsResponse = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

export async function fetchProductById(id: string): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE}/products/${id}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch product: ${res.status}`);
    }
    
    const data: Product = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw new Error('Failed to fetch product');
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE}/products/search?q=${encodeURIComponent(query)}`, {
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to search products: ${res.status}`);
    }
    
    const data: ProductsResponse = await res.json();
    return data.products;
  } catch (error) {
    console.error('Error searching products:', error);
    throw new Error('Failed to search products');
  }
}
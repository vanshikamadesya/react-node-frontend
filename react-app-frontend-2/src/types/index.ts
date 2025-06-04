export interface User {
  id: string;
  _id: string;  
  email: string;
  username: string;
  type: "BUYER" | "SELLER" | "SUPERADMIN";  
  createdAt: string;
}



export interface Product {
  id: string;
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  hasFetchedUser: boolean;
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username?: string;
  name?: string;
  email: string;
  password: string;
  type?: "BUYER" | "SELLER" | "SUPERADMIN";
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
}

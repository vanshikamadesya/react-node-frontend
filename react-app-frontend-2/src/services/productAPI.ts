import axios from "axios";
// import type { CreateProductData } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "json/form-data",
  },
});

export const productApi = {
  getProducts: () => 
    api.get("/product/getProducts"),

  searchProducts: (query: string) => 
    api.get(`/product/filterProducts?query=${query}`),

  getProductsByUserId: (userId: string) => 
    api.get(`/product/getProducts/${userId}`),

  getSingleProduct: (id: string) => 
    api.get(`/product/getProduct/${id}`),

  createProduct: (userId: string, data: FormData) => {
    return api.post(`/product/createProduct/${userId}`, data, {
    
    });
  },
  updateProduct: (id: string, data: FormData) => {
    return api.put(`/product/editProduct/${id}`, data, {
      
    });
  },
  deleteProduct: (id: string) => 
    api.delete(`/product/deleteProduct/${id}`),
};
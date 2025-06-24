import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/products",
});

export default API;

export interface Product {
  id: any;
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  category: string;
}

interface FetchProductsResponse {
  success: boolean;
  message: string;
  products: Product[];
}

interface ProductResponse {
  success: boolean;
  message: string;
  product: Product;
}

export const fetchProducts = () => API.get<FetchProductsResponse>("/");

export const fetchProduct = (id: string) => API.get<ProductResponse>(`/${id}`);

export const createProduct = (data: Partial<Product>) =>
  API.post<ProductResponse>("/", data);

export const updateProduct = (id: string, data: Partial<Product>) =>
  API.put<ProductResponse>(`/${id}`, data);

export const deleteProduct = (id: string) => API.delete<void>(`/${id}`);

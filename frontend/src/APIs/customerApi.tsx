import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/users",
});

export default API;

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  number: string;
  address: string;
  firstName: string;
  lastName: string;
  DOB: string;
  gender: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

// These are removed because your backend returns raw arrays/objects, not wrapped with `success`, `message`, etc.
export const fetchUsers = () => API.get<User[]>("/");

export const fetchUser = (id: string) => API.get<User>(`/${id}`);

export const createUser = (data: Partial<User>) => API.post<User>("/", data);

export const updateUser = (id: string, data: Partial<User>) =>
  API.put<User>(`/${id}`, data);

export const deleteUser = (id: string) => API.delete<void>(`/${id}`);
import axios from "axios";

const AuthAPI = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL+"/api/auth",
  withCredentials: true,
});

export default AuthAPI;

// ----- Interfaces -----

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    number: string;
    address: string;
    firstName: string;
    lastName: string;
    DOB: string;
    gender: string;
    image?: string;
  };
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  number: string;
  address: string;
  firstName: string;
  lastName: string;
  DOB: string;
  gender: string;
  image?: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

// ----- API Calls -----

export const registerUser = (data: RegisterFormData) =>
  AuthAPI.post<AuthResponse>("/register", data);

export const loginUser = (data: LoginFormData) =>
  AuthAPI.post<AuthResponse>("/login", data);
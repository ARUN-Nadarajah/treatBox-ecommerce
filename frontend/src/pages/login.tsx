import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../APIs/authApi";
import type { AuthResponse, LoginFormData } from "../APIs/authApi";

// FloatingInput component (like your Register page)
interface FloatingInputProps {
  id: string;
  name: keyof LoginFormData;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  label,
}) => {
  return (
    <div className="relative z-0 w-full group">
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" "
        className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-500 peer"
      />
      <label
        htmlFor={id}
        className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await loginUser(form);
      const data: AuthResponse = res.data;

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      toast.success("Login successful!");
      data.user.role === "admin" ? navigate("/admin") : navigate("/");
    } catch (err: any) {
      const message =
        err?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Welcome Image */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images7.alphacoders.com/129/1292925.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="z-10 m-auto text-center px-10"
        >
          <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
            Welcome Back to <span className="text-rose-300">TreatBox</span>
          </h1>
          <p className="text-white text-lg drop-shadow-sm">
            Indulge in sweetness. Let’s get you logged in.
          </p>
        </motion.div>
      </div>

      {/* Right side - Form */}
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-10 bg-white">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
            Login to <span className="text-rose-600">TreatBox</span>
          </h2>

          {error && (
            <p className="bg-rose-100 text-red-700 p-3 rounded mb-6 text-center font-medium shadow-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <FloatingInput
              id="email"
              name="email"
              type="email"
              label="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <FloatingInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-lg bg-gradient-to-r from-rose-400 to-rose-600 text-white shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-300"
            >
              Login
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-rose-600 font-medium hover:underline hover:text-rose-700 transition"
              >
                Register here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
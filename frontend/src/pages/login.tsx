import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Axios error type guard
function isAxiosError(error: unknown): error is {
  isAxiosError?: boolean;
  response?: { data?: { message?: string } };
} {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

interface LoginResponse {
  user: {
    username: string;
    email: string;
  };
  token: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post<LoginResponse>("/api/auth/login", form);
      const user = res.data.user;
      const token = res.data.token;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      toast.success("Login successful!");
      user.username === "admin" ? navigate("/admin") : navigate("/home");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const msg = err.response?.data?.message || "Login failed";
        toast.error(msg);
        setError(msg);
      } else {
        toast.error("An unknown error occurred");
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Image + Welcome */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative animate-fadeIn"
        style={{
          backgroundImage:
            "url('https://images7.alphacoders.com/129/1292925.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 p-10 text-white flex flex-col justify-center h-full w-full text-center">
          <h2 className="text-5xl font-extrabold mb-6 drop-shadow-lg leading-tight">
            Welcome Back to <span className="text-rose-200">TreatBox</span>
          </h2>
          <p className="text-lg font-medium drop-shadow-sm">
            Indulge in sweetness. Let’s get you logged in.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-black/60">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 border border-white/30">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center mb-8">
            Login to <span className="text-[#f5e9dc]">TreatBox</span>
          </h2>

          {error && (
            <p className="bg-red-100 text-red-700 p-3 rounded mb-6 text-center font-medium shadow-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-white/40 bg-white/30 placeholder-yellow-100 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition shadow-inner"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-xl border border-white/40 bg-white/30 placeholder-yellow-100 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 transition shadow-inner"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#f5e9dc] text-[#5d4037] py-3 rounded-xl font-semibold text-lg shadow-lg hover:bg-[#e8d5c0] transition border border-[#e0cdb9]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-white font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline text-[#f5e9dc] hover:text-[#e8d5c0] transition"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
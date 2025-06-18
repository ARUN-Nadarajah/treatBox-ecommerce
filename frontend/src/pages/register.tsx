import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

interface RegisterFormData {
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

function isAxiosError(error: unknown): error is {
  isAxiosError?: boolean;
  response?: { data?: { message?: string } };
} {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

interface FloatingInputProps {
  id: string;
  name: keyof RegisterFormData;
  type?: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  required?: boolean;
  options?: string[];
  label: string;
  optional?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  options,
  label,
  optional = false,
}) => {
  const isSelect = !!options;
  return (
    <div className="relative z-0 w-full group">
      {isSelect ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-500 peer"
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options?.map((opt) => (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
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
      )}
      <label
        htmlFor={id}
        className="absolute text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}{" "}
        {optional && <span className="text-gray-400 text-sm">(optional)</span>}
      </label>
    </div>
  );
};

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterFormData>({
    username: "",
    email: "",
    password: "",
    number: "",
    address: "",
    firstName: "",
    lastName: "",
    DOB: "",
    gender: "",
    image: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await axios.post("/api/auth/register", form);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        const msg = err.response?.data?.message || "Registration failed";
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
      {/* Left side - Welcome */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://pixelz.cc/wp-content/uploads/2018/10/blueberry-raspberry-cheesecake-uhd-4k-wallpaper.jpg')",
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
            Welcome to <span className="text-rose-300">TreatBox</span>
          </h1>
          <p className="text-white text-lg drop-shadow-sm">
            Your perfect destination for delicious cakes and sweet memories!
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
            Create Your <span className="text-rose-600">TreatBox</span> Account
          </h2>

          {error && (
            <p className="bg-rose-100 text-red-700 p-3 rounded mb-6 text-center font-medium shadow-sm">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FloatingInput
                id="firstName"
                name="firstName"
                label="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <FloatingInput
                id="lastName"
                name="lastName"
                label="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <FloatingInput
              id="username"
              name="username"
              label="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <FloatingInput
              id="email"
              name="email"
              type="email"
              label="Email"
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
            <FloatingInput
              id="number"
              name="number"
              label="Phone Number"
              value={form.number}
              onChange={handleChange}
              required
            />
            <FloatingInput
              id="address"
              name="address"
              label="Address"
              value={form.address}
              onChange={handleChange}
              required
            />
            <FloatingInput
              id="DOB"
              name="DOB"
              type="date"
              label="Date of Birth"
              value={form.DOB}
              onChange={handleChange}
              required
            />
            <FloatingInput
              id="gender"
              name="gender"
              label="Gender"
              value={form.gender}
              onChange={handleChange}
              required
              options={["Male", "Female", "Other"]}
            />
            <FloatingInput
              id="image"
              name="image"
              label="Image URL"
              value={form.image || ""}
              onChange={handleChange}
              optional
            />

            <button
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-lg bg-gradient-to-r from-rose-400 to-rose-600 text-white shadow-lg hover:scale-105 hover:brightness-110 transition-transform duration-300"
            >
              Register
            </button>
            {/* Back to login link */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-rose-600 font-medium hover:underline hover:text-rose-700 transition"
              >
                Back to Login
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

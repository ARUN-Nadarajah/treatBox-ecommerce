import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { registerUser } from "../APIs/authApi";
import type { RegisterFormData } from "../APIs/authApi";

function isAxiosError(error: unknown): error is {
  isAxiosError?: boolean;
  response?: { data?: { message?: string } };
} {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

const getMaxDOB = () => {
  const today = new Date();
  today.setFullYear(today.getFullYear() - 18);
  return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
};

const maxDOB = getMaxDOB();

interface FloatingInputProps {
  id: string;
  name: keyof RegisterFormData | "confirmPassword";
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

// Helper function to calculate password strength score (0-5)
const calculatePasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 6) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[\W_]/.test(password)) score++; // special char
  return score;
};

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterFormData & { confirmPassword: string }>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    number: "",
    address: "",
    firstName: "",
    lastName: "",
    DOB: "",
    gender: "",
    image: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [passwordScore, setPasswordScore] = useState(0);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "password") {
      setPasswordScore(calculatePasswordStrength(e.target.value));
      setPasswordTouched(true);
    }
  };

  const passwordValidationMessages = [
    "At least 6 characters",
    "At least one uppercase letter",
    "At least one lowercase letter",
    "At least one number",
    "At least one special character",
  ];

  // Validation helpers:
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (number: string) => /^\d{10}$/.test(number);
  const isPasswordValid = (password: string) =>
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[\W_]/.test(password);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const {
      email,
      password,
      confirmPassword,
      number,
      DOB,
    } = form;

    // Email
    if (!isValidEmail(email)) {
      setError("Invalid email format");
      toast.error("Invalid email format");
      return;
    }

    // Phone
    if (!isValidPhone(number)) {
      setError("Phone number must be 10 digits");
      toast.error("Phone number must be 10 digits");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }

    // Password strength
    if (!isPasswordValid(password)) {
      setError("Password does not meet complexity requirements");
      toast.error("Password must have at least 6 chars, uppercase, lowercase, number & special char");
      return;
    }

    // Age >= 18
    const dob = new Date(DOB);
    const ageDifMs = Date.now() - dob.getTime();
    const age = new Date(ageDifMs).getUTCFullYear() - 1970;
    if (age < 18) {
      setError("You must be at least 18 years old");
      toast.error("You must be at least 18 years old");
      return;
    }

    try {
      // Remove confirmPassword before sending
      const { confirmPassword, ...sendForm } = form;

      await registerUser(sendForm);
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

  // Password strength bar colors
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-400",
    "bg-green-400",
    "bg-green-600",
  ];

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

            {/* Password input */}
            <FloatingInput
              id="password"
              name="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            {/* Password Strength Meter */}
            {passwordTouched && (
              <div className="mb-4">
                <div className="h-2 w-full rounded bg-gray-300">
                  <div
                    style={{ width: `${(passwordScore / 5) * 100}%` }}
                    className={`h-2 rounded ${strengthColors[passwordScore - 1]}`}
                  />
                </div>
                <ul className="mt-2 text-sm space-y-1 text-gray-700">
                  {passwordValidationMessages.map((msg, idx) => {
                    const valid = (() => {
                      switch (idx) {
                        case 0:
                          return form.password.length >= 6;
                        case 1:
                          return /[A-Z]/.test(form.password);
                        case 2:
                          return /[a-z]/.test(form.password);
                        case 3:
                          return /\d/.test(form.password);
                        case 4:
                          return /[\W_]/.test(form.password);
                        default:
                          return false;
                      }
                    })();
                    return (
                      <li
                        key={msg}
                        className={valid ? "text-green-600" : "text-red-600"}
                      >
                        {valid ? "✔ " : "✘ "} {msg}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Confirm Password */}
            <FloatingInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Re-enter Password"
              value={form.confirmPassword}
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
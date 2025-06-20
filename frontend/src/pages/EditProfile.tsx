import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  number: string;
  address: string;
  DOB: string;
  gender: string;
  image?: string;
}

interface UpdateResponse {
  success: boolean;
  message: string;
  customer: User;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    number: "",
    address: "",
    DOB: "",
    gender: "",
    image: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsed: User = JSON.parse(data);
      setUser(parsed);
      setFormData(parsed);
    }
  }, []);

  if (!user)
    return (
      <div className="text-center mt-20 text-gray-500">Loading profile...</div>
    );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.id) {
      alert("User ID not found. Please log in again.");
      return;
    }

    try {
      const res = await axios.put<UpdateResponse>(
        `http://localhost:5001/api/users/${formData.id}`,
        formData
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.customer));
        alert("Profile updated successfully!");
        navigate("/profile");
      } else {
        alert(res.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="min-h-screen flex items-center justify-center px-6 py-20"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1470&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-4xl w-full bg-white/30 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 p-12">
          <h2 className="text-3xl font-extrabold mb-8 text-pink-600 text-center">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-semibold mb-1"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block font-semibold mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="block font-semibold mb-1"
                >
                  Username (cannot change)
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  readOnly
                  className="w-full rounded-md border border-gray-300 bg-gray-200 px-4 py-2 cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label htmlFor="number" className="block font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  id="number"
                  name="number"
                  type="tel"
                  required
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label htmlFor="DOB" className="block font-semibold mb-1">
                  Date of Birth
                </label>
                <input
                  id="DOB"
                  name="DOB"
                  type="date"
                  required
                  value={formData.DOB}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block font-semibold mb-1">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={3}
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label htmlFor="gender" className="block font-semibold mb-1">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="image" className="block font-semibold mb-1">
                  Profile Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-10 rounded-full shadow-md transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

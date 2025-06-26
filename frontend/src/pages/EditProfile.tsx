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
  image?: string | File;
  password?: string;
}

interface UpdateResponse {
  success: boolean;
  message: string;
  customer: User;
}

const EditProfile: React.FC = () => {
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
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [matchError, setMatchError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const parsed = JSON.parse(data);
      const userWithId: User = {
        id: parsed._id || parsed.id,
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        username: parsed.username || "",
        email: parsed.email || "",
        number: parsed.number || "",
        address: parsed.address || "",
        DOB: parsed.DOB || "",
        gender: parsed.gender || "",
        image: parsed.image || "",
        password: "",
      };
      setUser(userWithId);
      setFormData(userWithId);
    }
  }, []);

  const validatePassword = (pw: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === "image" && files && files.length > 0) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      return;
    }

    if (name === "password") {
      setPasswordError(
        value && !validatePassword(value)
          ? "Min 8 chars, uppercase, lowercase & number."
          : ""
      );
    }

    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setMatchError(value !== formData.password ? "Passwords do not match." : "");
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && !validatePassword(formData.password)) {
      setPasswordError("Min 8 chars, uppercase, lowercase & number.");
      return;
    }
    if (formData.password !== confirmPassword) {
      setMatchError("Passwords do not match.");
      return;
    }

   const data = new FormData();
for (const key in formData) {
  if (key !== "image") data.append(key, (formData as any)[key]);
}
if (formData.image && formData.image instanceof File) {
  data.append("image", formData.image);
}


    try {
      const res = await axios.put<UpdateResponse>(
        `http://localhost:5001/api/users/${formData.id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.customer));
        alert("Profile updated!");
        navigate("/profile");
      } else {
        alert(res.data.message || "Update failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Error while updating.");
    }
  };

  if (!user)
    return <div className="text-center mt-20 text-gray-500">Loading profile...</div>;

  return (
    <>
      <NavBar />
      <div
        className="min-h-screen bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://png.pngtree.com/background/20230522/original/pngtree-3d-bakery-cafe-design-with-coffee-tables-picture-image_2690236.jpg')",
        }}
      >
        <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-10 max-w-3xl w-full mx-4 shadow-xl border border-white/40">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 text-pink-500 font-semibold hover:underline"
          >
            ← Back
          </button>
          <h2 className="text-4xl font-bold text-center text-rose-700 mb-6">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "First Name", name: "firstName" },
                { label: "Last Name", name: "lastName" },
                { label: "Phone Number", name: "number" },
                { label: "Date of Birth", name: "DOB", type: "date" },
                { label: "Address", name: "address" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    type={type || "text"}
                    name={name}
                    required
                    value={(formData as any)[name] || ""}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-white/70 border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              {["Username", "Email"].map((label) => {
                const name = label.toLowerCase();
                return (
                  <div key={name}>
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    <input
                      type={label === "Email" ? "email" : "text"}
                      name={name}
                      readOnly
                      value={(formData as any)[name]}
                      className="w-full p-3 rounded-lg bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed"
                    />
                  </div>
                );
              })}
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              <label className="block text-sm font-medium">New Password</label>
              <input
                name="password"
                type="password"
                placeholder="Leave blank to keep old password"
                value={formData.password || ""}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/70 border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition"
              />
              {passwordError && (
                <p className="text-red-600 text-sm">{passwordError}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium">Confirm Password</label>
              <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/70 border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition"
              />
              {matchError && <p className="text-red-600 text-sm">{matchError}</p>}
            </div>

            {/* Gender & Image */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/70 border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition"
                >
                  <option value="">Select Gender</option>
                  {["Male", "Female", "Other", "Prefer not to say"].map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Profile Image
                </label>
                <input
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-white/70 border border-gray-300 focus:ring-2 focus:ring-rose-500 outline-none transition"
                />
                {formData.image && typeof formData.image === "string" && (
                  <div className="mt-3">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border border-gray-400"
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-4 bg-rose-600 hover:bg-rose-700 text-white text-lg font-semibold rounded-full shadow-lg transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

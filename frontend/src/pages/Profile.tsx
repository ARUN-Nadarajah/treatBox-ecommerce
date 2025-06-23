import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

interface User {
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

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      fetch(`http://localhost:5000/api/users/${parsed._id}`)
        .then((res) => res.json())
        .then((data) => setUser(data))
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
          setUser(parsed); // fallback
        });
    }
  }, []);

  if (!user)
    return (
      <div className="text-center mt-20 text-gray-500 text-lg">
        Loading profile...
      </div>
    );

  return (
    <>
      <NavBar />
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-6 py-20"
        style={{
          backgroundImage:
            "url('https://images.rawpixel.com/image_social_landscape/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAyL3Jhd3BpeGVsX29mZmljZV81OF9waG90b19vZl9iYWtlcnlfc2hvcF9uYXR1cmFsaXN0aWNfYWVzdGhldGljX2RkNjk2NWZlLTcxZmUtNDU5ZC1iZGIwLWMzMDUxNmVlOGMxM18xLmpwZw.jpg')",
        }}
      >
        {/* Profile Card */}
        <div className="relative max-w-5xl w-full bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-10 flex flex-col md:flex-row items-center gap-8 z-10">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center">
            <img
              src={user.image || "https://via.placeholder.com/160"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Profile Info */}
          <div className="md:w-2/3 w-full">
            <h1 className="text-4xl font-extrabold text-gray-800">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-pink-600 text-lg font-medium mb-6">
              @{user.username}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-gray-700 text-[17px]">
              <div>
                <p className="font-semibold">📧 Email</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <p className="font-semibold">📱 Phone</p>
                <p>{user.number}</p>
              </div>
              <div>
                <p className="font-semibold">🎂 Date of Birth</p>
                <p>{user.DOB}</p>
              </div>
              <div>
                <p className="font-semibold">🏠 Address</p>
                <p>{user.address}</p>
              </div>
              <div>
                <p className="font-semibold">👤 Gender</p>
                <p>{user.gender}</p>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/edit-profile"
                className="inline-block bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform hover:scale-105"
              >
                ✏️ Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

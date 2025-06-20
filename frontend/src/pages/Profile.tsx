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
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  if (!user)
    return <div className="text-center mt-20 text-gray-400">Loading profile...</div>;

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
        {/* Frosted glass card */}
        <div className="relative max-w-5xl w-full bg-white/30 backdrop-blur-lg rounded-3xl shadow-lg border border-white/30 p-12 flex flex-col md:flex-row items-center text-gray-900">
          {/* Profile Image */}
          <div className="md:w-1/3 flex justify-center mb-8 md:mb-0">
            <img
              src={user.image || "https://via.placeholder.com/160"}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-pink-300 shadow-lg object-cover"
            />
          </div>

          {/* Info */}
          <div className="md:w-2/3 md:pl-14">
            <h1 className="text-4xl font-extrabold mb-3 text-pink-600">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-lg mb-6 text-pink-400">@{user.username}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
              <div>
                <p className="font-semibold flex items-center gap-2">
                  📧 Email:
                </p>
                <p className="break-words">{user.email}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  📱 Phone:
                </p>
                <p>{user.number}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  🎂 DOB:
                </p>
                <p>{user.DOB}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  🏠 Address:
                </p>
                <p className="break-words">{user.address}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  👤 Gender:
                </p>
                <p>{user.gender}</p>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="/edit-profile"
                className="inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-md transition"
              >
                Edit Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

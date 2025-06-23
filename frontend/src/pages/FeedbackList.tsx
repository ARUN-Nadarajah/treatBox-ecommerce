import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AdminSidebar from "../components/adminSidebar";

interface Feedback {
  _id: string;
  username: string;
  email: string;
  phone: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/feedback")
      .then((res) => res.json())
      .then((data: Feedback[]) => setFeedbacks(data))
      .catch((err) => console.error("Failed to fetch feedback:", err));
  }, []);

  return (
    <>
      <NavBar />
      <div
        className="flex min-h-screen bg-fixed bg-no-repeat bg-cover"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-vector/pastel-watercolor-abstract-background_23-2148902772.jpg')",
        }}
      >
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white/80 backdrop-blur-sm shadow-lg">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto max-w-7xl mx-auto">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-3xl mb-8 shadow-md">
            <h2 className="text-4xl font-extrabold text-center text-pink-700">
              📝 Customer Feedback
            </h2>
          </div>

          {feedbacks.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">
              No feedback submitted yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {feedbacks.map((fb) => (
                <div
                  key={fb._id}
                  className="bg-white shadow-lg border border-rose-100 p-6 rounded-2xl transition-transform duration-300 hover:-translate-y-1 hover:shadow-pink-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-rose-600">
                      {fb.username}
                    </h3>
                    <span className="text-yellow-500 text-sm">
                      {"★".repeat(fb.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-gray-800 mb-4">"{fb.feedback}"</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Email:</strong> {fb.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {fb.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default FeedbackList;

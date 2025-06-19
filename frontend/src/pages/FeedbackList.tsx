import React, { useEffect, useState } from 'react';

interface Feedback {
  _id: string;
  name: string;
  email: string;
  phone: string;
  feedback: string;
  rating: number;
  createdAt: string;
}

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]); // ✅ typed array

  useEffect(() => {
    fetch('http://localhost:5001/api/feedback')
      .then((res) => res.json())
      .then((data: Feedback[]) => setFeedbacks(data)) // ✅ assert response type
      .catch((err) => console.error('Failed to fetch feedback:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white p-10">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">All Feedback</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-pink-200 rounded-xl shadow-md">
          <thead>
            <tr className="bg-pink-100 text-pink-700 text-left">
              <th className="p-4 border-b">#</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Email</th>
              <th className="p-4 border-b">Phone</th>
              <th className="p-4 border-b">Feedback</th>
              <th className="p-4 border-b">Rating</th>
              <th className="p-4 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb, index) => (
                <tr key={fb._id} className="hover:bg-pink-50 transition">
                  <td className="p-4 border-b">{index + 1}</td>
                  <td className="p-4 border-b">{fb.name}</td>
                  <td className="p-4 border-b">{fb.email}</td>
                  <td className="p-4 border-b">{fb.phone}</td>
                  <td className="p-4 border-b">{fb.feedback}</td>
                  <td className="p-4 border-b text-yellow-500">{'★'.repeat(fb.rating)}</td>
                  <td className="p-4 border-b">
                    {new Date(fb.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-6 text-gray-500">
                  No feedback submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackList;
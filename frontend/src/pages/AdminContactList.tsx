import { useEffect, useState } from 'react';

type Contact = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

const AdminContactList = () => {
  const [messages, setMessages] = useState<Contact[]>([]);

  useEffect(() => {
    fetch('http://localhost:5001/api/contact')
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error('Error fetching contact messages', err));
  }, []);

  return (
    <div
      className="min-h-screen p-10 bg-cover bg-center bg-no-repeat flex justify-center items-start"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-photo/pink-cake-slice-with-floral-decoration-generative-ai_188544-12187.jpg')`,
      }}
    >
      <div className="w-full max-w-6xl bg-white/70 backdrop-blur-md rounded-3xl p-10 border border-rose-200 shadow-xl">
        <h2 className="text-4xl font-bold text-center text-rose-700 mb-10 drop-shadow-lg">
          📨 Contact Submissions
        </h2>

        {messages.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No contact messages available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border-l-4 border-rose-400 hover:scale-[1.02] transition-all"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-gray-800">{msg.name}</h3>
                  <span className="text-xs text-gray-500">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-700 mb-2"><strong>Email:</strong> {msg.email}</p>
                <div className="bg-white p-3 rounded-md text-gray-800 shadow-inner border-l-2 border-rose-300">
                  {msg.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactList;

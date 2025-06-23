import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AdminSidebar from "../components/adminSidebar";

type Contact = {
  _id: string;
  username: string;
  email: string;
  message: string;
  createdAt: string;
};

const AdminContactList = () => {
  const [messages, setMessages] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/contact")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching contact messages", err));
  }, []);

  return (
    <>
      <NavBar />
      <div
        className="flex min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/pink-cake-slice-with-floral-decoration-generative-ai_188544-12187.jpg')",
        }}
      >
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white bg-opacity-80 backdrop-blur-sm shadow-lg">
          <AdminSidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-12 max-w-7xl mx-auto overflow-auto">
          <section className="bg-white bg-opacity-90 rounded-3xl p-10 border border-rose-200 shadow-lg max-h-[85vh] overflow-y-auto">
            <h2 className="text-4xl font-extrabold text-rose-600 mb-8 text-center tracking-wide">
              📨 Contact Submissions
            </h2>

            {messages.length === 0 ? (
              <p className="text-center text-rose-400 italic text-lg">
                No contact messages available.
              </p>
            ) : (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {messages.map((msg) => (
                  <article
                    key={msg._id}
                    className="bg-rose-50 rounded-xl border border-rose-300 shadow-md p-6 hover:shadow-rose-400 transition-shadow cursor-default"
                    title={`Received on ${new Date(msg.createdAt).toLocaleString()}`}
                  >
                    <header className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-semibold text-rose-700 truncate max-w-[65%]">
                        {msg.username}
                      </h3>
                      <time
                        className="text-sm text-rose-500"
                        dateTime={msg.createdAt}
                      >
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </time>
                    </header>

                    <p className="text-rose-600 font-semibold mb-3">
                      Email: {msg.email}
                    </p>

                    <p className="text-rose-700 whitespace-pre-wrap leading-relaxed text-base">
                      {msg.message}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default AdminContactList;

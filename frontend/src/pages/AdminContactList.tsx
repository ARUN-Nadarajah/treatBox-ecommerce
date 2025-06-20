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
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-4">📬 Contact Messages</h2>
      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg._id} className="bg-white shadow p-4 rounded border-l-4 border-rose-400">
            <p><strong>{msg.name}</strong> ({msg.email})</p>
            <p className="text-gray-600 mt-1">{msg.message}</p>
            <p className="text-sm text-gray-400 mt-2">{new Date(msg.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminContactList;

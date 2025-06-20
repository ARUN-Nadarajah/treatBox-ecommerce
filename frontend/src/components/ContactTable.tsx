import React, { useEffect, useState } from "react";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

const ContactTable: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/contact")
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error("Error fetching contacts:", err));
  }, []);

  return (
    <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-rose-600 mb-4">Contact Messages</h2>
      {contacts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-pink-100 text-pink-700 uppercase">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Message</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact, index) => (
                <tr key={contact._id} className="border-t hover:bg-pink-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{contact.name}</td>
                  <td className="px-4 py-2">{contact.email}</td>
                  <td className="px-4 py-2">{contact.message}</td>
                  <td className="px-4 py-2">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No contact messages yet.</p>
      )}
    </div>
  );
};

export default ContactTable;

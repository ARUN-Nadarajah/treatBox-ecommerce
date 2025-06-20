import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import NavBar from "../components/NavBar";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Get user info from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      const res = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        alert("Thanks for reaching out! We'll reply soon.");
        form.reset();
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Try again.");
    }
  };

  return (
    <>
      <NavBar />
      <div
        className="min-h-screen px-6 py-16 bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url('https://hubspot-knowledge.s3.amazonaws.com/hubfs/contact-us-2-20250115-1824456.webp')`,
        }}
      >
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-2xl rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-rose-200 p-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-rose-700 drop-shadow">
              Get in Touch 🍰
            </h2>
            <p className="mt-3 text-gray-600 text-lg">
              We'd love to hear from you! Whether it's a question, feedback, or a custom cake request.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8 text-gray-800">
              <div className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <FaEnvelope className="text-2xl text-rose-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-xl">Email Us</h4>
                  <p>support@treatbox.com</p>
                  <p>admin@treatbox.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <FaPhoneAlt className="text-2xl text-rose-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-xl">Call / WhatsApp</h4>
                  <p>+94 77 123 4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition">
                <FaMapMarkerAlt className="text-2xl text-rose-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-xl">Visit Us</h4>
                  <p>TreatBox HQ, Kakkaitivu, Jaffna, Sri Lanka</p>
                </div>
              </div>

              <div className="flex space-x-6 mt-4 text-rose-700 text-xl">
                <FaFacebook className="hover:scale-125 transition" />
                <FaInstagram className="hover:scale-125 transition" />
                <FaTwitter className="hover:scale-125 transition" />
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-rose-100 space-y-6"
            >
              {/* Name - Editable */}
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block py-3 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-500 peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Full Name
                </label>
              </div>

              {/* Email - Read-only */}
              <div className="relative z-0 w-full group">
                <input
                  type="email"
                  name="email"
                  value={email}
                  readOnly
                  required
                  className="block py-3 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-500 peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Email Address
                </label>
              </div>

              {/* Message */}
              <div className="relative z-0 w-full group">
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="block py-3 px-0 w-full text-md text-gray-800 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-rose-500 peer"
                  placeholder=" "
                />
                <label className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-2 z-10 origin-[0] left-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-3 peer-focus:scale-75 peer-focus:-translate-y-6">
                  Your Message
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-4 text-white bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg shadow-lg hover:from-pink-600 hover:to-rose-600 transition duration-300 transform hover:scale-[1.02]"
              >
                Send Message ✉️
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
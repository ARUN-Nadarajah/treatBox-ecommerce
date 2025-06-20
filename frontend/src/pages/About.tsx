import React from "react";
import NavBar from "../components/NavBar";

const About = () => {
  return (
    <>
      <NavBar />
      {/* Banner Hero */}
      <div
        className="relative h-[60vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://th.bing.com/th/id/OIP.qHT5z58aLlArMeBbArWeLAHaER?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3')",
        }}
      >
        <div className="absolute inset-0 bg-rose-700/50 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-3">About TreatBox</h1>
          <p className="text-lg max-w-2xl mx-auto">
            A sweet story behind every dessert. Freshly made, beautifully delivered.
          </p>
        </div>
      </div>

      {/* About Content */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-rose-100 py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <img
            src="https://th.bing.com/th/id/OIP.uPOGj7M5WrV0gBBBAmWv6gHaFj?rs=1&pid=ImgDetMain&cb=idpwebp2&o=7&rm=3"
            alt="Bakery"
            className="rounded-3xl shadow-xl w-full object-cover"
          />

          {/* Text */}
          <div className="text-gray-700 space-y-5">
            <h2 className="text-3xl font-extrabold text-rose-600">Our Story</h2>
            <p>
              From a cozy kitchen in Kakkaitivu to delivering across the island, TreatBox
              was founded with love, flour, and a dream to spread happiness through desserts.
            </p>
            <p className="text-sm text-gray-500 italic">
              “Crafted with care. Served with a smile.”
            </p>
            <button className="mt-3 px-6 py-2 bg-rose-500 text-white rounded-full shadow hover:bg-rose-600 transition">
              Read More
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-20 text-center">
        <h3 className="text-3xl font-bold text-rose-700 mb-10">Why Choose Us?</h3>
        <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-4 px-4">
          {[
            { icon: "🎂", title: "Custom Cakes", desc: "Your style, our flavor." },
            { icon: "🍪", title: "Daily Fresh", desc: "Every batch made with love." },
            { icon: "📦", title: "Safe Packaging", desc: "Neat. Secure. Beautiful." },
            { icon: "🚚", title: "Island Delivery", desc: "From Jaffna to Galle." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-pink-50 rounded-2xl p-6 shadow hover:shadow-md transition"
            >
              <div className="text-4xl">{item.icon}</div>
              <h4 className="text-lg font-semibold text-rose-600 mt-2">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-rose-400 to-pink-500 text-white text-center py-16 px-6">
        <h4 className="text-2xl font-semibold">Experience the TreatBox Magic</h4>
        <button className="mt-4 bg-white text-rose-600 font-bold px-8 py-3 rounded-full hover:scale-105 transition">
          Browse Products
        </button>
      </section>
    </>
  );
};

export default About;

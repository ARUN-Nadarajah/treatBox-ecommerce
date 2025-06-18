import React from "react";
import NavBar from "../components/NavBar";

const About = () => {
  return (
    <>
      <NavBar />
      <div className="bg-gradient-to-br from-pink-50 via-white to-pink-100 min-h-screen py-20 px-6 md:px-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-pink-700 drop-shadow-sm animate-fade-in">
            About <span className="text-pink-500">TreatBox</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the heart of our bakery, where passion, creativity, and
            flavor come together.
          </p>
        </div>

        {/* Main Container */}
        <div className="flex flex-col md:flex-row items-center gap-10 bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 animate-slide-in-up">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://i.pinimg.com/736x/e4/e4/19/e4e41929d76c910ca692996928166bcf.jpg"
              alt="About TreatBox"
              className="rounded-3xl w-full object-cover shadow-md hover:shadow-2xl transition-all duration-500"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 text-gray-700 space-y-6">
            <h2 className="text-3xl font-extrabold text-pink-600">
              Our Sweet Journey 🍰
            </h2>
            <p className="text-md leading-relaxed">
              TreatBox started as a dream to share joy through homemade sweets.
              Today, we blend love and flavor to craft irresistible treats for
              every celebration.
            </p>
            <p className="text-sm text-gray-500 italic">
              “Every bite tells a story of tradition, quality, and care.”
            </p>
            <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded-full shadow-lg hover:bg-pink-600 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Feature Section */}
        <div className="mt-24 text-center">
          <h3 className="text-3xl font-semibold text-pink-700 mb-6">
            Why Choose Us?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-10 lg:px-20">
            {[
              {
                icon: "🎂",
                title: "Custom Cakes",
                text: "Your design, our flavor.",
              },
              {
                icon: "🍪",
                title: "Fresh Daily",
                text: "Baked every morning.",
              },
              {
                icon: "🧁",
                title: "Artisan Touch",
                text: "Crafted with love & care.",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                text: "Bringing sweetness to you.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-2xl transition duration-300 flex flex-col items-center"
              >
                <div className="text-3xl">{feature.icon}</div>
                <h4 className="text-lg font-bold mt-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-20 text-center">
          <h4 className="text-xl font-semibold text-gray-700">
            Ready to taste the TreatBox magic?
          </h4>
          <button className="mt-4 px-8 py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300">
            Visit Our Products
          </button>
        </div>
      </div>
    </>
  );
};

export default About;

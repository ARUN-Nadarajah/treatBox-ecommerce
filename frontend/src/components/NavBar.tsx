import React from "react";

const NavBar = () => {
  return (
    <>
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-rose-100 shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-rose-700"><a href="/">TreatBox</a></div>
        <ul className="hidden md:flex space-x-8 font-medium">
          <li>
            <a href="/" className="hover:text-rose-900 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/products" className="hover:text-rose-900 transition">
              Products
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-rose-900 transition">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-rose-900 transition">
              Contact
            </a>
          </li>
        </ul>
        <button className="md:hidden text-rose-700 font-bold">Menu</button>
      </nav>
    </>
  );
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const avurudhuProducts = [
  { name: "New Year Ribbon Cake - Design 1", price: 2500, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0011_1024x1024@2x.jpg?v=1617260440" },
  { name: "New Year Ribbon Cake - Design 2", price: 2400, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0015_1024x1024@2x.jpg?v=1617260528" },
  { name: "New Year Ribbon Cake - Design 4", price: 4600, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0014_1024x1024@2x.jpg?v=1617260732" },
  { name: "New Year Chocolate Cake", price: 4800, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0016_540x.jpg?v=1617261101" },
  { name: "Bulath Kole, Puhuna and Rice Paddy", price: 4600, image: "https://www.divine.lk/cdn/shop/products/1kgBulathkole_pahanaandricepaddyRs4200_540x.jpg?v=1678179278" },
  { name: "New Year Ribbon Cake - Design 6", price: 5500, image: "https://www.divine.lk/cdn/shop/products/IMG-20210412-WA0014_540x.jpg?v=1618228928" },
  { name: "Bulath Leaf Ribbon Cake", price: 2900, image: "https://www.divine.lk/cdn/shop/products/750grbulathkoleribboncakeRs2900_540x.jpg?v=1678787403" },
  { name: "New Year Ribbon Cake - Design 3", price: 4800, image: "https://www.divine.lk/cdn/shop/products/IMG-20210318-WA0010_540x.jpg?v=1617260814" },
  { name: "New Year Ribbon Cake - Design 5", price: 4800, image: "https://www.divine.lk/cdn/shop/products/8_63fcf8dc-6bb6-46d4-9f0c-93773b5222be_540x.jpg?v=1576989480" },
];

const classicCakes = [
  { name: "Butter Cake", price: 1500, image: "https://www.divine.lk/cdn/shop/products/Butter_Cake_1024x1024@2x.JPG?v=1560022299" },
  { name: "Butterscotch Cake", price: 2600, image: "https://www.divine.lk/cdn/shop/products/Butterscotch_Cake_1024x1024@2x.JPG?v=1560022300" },
  { name: "Chocolate Cake", price: 2050, image: "https://www.divine.lk/cdn/shop/products/Chocolate_Cake_a8367c6f-704c-428f-a0b9-3c3616a2571e_1024x1024@2x.JPG?v=1560022302" },
  { name: "Chocolate Cake with Roasted Nuts", price: 2900, image: "https://www.divine.lk/cdn/shop/products/Chocolate_Cake_with_Roasted_Nuts_1024x1024@2x.JPG?v=1560022302" },
  { name: "Chocolate Cherry Brandy Cake", price: 3380, image: "https://www.divine.lk/cdn/shop/products/Chocolate_Cherry_Brandy_Cake_360x.JPG?v=1560022304" },
  { name: "Chocolate Fudge Cake", price: 2700, image: "https://www.divine.lk/cdn/shop/products/Chocolate_Fudge_Cake_360x.JPG?v=1560022307" },
  { name: "Chocolate Mud Cake", price: 2900, image: "https://www.divine.lk/cdn/shop/products/Chocolate_Mud_Cake_360x.JPG?v=1560022309" },
  { name: "Coffee Cake", price: 2000, image: "https://www.divine.lk/cdn/shop/products/Coffee_Cake_360x.JPG?v=1560022312" },
  { name: "Coffee Cake with Roasted Nuts", price: 2900, image: "https://www.divine.lk/cdn/shop/products/Coffee_Cake_with_Roasted_Nuts_1024x1024@2x.JPG?v=1560022312" },
  { name: "Date Cake", price: 2800, image: "https://www.divine.lk/cdn/shop/products/datecake_540x.jpg?v=1617260120" },
  { name: "Date Cake with Butterscotch Topping", price: 3300, image: "https://www.divine.lk/cdn/shop/products/datetop_540x.jpg?v=1617260121" },
  { name: "Jaggery Cake", price: 2900, image: "https://www.divine.lk/cdn/shop/products/jaggerycake_540x.jpg?v=1617260122" },
  { name: "Lemon Curd Cake", price: 2600, image: "https://www.divine.lk/cdn/shop/products/lemoncake_540x.jpg?v=1617260123" },
  { name: "Love Cake", price: 2800, image: "https://www.divine.lk/cdn/shop/products/Date_cake_1024x1024@2x.JPG?v=1560022315" },
  { name: "Mocha Cake", price: 2050, image: "https://www.divine.lk/cdn/shop/products/Date_Cake_with_Butterscotch_Topping_360x.JPG?v=1560022316" },
  { name: "Ribbon Cake", price: 1900, image: "https://www.divine.lk/cdn/shop/products/Ribbon_Cake_1024x1024@2x.JPG?v=1560022345" },
];

const Home = () => {

  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate(`/product/${encodeURIComponent(product.name)}`, { state: product });
  };

  const renderProducts = (products) =>
    products.map((product, idx) => (
      <div
        key={idx}
        onClick={() => handleClick(product)}
        className="bg-white rounded-xl shadow-lg max-w-xs w-full hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer flex flex-col items-center p-6"
      >
        <img src={product.image} alt={product.name} className="w-1/2 object-contain rounded-md mb-4" />
        <h3 className="text-lg font-semibold text-center mb-1">{product.name}</h3>
        <p className="text-rose-600 font-bold text-lg">Rs. {product.price.toLocaleString()}</p>
      </div>
    ));

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 bg-rose-100 shadow-md sticky top-0 z-50">
        <div className="text-2xl font-bold text-rose-700">TreatBox</div>
        <ul className="hidden md:flex space-x-8 font-medium">
          <li><a href="/" className="hover:text-rose-900 transition">Home</a></li>
          <li><a href="/products" className="hover:text-rose-900 transition">Products</a></li>
          <li><a href="/about" className="hover:text-rose-900 transition">About</a></li>
          <li><a href="/contact" className="hover:text-rose-900 transition">Contact</a></li>
        </ul>
        <button className="md:hidden text-rose-700 font-bold">Menu</button>
      </nav>

      {/* Hero Banner */}
      <section
        className="relative h-screen flex items-center justify-center text-center px-6 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1470&q=80')`,
        }}
      >
        <div className="bg-rose-900 bg-opacity-50 p-8 rounded-lg max-w-lg text-white">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Freshly Baked <br /> Treats Just For You
          </h1>
          <p className="mb-8 text-lg font-light drop-shadow">
            Discover the taste of home with our delicious bakery delights.
          </p>
          <a
            href="/product"
            className="inline-block bg-rose-500 hover:bg-rose-600 px-8 py-3 rounded-full font-semibold shadow-lg transition"
          >
            Shop Now
          </a>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-rose-700">New Year & Avurudhu Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {avurudhuProducts.map((product, idx) => (
            <Link to={`/product/${idx}`} key={idx} className="w-full max-w-xs">
              <div
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer flex flex-col items-center p-6"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-1/ object-contain rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-center mb-1">{product.name}</h3>
                <p className="text-rose-600 font-bold text-lg">Rs. {product.price.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>


      {/* Classic Cakes Section */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-rose-700">Classic Cakes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-items-center">
          {classicCakes.map((product, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(product)}
              className="bg-white rounded-xl shadow-lg max-w-xs w-full hover:shadow-2xl transition transform hover:-translate-y-1 cursor-pointer flex flex-col items-center p-6"
            >
              <img src={product.image} alt={product.name} className="w-1/ object-contain rounded-md mb-4" />
              <h3 className="text-lg font-semibold text-center mb-1">{product.name}</h3>
              <p className="text-rose-600 font-bold text-lg">Rs. {product.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rose-100 text-rose-800 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-6 text-center text-sm">
          © 2025 TreatBox. All rights reserved. | Designed by You
        </div>
      </footer>
    </div>
  );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from "../store/hook";


const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);


  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] bg-gradient-to-br from-blue-700 via-purple-600 to-indigo-700 text-white flex flex-col justify-center items-center px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4 animate-fade-in-up">
          Elevate Your Product Experience Online
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 opacity-90 animate-fade-in-up delay-100">
          Discover, manage, and sell products with confidence. Join a global network of buyers and sellers.
        </p>
        <div className="flex gap-4 flex-wrap justify-center animate-fade-in-up delay-200">
          {!isAuthenticated && (
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
          )}
          <Link
            to="/products"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition"
          >
            View Products
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold">Powerful Features at Your Fingertips</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            We provide tools to manage your store, ensure secure payments, and expand your global reach.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: '🛠️',
              title: 'Simple Management',
              desc: 'Add, update, and organize products with ease through a clean, modern UI.',
              color: 'text-blue-600'
            },
            {
              icon: '🔒',
              title: 'Secure Checkout',
              desc: 'Your customers enjoy smooth and safe transactions every time.',
              color: 'text-green-600'
            },
            {
              icon: '🌍',
              title: 'Global Reach',
              desc: 'Connect with buyers and sellers across borders, effortlessly.',
              color: 'text-purple-600'
            },
          ].map(({ icon, title, desc, color }) => (
            <div
              key={title}
              className="bg-white rounded-2xl shadow-lg p-8 text-center transition hover:shadow-xl"
            >
              <div className={`text-5xl mb-4 ${color}`}>{icon}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-tr from-indigo-100 via-white to-blue-100 text-center">
        <h2 className="text-4xl font-bold mb-4">Start Your Journey Today</h2>
        <p className="text-gray-700 text-lg max-w-xl mx-auto mb-8">
          Join thousands of users transforming their business with our platform. It's fast, easy, and free to start.
        </p>
        {!isAuthenticated && (
          <Link
            to="/register"
            className="inline-block px-10 py-4 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Sign Up Free
          </Link>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-sm py-6 px-4 text-center">
        <p>&copy; {new Date().getFullYear()} ProductSphere. All rights reserved.</p>
        <div className="mt-2 flex justify-center gap-4">
          <Link to="/privacy" className="hover:text-white">Privacy</Link>
          <Link to="/terms" className="hover:text-white">Terms</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

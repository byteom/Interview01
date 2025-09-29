import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {

  const handleScroll = (e) => {
      e.preventDefault();

      const featuresSection = document.getElementById('features');

      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

  const handle = (e) => {
      e.preventDefault();

      const featuresSection = document.getElementById('about');

      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

  const Scroll = (e) => {
      e.preventDefault();

      const featuresSection = document.getElementById('home');

      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

  const handleevent = (e) => {
      e.preventDefault();

      const featuresSection = document.getElementById('prephub');

      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

  return (
    <nav className="bg-gray-800 p-5 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          InterviewAce
        </Link>
        <div className="space-x-4">
          <Link to="/#home" className="text-gray-300 text-lg hover:text-white" onClick={Scroll}>
            Home
          </Link>
          <Link to="/#features" className="text-gray-300 text-lg hover:text-white" onClick={handleScroll}>
            Features
          </Link>
          <Link to="/#about" className="text-gray-300 text-lg hover:text-white" onClick={handle}>
            How It Works
          </Link>
          <Link to="/#prephub" className="text-gray-300 text-lg hover:text-white" onClick={handleevent}>
            PrepHub
          </Link>
          <Link to="/auth" className="text-gray-300 text-lg hover:text-white">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
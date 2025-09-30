import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // A single, reusable function that accepts the target ID
   const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-gray-800 p-5 sticky top-0 z-50" aria-label="Main navigation">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-white">
          InterviewAce
        </Link>
        <div className="space-x-4" role="navigation">
          {/* Call the same function, but pass a different ID for each link */}
           <Link to="/#home" className="text-gray-300 text-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={(e) => handleScroll(e, 'home')}>
            Home
          </Link>
           <Link to="/#features" className="text-gray-300 text-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={(e) => handleScroll(e, 'features')}>
            Features
          </Link>
           <Link to="/#about" className="text-gray-300 text-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={(e) => handleScroll(e, 'about')}>
            How It Works
          </Link>
           <Link to="/#prephub" className="text-gray-300 text-lg hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={(e) => handleScroll(e, 'prephub')}>
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
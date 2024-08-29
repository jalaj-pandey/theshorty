import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="bg-slate-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <a href="/" className="hover:text-yellow-300 transition duration-300">
            TheShorty
          </a>
        </div>

        <div>
          <a
            href="https://thejalaj.netlify.app/"
            className="text-white text-lg hover:text-yellow-300 transition duration-300"
          >
            About Us
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;

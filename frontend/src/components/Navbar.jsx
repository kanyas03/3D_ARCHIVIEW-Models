import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-[#121212] via-[#1f1f1f] to-[#121212] px-8 py-5 flex justify-between items-center shadow-lg backdrop-blur-sm sticky top-0 z-50">
      <h1 className="text-3xl font-extrabold text-[#d4af37] tracking-wide hover:scale-105 transition-transform">
        ARCHI<span className="text-gray-100">VIEW</span>
      </h1>
      <nav className="flex gap-8 text-lg">
        <Link to="/" className="text-gray-300 hover:text-[#d4af37] transition-colors">Home</Link>
        <Link to="/upload" className="text-gray-300 hover:text-[#d4af37] transition-colors">Upload</Link>
        <Link to="/view-all" className="text-gray-300 hover:text-[#d4af37] transition-colors">View All</Link>
      </nav>
    </header>
  );
};

export default Navbar;

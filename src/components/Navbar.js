// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 w-10/12 sm:w-5/6 py-2 bg-transparent flex justify-between items-center border-4 border-black rounded-lg">
      <h1 className="text-white text-xl sm:text-2xl font-bold mx-4">
        <Link to="/" className="font-bold">Welcome</Link>
      </h1>
      <ul className="flex space-x-2 sm:space-x-4">
        <li>
          <Link to="/about" className="text-white hover:text-yellow-300 transition duration-300 font-bold mx-2">About</Link>
        </li>
        <li>
          <Link to="/projects" className="text-white hover:text-yellow-300 transition duration-300 font-bold mx-2">Projects</Link>
        </li>
        <li>
          <Link to="/contact" className="text-white hover:text-yellow-300 transition duration-300 font-bold mx-2">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

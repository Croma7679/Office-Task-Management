import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-900 p-8 flex justify-between items-center h-24">
      <div className="text-lg flex items-center">
        <span className="text-white text-4xl font-bold ml-4">Office Task Manager</span>
      </div>
      <div className="flex items-center space-x-4">
        <NavLink
          to="/login"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition duration-300">
          Login
        </NavLink>
        {/* Uncomment and modify Sign Up button if needed */}
        {/* <NavLink
          to="/signup"
          className="bg-secondary py-3 px-8 transition-all duration-300 rounded hover:text-white hover:bg-indigo-600">
          Sign up
        </NavLink> */}
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center shadow">
      <div className="font-bold text-xl tracking-wide">Unlocking Possibilities</div>
      <ul className="hidden md:flex gap-8 text-lg">
        <li><a href="/" className="hover:text-blue-200 transition">Home</a></li>
        <li><a href="/login" className="hover:text-blue-200 transition">Login/Register</a></li>
        <li><a href="/admin" className="hover:text-blue-200 transition">Admin Dashboard</a></li>
      </ul>
      <button className="md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:bg-blue-800">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
    </nav>
  );
};

export default Navbar;

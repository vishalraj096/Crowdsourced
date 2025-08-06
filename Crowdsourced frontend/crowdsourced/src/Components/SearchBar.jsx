import React from "react";

const SearchBar = () => {
  return (
    <form className="flex flex-col md:flex-row gap-2 w-full max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md mt-4">
      <input
        type="text"
        placeholder="Search businesses, categories, or locations..."
        className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <select className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="">All Categories</option>
        <option value="restaurant">Restaurant</option>
        <option value="shop">Shop</option>
        <option value="service">Service</option>
      </select>
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition font-semibold">Search</button>
    </form>
  );
};

export default SearchBar;

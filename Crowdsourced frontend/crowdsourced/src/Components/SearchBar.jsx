import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch({ query, category });
  };

  return (
    <form className="flex flex-col md:flex-row gap-2 w-full max-w-2xl mx-auto bg-white p-4 rounded-lg shadow-md mt-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search businesses, categories, or locations..."
        className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <select className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" value={category} onChange={e => setCategory(e.target.value)}>
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

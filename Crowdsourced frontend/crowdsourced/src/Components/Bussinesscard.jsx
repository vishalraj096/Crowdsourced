import React from "react";

const BusinessCard = ({ name = "Business Name", category = "Category", location = "Location", rating = 4.0 }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center hover:shadow-2xl transition duration-200 border border-gray-100">
      <div className="w-20 h-20 bg-gray-200 rounded-full mb-4 flex items-center justify-center text-3xl text-gray-400">
        <span>🏢</span>
      </div>
      <h3 className="text-xl font-bold mb-1 text-gray-800">{name}</h3>
      <p className="text-gray-500 mb-1">{category} • {location}</p>
      <div className="flex items-center mb-2">
        <span className="text-yellow-400 text-lg">★</span>
        <span className="ml-1 text-gray-700 font-semibold">{rating}</span>
      </div>
      <button className="mt-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">View Details</button>
    </div>
  );
};

export default BusinessCard;

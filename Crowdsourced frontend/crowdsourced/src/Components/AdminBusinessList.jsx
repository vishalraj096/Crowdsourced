import React from "react";

const AdminBusinessList = ({ businesses = [] }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
      <h2 className="text-xl font-bold mb-4 text-blue-700">Manage Businesses</h2>
      {businesses.length === 0 && <div className="text-gray-500">No businesses found.</div>}
      {businesses.map((biz) => (
        <div key={biz._id || biz.id} className="flex justify-between items-center mb-3 p-3 bg-gray-50 rounded-lg">
          <div>
            <span className="font-semibold text-gray-800">{biz.name}</span> ({biz.category})
          </div>
          <div className="flex gap-2">
            <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition">Edit</button>
            <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminBusinessList;
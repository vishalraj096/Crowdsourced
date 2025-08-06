import React from "react";

const ReviewForm = () => {
  return (
    <form className="bg-white p-8 rounded-xl shadow flex flex-col gap-4 border border-gray-100">
      <label className="font-semibold text-gray-700">Rating</label>
      <select className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option value="5">5 - Excellent</option>
        <option value="4">4 - Good</option>
        <option value="3">3 - Average</option>
        <option value="2">2 - Poor</option>
        <option value="1">1 - Terrible</option>
      </select>
      <label className="font-semibold text-gray-700">Review</label>
      <textarea className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" rows={4} placeholder="Write your review..." />
      <label className="font-semibold text-gray-700">Photo (optional)</label>
      <input type="file" className="p-2" />
      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">Submit Review</button>
    </form>
  );
};

export default ReviewForm;
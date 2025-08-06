import React from "react";

const ReviewCard = ({ username = "User", rating = 4, text = "Great place!", photo }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow mb-4 border border-gray-100">
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex items-center justify-center text-lg text-gray-500">👤</div>
        <span className="font-semibold text-gray-800">{username}</span>
        <span className="ml-4 text-yellow-400 text-lg">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
      </div>
      <p className="mb-2 text-gray-700">{text}</p>
      {photo && <img src={photo} alt="review" className="w-32 h-32 object-cover rounded" />}
    </div>
  );
};

export default ReviewCard;
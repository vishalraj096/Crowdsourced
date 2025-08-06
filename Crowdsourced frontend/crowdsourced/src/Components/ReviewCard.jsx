import React from "react";

const ReviewCard = ({ username = "User", rating = 4, text = "Great place!", photo, date, avatar }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow mb-4 border border-gray-100 flex flex-col md:flex-row gap-4">
      <div className="flex flex-col items-center md:items-start md:w-32">
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-12 h-12 rounded-full object-cover mb-2" />
        ) : (
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg text-gray-500 mb-2">👤</div>
        )}
        {date && <span className="text-xs text-gray-400">{new Date(date).toLocaleDateString()}</span>}
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-semibold text-gray-800 mr-2">{username}</span>
          <span className="text-yellow-400 text-lg">{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</span>
        </div>
        <p className="mb-2 text-gray-700">{text}</p>
        {photo && <img src={photo} alt="review" className="w-32 h-32 object-cover rounded" />}
      </div>
    </div>
  );
};

export default ReviewCard;
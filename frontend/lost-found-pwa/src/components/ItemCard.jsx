import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ItemCard({ item }) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/item/${item?.id}`);
  };

  // ✅ Always use image_url from Supabase, fallback to placeholder
  const imageSrc =
    item?.image_url && item.image_url.trim() !== ""
      ? item.image_url
      : "/placeholder1.jpg";

  return (
    <div
      className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition duration-300 cursor-pointer"
      onClick={handleViewDetails}
    >
      {/* Item Image */}
      <img
        src={imageSrc}
        alt={item?.name || "Item"}
        className="w-full h-48 object-cover"
        loading="lazy"
        onError={(e) => {
          e.target.src = "/placeholder1.jpg";
        }}
      />

      {/* Item Content */}
      <div className="p-4">
        <h3 className="font-bold text-xl text-white">{item?.name || "Unknown Item"}</h3>

        <p className="flex items-center gap-2 text-gray-300 mt-1">
          <FaMapMarkerAlt />
          {item?.location || "Unknown Location"}
        </p>

        <p className="text-gray-400 text-sm mt-1">{item?.date || "Date not available"}</p>

        <button
          onClick={handleViewDetails}
          className="mt-3 w-full bg-blue-600 py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
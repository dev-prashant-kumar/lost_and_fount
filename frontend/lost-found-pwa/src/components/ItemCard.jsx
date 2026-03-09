import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function ItemCard({ item }) {
  return (
    <div className="bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:scale-105 transform transition">
      <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-xl">{item.name}</h3>
        <p className="flex items-center gap-2 text-gray-300"><FaMapMarkerAlt /> {item.location}</p>
        <p className="text-gray-400 text-sm">{item.date}</p>
        <button className="mt-3 w-full bg-blue-600 py-2 rounded hover:bg-blue-700">View Details</button>
      </div>
    </div>
  );
}
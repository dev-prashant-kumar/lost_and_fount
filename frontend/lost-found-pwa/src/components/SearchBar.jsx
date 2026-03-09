import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center bg-gray-800 rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search item name..."
            className="flex-1 px-4 py-3 bg-gray-800 focus:outline-none"
          />
          <button className="px-4 py-3 bg-blue-600 hover:bg-blue-700">
            <FaSearch />
          </button>
        </div>
        <div className="mt-4 flex gap-3 justify-center text-gray-300">
          <button className="hover:text-white">All</button>
          <button className="hover:text-white">Mobile</button>
          <button className="hover:text-white">Wallet</button>
          <button className="hover:text-white">Keys</button>
          <button className="hover:text-white">Bag</button>
        </div>
      </div>
    </section>
  );
}
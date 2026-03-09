import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8 text-center text-gray-400">
      <p className="mb-2">Lost&Found - Helping people recover lost items</p>
      <div className="flex justify-center gap-4 mb-2">
        <a href="#" className="hover:text-white">About</a>
        <a href="#" className="hover:text-white">Contact</a>
        <a href="#" className="hover:text-white">Privacy</a>
      </div>
      <p>© 2026 Lost&Found</p>
    </footer>
  );
}
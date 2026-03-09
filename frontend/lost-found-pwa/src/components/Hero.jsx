import React from "react";

export default function Hero() {
  return (
    <section className="text-center py-20 px-4 bg-gray-900">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Lost Something? Find It Here.</h1>
      <p className="text-gray-300 mb-6">Report lost items or help others find belongings quickly.</p>
      <div className="space-x-4">
        <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700 transition">Find Lost Item</button>
        <button className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition">Report Found Item</button>
      </div>
    </section>
  );
}
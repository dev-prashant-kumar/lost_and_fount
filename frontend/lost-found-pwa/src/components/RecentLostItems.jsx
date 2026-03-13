import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ItemCard from "./ItemCard";

export default function RecentLostItems() {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("type", "lost") // Only lost items
        .order("created_at", { ascending: false }); // Most recent first

      if (!error) {
        setLostItems(data);
      } else {
        console.error("Error fetching lost items:", error);
      }
    };

    fetchLostItems();
  }, []);

  if (lostItems.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Lost Items</h2>
        <p className="text-center text-gray-400">No lost items posted yet.</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Lost Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {lostItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
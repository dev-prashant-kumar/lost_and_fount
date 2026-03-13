import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ItemCard from "./ItemCard";

export default function RecentFoundItems() {
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const fetchFoundItems = async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("type", "found")
        .order("created_at", { ascending: false });

      if (!error) setFoundItems(data);
      else console.error("Error fetching found items:", error);
    };

    fetchFoundItems();
  }, []);

  if (foundItems.length === 0) {
    return (
      <section className="py-16 px-4 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Found Items</h2>
        <p className="text-center text-gray-400">No found items posted yet.</p>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gray-800">
      <h2 className="text-3xl font-bold text-center mb-8">Recent Found Items</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {foundItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
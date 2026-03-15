import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ItemCard from "../components/ItemCard";

export default function FoundItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("type", "found")
      .order("created_at", { ascending: false });

    if (!error) setItems(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">Found Items</h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
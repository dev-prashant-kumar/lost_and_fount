import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import ItemCard from "../components/ItemCard";
import Footer from "../components/Footer";

const recentItems = [
  { id: 1, name: "Wallet", location: "Delhi Metro", date: "March 7", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Mobile Phone", location: "Mumbai Station", date: "March 6", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Bag", location: "Bangalore Mall", date: "March 5", image: "https://via.placeholder.com/150" },
];

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) setUser(data.user);
      else navigate("/");
    };
    getUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar user={user} />
      <Hero />
      <SearchBar />

      <section className="py-16 px-4 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Recent Lost Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {recentItems.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      </section>

      <Footer />
    </div>
  );
}
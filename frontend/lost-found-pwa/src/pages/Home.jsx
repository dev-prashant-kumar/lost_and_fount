import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import RecentLostItems from "../components/RecentLostItems";
import RecentFoundItems from "../components/RecentFoundItems";
import Footer from "../components/Footer";

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
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar user={user} />
      <Hero />
      <SearchBar />

      {/* Lost Items Section */}
      <RecentLostItems />

      {/* Found Items Section */}
      <RecentFoundItems />

      <Footer />
    </div>
  );
}
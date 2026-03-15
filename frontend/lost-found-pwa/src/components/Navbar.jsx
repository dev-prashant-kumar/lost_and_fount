import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar({ user }) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const [avatarUrl, setAvatarUrl] = useState(
    user?.user_metadata?.avatar_url ||
      `https://www.gravatar.com/avatar/${user?.email}?d=identicon`
  );

  const username =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    navigate("/");
  };

  /* ================= Avatar Auto Update ================= */
  useEffect(() => {
    const fetchAvatar = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.user_metadata?.avatar_url) {
        setAvatarUrl(data.user.user_metadata.avatar_url);
      }
    };

    fetchAvatar();
    const interval = setInterval(fetchAvatar, 600000);
    return () => clearInterval(interval);
  }, [user]);

  /* ================= Close Drawer ================= */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest("#profile-panel") &&
        !e.target.closest("#profile-avatar")
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-800 text-white shadow-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20 md:h-[70px]">

          {/* ================= LOGO ================= */}
          <div
            className="flex items-center gap-2 text-2xl font-bold cursor-pointer group"
            onClick={() => navigate("/home")}
          >
            <span className="text-green-400 text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
              🔍
            </span>

            <span className="relative">
              Lost & Found
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-green-400 group-hover:w-full transition-all duration-300"></span>
            </span>
          </div>

          {/* ================= DESKTOP MENU ================= */}
          <div className="hidden md:flex items-center gap-5">

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search items..."
                className="bg-gray-700 text-sm px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <span className="absolute right-2 top-1 text-gray-400">🔍</span>
            </div>

            <button onClick={() => navigate("/home")} className="hover:text-green-400">
              Home
            </button>

            <button onClick={() => navigate("/lost-items")} className="hover:text-green-400">
              Lost Items
            </button>

            <button onClick={() => navigate("/found-items")} className="hover:text-green-400">
              Found Items
            </button>

            <button
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-sm"
              onClick={() => navigate("/report")}
            >
              Report Item
            </button>

            {/* USER PROFILE */}
            {user && (
              <div className="ml-3 flex items-center gap-2 relative">

                <span className="text-sm text-gray-300">{username}</span>

                <img
                  id="profile-avatar"
                  src={avatarUrl}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-green-400 transition"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {/* Profile Drawer */}
                <div
                  id="profile-panel"
                  className={`hidden md:block fixed top-0 right-0 h-full w-72 bg-gray-800 shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-50
                  ${profileOpen ? "translate-x-0" : "translate-x-full"}`}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <img src={avatarUrl} alt="User" className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-bold">{username}</p>
                      <p className="text-gray-300 text-sm">{user.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      className="w-full text-left hover:bg-gray-700 rounded px-2 py-1"
                      onClick={() => navigate("/profile")}
                    >
                      View Profile
                    </button>

                    <button className="w-full text-left hover:bg-gray-700 rounded px-2 py-1">
                      Settings
                    </button>

                    <button
                      className="w-full text-left hover:bg-red-600 rounded px-2 py-1"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* ================= MOBILE ICONS ================= */}
          <div className="md:hidden flex items-center gap-4">

            <span className="cursor-pointer hover:text-green-400">🔔</span>
            <span className="cursor-pointer hover:text-green-400">🌙</span>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="transition-transform duration-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes size={24}/>
              ) : (
                <FaBars size={24}/>
              )}
            </button>

          </div>

        </div>
      </div>

      {/* ===== OVERLAY BELOW NAVBAR ===== */}
      {isMobileMenuOpen && (
        <div
          className="fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black/40 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed top-[70px] right-0 h-[60vh] w-64 bg-gray-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-4 space-y-3">

          {user && (
            <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
              <img src={avatarUrl} className="w-10 h-10 rounded-full"/>
              <div>
                <p className="text-sm font-semibold">{username}</p>
                <p className="text-xs text-gray-400">{user.email}</p>
              </div>
            </div>
          )}

          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
            onClick={() => {navigate("/home");setIsMobileMenuOpen(false);}}
          >
            Home
          </button>

          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
            onClick={() => {navigate("/lost-items");setIsMobileMenuOpen(false);}}
          >
            Lost Items
          </button>

          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
            onClick={() => {navigate("/found-items");setIsMobileMenuOpen(false);}}
          >
            Found Items
          </button>

          <button
            className="block w-full text-left px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
            onClick={() => {navigate("/report");setIsMobileMenuOpen(false);}}
          >
            Report Item
          </button>

          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
            onClick={() => {navigate("/profile");setIsMobileMenuOpen(false);}}
          >
            View Profile
          </button>

          {user && (
            <button
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm mt-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}
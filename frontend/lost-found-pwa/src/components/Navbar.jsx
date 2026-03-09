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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setProfileOpen(false);
    navigate("/");
  };

  // Auto-update Google avatar
  useEffect(() => {
    const fetchAvatar = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data?.user?.user_metadata?.avatar_url) {
        setAvatarUrl(data.user.user_metadata.avatar_url);
      }
    };

    fetchAvatar();

    // Optional: refresh avatar every 10 minutes
    const interval = setInterval(fetchAvatar, 600000);
    return () => clearInterval(interval);
  }, [user]);

  // Close profile drawer when clicking outside
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
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex-shrink-0 text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/home")}
          >
            Lost&Found
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <div className="flex items-center space-x-3">
              <button
                className="hover:text-gray-300 px-2 py-1"
                onClick={() => navigate("/home")}
              >
                Home
              </button>
              <button
                className="hover:text-gray-300 px-2 py-1"
                onClick={() => navigate("/lost-items")}
              >
                Lost Items
              </button>
              <button
                className="hover:text-gray-300 px-2 py-1"
                onClick={() => navigate("/found-items")}
              >
                Found Items
              </button>
              <button
                className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-sm"
                onClick={() => navigate("/report")}
              >
                Report Item
              </button>
              {user && (
                <button
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>

            {/* Profile Avatar */}
            {user && (
              <div className="ml-4 relative">
                <img
                  id="profile-avatar"
                  src={avatarUrl}
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                />

                {/* Profile Drawer */}
                <div
                  id="profile-panel"
                  className={`hidden md:block fixed top-0 right-0 h-full w-72 bg-gray-800 shadow-lg p-4 transform transition-transform duration-300 ease-in-out z-50
                    ${profileOpen ? "translate-x-0" : "translate-x-full"}
                  `}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <img
                      src={avatarUrl}
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold">
                        {user.user_metadata?.full_name || "User"}
                      </p>
                      <p className="text-gray-300 text-sm">{user.email}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button
                      className="w-full text-left hover:bg-gray-700 rounded px-2 py-1"
                      onClick={() => alert("View Profile clicked")}
                    >
                      View Profile
                    </button>
                    <button
                      className="w-full text-left hover:bg-gray-700 rounded px-2 py-1"
                      onClick={() => alert("Settings clicked")}
                    >
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

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-800 px-2 pt-2 pb-4 space-y-1">
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
            onClick={() => {
              navigate("/home");
              setIsMobileMenuOpen(false);
            }}
          >
            Home
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
            onClick={() => {
              navigate("/lost-items");
              setIsMobileMenuOpen(false);
            }}
          >
            Lost Items
          </button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-gray-700 rounded"
            onClick={() => {
              navigate("/found-items");
              setIsMobileMenuOpen(false);
            }}
          >
            Found Items
          </button>
          <button
            className="block w-full text-left px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
            onClick={() => {
              navigate("/report");
              setIsMobileMenuOpen(false);
            }}
          >
            Report Item
          </button>

          {user ? (
            <div className="flex items-center justify-between mt-2 px-2">
              <div className="flex items-center space-x-2">
                <img
                  src={avatarUrl}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span>{user.email}</span>
              </div>
              <button
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="w-full bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-sm mt-2"
              onClick={() => {
                navigate("/login");
                setIsMobileMenuOpen(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
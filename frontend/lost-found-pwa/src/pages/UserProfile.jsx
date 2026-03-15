import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import ItemCard from "../components/ItemCard";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", address: "", phone: "" });
  const [error, setError] = useState(null);
  const [itemsLoading, setItemsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndItems = async () => {
      try {
        setLoading(true);

        // 1️⃣ Get logged-in user
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError || !authData.user) throw new Error("No user logged in");

        const userId = authData.user.id;

        // 2️⃣ Fetch profile from profiles table
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();
        if (profileError) throw profileError;

        setUser(profileData);
        setFormData({
          name: profileData.name || "",
          address: profileData.address || "",
          phone: profileData.phone || "",
        });

        // 3️⃣ Fetch items for this user
        setItemsLoading(true);
        const { data: itemsData, error: itemsError } = await supabase
          .from("items")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(12);
        if (itemsError) throw itemsError;

        setItems(itemsData || []);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load profile or items");
      } finally {
        setLoading(false);
        setItemsLoading(false);
      }
    };

    fetchProfileAndItems();
  }, []);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileName = `avatars/${user.id}-${Date.now()}`;
      const { error: uploadError } = await supabase.storage.from("avatars").upload(fileName, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { publicUrl, error: urlError } = supabase.storage.from("avatars").getPublicUrl(fileName);
      if (urlError) throw urlError;

      await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", user.id);
      setUser({ ...user, avatar_url: publicUrl });
    } catch (err) {
      console.error(err.message);
      setError("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.from("profiles").update(formData).eq("id", user.id);
      if (error) throw error;
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch (err) {
      console.error(err.message);
      setError("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (itemId) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await supabase.from("items").delete().eq("id", itemId);
      setItems(items.filter((i) => i.id !== itemId));
    } catch (err) {
      console.error(err.message);
      alert("Failed to delete item");
    }
  };

  const handleEditPost = (item) => {
    alert("Edit post feature not implemented yet");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">Loading profile...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500">{error}</div>;

  const skeletons = Array.from({ length: 6 });

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white p-6 flex flex-col items-center gap-8">
      {/* Profile Card */}
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-6xl shadow-lg flex flex-col md:flex-row gap-8">
        {/* Left: Avatar */}
        <div className="flex flex-col items-center md:w-1/3">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-orange-500 p-1">
              <img
                src={user.avatar_url || "/default-avatar.png"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer hover:bg-orange-600">
              <input type="file" accept="image/*" className="hidden" onChange={handleProfilePicChange} />
              {uploading ? "..." : "✏️"}
            </label>
          </div>
        </div>

        {/* Right: User Info */}
        <div className="md:w-2/3 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">{user.name || user.email}</h2>
            <button onClick={() => setEditMode(!editMode)} className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-semibold text-white">
              {editMode ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {editMode ? (
            <div className="flex flex-col gap-4">
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" className="w-full p-3 rounded bg-gray-700 text-white" />
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" className="w-full p-3 rounded bg-gray-700 text-white" />
              <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone" className="w-full p-3 rounded bg-gray-700 text-white" />
              <button onClick={handleUpdate} className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded font-semibold text-white">Save Changes</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <p><span className="font-semibold">Full Name:</span> {user.name || "-"}</p>
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone || "-"}</p>
              <p><span className="font-semibold">Address:</span> {user.address || "-"}</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Items */}
      <div className="w-full max-w-6xl flex flex-col gap-4">
        <h3 className="text-2xl font-bold mb-2">Recent Items</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {itemsLoading
            ? skeletons.map((_, idx) => <div key={idx} className="bg-gray-700 rounded-lg p-4 animate-pulse h-60"></div>)
            : items.length === 0
            ? <p className="text-gray-400 col-span-full">No items reported yet!</p>
            : items.map((item) => (
                <div key={item.id} className="relative">
                  <ItemCard item={item} />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => handleEditPost(item)} className="bg-orange-500 px-2 py-1 rounded text-sm text-white hover:bg-orange-600">Edit</button>
                    <button onClick={() => handleDeletePost(item.id)} className="bg-red-500 px-2 py-1 rounded text-sm text-white hover:bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
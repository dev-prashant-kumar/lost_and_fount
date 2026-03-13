import React, { useState } from "react";
import { FaMapMarkerAlt, FaUpload, FaTrash } from "react-icons/fa";
import { supabase } from "../supabaseClient";

export default function ReportItem() {

  const [formData, setFormData] = useState({
    type: "lost",
    name: "",
    location: "",
    mapLink: "",
    date: "",
    description: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setSelectedImage(null);
  };

  // Upload image to Supabase Storage
  const uploadImage = async () => {

    if (!selectedImage) return null;

    const fileName = `${Date.now()}-${selectedImage.name}`;

    const { error } = await supabase.storage
      .from("item-images")
      .upload(fileName, selectedImage);

    if (error) {
      console.log("Image upload error:", error);
      return null;
    }

    const { data } = supabase.storage
      .from("item-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Upload image first
    const imageUrl = await uploadImage();

    // Save data in database
    const { error } = await supabase
      .from("items")
      .insert([
        {
          type: formData.type,
          name: formData.name,
          location: formData.location,
          map_link: formData.mapLink,
          date: formData.date,
          description: formData.description,
          image_url: imageUrl,
          contact_name: formData.contactName,
          contact_phone: formData.contactPhone,
          contact_email: formData.contactEmail,
        }
      ]);

    if (error) {
      console.log(error);
      alert("Error submitting report ❌");
    } else {
      alert("Item Report Submitted Successfully ✅");

      // reset form
      setFormData({
        type: "lost",
        name: "",
        location: "",
        mapLink: "",
        date: "",
        description: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
      });

      setImagePreview(null);
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center p-4">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-xl space-y-4 shadow-lg"
      >

        <h2 className="text-2xl font-bold text-center">
          Report Lost / Found Item
        </h2>

        {/* Item Type */}
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="lost">Lost Item</option>
          <option value="found">Found Item</option>
        </select>

        {/* Item Name */}
        <input
          type="text"
          name="name"
          placeholder="Item Name (Wallet, Phone...)"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          placeholder="Location (City / Area)"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />

        {/* Google Map Link */}
        <div className="flex gap-2">

          <input
            type="url"
            name="mapLink"
            placeholder="Google Map location link"
            value={formData.mapLink}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700"
          />

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 px-3 flex items-center justify-center rounded hover:bg-green-700"
          >
            <FaMapMarkerAlt />
          </a>

        </div>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Item description..."
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
          rows="3"
        />

        {/* Image Upload */}

        <div>

          <label className="block mb-2 font-semibold">
            Upload Item Image
          </label>

          {!imagePreview && (
            <label className="flex items-center justify-center gap-2 bg-blue-600 py-2 rounded cursor-pointer hover:bg-blue-700">

              <FaUpload />

              Upload Image

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

            </label>
          )}

          {imagePreview && (

            <div className="relative mt-3">

              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-52 object-cover rounded"
              />

              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-red-600 p-2 rounded-full hover:bg-red-700"
              >
                <FaTrash />
              </button>

            </div>

          )}

        </div>

        {/* Contact Info */}

        <h3 className="text-lg font-semibold pt-3">
          Contact Information
        </h3>

        <input
          type="text"
          name="contactName"
          placeholder="Your Name"
          value={formData.contactName}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />

        <input
          type="tel"
          name="contactPhone"
          placeholder="Phone Number"
          value={formData.contactPhone}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
          required
        />

        <input
          type="email"
          name="contactEmail"
          placeholder="Email Address"
          value={formData.contactEmail}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-700"
        />

        {/* Submit */}

        <button
          type="submit"
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
        >
          Submit Report
        </button>

      </form>

    </div>
  );
}
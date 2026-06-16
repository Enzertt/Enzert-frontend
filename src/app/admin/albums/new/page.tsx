"use client";

import { useState } from "react";

export default function NewAlbumPage() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    coverImage: "",
    year: "",
    description: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("http://localhost:5000/api/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          year: Number(formData.year),
        }),
      });

      // 🔥 IMPORTANT: read raw response first
      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      // ❗ handle non-OK responses safely
      if (!res.ok) {
        throw new Error(text);
      }

      // convert safely to JSON
      const data = JSON.parse(text);

      setMessage("Album created successfully!");

      setFormData({
        title: "",
        artist: "",
        genre: "",
        coverImage: "",
        year: "",
        description: "",
        featured: false,
      });
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#110D0C] text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Album</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Album Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1A1A1A]"
            required
          />

          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1A1A1A]"
            required
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1A1A1A]"
          />

          <input
            type="text"
            name="coverImage"
            placeholder="Cover Image URL"
            value={formData.coverImage}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1A1A1A]"
            required
          />

          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#1A1A1A]"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 rounded bg-[#1A1A1A]"
          />

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />
            Featured Album
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#A04100] px-6 py-3 rounded hover:opacity-90"
          >
            {loading ? "Creating..." : "Create Album"}
          </button>
        </form>

        {message && <p className="mt-6 text-[#D4C3BC]">{message}</p>}
      </div>
    </main>
  );
}

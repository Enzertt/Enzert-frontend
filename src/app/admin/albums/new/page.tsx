"use client";

import { useState } from "react";

export default function NewAlbumPage() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    genre: "",
    coverImage: "",
    coverFile: null as File | null,
    year: "",
    description: "",
    featured: false,

    tracks: [
      {
        title: "",
        duration: "",
        file: null as File | null,
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle normal inputs
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

  // upload audio and image to backend (Cloudinary)
  const uploadAudio = async (file: File) => {
    const data = new FormData();
    data.append("audio", file);

    const res = await fetch("http://localhost:5000/api/upload/audio", {
      method: "POST",
      body: data,
    });

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.message || "Audio upload failed");
    }

    if (!body.audioUrl) {
      throw new Error("Audio upload did not return a URL");
    }

    return body;
  };

  const uploadImage = async (file: File) => {
    const data = new FormData();
    data.append("image", file);

    const res = await fetch("http://localhost:5000/api/upload/image", {
      method: "POST",
      body: data,
    });

    const body = await res.json();

    if (!res.ok) {
      throw new Error(body.message || "Image upload failed");
    }

    if (!body.imageUrl) {
      throw new Error("Image upload did not return a URL");
    }

    return body;
  };

  // cover preview
  const coverPreview = formData.coverFile
    ? URL.createObjectURL(formData.coverFile)
    : formData.coverImage;

  // add track
  const addTrack = () => {
    setFormData((prev) => ({
      ...prev,
      tracks: [
        ...prev.tracks,
        {
          title: "",
          duration: "",
          file: null,
        },
      ],
    }));
  };

  // update track
  const handleTrackChange = (
    index: number,
    field: "title" | "duration",
    value: string,
  ) => {
    const updated = [...formData.tracks];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      tracks: updated,
    }));
  };

  // submit album
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.coverFile && !formData.coverImage.trim()) {
        throw new Error("Please upload a cover image");
      }

      let coverImageUrl = formData.coverImage.trim();

      if (formData.coverFile) {
        const uploadRes = await uploadImage(formData.coverFile);

        coverImageUrl = uploadRes.imageUrl;
      }
      const uploadedTracks = await Promise.all(
        formData.tracks.map(async (track) => {
          if (!track.file) {
            throw new Error("Missing audio file");
          }

          const uploadRes = await uploadAudio(track.file);

          return {
            title: track.title,
            duration: track.duration,
            audioUrl: uploadRes.audioUrl,
          };
        }),
      );

      const res = await fetch("http://localhost:5000/api/albums", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          artist: formData.artist,
          genre: formData.genre,
          coverImage: coverImageUrl,
          year: Number(formData.year),
          description: formData.description,
          featured: formData.featured,
          tracks: uploadedTracks,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create album");
      }

      setMessage("Album created successfully!");

      // reset
      setFormData({
        title: "",
        artist: "",
        genre: "",
        coverImage: "",
        coverFile: null,
        year: "",
        description: "",
        featured: false,
        tracks: [{ title: "", duration: "", file: null }],
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
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Create New Album</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ================= ALBUM DETAILS ================= */}
          <div className=" border-b border-gray-700 pb-6">
            <h2 className="text-2xl font-bold">Album Details</h2>

            {/* TITLE */}
            <div className="p-4 rounded bg-[#1A1A1A] space-y-2">
              <label className="text-sm text-gray-400">Album Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#111]"
              />
            </div>

            {/* ARTIST */}
            <div className="p-4 rounded bg-[#1A1A1A] space-y-2">
              <label className="text-sm text-gray-400">Artist</label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#111]"
              />
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 ">
              <div className="p-4 rounded bg-[#1A1A1A] space-y-2">
                <label className="text-sm text-gray-400">Genre</label>
                <input
                  type="text"
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-[#111]"
                />
              </div>

              <div className="p-4 rounded bg-[#1A1A1A] space-y-2">
                <label className="text-sm text-gray-400">Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full p-3 rounded bg-[#111]"
                />
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="px-4 rounded bg-[#1A1A1A] space-y-2">
              <label className="text-sm text-gray-400">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-3 rounded bg-[#111]"
              />
            </div>

            {/* COVER IMAGE */}
            <div className="space-y-3 p-4 rounded bg-[#1A1A1A]">
              {coverPreview && (
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              <label className="cursor-pointer rounded inline-block">
                Upload Cover Image <span className="text-[#A04100]">*</span>
                <input
                  type="file"
                  accept="image/*"
                  required
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    setFormData((prev) => ({
                      ...prev,
                      coverFile: file || null,
                    }));
                  }}
                />
              </label>
            </div>

            {/* FEATURED */}
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
              />
              Featured Album
            </label>
          </div>

          {/* ================= TRACKS ================= */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Tracks</h2>

            {formData.tracks.map((track, index) => (
              <div key={index} className="space-y-3 p-4 rounded bg-[#1A1A1A]">
                <input
                  type="text"
                  placeholder="Track Title"
                  value={track.title}
                  onChange={(e) =>
                    handleTrackChange(index, "title", e.target.value)
                  }
                  className="w-full p-3 rounded bg-[#111]"
                />

                <input
                  type="text"
                  placeholder="Duration"
                  value={track.duration}
                  onChange={(e) =>
                    handleTrackChange(index, "duration", e.target.value)
                  }
                  className="w-full p-3 rounded bg-[#111]"
                />

                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];

                    const updated = [...formData.tracks];
                    updated[index].file = file || null;

                    setFormData((prev) => ({
                      ...prev,
                      tracks: updated,
                    }));
                  }}
                />
              </div>
            ))}

            <button
              type="button"
              onClick={addTrack}
              className="bg-gray-700 px-4 py-2 rounded"
            >
              + Add Track
            </button>
          </div>

          {/* SUBMIT */}
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

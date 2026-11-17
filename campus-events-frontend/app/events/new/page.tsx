"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface SessionInput {
  title: string;
  description: string;
  speaker: string;
  startTime: string;
  endTime: string;
}

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Technology",
    location: "",
    eventDate: "",
    isPublished: true,
  });

  const [sessions, setSessions] = useState<SessionInput[]>([]);
  const [currentSession, setCurrentSession] = useState<SessionInput>({
    title: "",
    description: "",
    speaker: "",
    startTime: "",
    endTime: "",
  });

  const categories = ["Technology", "Workshop", "Social", "Sports", "Academic", "Career"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSessionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentSession((prev) => ({ ...prev, [name]: value }));
  };

  const addSession = () => {
    if (!currentSession.title || !currentSession.startTime || !currentSession.endTime) {
      alert("Please fill in at least the session title, start time, and end time.");
      return;
    }
    setSessions((prev) => [...prev, currentSession]);
    setCurrentSession({ title: "", description: "", speaker: "", startTime: "", endTime: "" });
  };

  const removeSession = (index: number) => {
    setSessions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";
      
      const payload = {
        ...formData,
        sessions,
      };

      const res = await fetch(`${API_BASE_URL}/events`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create event");
      }

      router.push("/events");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-3xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Create New Campus Event</h1>
          <p className="text-gray-600">Fill out the details below to publish a new event and add sub-sessions.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g. Annual Hackathon 2026"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Date & Time</label>
              <input
                type="datetime-local"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g. Student Union Building, Hall A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Provide a summary of what attendees can expect..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Sub-Sessions Section */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Sessions (Optional)</h3>
            
            {sessions.length > 0 && (
              <div className="space-y-3 mb-6">
                {sessions.map((session, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <div>
                      <p className="font-medium text-gray-800">{session.title} <span className="text-xs text-gray-500">by {session.speaker || "TBA"}</span></p>
                      <p className="text-xs text-gray-500">{session.startTime} - {session.endTime}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeSession(index)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="title"
                  value={currentSession.title}
                  onChange={handleSessionChange}
                  placeholder="Session Title"
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                />
                <input
                  type="text"
                  name="speaker"
                  value={currentSession.speaker}
                  onChange={handleSessionChange}
                  placeholder="Speaker Name"
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  name="startTime"
                  value={currentSession.startTime}
                  onChange={handleSessionChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                />
                <input
                  type="datetime-local"
                  name="endTime"
                  value={currentSession.endTime}
                  onChange={handleSessionChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm"
                />
              </div>
              <button
                type="button"
                onClick={addSession}
                className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
              >
                + Add Session
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Publishing Event..." : "Publish Event"}
          </button>
        </form>
      </main>
    </div>
  );
}
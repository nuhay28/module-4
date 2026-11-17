import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import { getUpcomingEvents } from "./services/eventService";
import Link from "next/link";
import { Suspense } from "react";
import type { Event } from "@/types/event";

async function UpcomingEventsList() {
  let upcomingEvents: Event[] = [];
  let errorMessage = "";

  try {
    upcomingEvents = await getUpcomingEvents();
  } catch (error) {
    errorMessage = "Could not connect to the backend server. Please ensure NestJS is running.";
  }

  if (errorMessage) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8">
        {errorMessage}
      </div>
    );
  }

  if (upcomingEvents.length === 0) {
    return (
      <div className="bg-white border border-gray-200 text-gray-500 p-8 rounded-xl text-center">
        No upcoming events found. Check back later!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {upcomingEvents.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl text-white p-8 sm:p-12 mb-12 shadow-lg">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Discover What's Happening on Campus
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mb-8">
            Find workshops, technology talks, student activities, and upcoming sessions all in one place.
          </p>
          <Link
            href="/events"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl shadow hover:bg-indigo-50 transition"
          >
            Explore All Events
          </Link>
        </div>

        {/* Upcoming Events Section */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Upcoming Events</h2>
          <Link href="/events" className="text-indigo-600 hover:underline font-medium text-sm">
            View All Events &rarr;
          </Link>
        </div>

        <Suspense fallback={<div className="text-gray-500 p-8 text-center">Loading upcoming events...</div>}>
          <UpcomingEventsList />
        </Suspense>
      </main>
    </div>
  );
}
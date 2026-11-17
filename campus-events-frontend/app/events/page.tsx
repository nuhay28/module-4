import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import { getEvents } from "../services/eventService";
import Link from "next/link";

interface EventsPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function EventsPage({ searchParams }: EventsPageProps) {
  const resolvedParams = await searchParams;
  const search = resolvedParams.search || "";
  const category = resolvedParams.category || "";
  const page = Number(resolvedParams.page) || 1;

  let eventData = { data: [], total: 0, page: 1, limit: 9, totalPages: 1 };
  let errorMessage = "";

  try {
    let eventData = { data: [], total: 0, page: 1, limit: 9, totalPages: 1 };
  } catch (error) {
    errorMessage = "Could not connect to the backend server. Please ensure NestJS is running.";
  }

  const categories = ["Technology", "Workshop", "Social", "Sports", "Academic", "Career"];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Campus Events Catalog</h1>
          <p className="text-gray-600">Search and filter through all upcoming campus sessions and workshops.</p>
        </div>

        {/* Search & Filter Form */}
        <form method="GET" className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <input
              type="text"
              name="search"
              defaultValue={search}
              placeholder="Search by title or description..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>
          <div className="w-full md:w-48">
            <select
              name="category"
              defaultValue={category}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
          >
            Filter
          </button>
        </form>

        {errorMessage ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8">
            {errorMessage}
          </div>
        ) : eventData.data.length === 0 ? (
          <div className="bg-white border border-gray-200 text-gray-500 p-12 rounded-xl text-center">
            No events found matching your criteria.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {eventData.data.map((event: any) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination Controls */}
            {eventData.totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2">
                {page > 1 && (
                  <Link
                    href={`/events?search=${search}&category=${category}&page=${page - 1}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Previous
                  </Link>
                )}
                <span className="px-4 py-2 text-gray-600 font-medium">
                  Page {page} of {eventData.totalPages}
                </span>
                {page < eventData.totalPages && (
                  <Link
                    href={`/events?search=${search}&category=${category}&page=${page + 1}`}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
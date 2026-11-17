import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">CAMPUS EVENTS</span>
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Home
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Events
            </Link>
            <Link href="/create-event" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
              Create Event
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
import Link from "next/link";
import type { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition flex flex-col justify-between">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {event.category}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${event.isPublished ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
            {event.isPublished ? 'Published' : 'Draft'}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{event.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="space-y-1.5 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>📍 {event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>📅 {new Date(event.eventDate).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
        <Link
          href={`/events/${event.id}`}
          className="text-indigo-600 hover:text-indigo-800 font-semibold text-sm transition"
        >
          View Details &rarr;
        </Link>
      </div>
    </div>
  );
}
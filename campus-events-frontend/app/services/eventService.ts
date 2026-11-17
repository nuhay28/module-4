import type { PaginatedEvents, Event } from "../../src/types/event";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api";

export async function getUpcomingEvents(): Promise<Event[]> {
  const res = await fetch(`${API_BASE_URL}/events/upcoming`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch upcoming events");
  return res.json();
}

export async function getEvents(params?: {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<PaginatedEvents> {
  const query = new URLSearchParams();
  if (params?.search) query.append("search", params.search);
  if (params?.category) query.append("category", params.category);
  if (params?.page) query.append("page", params.page.toString());
  if (params?.limit) query.append("limit", params.limit.toString());

  const res = await fetch(`${API_BASE_URL}/events?${query.toString()}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}
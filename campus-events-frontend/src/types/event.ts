export interface Session {
  id: string;
  title: string;
  description: string;
  speaker: string;
  startTime: string;
  endTime: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  eventDate: string;
  isPublished: boolean;
  sessions?: Session[];
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedEvents {
  data: Event[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

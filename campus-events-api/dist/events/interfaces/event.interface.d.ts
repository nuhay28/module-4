export interface Session {
    id: string;
    eventId: string;
    title: string;
    startsAt: string;
    endsAt: string;
    room: string;
}
export interface EventItem {
    id: string;
    title: string;
    description: string;
    location: string;
    eventDate: string;
    category: string;
    isPublished: boolean;
    sessions?: Session[];
}

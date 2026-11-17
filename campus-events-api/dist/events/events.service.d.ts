import { EventItem, Session } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';
export declare class EventsService {
    private events;
    findAll(query: FindEventsQueryDto): {
        items: EventItem[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    findUpcoming(): EventItem[];
    findOne(id: string): EventItem;
    findSessions(eventId: string): Session[];
    findSessionById(eventId: string, sessionId: string): Session;
    create(dto: CreateEventDto): EventItem;
}

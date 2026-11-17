import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { FindEventsQueryDto } from './dto/find-events-query.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    findUpcoming(): import("./interfaces/event.interface").EventItem[];
    findAll(query: FindEventsQueryDto): {
        items: import("./interfaces/event.interface").EventItem[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
    findOne(id: string): import("./interfaces/event.interface").EventItem;
    findSessions(id: string): import("./interfaces/event.interface").Session[];
    findSessionById(id: string, sessionId: string): import("./interfaces/event.interface").Session;
    create(body: CreateEventDto): import("./interfaces/event.interface").EventItem;
}

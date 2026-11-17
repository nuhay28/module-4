"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
let EventsService = class EventsService {
    constructor() {
        this.events = [
            {
                id: 'evt-101',
                title: 'Intro to Cloud Computing',
                description: 'A beginner-friendly campus workshop.',
                location: 'Engineering Block, Room 2',
                eventDate: '2026-12-04T09:00:00.000Z',
                category: 'technology',
                isPublished: true,
                sessions: [
                    { id: 'ses-201', eventId: 'evt-101', title: 'Cloud Basics', startsAt: '2026-12-04T09:00:00.000Z', endsAt: '2026-12-04T10:30:00.000Z', room: 'Room 2' },
                    { id: 'ses-202', eventId: 'evt-101', title: 'AWS Hands-on', startsAt: '2026-12-04T11:00:00.000Z', endsAt: '2026-12-04T12:30:00.000Z', room: 'Room 2' },
                ],
            },
            {
                id: 'evt-102',
                title: 'AI & Ethics Seminar',
                description: 'Discussing the moral implications of artificial intelligence.',
                location: 'Auditorium A',
                eventDate: '2026-11-20T14:00:00.000Z',
                category: 'technology',
                isPublished: true,
                sessions: [
                    { id: 'ses-203', eventId: 'evt-102', title: 'AI Governance', startsAt: '2026-11-20T14:00:00.000Z', endsAt: '2026-11-20T15:30:00.000Z', room: 'Auditorium A' },
                ],
            },
            {
                id: 'evt-103',
                title: 'Campus Art Showcase',
                description: 'Exhibition of student paintings and digital art.',
                location: 'Student Center Gallery',
                eventDate: '2026-10-10T10:00:00.000Z',
                category: 'arts',
                isPublished: false,
            },
            {
                id: 'evt-104',
                title: 'Inter-Department Hackathon',
                description: 'Build innovative tech solutions in 24 hours!',
                location: 'Computer Science Lab',
                eventDate: '2026-12-15T08:00:00.000Z',
                category: 'technology',
                isPublished: true,
                sessions: [
                    { id: 'ses-204', eventId: 'evt-104', title: 'Opening & Team Formation', startsAt: '2026-12-15T08:00:00.000Z', endsAt: '2026-12-15T09:00:00.000Z', room: 'Lab 1' },
                ],
            },
            {
                id: 'evt-105',
                title: 'Annual Career Fair',
                description: 'Meet recruiters from top firms.',
                location: 'Main Gymnasium',
                eventDate: '2026-11-30T09:30:00.000Z',
                category: 'career',
                isPublished: true,
            },
        ];
    }
    findAll(query) {
        let result = [...this.events];
        if (query.category) {
            result = result.filter(e => e.category.toLowerCase() === query.category.toLowerCase());
        }
        if (query.location) {
            result = result.filter(e => e.location.toLowerCase().includes(query.location.toLowerCase()));
        }
        if (query.isPublished !== undefined) {
            const isPubBool = query.isPublished === 'true';
            result = result.filter(e => e.isPublished === isPubBool);
        }
        if (query.sortBy) {
            result.sort((a, b) => {
                let valA = a[query.sortBy];
                let valB = b[query.sortBy];
                if (query.sortBy === 'eventDate') {
                    valA = new Date(valA).getTime();
                    valB = new Date(valB).getTime();
                }
                if (valA < valB)
                    return query.order === 'desc' ? 1 : -1;
                if (valA > valB)
                    return query.order === 'desc' ? -1 : 1;
                return 0;
            });
        }
        const page = query.page || 1;
        const limit = query.limit || 5;
        const total = result.length;
        const totalPages = Math.ceil(total / limit) || 1;
        const offset = (page - 1) * limit;
        const items = result.slice(offset, offset + limit);
        return {
            items,
            total,
            page,
            limit,
            totalPages,
        };
    }
    findUpcoming() {
        const today = new Date().toISOString();
        return this.events.filter(e => e.eventDate >= today && e.isPublished);
    }
    findOne(id) {
        const event = this.events.find(e => e.id === id);
        if (!event) {
            throw new common_1.NotFoundException(`Event with ID ${id} not found.`);
        }
        return event;
    }
    findSessions(eventId) {
        const event = this.findOne(eventId);
        return event.sessions || [];
    }
    findSessionById(eventId, sessionId) {
        const sessions = this.findSessions(eventId);
        const session = sessions.find(s => s.id === sessionId);
        if (!session) {
            throw new common_1.NotFoundException(`Session with ID ${sessionId} does not belong to event ${eventId}.`);
        }
        return session;
    }
    create(dto) {
        const newEvent = {
            id: `evt-${Date.now()}`,
            ...dto,
            sessions: [],
        };
        this.events.push(newEvent);
        return newEvent;
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)()
], EventsService);
//# sourceMappingURL=events.service.js.map
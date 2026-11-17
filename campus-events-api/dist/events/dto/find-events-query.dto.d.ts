export declare class FindEventsQueryDto {
    category?: string;
    location?: string;
    isPublished?: string;
    sortBy?: 'eventDate' | 'title';
    order?: 'asc' | 'desc';
    page?: number;
    limit?: number;
}

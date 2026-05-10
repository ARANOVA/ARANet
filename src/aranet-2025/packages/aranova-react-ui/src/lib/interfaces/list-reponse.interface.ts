export interface ListResponse<T> {
    statusCode: number
    data?: {
        metadata: {
            page: number;
            last: number;
            quantity: number;
            total: number;
        };
        items: T[];
    },
    error?: string | null;
}

export interface ApiListResponse<T> {
    links: {
        self: string;
        first: string;
        next: string;
        last: string;
    };
    meta: {
        count: number;
        page: number;
        limit: number;
    };
    data: T[];
    included?: [];
}

export interface ApiResponse<T> {
    data: T;
}
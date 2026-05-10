export interface SingleResponse<T> {
    statusCode: number;
    data?: T | null;
    error?: string;
}
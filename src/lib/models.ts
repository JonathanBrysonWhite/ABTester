
export interface QuizPayload {
    email: string;
    snippets: string[][];
}

export interface QuizDocument {
    _id: string;
    email: string;
    snippets: string[][];
    createdAt: Date;
    hash: string;
}

export interface RateLimitConfig {
    capacity: number;
    refillRate: number;
    expireSeconds?: number;
}
import { RateLimitConfig } from "@/lib/models";
import { QuizPayload } from "@/lib/models";
export function isBase64(str: string): boolean {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}


export const snippetPairs = [
    ['/density/dense.html', '/density/airy.html'],
    ['/column/single-column.html', '/column/multi-column.html'],
    ['/cta/bold-cta.html', '/cta/minimal-cta.html'],
    ['/copy/casual.html', '/copy/formal.html'],
    ['/media/hero-video.html', '/media/hero-image.html'],
    ['/illustration/flat.html', '/illustration/realistic.html'],
    ['/navigation/top-nav.html', '/navigation/side-nav.html'],
    ['/social/prominent.html', '/social/subtle.html'],
];

export const defaultQuizPayload: QuizPayload = {
    email: 'jonathanbrysonwhite@gmail.com',
    snippets: snippetPairs
}

export const defaultRateLimitConfig : RateLimitConfig= {
    capacity: 5,
    refillRate: 1,
    expireSeconds: 60
}
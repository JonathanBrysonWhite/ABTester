import redis from '@/lib/dal/redislayer';
import { RateLimitConfig } from '@/lib/models';
/**
 * Token Bucket Rate Limiter
 * 
 * @param identifier Unique client identifier like IP
 * @param config Rate limiter settings
 * @returns { allowed: boolean, tokens: number}
 */

export async function rateLimit(
    identifier: string,
    config: RateLimitConfig
): Promise<{allowed: boolean, tokens: number}> {
    const { capacity, refillRate, expireSeconds = 60 } = config;
    const key = `token-bucket:${identifier}`;
    const now = Date.now();

    // Fetch bucket state
    const bucket = await redis.hgetall(key);
    let tokens = bucket.tokens ? parseFloat(bucket.tokens) : capacity;
    let lastRefill = bucket.lastRefill ? parseInt(bucket.lastRefill) : now;

    const elapsed = (now - lastRefill) / 1000;
    const refill = elapsed * refillRate;
    tokens = Math.min(capacity, tokens + refill);

    if (tokens <= 1) {
        return { allowed: false, tokens };
    }

    tokens -= 1;

    await redis.hset(key, {
        tokens: tokens.toString(),
        lastRefill: now.toString()
    });
    await redis.expire(key, expireSeconds);
    return { allowed: true, tokens };
}
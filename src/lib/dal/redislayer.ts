import { Redis } from 'ioredis';

let client: Redis;

declare global {
    //eslint-disable-next-line no-var
    var _redis: Redis | undefined;
}

if (!global._redis) {
    global._redis = new Redis(process.env.REDIS_CONNECTION_STRING || '');
}

client = global._redis;

export default client;
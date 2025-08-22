import * as crypto from 'crypto';
import { QuizPayload } from './models';
const ALGORITHM = 'sha256'
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const HMAC_ENCODING = 'base64';
const HASH_ENCODING = 'hex'

export function generateObjectHmac(obj: QuizPayload): string {
    const objectString = JSON.stringify(obj);
    return crypto
        .createHmac(ALGORITHM, ENCRYPTION_KEY)
        .update(objectString)
        .digest(HMAC_ENCODING);
}

export function generatePayloadHash(payload: QuizPayload): string {
    return crypto
        .createHash(ALGORITHM)
        .update(JSON.stringify(payload))
        .digest(HASH_ENCODING);
}
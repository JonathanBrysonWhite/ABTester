import crypto from 'crypto';
import { decode } from 'punycode';

const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;
const SECRET_KEY = process.env.ENCRYPTION_KEY!; // 32 bytes

export function encryptQuiz(payload: any) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), 'utf8'),
    cipher.final(),
  ]);

  // Return IV:ciphertext in Base64
  return `${iv.toString('base64')}:${encrypted.toString('base64')}`;
}

export function decryptQuiz(encryptedPayload: string) {
  console.log('Decrypting payload:', encryptedPayload);
  //base 64 decode the payload
  const decodedPayload = decodeURIComponent(encryptedPayload);
  console.log('Decoded payload:', decodedPayload);
  const [ivStr, encryptedStr] = decodedPayload.split(':');
  if (!ivStr || !encryptedStr) throw new Error('Invalid payload format');

  const iv = Buffer.from(ivStr, 'base64');
  const encrypted = Buffer.from(encryptedStr, 'base64');

  const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY), iv);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return JSON.parse(decrypted.toString('utf8'));
}

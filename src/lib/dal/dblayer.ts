import { MongoClient } from 'mongodb';
import { QuizPayload, QuizDocument } from '@/lib/models';
import { generatePayloadHash } from '@/lib/crypto';

let client: MongoClient | null = null;

async function getDb(): Promise<MongoClient> {
    if (!client) {
        client = new MongoClient(process.env.MONGO_CONNECTION_STRING || '');
        await client.connect();
    }
    return client;
}
export async function saveQuizPayload(payload: QuizPayload, code: string): Promise<string> {
    try {
        const client = await getDb();
        const database = client.db('ab-test');
        const collection = database.collection<QuizDocument>('quizzes');

        const doc = {
            _id: code,
            email: payload.email,
            snippets: payload.snippets,
            createdAt: new Date(),
            hash: generatePayloadHash(payload)
        };
        const query = { _id: code };
        const existing = await collection.findOne(query);
        if (existing) {
            if (existing.hash === doc.hash) {
                console.log('Quiz payload already exists with the same hash, skipping insert.');
                return doc._id; // No need to insert if the hash is the same
            }
            else {
                console.log('Quiz payload exists with a different. retrying.');
                return saveQuizPayload(payload, code + Math.floor(Math.random() * 10));
            }
        }
        const result = await collection.insertOne(doc);
        if (result.acknowledged) {
            return result.insertedId.toString();
        }
        return '';
    } catch (error) {
        console.error('Error saving quiz payload:', error);
        return '';
    } 
}

export async function getQuizPayload(code: string): Promise<QuizPayload | null> {
    try {
        const client = await getDb();
        const database = client.db('ab-test');
        const collection = database.collection<QuizDocument>('quizzes');

        const query = { _id: code };
        const quiz = await collection.findOne(query);
        if (!quiz) {
            console.error('Quiz not found for code:', code);
            return null;
        }
        const payload: QuizPayload = {
            email: quiz.email,
            snippets: quiz.snippets
        }
        return payload

    } catch (error) {
        console.error('Error retrieving quiz payload:', error);
        return null;
    }
}
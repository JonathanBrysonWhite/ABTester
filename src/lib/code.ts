import { generateObjectHmac } from './crypto';
import { QuizPayload } from './models';
import { saveQuizPayload } from './dal/dblayer';

export async function generateCode(payload: QuizPayload): Promise<string> {
    try {
        const canonicalizedPayload = canonicalizePayload(payload);
        if (!canonicalizedPayload) {
            return '';
        }

        const { email, snippets } = canonicalizedPayload;
        const hmac = generateObjectHmac({ email, snippets });
        const hmacSlice = hmac.slice(0, 12);
        const code = await saveQuizPayload(canonicalizedPayload, hmacSlice);
        if (code === '') {
            console.error('Failed to save quiz payload');
            return '';
        }

        return code;
    } catch (error) {
        console.error('Error generating code:', error);
    }
    return ""
}

function canonicalizePayload(payload: QuizPayload): QuizPayload | null {
    if (!payload || !payload.email || !payload.snippets) {
        return null;
    }
    // Canonicalize email and snippets
    if (typeof payload.email !== 'string' || !Array.isArray(payload.snippets)) {
        return null;
    }
    payload.snippets.forEach((pair: string[]) => {
        if (!Array.isArray(pair) || pair.length !== 2 || !pair.every(snippet => typeof snippet === 'string')) {
            return null;
        }
    });
    payload.email = payload.email.trim().toLowerCase();
    payload.snippets = payload.snippets.map((pair: string[]) => 
        pair.map((snippet: string) => snippet.trim())
    );
    payload.snippets.sort((a, b) => a[0].localeCompare(b[0]) || a[0].localeCompare(b[0]));
    const canonicalizedPayload = {
        email: payload.email,
        snippets: payload.snippets
    }
    return canonicalizedPayload;
}


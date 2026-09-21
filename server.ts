import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

// Load environment variables from .env / .env.local if present
dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Security & Middleware
app.use(cors());
app.use(express.json({ limit: '1mb' }));

// Basic in-memory rate limiting to protect API endpoints
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 40;
const ipRequestCounts = new Map<string, { count: number; resetTime: number }>();

const rateLimiter = (req: Request, res: Response, next: NextFunction): void => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();

  const record = ipRequestCounts.get(ip);
  if (!record || now > record.resetTime) {
    ipRequestCounts.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    next();
  } else if (record.count < MAX_REQUESTS_PER_WINDOW) {
    record.count++;
    next();
  } else {
    res.status(429).json({
      error: true,
      message: 'Too many requests. Please wait a moment before sending another message.',
    });
  }
};

// Periodic cleanup of rate limiter records
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipRequestCounts.entries()) {
    if (now > record.resetTime) {
      ipRequestCounts.delete(ip);
    }
  }
}, 5 * 60 * 1000);

// Base System Instruction for Aegis
const AEGIS_SYSTEM_INSTRUCTION = `You are Aegis, a Disaster Emergency Guidance & Support AI assistant.

Your purpose is to provide clear, practical, safety-focused guidance for emergencies and disaster preparedness.

You can help with:
- Fire
- Earthquake
- Flood
- Cyclone
- Severe weather
- Road accidents
- Medical first aid
- Bleeding
- Burns
- CPR guidance
- Evacuation planning
- Emergency preparedness
- Emergency kits
- Family safety plans
- Disaster recovery information

Rules:

1. Put immediate life safety first.
2. Give clear numbered steps.
3. Keep urgent instructions concise.
4. Encourage contacting local emergency services when appropriate.
5. Never claim to have contacted emergency services.
6. Never invent emergency contacts.
7. For India, emergency number is 112 when appropriate.
8. Clearly distinguish general guidance from professional medical advice.
9. Do not diagnose serious medical conditions.
10. Ask a short clarifying question when necessary.
11. Respond naturally to normal conversation.

IMPORTANT:
If the user says something casual such as:
- hi
- hello
- hiii
- hey

respond naturally, for example:
"Hi! I'm Aegis, your disaster emergency guidance assistant. How can I help you today?"

Do NOT return the same emergency greeting for every message.

If the user says:
"There is a fire in my house"

respond specifically to the fire situation rather than giving a generic introduction.

If the user describes an active emergency, prioritize immediate actions before explanations.`;

/**
 * Health Check Endpoint
 * GET /api/health
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

/**
 * Chat Endpoint
 * POST /api/chat
 */
app.post('/api/chat', rateLimiter, async (req: Request, res: Response): Promise<void> => {
  try {
    const { message, history, language } = req.body;

    // Validate message
    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({
        error: true,
        message: 'Message cannot be empty.',
      });
      return;
    }

    if (message.length > 2500) {
      res.status(400).json({
        error: true,
        message: 'Message is too long. Please keep questions concise for emergency guidance.',
      });
      return;
    }

    // Securely retrieve API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey.trim() === '' || apiKey.includes('replace-with-your')) {
      console.error('[Aegis Backend] GEMINI_API_KEY is not configured or is a placeholder.');
      res.status(500).json({
        error: true,
        message: 'Gemini API key is not configured on the server. Please set GEMINI_API_KEY in your environment variables.',
      });
      return;
    }

    // Target Model
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    // Initialize Google GenAI client
    const ai = new GoogleGenAI({ apiKey });

    // Prepare System Instruction with language directive if specified
    let systemInstruction = AEGIS_SYSTEM_INSTRUCTION;
    if (language && typeof language === 'string' && language.toLowerCase() !== 'english') {
      systemInstruction += `\n\nLANGUAGE DIRECTIVE: The user prefers guidance in ${language}. Provide your response in ${language}, maintaining clear emergency numbering and official emergency numbers (e.g. 112).`;
    }

    // Format conversation history for @google/genai
    const formattedContents: Array<{
      role: 'user' | 'model';
      parts: Array<{ text: string }>;
    }> = [];

    if (Array.isArray(history)) {
      // Keep only recent relevant messages to avoid token blowup
      const recentHistory = history.slice(-8);
      for (const item of recentHistory) {
        if (item && item.text && typeof item.text === 'string' && (item.role === 'user' || item.role === 'model')) {
          formattedContents.push({
            role: item.role,
            parts: [{ text: item.text.trim() }],
          });
        }
      }
    }

    // Append the current user message
    formattedContents.push({
      role: 'user',
      parts: [{ text: message.trim() }],
    });

    // Call Gemini API
    const response = await ai.models.generateContent({
      model: modelName,
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.3, // Lower temperature for more factual, reliable safety instructions
      },
    });

    const reply = response.text;

    if (!reply || !reply.trim()) {
      res.status(502).json({
        error: true,
        message: 'Gemini API returned an empty response. Please try again.',
      });
      return;
    }

    res.status(200).json({
      reply: reply.trim(),
    });
  } catch (error: unknown) {
    // Log detailed technical error strictly on the backend server console
    console.error('[Aegis Backend] Error communicating with Gemini API:', error);

    // Differentiate known error patterns
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (errorMessage.includes('401') || errorMessage.includes('403') || errorMessage.includes('API_KEY_INVALID') || errorMessage.includes('PERMISSION_DENIED')) {
      res.status(401).json({
        error: true,
        message: 'Gemini API key is invalid or unauthorized. Please verify your GEMINI_API_KEY.',
      });
      return;
    }

    if (errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      res.status(429).json({
        error: true,
        message: 'AI service rate limit exceeded. Please wait a moment and retry.',
      });
      return;
    }

    if (errorMessage.includes('404') || errorMessage.includes('NOT_FOUND')) {
      res.status(404).json({
        error: true,
        message: 'The requested Gemini model was not found or is unavailable.',
      });
      return;
    }

    // Default honest failure message (NO fake fallbacks)
    res.status(503).json({
      error: true,
      message: 'Gemini API is currently unavailable. Please try again in a moment or dial 112 for immediate emergencies.',
    });
  }
});

// Production Static Serving
const distClientPath = path.resolve(process.cwd(), 'dist/client');
if (fs.existsSync(distClientPath)) {
  app.use(express.static(distClientPath));
  app.get('*', (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    res.sendFile(path.join(distClientPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Aegis Server] Listening on http://0.0.0.0:${PORT}`);
});

export default app;

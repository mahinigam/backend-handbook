import express from 'express';
import path from 'path';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initializer for Gemini client
let genaiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genaiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not configured.');
    }
    genaiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genaiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Query endpoint with high-thinking and deep reasoning capability
app.post('/api/ai/query', async (req, res) => {
  try {
    const { prompt, mode, context } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    let ai: GoogleGenAI;
    try {
      ai = getGenAI();
    } catch (error: any) {
      return res.status(503).json({
        error: 'AI tutor is not configured',
        details: error?.message || String(error),
      });
    }

    let modelName = 'gemini-3.6-flash';
    let thinkingLevel = ThinkingLevel.LOW;

    if (mode === 'high_thinking' || mode === 'system_design' || mode === 'code_review') {
      modelName = 'gemini-3.1-pro-preview';
      thinkingLevel = ThinkingLevel.HIGH;
    }

    const systemPrompt = `You are a Staff Backend Engineer who has spent 20+ years building large-scale distributed systems at Google, Meta, Uber, Stripe, Netflix, Databricks, and Amazon.
You are contributing to the Backend Engineering Handbook Master Textbook (v2.0).
Your task is to answer technical backend engineering questions with extreme mathematical, algorithmic, and architectural depth.

When answering:
1. Always follow the Problem-First framework (Problem -> Why previous failed -> Core Idea -> Internal Implementation -> Complexity -> Tradeoffs -> Production Reality -> Code -> Common Anti-patterns).
2. For system design questions, walk through single-node bottleneck evolution to horizontal scale.
3. Compare Google vs Uber vs Stripe vs Startups when relevant.
4. Provide production-grade Python/FastAPI/Go/SQL code with typing, error handling, and comments.
5. Keep explanations direct, precise, authoritative, and mentorship-driven. No filler or fluff.

Context: ${context || 'General Backend Engineering Handbook Inquiry'}`;

    const config: any = {
      systemInstruction: systemPrompt,
    };

    if (modelName === 'gemini-3.1-pro-preview') {
      config.thinkingConfig = { thinkingLevel };
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config,
    });

    const answer = response.text || 'No response generated.';

    res.json({
      answer,
      modelUsed: modelName,
    });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({
      error: 'Failed to process AI request',
      details: error?.message || String(error),
    });
  }
});

// Search Grounding endpoint with Google Search data
app.post('/api/ai/search-grounding', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    let ai: GoogleGenAI;
    try {
      ai = getGenAI();
    } catch (error: any) {
      return res.status(503).json({
        error: 'Search grounding is not configured',
        details: error?.message || String(error),
      });
    }
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are an authoritative technical researcher for backend engineering. Provide up-to-date, real-world data, production statistics, or current engineering practices using search grounding.',
        tools: [{ googleSearch: {} }],
      },
    });

    const answer = response.text || '';
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    const sources = groundingChunks
      .map((c: any) => c.web)
      .filter(Boolean)
      .map((w: any) => ({ title: w.title, uri: w.uri }));

    res.json({
      answer,
      sources,
    });
  } catch (error: any) {
    console.error('Error calling Search Grounding API:', error);
    res.status(500).json({
      error: 'Failed to process search grounding request',
      details: error?.message || String(error),
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend Handbook Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

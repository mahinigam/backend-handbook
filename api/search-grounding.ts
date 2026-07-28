import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing API Key in Authorization header' });
  }

  const apiKey = authHeader.split(' ')[1];
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

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

    res.status(200).json({
      answer,
      sources,
    });
  } catch (error: any) {
    console.error('Gemini Search Grounding Error:', error);
    res.status(500).json({
      error: 'Failed to process search grounding request',
      details: error?.message || String(error),
    });
  }
}

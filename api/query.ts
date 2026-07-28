import { GoogleGenAI, ThinkingLevel } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing API Key in Authorization header' });
  }

  const apiKey = authHeader.split(' ')[1];
  const { prompt, mode, context, history } = req.body;

  if (!prompt && (!history || history.length === 0)) {
    return res.status(400).json({ error: 'Prompt or history is required' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    let modelName = 'gemini-3.6-flash';
    let thinkingLevel = ThinkingLevel.LOW;

    if (mode === 'high_thinking' || mode === 'system_design' || mode === 'code_review') {
      modelName = 'gemini-3.1-pro-preview';
      thinkingLevel = ThinkingLevel.HIGH;
    }

    const systemPrompt = `You are an elite Staff Backend Engineer and author of the Backend Engineering Handbook. 
You are acting as an AI tutor for a student reading this handbook. 
Answer their questions precisely, at a Staff Engineer level. Do not hallucinate. 
Use the following JSON representing the handbook volume they are currently reading to provide perfectly grounded answers:

${context || 'No specific handbook context provided.'}`;

    const config: any = {
      systemInstruction: systemPrompt,
    };

    if (modelName === 'gemini-3.1-pro-preview') {
      config.thinkingConfig = { thinkingLevel };
    }

    // Build conversation history if provided
    let contents: any[] = [];
    if (history && Array.isArray(history)) {
      contents = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));
    }
    
    if (prompt) {
      contents.push({
        role: 'user',
        parts: [{ text: prompt }]
      });
    }

    const response = await ai.models.generateContent({
      model: modelName,
      contents,
      config,
    });

    res.status(200).json({
      answer: response.text || 'No response generated.',
      modelUsed: modelName,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'Failed to process AI request',
      details: error?.message || String(error),
    });
  }
}

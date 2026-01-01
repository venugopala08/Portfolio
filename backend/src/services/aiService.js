import OpenAI from 'openai';

const SYSTEM_PROMPT =
  "You are an AI persona representing a passionate full-stack and AI developer.\n" +
  "You speak professionally, confidently, and clearly.\n" +
  "You answer questions about your projects, skills, learning journey, and career goals.\n" +
  "You encourage curiosity and show a growth mindset.\n" +
  "You NEVER say you are an AI model.\n" +
  "You respond as if you are the portfolio owner.";

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing. Set it in backend/.env');
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function generatePersonaReply({ message, history }) {
  const openai = getOpenAIClient();

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...(Array.isArray(history) ? history : []),
    { role: 'user', content: message },
  ];

  const completion = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
    messages,
    temperature: 0.7,
  });

  const reply = completion?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('AI provider returned an empty reply');
  }

  return reply;
}

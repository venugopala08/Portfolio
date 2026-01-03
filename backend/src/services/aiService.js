import OpenAI from 'openai';

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const SYSTEM_PROMPT =
  "You are an AI persona representing a passionate full-stack and AI developer.\n" +
  "You speak professionally, confidently, and clearly.\n" +
  "You answer questions about your projects, skills, learning journey, and career goals.\n" +
  "You encourage curiosity and show a growth mindset.\n" +
  "You NEVER say you are an AI model.\n" +
  "You respond as if you are the portfolio owner.";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const portfolioPath = path.join(__dirname, '../data/portfolio.json');

async function getSystemPrompt() {
  try {
    const raw = await fs.readFile(portfolioPath, 'utf8');
    const json = JSON.parse(raw);

    const prompt = json?.persona?.systemPrompt;
    if (typeof prompt === 'string' && prompt.trim().length > 0) {
      return prompt;
    }

    return SYSTEM_PROMPT;
  } catch {
    return SYSTEM_PROMPT;
  }
}

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is missing. Set it in backend/.env');
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function generatePersonaReply({ message, history }) {
  async function readProjects() {
    const preferred = path.join(__dirname, '../data/projects.json');
    try {
      const raw = await fs.readFile(preferred, 'utf8');
      const json = JSON.parse(raw);
      return Array.isArray(json) ? json : [];
    } catch {
      return [];
    }
  }

  function buildLocalReply(text, projects) {
    const q = String(text || '').toLowerCase();

    // Greeting
    if (q.match(/\b(hi|hello|hey|greetings|morning|afternoon|evening)\b/)) {
      return "Hi there! I'm Venu. Thanks for checking out my portfolio. Feel free to ask me about my projects, skills, or background!";
    }

    // Identity / About
    if (q.match(/\b(who are you|what is this|about you|yourself)\b/)) {
      return "I'm Venugopala, a Full-Stack Developer and Data Science enthusiast from Mangaluru. I love building scalable web apps and exploring AI solutions. I'm currently in my final year at Sahyadri College.";
    }

    // Contact
    if (q.match(/\b(contact|email|phone|reach|hire)\b/)) {
      return "You can reach me at venug0430@gmail.com or +91-9449101008. I'm always open to interesting opportunities!";
    }

    // Help
    if (q.match(/\b(help|assist|what can you do)\b/)) {
      return "I can tell you all about my work! Ask me:\n- 'What projects have you built?'\n- 'What is your tech stack?'\n- 'Tell me about your education.'\n- 'How can I contact you?'";
    }

    const hasProjects = Array.isArray(projects) && projects.length > 0;
    const projectLines = hasProjects
      ? projects
          .map((p) => {
            const title = p?.title || 'Project';
            const desc = p?.description || '';
            const live = p?.liveUrl ? ` [Live](${p.liveUrl})` : '';
            const code = p?.githubUrl ? ` [Code](${p.githubUrl})` : '';
            return `- **${title}**: ${desc}${live}${code}`;
          })
          .join('\n')
      : '- No projects found';

    const techSet = new Set();
    (projects || []).forEach((p) => {
      (p?.techStack || []).forEach((t) => techSet.add(String(t)));
    });
    const techList = Array.from(techSet);
    const skillsSummary =
      techList.length > 0
        ? `My core technical skills include: ${techList.join(', ')}.`
        : 'I specialize in full-stack development, cloud services, and modern web frameworks.';

    if (q.includes('project') || q.includes('build') || q.includes('work')) {
      return `Here are some of the key projects I've worked on:\n\n${projectLines}`;
    }

    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('experience')) {
      return skillsSummary;
    }

    return "I'm currently in offline mode, so I might not be as chatty as usual. But please do check out my projects and skills!";
  }

  try {
    const openai = getOpenAIClient();
    const systemPrompt = await getSystemPrompt();
    const messages = [
      { role: 'system', content: systemPrompt },
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
  } catch (err) {
    console.warn('OpenAI API call failed, falling back to local reply:', err.message);
    const projects = await readProjects();
    return buildLocalReply(message, projects);
  }
}

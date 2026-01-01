import type { Certification, Project } from '../types/index';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }

  return (await res.json()) as T;
}

export async function getProjects(): Promise<Project[]> {
  const json = await request<{ status: string; results: number; data: Project[] }>(
    '/api/projects'
  );
  return json.data;
}

export async function getCertifications(): Promise<Certification[]> {
  const json = await request<{
    status: string;
    results: number;
    data: Certification[];
  }>('/api/certifications');
  return json.data;
}

export type ChatHistoryItem = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export async function postChat(payload: {
  message: string;
  history: ChatHistoryItem[];
}): Promise<{ status: string; reply: string }> {
  return request<{ status: string; reply: string }>('/api/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

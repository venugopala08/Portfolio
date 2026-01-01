'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Message, { ChatMessage } from './Message';
import { postChat, type ChatHistoryItem } from '../../../services/api';

function uid() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

const STORAGE_KEY = 'interactive_portfolio_chat_v1';
const NAME_KEY = 'interactive_portfolio_name_v1';

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>('');

  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved) as ChatMessage[]);
      const savedName = localStorage.getItem(NAME_KEY);
      if (savedName) setUserName(savedName);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  useEffect(() => {
    try {
      if (userName) localStorage.setItem(NAME_KEY, userName);
    } catch {
      // ignore
    }
  }, [userName]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const history: ChatHistoryItem[] = useMemo(() => {
    const base: ChatHistoryItem[] = messages.map((m) => ({ role: m.role, content: m.content }));
    if (userName) {
      return [{ role: 'system', content: `The visitor's name is ${userName}.` }, ...base];
    }
    return base;
  }, [messages, userName]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    const nextUserMsg: ChatMessage = {
      id: uid(),
      role: 'user',
      content: text,
      createdAt: Date.now(),
    };

    const nextMessages = [...messages, nextUserMsg];
    setMessages(nextMessages);

    // name memory (optional feature)
    if (!userName) {
      const match = text.match(/\bmy name is\s+([a-zA-Z][a-zA-Z\s'-]{1,30})/i);
      if (match?.[1]) {
        setUserName(match[1].trim());
      }
    }

    setLoading(true);
    try {
      const res = await postChat({ message: text, history });
      const nextAssistantMsg: ChatMessage = {
        id: uid(),
        role: 'assistant',
        content: res.reply,
        createdAt: Date.now(),
      };
      setMessages((prev) => [...prev, nextAssistantMsg]);
    } catch (e) {
      const errText = e instanceof Error ? e.message : 'Request failed';
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: 'assistant',
          content: `I ran into an issue sending that message. ${errText}`,
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-20 left-4 z-50 w-[92vw] max-w-sm overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900"
    >
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 dark:border-gray-700">
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Chat with me</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Ask about my projects, skills, or journey</div>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          type="button"
        >
          Close
        </button>
      </div>

      <div ref={listRef} className="max-h-[52vh] space-y-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 ? (
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {userName
              ? `Hi ${userName}! What would you like to know?`
              : 'Hi! You can start with “What projects have you built?” or “What are your core skills?”'}
          </div>
        ) : null}
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        {loading ? (
          <div className="text-xs text-gray-500 dark:text-gray-400">Typing...</div>
        ) : null}
      </div>

      <div className="border-t border-gray-200 p-3 dark:border-gray-700">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
            placeholder={userName ? `Message me${userName ? `, ${userName}` : ''}...` : 'Type a message...'}
            className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-accent dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
          />
          <button
            onClick={send}
            disabled={loading || input.trim().length === 0}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
            type="button"
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
}

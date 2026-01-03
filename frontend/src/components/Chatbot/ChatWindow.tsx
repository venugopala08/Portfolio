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
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
      transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 25 }}
      className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-sm overflow-hidden rounded-2xl glass-card shadow-2xl flex flex-col"
    >
      <div className="flex items-center justify-between border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <div>
            <div className="text-sm font-bold text-gray-900 dark:text-gray-100">AI Assistant</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Ask me anything about Venu</div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-gray-500 hover:bg-gray-200/50 dark:text-gray-400 dark:hover:bg-gray-700/50 transition-colors"
          type="button"
          aria-label="Close chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>

      <div ref={listRef} className="h-[400px] space-y-4 overflow-y-auto px-4 py-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-4">
             <div className="bg-accent/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-accent">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12.375m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
             </div>
             <div>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {userName ? `Hi ${userName}!` : 'Hello there!'}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                I'm a virtual assistant. Ask me about my projects, skills, or experience.
              </p>
             </div>
             <div className="grid grid-cols-1 gap-2 w-full">
               {['What projects have you built?', 'What are your core skills?', 'Tell me about yourself'].map((suggestion) => (
                 <button 
                   key={suggestion}
                   onClick={() => {
                     setInput(suggestion);
                     // Optional: auto-send
                   }}
                   className="text-xs text-left px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700"
                 >
                   {suggestion}
                 </button>
               ))}
             </div>
          </div>
        ) : null}
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
        {loading ? (
          <div className="flex justify-start">
             <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-sm px-4 py-3 flex space-x-1 items-center">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
             </div>
          </div>
        ) : null}
      </div>

      <div className="border-t border-gray-200/50 dark:border-gray-700/50 p-3 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') send();
            }}
            placeholder={userName ? `Message...` : 'Type a message...'}
            className="flex-1 rounded-xl border border-gray-200/50 bg-white/80 px-4 py-2.5 text-sm text-gray-900 outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 dark:border-gray-700/50 dark:bg-gray-800/80 dark:text-gray-100 transition-all placeholder:text-gray-400"
          />
          <button
            onClick={send}
            disabled={loading || input.trim().length === 0}
            className="rounded-xl bg-accent px-4 py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors shadow-sm"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

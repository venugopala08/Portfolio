'use client';

import { motion } from 'framer-motion';

export type ChatRole = 'user' | 'assistant' | 'system';

export type ChatMessage = {
  id: string;
  role: Exclude<ChatRole, 'system'>;
  content: string;
  createdAt: number;
};

export default function Message({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={isUser ? 'flex justify-end' : 'flex justify-start'}
    >
      <div
        className={
          isUser
            ? 'max-w-[85%] rounded-2xl rounded-br-sm bg-gradient-to-br from-accent to-blue-600 text-white px-4 py-2.5 text-sm leading-relaxed shadow-md break-words whitespace-pre-wrap'
            : 'max-w-[85%] rounded-2xl rounded-bl-sm bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm leading-relaxed shadow-sm border border-gray-200 dark:border-gray-700 break-words whitespace-pre-wrap'
        }
      >
        {message.content}
      </div>
    </motion.div>
  );
}

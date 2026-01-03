'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import ChatWindow from './ChatWindow';

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>{open ? <ChatWindow onClose={() => setOpen(false)} /> : null}</AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-accent to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <ChatBubbleLeftRightIcon className="h-8 w-8" />
        <span className="absolute -top-2 -right-2 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </span>
      </motion.button>
    </>
  );
}

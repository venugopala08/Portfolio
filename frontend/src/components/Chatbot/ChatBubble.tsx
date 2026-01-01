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
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 left-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-xl"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <ChatBubbleLeftRightIcon className="h-7 w-7" />
      </motion.button>
    </>
  );
}

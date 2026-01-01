'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function VideoIntro() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="video-intro" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-4">
            Why <span className="text-accent">Hire Me?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Get to know me better through this short introduction video where I share my passion for technology, 
            my approach to problem-solving, and what makes me a great fit for your team.
          </p>
          
          <div className="relative">
            <div 
              className="relative cursor-pointer group"
              onClick={() => setIsOpen(true)}
            >
              <div className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <PlayCircleIcon className="h-20 w-20 text-accent group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white font-medium">Watch my introduction</p>
                </div>
              </div>
            </div>
            
            {isOpen && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
                  aria-label="Close video"
                >
                  <XMarkIcon className="h-8 w-8" />
                </button>
                <div className="w-full max-w-4xl aspect-video">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="Introduction Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

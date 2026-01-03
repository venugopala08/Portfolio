'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

export default function VideoIntro() {
  return (
    <section id="video-intro" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      <div className="container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Why <span className="text-gradient">Hire Me?</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Get to know me better through this short introduction video where I share my passion for technology, 
            my approach to problem-solving, and what makes me a great fit for your team.
          </p>
          
          <div className="relative glass-card p-2 rounded-2xl shadow-2xl">
            <a 
              href="https://drive.google.com/file/d/1wvkI--8u1Zt7s483Vwa8d5vThJ2wSWgY/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative cursor-pointer group rounded-xl overflow-hidden"
            >
              <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-accent blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 rounded-full"></div>
                    <PlayCircleIcon className="relative h-24 w-24 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                  </div>
                </div>
                
                {/* Decorative background for placeholder */}
                <div className="absolute inset-0 opacity-60">
                   <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
                   <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <div>
                    <p className="text-white font-bold text-xl mb-1">Introduction Video</p>
                    <p className="text-gray-300 text-sm">Watch to learn more about my journey and skills</p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

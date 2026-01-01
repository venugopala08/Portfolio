'use client';

import { motion } from 'framer-motion';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  return (
    <section className="section-min-height flex items-center justify-center">
      <div className="container-padding text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-accent">Your Name</span>
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-600 dark:text-gray-300">
            Full-Stack & AI Developer
          </h2>
          
          <p className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            I build exceptional digital experiences with modern web technologies and AI.
            Currently focused on creating innovative solutions that make an impact.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-4 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </div>
          
          <motion.div
            className="mt-16"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <a href="#about" className="inline-block">
              <ArrowDownCircleIcon className="h-10 w-10 text-gray-400 hover:text-accent transition-colors" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

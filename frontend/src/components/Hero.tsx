'use client';

import { motion } from 'framer-motion';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section className="section-min-height flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-padding text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            Hi, I’m <span className="text-gradient">Venugopala</span>
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-8 text-gray-700 dark:text-gray-200"
          >
            Full-Stack Developer <span className="text-accent hidden sm:inline">|</span> <span className="block sm:inline mt-2 sm:mt-0">Software & Data Science Enthusiast</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl mb-10 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            I build clean, scalable web applications with a strong focus on
            full-stack development, backend systems, and data-driven solutions.
            I enjoy turning ideas into practical, real-world software.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="px-8 py-4 bg-accent text-white rounded-full font-semibold shadow-lg hover:shadow-accent/30 hover:bg-accent/90 transition-all transform"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            
            <motion.a
              href="#contact"
              className="px-8 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-full font-semibold hover:border-accent hover:text-accent dark:hover:text-accent transition-all bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
          
          <motion.div
            className="mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              delay: 1.5,
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <a href="#about" className="inline-block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <ArrowDownCircleIcon className="h-10 w-10 text-gray-400 hover:text-accent transition-colors" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

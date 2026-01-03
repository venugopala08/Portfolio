'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { getPortfolio } from '../../services/api';

// Simple Icon components for social media since we might not have them in heroicons
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      clipRule="evenodd"
    />
  </svg>
);

export default function Contact() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const data = await getPortfolio();
        if (data && data.data && data.data.profile) {
          setProfile(data.data.profile);
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err);
      }
    };

    fetchPortfolio();
  }, []);

  if (!profile) return null;

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-20 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg max-w-2xl mx-auto leading-relaxed">
            Feel free to reach out for collaborations, opportunities, or just to say hi!
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {profile.email && (
              <motion.a
                href={`mailto:${profile.email}`}
                whileHover={{ y: -5 }}
                className="glass-card flex items-center p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-4 bg-accent/10 rounded-full mr-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <EnvelopeIcon className="h-7 w-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Email</p>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100 break-all">{profile.email}</span>
                </div>
              </motion.a>
            )}

            {profile.phone && (
              <motion.a
                href={`tel:${profile.phone}`}
                whileHover={{ y: -5 }}
                className="glass-card flex items-center p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-4 bg-accent/10 rounded-full mr-5 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                  <PhoneIcon className="h-7 w-7 text-accent group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Phone</p>
                  <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{profile.phone}</span>
                </div>
              </motion.a>
            )}
          </div>

          <div className="flex justify-center space-x-10">
            {profile.links?.github && (
              <motion.a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="text-gray-600 hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors"
              >
                <GitHubIcon className="h-10 w-10" />
                <span className="sr-only">GitHub</span>
              </motion.a>
            )}
            
            {profile.links?.linkedin && (
              <motion.a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="text-gray-600 hover:text-accent dark:text-gray-400 dark:hover:text-accent transition-colors"
              >
                <LinkedInIcon className="h-10 w-10" />
                <span className="sr-only">LinkedIn</span>
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

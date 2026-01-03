'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AcademicCapIcon } from '@heroicons/react/24/outline';

import { getCertifications } from '../../services/api';
import type { Certification } from '../../types';

export default function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const data = await getCertifications();
        setCertifications(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load certifications.');
        setLoading(false);
        console.error('Error fetching certifications:', err);
      }
    };

    fetchCertifications();
  }, []);

  if (loading) return null;
  if (error) return null;

  return (
    <section id="certifications" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            My <span className="text-accent">Certifications</span>
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-all border-l-4 border-accent"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <AcademicCapIcon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {cert.date}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold mb-2 dark:text-white line-clamp-2">
                  {cert.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  Issued by: <span className="font-semibold">{cert.issuer}</span>
                </p>

                {cert.credentialId && (
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-600">
                    {cert.credentialId.startsWith('http') ? (
                      <a 
                        href={cert.credentialId}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-accent hover:underline font-medium inline-flex items-center"
                      >
                        View Credential →
                      </a>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

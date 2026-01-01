'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, ServerIcon, CpuChipIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface SkillCategory {
  name: string;
  icon: ReactNode;
  skills: {
    name: string;
    level: number;
  }[];
}

export default function Skills() {
  const skills: SkillCategory[] = [
    {
      name: 'Frontend',
      icon: <CodeBracketIcon className="h-6 w-6 text-accent" />,
      skills: [
        { name: 'HTML/CSS', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'React', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'Tailwind CSS', level: 85 },
      ],
    },
    {
      name: 'Backend',
      icon: <ServerIcon className="h-6 w-6 text-accent" />,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'Python', level: 80 },
        { name: 'RESTful APIs', level: 85 },
        { name: 'GraphQL', level: 75 },
        { name: 'SQL/NoSQL', level: 80 },
      ],
    },
    {
      name: 'AI/ML',
      icon: <CpuChipIcon className="h-6 w-6 text-accent" />,
      skills: [
        { name: 'Machine Learning', level: 80 },
        { name: 'Deep Learning', level: 75 },
        { name: 'TensorFlow', level: 75 },
        { name: 'PyTorch', level: 70 },
        { name: 'NLP', level: 75 },
        { name: 'Computer Vision', level: 70 },
      ],
    },
    {
      name: 'Tools',
      icon: <WrenchScrewdriverIcon className="h-6 w-6 text-accent" />,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'AWS', level: 75 },
        { name: 'CI/CD', level: 80 },
        { name: 'Jest', level: 75 },
        { name: 'Figma', level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            My <span className="text-accent">Skills</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Here are the technologies and tools I work with. I'm always learning and expanding my skill set.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-accent/10 rounded-lg mr-3">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold dark:text-white">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <motion.div
                          className="h-full bg-accent rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">And more...</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {[
                'Redux', 'MongoDB', 'PostgreSQL', 'Firebase', 'GraphQL', 'Apollo',
                'Docker', 'Kubernetes', 'AWS', 'Azure', 'Jest', 'Cypress', 'GitHub Actions',
                'TensorFlow.js', 'OpenCV', 'Hugging Face', 'Scikit-learn', 'Pandas', 'NumPy'
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-sm rounded-full"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

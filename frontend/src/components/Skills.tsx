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
        { name: 'HTML & CSS', level: 80 },
        { name: 'JavaScript', level: 75 },
        { name: 'TypeScript', level: 70 },
        { name: 'React', level: 75 },
        { name: 'Next.js', level: 70 },
        { name: 'Tailwind CSS', level: 80 },
      ],
    },
    {
      name: 'Backend',
      icon: <ServerIcon className="h-6 w-6 text-accent" />,
      skills: [
        { name: 'Node.js', level: 75 },
        { name: 'Express.js', level: 70 },
        { name: 'Python', level: 75 },
        { name: 'RESTful APIs', level: 80 },
        { name: 'Authentication', level: 65 },
        { name: 'SQL / NoSQL', level: 70 },
      ],
    },
    {
      name: 'Data Science & AI',
      icon: <CpuChipIcon className="h-6 w-6 text-accent" />,
      skills: [
        { name: 'Data Analysis', level: 70 },
        { name: 'ML Basics', level: 65 },
        { name: 'Python (DS)', level: 75 },
        { name: 'NumPy & Pandas', level: 70 },
        { name: 'Model Eval', level: 60 },
        { name: 'AI APIs', level: 70 },
      ],
    },
    {
      name: 'Tools & DevOps',
      icon: <WrenchScrewdriverIcon className="h-6 w-6 text-accent" />,
      skills: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'Postman', level: 80 },
        { name: 'VS Code', level: 85 },
        { name: 'Docker (Basic)', level: 60 },
        { name: 'Linux', level: 65 },
        { name: 'Testing', level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            These are the technologies and tools I actively use while building
            full-stack applications and exploring data science concepts.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-accent/10 rounded-xl mr-4 text-accent">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold dark:text-white">{category.name}</h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-1.5">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                          {skill.name}
                        </span>
                        <span className="text-xs font-medium text-gray-500">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-accent to-blue-400 rounded-full"
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
            <h3 className="text-xl font-semibold mb-6 dark:text-white">Also familiar with</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
              {[
                'MongoDB',
                'PostgreSQL',
                'Redux',
                'Firebase',
                'JWT',
                'REST Security',
                'GitHub Actions',
                'OpenAI API',
                'Hugging Face',
                'Scikit-learn',
                'Matplotlib',
                'Data Visualization'
              ].map((skill, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{ scale: 1.05 }}
                  className="inline-block px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded-full shadow-sm hover:border-accent/50 hover:text-accent hover:bg-accent/5 transition-colors cursor-default"
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

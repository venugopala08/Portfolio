'use client';

import { motion } from 'framer-motion';

export default function About() {
  const skills = [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'Python',
    'Data Science',
    'Machine Learning',
    'REST APIs',
    'Git',
    'Postman',
    'Tailwind CSS',
    'Java',
    'MySQL',
    'MongoDB',
    'AWS'
  ];

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            About <span className="text-accent">Me</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Who I Am</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                I'm a passionate developer with a strong interest in full-stack
                development, software engineering, and data science. I enjoy
                building complete web applications that combine clean user
                interfaces with structured backend logic.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                My journey in technology began with core programming concepts
                and web development fundamentals, and gradually expanded into
                backend development, API design, and data-driven applications.
                I focus on writing readable, maintainable code and understanding
                how real-world systems work end to end.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {skills.map((skill, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">
                      Bachelor’s Degree in Computer Science / Data Science
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400">
                      Sahyadri College of Engineering & Management , Mangaluru, 2022 – 2026 
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Interests</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">
                      Full-Stack & Software Development
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Building scalable web applications with clean architecture
                      and well-designed APIs.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Data Science & Applied Machine Learning
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Exploring how data-driven insights and machine learning
                      concepts can be applied to real-world problems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

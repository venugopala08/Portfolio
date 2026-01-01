'use client';

import { motion } from 'framer-motion';

export default function About() {
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js',
    'Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning',
    'SQL', 'MongoDB', 'Docker', 'AWS', 'Git'
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
                I'm a passionate Full-Stack and AI Developer with a strong foundation in both frontend and backend technologies. 
                I love building intelligent applications that solve real-world problems and provide exceptional user experiences.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                My journey in software development started with a curiosity about how things work, which led me to pursue 
                a career in technology. I'm constantly learning and staying up-to-date with the latest industry trends.
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
                    <h4 className="font-medium">Degree in Computer Science</h4>
                    <p className="text-gray-500 dark:text-gray-400">University Name, Year - Year</p>
                  </div>
                  <div>
                    <h4 className="font-medium">AI & Machine Learning Specialization</h4>
                    <p className="text-gray-500 dark:text-gray-400">Institution, Year</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Experience</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Senior Full-Stack Developer</h4>
                    <p className="text-gray-500 dark:text-gray-400">Company Name, Year - Present</p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                      Led the development of web applications using modern technologies and mentored junior developers.
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

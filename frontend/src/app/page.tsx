import { Metadata } from 'next';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Certifications from '@/components/Certifications';
import VideoIntro from '@/components/VideoIntro';
import Contact from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Home | Interactive Portfolio',
  description: 'Welcome to my interactive portfolio showcasing my work as a Full-Stack and AI Developer.',
};

export default function Home() {
  return (
    <div className="space-y-20 md:space-y-32">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <VideoIntro />
      <Contact />
    </div>
  );
}

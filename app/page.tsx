import Hero from '@/components/Hero';
import WhatIDo from '@/components/WhatIDo';
import Projects from '@/components/Projects';
import PersonalityLayer from '@/components/PersonalityLayer';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <WhatIDo />
      <Projects />
      <PersonalityLayer />
      <Contact />
    </main>
  );
}

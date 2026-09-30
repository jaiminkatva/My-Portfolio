import { useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import useLenis from './hooks/useLenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import WhyMe from './components/WhyMe';
import Projects from './components/Projects';
import EngineeringApproach from './components/EngineeringApproach';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorDot from './components/shared/CursorDot';
import { applySiteContent } from './data/content';
import { portfolioApi } from './lib/api';

export default function App() {
  const [, setContentRevision] = useState(0);
  useLenis();

  useEffect(() => {
    let active = true;
    portfolioApi.getContent()
      .then((content) => {
        if (!active || !content) return;
        applySiteContent(content);
        setContentRevision((revision) => revision + 1);
      })
      .catch(() => {
        // Checked-in copy remains visible when the content API is unavailable.
      });
    return () => { active = false; };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="bg-ink-900 min-h-screen selection:bg-signal/30">
        <a
          href="#main"
          className="sr-only rounded-xl bg-signal px-4 py-3 text-sm font-medium text-ink-900 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200]"
        >
          Skip to content
        </a>
        <CursorDot />
        <Nav />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <EngineeringApproach />
          <WhyMe />
          <TechStack />
          <Services />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

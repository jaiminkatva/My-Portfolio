import useLenis from './hooks/useLenis';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import WhyMe from './components/WhyMe';
import WhatIBuild from './components/WhatIBuild';
import Projects from './components/Projects';
import EngineeringApproach from './components/EngineeringApproach';
import TechStack from './components/TechStack';
import Experience from './components/Experience';
import Leadership from './components/Leadership';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorDot from './components/shared/CursorDot';

export default function App() {
  useLenis();

  return (
    <div className="bg-ink-900 min-h-screen selection:bg-signal/30">
      <CursorDot />
      <Nav />
      <main>
        <Hero />
        <About />
        <WhyMe />
        <WhatIBuild />
        <Projects />
        <EngineeringApproach />
        <TechStack />
        <Experience />
        <Leadership />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

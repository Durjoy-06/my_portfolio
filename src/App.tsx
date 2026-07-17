import { useCallback, useEffect, useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { useActiveSection } from './hooks/useActiveSection';
import { useIsTouch } from './hooks/useIsTouch';
import { nav } from './data';

const sectionIds = nav.map((n) => n.id);

export default function App() {
  const isTouch = useIsTouch();
  const [reduceMotion, setReduceMotion] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }, [reduceMotion]);

  return (
    <>
      {!isTouch && <CustomCursor />}
      <Nav activeId={activeId} onNavigate={handleNavigate} />
      <main>
        <Hero onNavigate={handleNavigate} reduceMotion={reduceMotion} />
        <About reduceMotion={reduceMotion} />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
    </>
  );
}

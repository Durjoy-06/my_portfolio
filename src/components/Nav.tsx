import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { nav, profile } from '../data';

interface NavProps {
  activeId: string;
  onNavigate: (id: string) => void;
}

export default function Nav({ activeId, onNavigate }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] border-b transition-colors duration-300 ${
          scrolled ? 'bg-bone/95 backdrop-blur-sm border-ink/15' : 'bg-transparent border-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10 py-4">
          <button
            onClick={() => handleNav('hero')}
            className="font-display text-sm font-bold uppercase tracking-tightest text-ink"
            data-cursor="hover"
          >
            {profile.firstName}
            <span className="text-blaze">.</span>
          </button>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {nav.slice(1).map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  data-cursor="hover"
                  className="group flex items-baseline gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  <span
                    className={`tabular-nums transition-colors ${
                      activeId === item.id ? 'text-blaze' : 'text-ink/40'
                    }`}
                  >
                    {item.number}
                  </span>
                  <span
                    className={`relative transition-colors ${
                      activeId === item.id ? 'text-ink' : 'text-ink/60 group-hover:text-ink'
                    }`}
                  >
                    {item.label}
                    {activeId === item.id && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 h-px w-full bg-blaze"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${profile.email}`}
            data-cursor="hover"
            className="hidden md:inline-block font-mono text-xs uppercase tracking-wider text-ink border border-ink px-3 py-1.5 transition-colors hover:bg-ink hover:text-bone"
          >
            Get in touch
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden text-ink"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-ink md:hidden flex flex-col justify-center px-6"
          >
            <ul className="space-y-2">
              {nav.slice(1).map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="flex items-baseline gap-4 font-display text-4xl font-bold uppercase tracking-tight text-bone"
                  >
                    <span className="font-mono text-sm text-blaze">{item.number}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${profile.email}`}
              className="mt-10 inline-block font-mono text-sm uppercase tracking-wider text-bone border border-bone/30 px-4 py-2 self-start"
            >
              {profile.email}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

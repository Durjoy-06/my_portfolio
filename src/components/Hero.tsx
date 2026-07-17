import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../data';

function useTypewriter(strings: string[], opts?: { speed?: number; pause?: number; enabled?: boolean }) {
  const { speed = 55, pause = 1800, enabled = true } = opts ?? {};
  const [text, setText] = useState('');
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!enabled || strings.length === 0) {
      setText(strings[0] ?? '');
      setDeleting(false);
      setIdx(0);
      return;
    }

    const current = strings[idx % strings.length];

    if (!deleting && text === current) {
      const timeoutId = window.setTimeout(() => setDeleting(true), pause);
      return () => window.clearTimeout(timeoutId);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIdx((prev) => prev + 1);
      return;
    }

    const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
    const timeoutId = window.setTimeout(() => setText(next), deleting ? speed / 2 : speed);
    return () => window.clearTimeout(timeoutId);
  }, [text, deleting, idx, strings, speed, pause, enabled]);

  return { text, idx };
}

interface HeroProps {
  onNavigate: (id: string) => void;
  reduceMotion: boolean;
}

export default function Hero({ onNavigate, reduceMotion }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  // Parallax layers — disabled via reduceMotion (transforms resolve to 0).
  const yBack = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 200]);
  const yMid = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Now building — rotating typewriter.
  const { text: typed, idx: nowIdx } = useTypewriter(profile.currently, {
    enabled: true,
    speed: 70,
    pause: 1400,
  });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen bg-ink text-bone overflow-hidden flex flex-col"
    >
      {/* Parallax grid background */}
      <motion.div
        style={{ y: yBack }}
        className="absolute inset-0 grid-lines-dark opacity-60"
        aria-hidden
      />

      {/* Oversized background word — moves slowest */}
      <motion.span
        style={{ y: yBack }}
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-0 right-0 font-display font-bold uppercase tracking-tightest text-blaze/10 text-[28vw] leading-none whitespace-nowrap select-none"
      >
        {profile.firstName}
      </motion.span>

      {/* Content */}
      <motion.div
        style={{ opacity, y: yMid }}
        className="relative z-10 flex flex-1 flex-col justify-center px-5 md:px-10 pt-24"
      >
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-wider text-bone/50 mb-5"
        >
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 bg-blaze animate-pulse" />
            {profile.availability}
          </span>
          <span>{profile.location}</span>
        </motion.div>

        {/* Now building — rotating typewriter strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 font-mono text-sm text-bone/75 w-fit mb-3"
        >
          <span className="text-blaze uppercase tracking-wider text-[10px]">Now Building</span>
          <span className="h-3 w-px bg-bone/20" />
          <AnimatePresence mode="wait">
            <motion.span
              key={nowIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="text-bone/90 tracking-wide"
            >
              {typed}
              <span className="inline-block w-[2px] h-4 bg-blaze ml-1 align-middle animate-pulse" />
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold uppercase tracking-tightest text-hero"
        >
          {profile.name}
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-2 max-w-2xl font-mono text-sm md:text-base text-bone/70 leading-relaxed"
        >
          {profile.role}
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-xl font-body text-lg md:text-xl text-bone/90 leading-snug"
        >
          {profile.tagline}
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => onNavigate('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        data-cursor="hover"
        className="relative z-10 flex items-center gap-3 px-5 md:px-10 pb-8 font-mono text-xs uppercase tracking-wider text-bone/50 hover:text-bone transition-colors"
      >
        <motion.span
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} />
        </motion.span>
        Scroll
      </motion.button>
    </section>
  );
}

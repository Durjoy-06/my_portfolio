import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SectionProps {
  id: string;
  number: string;
  label: string;
  children: ReactNode;
  dark?: boolean;
  className?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Section({ id, number, label, children, dark = false, className = '' }: SectionProps) {
  const bg = dark ? 'bg-ink text-bone' : 'bg-bone text-ink';
  const border = dark ? 'border-bone/15' : 'border-ink/15';

  return (
    <section id={id} className={`relative ${bg} border-t ${border} ${className}`}>
      {/* Section header strip */}
      <div className={`flex items-center justify-between border-b ${border} px-5 md:px-10 py-3`}>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-baseline gap-3"
        >
          <span className="font-mono text-xs font-bold text-blaze tabular-nums">{number}</span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">{label}</span>
        </motion.div>
        <span className="font-mono text-[10px] uppercase tracking-wider opacity-40 hidden sm:block">
          {label}
        </span>
      </div>
      {children}
    </section>
  );
}

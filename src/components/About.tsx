import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Section from './Section';
import { about, skills, profile } from '../data';

function useCountUp(target: number, opts?: { decimals?: number; duration?: number; enabled?: boolean }) {
  const { decimals = 0, duration = 1600, enabled = true } = opts ?? {};
  const [value, setValue] = useState(enabled ? 0 : target);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);

      if (t < 1) {
        raf = window.requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    };

    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [target, duration, enabled]);

  return Number(value).toFixed(decimals);
}

function StatTile({ stat, animate }: { stat: { value: string; label: string }; animate: boolean }) {
  // Parse leading numeric portion (e.g. "3.84", "10+", "40k+")
  const match = stat.value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';
  const decimals = match && match[1].includes('.') ? match[1].split('.')[1].length : 0;
  const ref = useRef<HTMLDivElement>(null);

  const display = useCountUp(numeric, { decimals, enabled: animate });

  return (
    <div ref={ref} className="bg-bone p-4">
      <div className="font-display text-3xl font-bold tracking-tight text-ink tabular-nums">
        {match ? `${display}${suffix}` : stat.value}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/50">
        {stat.label}
      </div>
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function About({ reduceMotion }: { reduceMotion?: boolean }) {
  return (
    <Section id="about" number="01" label="About">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Portrait — asymmetric, spans 4 cols */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-4"
          >
            <motion.div variants={item} className="relative">
              <div className="group aspect-[4/5] w-full overflow-hidden border border-ink cursor-pointer">
                <img
                  src={profile.portrait}
                  alt="Portrait of Durjoy Banik"
                  loading="lazy"
                  className="h-full w-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </div>
              {/* Stats overlay */}
              <div className="mt-6 grid grid-cols-2 gap-px bg-ink/15 border border-ink/15">
                {about.stats.map((stat) => (
                  <StatTile key={stat.label} stat={stat} animate={!reduceMotion} />
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Bio + Skills — spans 8 cols */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* Bio */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="space-y-5"
            >
              {about.bio.map((para, i) => (
                <motion.p
                  key={i}
                  variants={item}
                  className={`font-body leading-relaxed ${
                    i === 0
                      ? 'text-2xl md:text-3xl font-medium leading-snug text-ink'
                      : 'text-base md:text-lg text-ink/70'
                  }`}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>

            {/* Skills grid */}
            <div>
              <motion.h3
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-ink/40 border-b border-ink/15 pb-3"
              >
                / Skills & Stack
              </motion.h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink/15 border border-ink/15"
              >
                {skills.map((skillGroup) => (
                  <motion.div key={skillGroup.group} variants={item} className="bg-bone p-5">
                    <div className="mb-3 font-mono text-[10px] uppercase tracking-wider text-blaze">
                      {skillGroup.group}
                    </div>
                    <ul className="flex flex-wrap gap-x-3 gap-y-1.5">
                      {skillGroup.items.map((skill) => (
                        <li
                          key={skill}
                          className="font-mono text-sm text-ink"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

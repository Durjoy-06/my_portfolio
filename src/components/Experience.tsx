import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Section from './Section';
import { recognition } from '../data';

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Experience() {
  return (
    <Section id="experience" number="03" label="Recognition">
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left rail — sticky heading */}
          <div className="lg:col-span-3">
            <motion.h2
              variants={item}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:sticky lg:top-24 font-display text-section font-bold uppercase tracking-tightest text-ink"
            >
              Recognition
              <br />
              <span className="text-ink/30">Timeline</span>
            </motion.h2>
          </div>

          {/* Entries */}
          <div className="lg:col-span-9">
            {recognition.map((exp, i) => (
              <motion.article
                key={`${exp.company}-${exp.period}`}
                variants={item}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="group grid grid-cols-12 gap-4 border-t border-ink/15 py-8 first:border-t-0 first:pt-0"
              >
                {/* Index */}
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-xs font-bold text-blaze tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Period */}
                <div className="col-span-10 md:col-span-3">
                  <div className="font-mono text-xs uppercase tracking-wider text-ink/50">
                    {exp.period}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-ink/40">
                    {exp.location}
                  </div>
                </div>

                {/* Content */}
                <div className="col-span-12 md:col-span-8">
                  <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-ink">
                    {exp.role}
                  </h3>
                  <div className="mt-1 font-mono text-sm text-blaze">{exp.company}</div>
                  <p className="mt-3 font-body text-sm md:text-base text-ink/70 leading-relaxed">
                    {exp.summary}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {exp.achievements.map((a) => (
                      <li
                        key={a}
                        className="flex gap-2 font-mono text-xs text-ink/60 leading-relaxed"
                      >
                        <span className="text-blaze mt-px">—</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                  {exp.credentialUrl && (
                    <a
                      href={exp.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-blaze hover:text-ink transition-colors"
                    >
                      View Credential <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

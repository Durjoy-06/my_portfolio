import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Section from './Section';
import { education, certifications } from '../data';

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Education() {
  return (
    <Section id="education" number="04" label="Education & Certifications" dark>
      <div className="px-5 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Education */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-7"
          >
            <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-bone/40 border-b border-bone/15 pb-3">
              / Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <motion.article
                  key={edu.title}
                  variants={item}
                  className="grid grid-cols-12 gap-4 border-b border-bone/10 pb-6 last:border-0"
                >
                  <div className="col-span-12 sm:col-span-4">
                    <div className="font-mono text-xs uppercase tracking-wider text-blaze">
                      {edu.period}
                    </div>
                  </div>
                  <div className="col-span-12 sm:col-span-8">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-bone">
                      {edu.title}
                    </h3>
                    <div className="mt-0.5 font-mono text-sm text-bone/60">{edu.institution}</div>
                    <p className="mt-2 font-body text-sm text-bone/70 leading-relaxed">
                      {edu.detail}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5"
          >
            <h2 className="mb-8 font-mono text-xs uppercase tracking-[0.2em] text-bone/40 border-b border-bone/15 pb-3">
              / Certifications
            </h2>
            <ul className="space-y-px bg-bone/10 border border-bone/10">
              {certifications.map((cert) => (
                <motion.li
                  key={cert.title}
                  variants={item}
                  className="bg-ink p-4 group hover:bg-blaze transition-colors duration-300"
                >
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4"
                  >
                    <div>
                      <div className="font-mono text-sm font-medium text-bone flex items-center gap-1.5">
                        {cert.title}
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="mt-0.5 font-mono text-xs text-bone/50 group-hover:text-bone/80">
                        {cert.issuer}
                      </div>
                    </div>
                    <span className="font-mono text-xs text-bone/40 tabular-nums group-hover:text-bone shrink-0">
                      {cert.year}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

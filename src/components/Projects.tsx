import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import Section from './Section';
import { projects } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => p !== featured);

  return (
    <Section id="work" number="02" label="Projects" dark>
      <div className="px-5 md:px-10 py-16 md:py-24">
        {/* Featured project — full-bleed hero treatment */}
        {featured && (
          <motion.a
            href={featured.links.live ?? featured.links.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="group block mb-20 md:mb-28"
          >
            <div className="relative aspect-[16/10] md:aspect-[16/8] w-full overflow-hidden border border-bone/20">
              <img
                src={featured.image}
                alt={featured.title}
                loading="lazy"
                className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-ink/40 mix-blend-multiply" />
              <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-wider text-bone bg-blaze px-2 py-1">
                Featured
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tightest text-bone">
                      {featured.title}
                    </h3>
                    <p className="mt-1 font-mono text-sm text-bone/70">{featured.subtitle}</p>
                  </div>
                  <span className="font-mono text-xs text-bone/50 tabular-nums hidden sm:block">
                    {featured.year}
                  </span>
                </div>
                <p className="mt-4 max-w-2xl font-body text-sm md:text-base text-bone/80 leading-relaxed">
                  {featured.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {featured.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider text-bone border border-bone/30 px-2 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* Rest of projects — asymmetric grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-bone/10 border border-bone/10"
        >
          {rest.map((project, i) => (
            <motion.a
              key={project.title}
              href={project.links.live ?? project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="view"
              variants={fadeUp}
              className={`group relative bg-ink p-5 md:p-8 flex flex-col ${
                i % 3 === 0 ? 'md:row-span-1' : ''
              }`}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden border border-bone/15 mb-5">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-ink/30 mix-blend-multiply group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Meta */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-bone">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-xs text-bone/50">{project.subtitle}</p>
                </div>
                <span className="font-mono text-[10px] text-bone/40 tabular-nums pt-1">
                  {project.year}
                </span>
              </div>

              {/* Reveal on hover / always visible on mobile */}
              <div className="mt-4 overflow-hidden">
                <p className="font-body text-sm text-bone/70 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] uppercase tracking-wider text-bone/60 border border-bone/20 px-1.5 py-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="mt-5 flex items-center gap-4 pt-4 border-t border-bone/10">
                {project.links.live && (
                  <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-bone group-hover:text-blaze transition-colors">
                    Live <ArrowUpRight size={12} />
                  </span>
                )}
                {project.links.github && (
                  <span className="flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-bone/60 group-hover:text-blaze transition-colors">
                    <Github size={12} /> Code
                  </span>
                )}
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}

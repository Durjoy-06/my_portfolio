import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Section from './Section';
import { profile, socials } from '../data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus('sending');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio contact from ${form.name}`,
          _captcha: 'false',
        }),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setForm({ name: '', email: '', message: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Section id="contact" number="05" label="Contact">
      <div className="px-5 md:px-10 py-16 md:py-24">
        {/* Giant CTA headline */}
        <motion.a
          href={`mailto:${profile.email}`}
          data-cursor="hover"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group block"
        >
          <h2 className="font-display font-bold uppercase tracking-tightest text-ink leading-[0.85] text-[clamp(3rem,11vw,9rem)]">
            Let's
            <br />
            build
            <br />
            <span className="text-blaze inline-flex items-baseline">
              something
              <ArrowUpRight
                size="0.5em"
                className="ml-2 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2"
              />
            </span>
          </h2>
        </motion.a>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 space-y-px bg-ink/15 border border-ink/15"
          >
            <div className="bg-bone p-5">
              <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-2">
                01 / Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent font-body text-lg text-ink outline-none placeholder:text-ink/30"
                placeholder="Your name"
              />
            </div>
            <div className="bg-bone p-5">
              <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-2">
                02 / Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent font-body text-lg text-ink outline-none placeholder:text-ink/30"
                placeholder="you@email.com"
              />
            </div>
            <div className="bg-bone p-5">
              <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-wider text-ink/50 mb-2">
                03 / Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent font-body text-lg text-ink outline-none placeholder:text-ink/30 resize-none"
                placeholder="What are you building?"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              data-cursor="hover"
              className="w-full bg-ink text-bone font-mono text-sm uppercase tracking-wider py-5 transition-colors hover:bg-blaze disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message sent' : 'Send message'}
            </button>
            {status === 'error' && (
              <p className="px-5 pb-5 font-mono text-sm text-red-700">
                Something went wrong. Please email me directly at {profile.email}.
              </p>
            )}
            {status === 'sent' && (
              <p className="px-5 pb-5 font-mono text-sm text-ink/70">
                Thanks! Your message has been sent successfully.
              </p>
            )}
          </motion.form>

          {/* Socials + direct email */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink/40 mb-3">
                / Direct
              </div>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="font-display text-xl md:text-2xl font-bold uppercase tracking-tight text-ink hover:text-blaze transition-colors break-all"
              >
                {profile.email}
              </a>
            </div>

            <div className="mt-12">
              <div className="font-mono text-[10px] uppercase tracking-wider text-ink/40 mb-3">
                / Elsewhere
              </div>
              <ul className="space-y-px bg-ink/15 border border-ink/15">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="hover"
                      className="group flex items-center justify-between bg-bone p-4 hover:bg-ink hover:text-bone transition-colors"
                    >
                      <span className="font-mono text-sm font-medium">{social.label}</span>
                      <span className="flex items-center gap-2 font-mono text-xs opacity-50 group-hover:opacity-100 group-hover:text-blaze transition-colors">
                        {social.handle}
                        <ArrowUpRight size={12} />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-6 border-t border-ink/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-ink/40">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Built with React, Vite, Framer Motion. Brutalist by design.</span>
        </footer>
      </div>
    </Section>
  );
}

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";
import { Plus, Minus, Sparkles } from "lucide-react";

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "₹499", label: "Per 1-month foundation track" },
  { value: "2", label: "Free live demo classes before you pay" },
  { value: "5th", label: "New clan launches every month" },
  { value: "0", label: "Spam calls, ever" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section aria-label="StudySenpai at a glance" className="relative px-4 py-16">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            className="glass glow-hover rounded-3xl p-6 text-center"
          >
            <p className="font-display text-3xl font-black neon-text sm:text-4xl">{s.value}</p>
            <p className="mt-2 text-xs font-semibold tracking-wide text-muted-foreground sm:text-sm">
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

const skills = [
  "HTML5",
  "CSS3",
  "JavaScript ES6+",
  "React.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Firebase",
  "Solidity",
  "Hardhat",
  "OpenZeppelin",
  "RAG Pipelines",
  "LLM Agents",
  "REST APIs",
  "Git & GitHub",
];

export function SkillMarquee() {
  return (
    <section aria-label="Technologies you will learn" className="relative overflow-hidden py-8">
      <div className="marquee-track flex gap-3">
        {[...skills, ...skills].map((s, i) => (
          <span
            key={`${s}-${i}`}
            className="glass rounded-full px-5 py-2 text-xs font-bold tracking-widest whitespace-nowrap text-foreground uppercase"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}

const steps = [
  {
    t: "1. Reserve your seat",
    d: "Fill the admission form. A senpai replies on WhatsApp or Telegram — never a sales call.",
  },
  {
    t: "2. Attend 2 free live classes",
    d: "Sit inside a real clan session, build along, ask questions. Pay nothing at this stage.",
  },
  {
    t: "3. Pay only if it clicks",
    d: "Love it? Pay ₹499 for the month and continue. Not for you? Walk away, no pressure.",
  },
  {
    t: "4. Ship & get verified",
    d: "Build real projects, get senpai code reviews, and earn a blockchain-verified certificate.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-28 px-4 py-24">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-accent uppercase">
            How Enrollment Works
          </span>
          <h2 className="font-display mt-5 text-3xl font-black tracking-tight sm:text-5xl">
            Four steps to join a <span className="neon-text">live coding clan</span>
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Transparent, risk-free onboarding designed for students, working professionals and
            career-switchers in India.
          </p>
        </div>
      </Reveal>
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <motion.article
            key={s.t}
            initial={{ opacity: 0, y: 50, rotate: -1.5 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            whileHover={{ y: -8 }}
            className="glass h-full rounded-3xl p-6"
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl neon-surface pulse-glow">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </span>
            <h3 className="font-display mt-5 text-lg font-black">{s.t}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export const faqs = [
  {
    q: "Do I need coding experience to join StudySenpai?",
    a: "No. Phase 1 (Web Fundamentals) starts from absolute zero — HTML5, modern CSS, JavaScript ES6+ and the DOM. The advanced Web3 and Gen AI tracks expect solid JavaScript fundamentals first.",
  },
  {
    q: "What are the class timings and days?",
    a: "Classes are held live Monday to Friday between 8:00 PM and 10:00 PM IST. These evening slots are designed specifically for college students and working professionals, and session timings are scheduled flexibly based on student availability.",
  },
  {
    q: "How much do the courses cost?",
    a: "Each one-month foundation track costs ₹499. There is no upfront payment: you attend 2 live demo classes for free and pay only if you decide to continue.",
  },
  {
    q: "What placement and career support is provided?",
    a: "In the final class of every track, we hold an intensive Placement & Career Sprint: ATS-cracking resume building, portfolio project reviews, tech interview preparation, and effective outreach strategies.",
  },
  {
    q: "Do you offer a Job or Placement Guarantee?",
    a: "No. We do NOT provide placement guarantees. We believe fake placement promises are misleading. Instead, we equip you with real engineering skills, verified projects, ATS-optimized resumes, and interview preparation — your job outcome is earned through your own consistency and preparation.",
  },
  {
    q: "Is the community and study material free to join?",
    a: "Yes, 100% free! You can join our official Telegram Squad and WhatsApp Broadcast Channel for free study materials, roadmaps, cheatsheets, and open-source project support.",
  },
  {
    q: "When does the next clan start?",
    a: "A new clan launches on the 5th of every month. The 1st to the 5th is the Clan Formation & Transition window, so reserving your seat early secures a spot in a limited batch.",
  },
  {
    q: "Are classes live or pre-recorded?",
    a: "Every session is live and hands-on with a working engineer. Batch sizes are capped so each student gets direct code reviews instead of a recorded playlist.",
  },
  {
    q: "Will I get a certificate?",
    a: "Yes. Graduates receive a tamper-proof, blockchain-anchored certificate that anyone can verify instantly with a QR scan.",
  },
  {
    q: "Will I get spam calls after applying?",
    a: "Never. All communication happens on WhatsApp and Telegram only, and you can opt out with one click.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative scroll-mt-28 px-4 py-24">
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] text-accent uppercase">
            Frequently Asked Questions
          </span>
          <h2 className="font-display mt-5 text-3xl font-black tracking-tight sm:text-5xl">
            Everything about <span className="neon-text">joining a clan</span>
          </h2>
        </div>
      </Reveal>
      <div className="mx-auto mt-12 max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="glass overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className="font-display flex-1 text-sm font-black sm:text-base">{f.q}</span>
                {open === i ? (
                  <Minus className="h-5 w-5 shrink-0 text-accent" />
                ) : (
                  <Plus className="h-5 w-5 shrink-0 text-accent" />
                )}
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </motion.div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ShieldOff,
  Wallet,
  Users,
  Blocks,
  Bot,
  Send,
  MessageCircle,
  QrCode,
  Check,
  Clock,
  Briefcase,
  AlertCircle,
} from "lucide-react";
import { scrollTo } from "./Navbar";
import senpai1 from "@/assets/senpai-1.jpg";
import senpai2 from "@/assets/senpai-2.jpg";
import senpai3 from "@/assets/senpai-3.jpg";

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

function Heading({ kicker, title, sub }: { kicker: string; title: ReactNode; sub?: string }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-[11px] font-bold tracking-[0.25em] uppercase text-accent">
          {kicker}
        </span>
        <h2 className="font-display mt-5 text-3xl font-black tracking-tight sm:text-5xl">{title}</h2>
        {sub && <p className="mt-4 text-sm text-muted-foreground sm:text-base">{sub}</p>}
      </div>
    </Reveal>
  );
}

export function Manifesto() {
  const items = [
    {
      icon: ShieldOff,
      title: "Zero Spam Guarantee",
      body: "No annoying cold calls. All communication stays strictly on WhatsApp & Telegram.",
    },
    {
      icon: Wallet,
      title: "Zero Upfront Trap",
      body: "Experience 2 live classes completely free before paying a single rupee.",
    },
    {
      icon: Users,
      title: "Small Clan Capacity",
      body: "Capped batch sizes for direct code reviews with active builders, not corporate sales agents.",
    },
  ];
  return (
    <section id="philosophy" className="relative scroll-mt-28 px-4 py-24">
      <Heading
        kicker="Anti-EdTech Manifesto"
        title={
          <>
            We broke the <span className="neon-text">EdTech playbook</span>
          </>
        }
        sub="Built by working engineers who got tired of watching students get farmed by sales funnels."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.1}>
            <article className="glass glow-hover h-full rounded-3xl p-7">
              <span className="grid h-12 w-12 place-items-center rounded-2xl neon-surface shadow-[var(--shadow-neon)]">
                <it.icon className="h-6 w-6 text-primary-foreground" />
              </span>
              <h3 className="font-display mt-5 text-xl font-black tracking-wide">{it.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const phases = [
  {
    n: "Phase 1",
    title: "Web Fundamentals",
    meta: "1 Month • ₹499",
    scope: "HTML5, Modern CSS, JavaScript ES6+, DOM Manipulation.",
    pre: "Zero coding experience needed.",
  },
  {
    n: "Phase 2",
    title: "Modern Frontend & BaaS",
    meta: "1 Month • ₹499",
    scope: "React.js, State Management, Firebase Auth & Firestore.",
    pre: "Must know HTML, CSS, JS & DOM.",
  },
  {
    n: "Phase 3",
    title: "Backend & Database Mastery",
    meta: "1 Month • ₹499",
    scope: "Node.js, Express.js, MongoDB, REST APIs, Auth.",
    pre: "HTML, CSS, JS & DOM /React Js",
  },
];

export function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);
  const drift = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="roadmap" ref={ref} className="relative scroll-mt-28 overflow-hidden px-4 py-24">
      <motion.div style={{ y: drift }} className="grid-overlay pointer-events-none absolute inset-0 opacity-30" />
      <Heading
        kicker="Chakra Level Progression"
        title={
          <>
            The <span className="neon-text">Foundation Roadmap</span>
          </>
        }
        sub="Three one-month tracks, ₹499 each. Take one, take all three — the path is yours."
      />

      <div className="relative mx-auto mt-16 max-w-4xl">
        <div className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2">
          <motion.div
            style={{ scaleY: lineScale }}
            className="h-full w-px origin-top neon-surface"
          />
        </div>

        <div className="space-y-10">
          {phases.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className={`relative pl-12 md:w-1/2 md:pl-0 ${
                i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              }`}
            >
              <span className="absolute left-[9px] top-8 h-3.5 w-3.5 rounded-full neon-surface shadow-[var(--shadow-neon)] md:left-auto md:right-[-7px] md:top-9" />
              <article
                onClick={() => scrollTo("join")}
                className="glass glow-hover group flex cursor-pointer flex-col justify-between rounded-3xl p-6 transition-all"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-display rounded-lg bg-primary/20 px-3 py-1 text-xs font-black tracking-widest text-primary-foreground">
                      {p.n}
                    </span>
                    <span className="text-xs font-bold tracking-widest text-accent uppercase">{p.meta}</span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-black transition-colors group-hover:text-primary-foreground sm:text-2xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Scope: </span>
                    {p.scope}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Prerequisites: </span>
                    {p.pre}
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4 text-xs font-bold text-accent group-hover:text-primary-foreground transition-colors">
                  <span>Enroll in {p.n}</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </article>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Timings, Placement Support & Disclaimer Strip - Outside timeline line */}
      <div className="mx-auto mt-14 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Reveal delay={0.05}>
          <article className="glass glow-hover flex h-full flex-col justify-between rounded-3xl p-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl neon-surface">
                  <Clock className="h-5 w-5 text-primary-foreground" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                    Live Class Schedule
                  </span>
                  <h4 className="font-display text-sm font-black">Mon to Fri • 8 PM – 10 PM</h4>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Live interactive classes held strictly on weekdays between 8:00 PM and 10:00 PM IST, scheduled flexibly based on student and working professional availability.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.1}>
          <article className="glass glow-hover flex h-full flex-col justify-between rounded-3xl p-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl neon-surface">
                  <Briefcase className="h-5 w-5 text-primary-foreground" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-black tracking-widest text-accent uppercase">
                    Final Class Milestone
                  </span>
                  <h4 className="font-display text-sm font-black">Placement Support & ATS</h4>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                The final class of every track is a dedicated Placement Sprint: ATS-cracking resume building, portfolio project polishing, and tech interview preparation.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.15}>
          <article className="glass glow-hover flex h-full flex-col justify-between rounded-3xl p-6 sm:col-span-2 lg:col-span-1 border border-border/80">
            <div>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-secondary/80 text-muted-foreground">
                  <AlertCircle className="h-5 w-5 text-accent" />
                </span>
                <div className="min-w-0">
                  <span className="text-[10px] font-black tracking-widest text-muted-foreground uppercase">
                    Honest Disclaimer
                  </span>
                  <h4 className="font-display text-sm font-black">No Placement Guarantee</h4>
                </div>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                <strong className="text-foreground">Disclaimer:</strong> We do NOT offer placement guarantees. We provide real engineering skills, ATS resume building & interview prep — placement depends on your dedication.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

const advanced = [
  {
    icon: Blocks,
    label: "Track A",
    title: "Web3 & Blockchain Engineering",
    scope:
      "Solidity, Smart Contracts, Hardhat, Contract Deployment, Testnets, ERC Token Creation, OpenZeppelin.",
    tag: "Tamper-proof smart contract systems",
    pre: "Solid JavaScript fundamentals + basic backend awareness.",
  },
  {
    icon: Bot,
    label: "Track B",
    title: "Generative AI & Autonomous Systems",
    scope:
      "RAG Frameworks, LLM Application Building, Local LLMs, Cloud LLM Integration, Agentic tools (OpenClaw).",
    tag: "From raw prompts to autonomous AI agents",
    pre: "Comfort with JS/Python basics and REST APIs.",
  },
];

export function Tracks() {
  return (
    <section id="courses" className="relative scroll-mt-28 px-4 py-24">
      <Heading
        kicker="Clan Courses"
        title={
          <>
            Advanced <span className="neon-text">Specialized Tracks</span>
          </>
        }
        sub="For builders ready to leave tutorial land and ship systems people actually trust."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-2">
        {advanced.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.1}>
            <article className="glass glow-hover flex h-full flex-col rounded-3xl p-7">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                <div className="min-w-0">
                  <span className="text-xs font-black tracking-[0.25em] text-accent uppercase">
                    {t.label}
                  </span>
                  <h3 className="font-display mt-2 text-2xl font-black">{t.title}</h3>
                </div>
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl neon-surface">
                  <t.icon className="h-6 w-6 text-primary-foreground" />
                </span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{t.scope}</p>
              <p className="mt-4 rounded-xl border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-bold tracking-wide text-accent">
                {t.tag}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-bold text-foreground">Prerequisites: </span>
                {t.pre}
              </p>
              <div className="mt-auto pt-6">
                <p className="font-display text-sm font-black tracking-wide">₹0 Upfront • Pay after 2 Demos</p>
                <button
                  onClick={() => scrollTo("join")}
                  className="mt-4 w-full rounded-xl neon-surface px-5 py-3 text-sm font-black tracking-wide text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.02]"
                >
                  Enroll in {t.label}
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const cohorts = [
  { title: "6-Month Full Stack MERN Clan", note: "Ship production-grade products end to end." },
  { title: "6-Month Gen AI Full Stack Clan", note: "Agents, RAG pipelines and AI-native products." },
  { title: "6-Month Web3 Full Stack Clan", note: "Contracts, dApps and on-chain infrastructure." },
];

export function Cohorts() {
  return (
    <section id="cohorts" className="relative scroll-mt-28 px-4 py-24">
      <Heading
        kicker="Coming Soon"
        title={
          <>
            Flagship <span className="neon-text">6-Month Cohorts</span>
          </>
        }
        sub="Deep, long-form clans for students who want to graduate as engineers, not certificate collectors."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {cohorts.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <article className="glass glow-hover relative h-full overflow-hidden rounded-3xl p-7">
              <span className="absolute right-4 top-4 rounded-full bg-destructive/20 px-3 py-1 text-[10px] font-black tracking-[0.2em] text-destructive uppercase">
                Coming Soon
              </span>
              <h3 className="font-display mt-8 text-xl font-black">{c.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{c.note}</p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                {["Live clan sessions", "Real client-grade projects", "Direct senpai code reviews"].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-accent" /> {f}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="glass mx-auto mt-8 grid max-w-6xl grid-cols-[auto_minmax(0,1fr)] items-center gap-5 rounded-3xl p-7 shadow-[var(--shadow-cyan)]">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl neon-surface">
            <QrCode className="h-7 w-7 text-primary-foreground" />
          </span>
          <div className="min-w-0">
            <h4 className="font-display text-lg font-black">Tamper-Proof, Blockchain-Verified Credential</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              Every graduate receives a blockchain-anchored certificate verifiable via direct QR scan.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const senpais = [
  {
    name: "Light",
    title: "Chief Architect • Full Stack & Web3",
    image: senpai1,
    creds: ["Ex-Tech Lead", "Built DeFi systems & enterprise apps", "5+ yrs mentoring"],
  },
  {
    name: "Thorfinn",
    title: "Gen AI & ML Systems Engineer",
    image: senpai2,
    creds: ["RAG Specialist", "Built autonomous LLM agents", "OpenClaw contributor"],
  },
  {
    name: "Eren",
    title: "Frontend Architect & Design Systems",
    image: senpai3,
    creds: ["Ex-Product Designer @ Unicorn", "Pixel-perfection obsessed", "10+ shipped SaaS apps"],
  },
];

export function Senpais() {
  return (
    <section id="senpais" className="relative scroll-mt-28 px-4 py-24">
      <Heading
        kicker="Meet the Senseis"
        title={
          <>
            Engineers, <span className="neon-text">Not Salespeople</span>
          </>
        }
        sub="Learn directly from builders who write code for a living every single day."
      />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3">
        {senpais.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.1}>
            <article className="glass glow-hover h-full overflow-hidden rounded-3xl p-6">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                <img
                  src={s.image}
                  alt={`${s.name} - ${s.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h3 className="font-display mt-5 text-xl font-black">{s.name}</h3>
              <p className="mt-1 text-xs font-bold text-accent">{s.title}</p>
              <ul className="mt-4 space-y-2 text-xs text-muted-foreground">
                {s.creds.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent" /> {c}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Community() {
  const cards = [
    {
      icon: Send,
      title: "Join Official Telegram Squad",
      body: "Free study roadmaps, open-source cheat sheets, open-source project support, developer toolkits, and instant batch updates.",
      cta: "Open Telegram",
      href: "https://t.me/+E0V2bpCg3LUzYjZl",
    },
    {
      icon: MessageCircle,
      title: "Join WhatsApp Broadcast Channel",
      body: "Instant clan announcements, free study material alerts, open-source project resources, zero spam, and one-click opt-out.",
      cta: "Open WhatsApp",
      href: "https://whatsapp.com/channel/0029VbDhrSV3mFY7c5rblX2V",
    },
  ];
  return (
    <section id="community" className="relative scroll-mt-28 px-4 py-24">
      <Heading
        kicker="Free Community Vault & Open-Source Hub"
        title={
          <>
            Loot the <span className="neon-text">Vault & Join Free</span>
          </>
        }
        sub="Join free for further updates, free study material, curated developer roadmaps, and open-source project support."
      />
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {cards.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1}>
            <article className="glass glow-hover h-full rounded-3xl p-7 flex flex-col justify-between">
              <div>
                <span className="grid h-12 w-12 place-items-center rounded-2xl neon-surface">
                  <c.icon className="h-6 w-6 text-primary-foreground" />
                </span>
                <h3 className="font-display mt-5 text-xl font-black">{c.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{c.body}</p>
              </div>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-border bg-secondary/50 px-5 py-3 text-sm font-bold transition-colors hover:border-primary hover:bg-secondary"
              >
                {c.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>

      {/* Free Academy Teaser Banner */}
      <Reveal delay={0.15}>
        <div className="glass glow-hover mx-auto mt-8 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-3xl p-7 sm:flex-row shadow-[var(--shadow-cyan)] border border-accent/30">
          <div className="text-left">
            <span className="text-[10px] font-black tracking-widest text-accent uppercase">
              Free Engineering Academy
            </span>
            <h4 className="font-display mt-1 text-xl font-black">
              Explore Computer Science Fundamentals
            </h4>
            <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
              Deep dive into x86 vs ARM, how CPUs work, internet packet routing, and memory models.
            </p>
          </div>
          <a
            href="/academy"
            className="inline-flex shrink-0 items-center justify-center rounded-xl neon-surface px-5 py-3 text-xs font-black tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-105 transition-transform"
          >
            Open Free Academy Vault →
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const links = [
    { id: "philosophy", label: "Philosophy" },
    { id: "roadmap", label: "Roadmap" },
    { id: "courses", label: "Clan Courses" },
    { id: "cohorts", label: "Cohorts" },
    { id: "senpais", label: "Senpais" },
    { id: "community", label: "Community" },
    { id: "faq", label: "FAQ" },
  ];
  return (
    <footer className="border-t border-border px-4 py-12">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="min-w-0">
          <p className="font-display text-lg font-black tracking-widest">
            STUDY<span className="neon-text">SENPAI</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Education by engineers for future builders.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            © {new Date().getFullYear()} StudySenpai. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-semibold text-muted-foreground transition-colors hover:text-accent"
            >
              {l.label}
            </button>
          ))}
          <a
            href="/academy"
            className="text-sm font-bold text-accent transition-colors hover:text-foreground"
          >
            Academy Vault
          </a>
        </nav>
      </div>
    </footer>
  );
}

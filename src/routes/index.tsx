import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar, { scrollTo } from "@/components/site/Navbar";
import AdmissionForm from "@/components/site/AdmissionForm";
import {
  Manifesto,
  Roadmap,
  Tracks,
  Cohorts,
  Senpais,
  Community,
  Footer,
} from "@/components/site/Sections";
import { Stats, SkillMarquee, HowItWorks, FAQ, faqs } from "@/components/site/Extras";
import heroImg from "@/assets/hero.jpg";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "StudySenpai",
      url: "https://studysenpai.lovable.app/",
      description: "Clan-based live coding cohorts for developers in India.",
      inLanguage: ["en", "ta"],
    },
    {
      "@type": "EducationalOrganization",
      name: "StudySenpai",
      url: "https://studysenpai.lovable.app/",
      description:
        "Clan-based live coding cohorts led by working software engineers. Learn full stack web development, Web3 and Generative AI with zero upfront fees.",
      slogan: "Education by engineers for future builders.",
      areaServed: "IN",
      knowsLanguage: ["en", "ta"],
    },
    {
      "@type": "Course",
      name: "Web Fundamentals (Phase 1)",
      description: "HTML5, Modern CSS, JavaScript ES6+, and DOM Manipulation for absolute beginners.",
      provider: { "@type": "Organization", name: "StudySenpai" },
      offers: {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        category: "Paid",
      },
      inLanguage: ["en", "ta"],
      courseMode: "online",
    },
    {
      "@type": "Course",
      name: "Modern Frontend & BaaS (Phase 2)",
      description: "React.js, Modern State Management, Firebase Auth, and Firestore live coding clan.",
      provider: { "@type": "Organization", name: "StudySenpai" },
      offers: {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        category: "Paid",
      },
      inLanguage: ["en", "ta"],
      courseMode: "online",
    },
    {
      "@type": "Course",
      name: "Backend & Database Mastery (Phase 3)",
      description: "Node.js, Express.js, MongoDB, REST API architecture, and Authentication.",
      provider: { "@type": "Organization", name: "StudySenpai" },
      offers: {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        category: "Paid",
      },
      inLanguage: ["en", "ta"],
      courseMode: "online",
    },
    {
      "@type": "Course",
      name: "Web3 & Blockchain Engineering (Track A)",
      description: "Solidity, Smart Contracts, Hardhat, Contract Deployment, Testnets, ERC Tokens, OpenZeppelin.",
      provider: { "@type": "Organization", name: "StudySenpai" },
      offers: {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        category: "Paid",
      },
      inLanguage: ["en", "ta"],
      courseMode: "online",
    },
    {
      "@type": "Course",
      name: "Generative AI & Autonomous Systems (Track B)",
      description: "RAG Frameworks, LLM Application Building, Local LLMs, Cloud LLMs, Agentic Tools.",
      provider: { "@type": "Organization", name: "StudySenpai" },
      offers: {
        "@type": "Offer",
        price: "499",
        priceCurrency: "INR",
        category: "Paid",
      },
      inLanguage: ["en", "ta"],
      courseMode: "online",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "StudySenpai — Live Coding Clans: Full Stack, Web3 & Gen AI" },
      {
        name: "description",
        content:
          "Live, hands-on coding cohorts led by working engineers. No spam calls, no upfront fees — pay only after 2 free demo classes. Full stack, Web3 and Gen AI tracks from ₹499.",
      },
      {
        name: "keywords",
        content:
          "live coding classes, full stack course India, MERN cohort, Web3 Solidity course, Generative AI RAG course, affordable coding bootcamp",
      },
      { property: "og:title", content: "StudySenpai — Master Real-World Engineering" },
      {
        property: "og:description",
        content:
          "Small live clans, senpai code reviews, and blockchain-verified credentials. New batches launch on the 5th of every month.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "StudySenpai" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "StudySenpai — Live Coding Clans" },
      {
        name: "twitter:description",
        content:
          "Pay only after 2 free live demo classes. Full stack, Web3 and Gen AI tracks from ₹499.",
      },
    ],
    links: [{ rel: "canonical", href: "https://studysenpai.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Index,
});


const tags = ["React", "Solidity", "Node.js", "RAG", "MongoDB", "Hardhat", "LLM Agents", "Firebase"];

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-36 pb-24">
      <motion.div style={{ y: imgY }} className="pointer-events-none absolute inset-0 -top-20">
        <img
          src={heroImg}
          alt="Anime cyberpunk coders in a neon city"
          width={1536}
          height={1024}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background" />
      </motion.div>
      <div className="grid-overlay pointer-events-none absolute inset-0 opacity-25" />

      <motion.div style={{ y: textY, opacity: fade }} className="relative mx-auto max-w-5xl px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-[11px] font-bold tracking-[0.18em] text-accent uppercase sm:text-xs"
        >
          ⚡ Clan-Based Live Freelancer Cohorts • No Upfront Fees • Pure Code
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display mt-7 text-4xl leading-[1.05] font-black tracking-tight sm:text-6xl lg:text-7xl"
        >
          Master Real-World Engineering with Your{" "}
          <span className="neon-text">Senpais</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-lg"
        >
          Built by working software engineers & freelancers. We reject spam calls, aggressive sales, and
          bloated video playlists. Live, hands-on building in limited clans.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass mx-auto mt-8 max-w-3xl rounded-2xl px-5 py-4 text-xs leading-relaxed text-foreground shadow-[var(--shadow-cyan)] sm:text-sm"
        >
          <span className="font-display font-black tracking-widest text-accent">CLAN RULE: </span>
          New batches launch on the 5th of every month. 1st–5th is Clan Formation & Transition. Pay only
          after 2 live demo sessions.
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={() => scrollTo("join")}
            className="w-full rounded-xl neon-surface px-7 py-4 font-display text-sm font-black tracking-widest text-primary-foreground uppercase shadow-[var(--shadow-neon)] transition-transform hover:scale-105 sm:w-auto"
          >
            Join Next Clan
          </button>
          <button
            onClick={() => scrollTo("roadmap")}
            className="w-full rounded-xl border border-border bg-secondary/40 px-7 py-4 font-display text-sm font-black tracking-widest uppercase transition-colors hover:border-accent hover:text-accent sm:w-auto"
          >
            Explore Roadmaps
          </button>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5">
          {tags.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.06 }}
              className="glass float-slow rounded-full px-4 py-2 text-xs font-bold tracking-wide text-muted-foreground"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function Index() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Stats />
      <SkillMarquee />
      <Manifesto />
      <Roadmap />
      <Tracks />
      <HowItWorks />
      <Cohorts />
      <Senpais />
      <Community />
      <FAQ />
      <AdmissionForm />

      <Footer />
    </main>
  );
}

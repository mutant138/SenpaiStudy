import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X, Sparkles, GraduationCap } from "lucide-react";
import logoImg from "@/assets/logo.png";

const links = [
  { id: "philosophy", label: "Philosophy" },
  { id: "roadmap", label: "Roadmap" },
  { id: "courses", label: "Clan Courses" },
  { id: "cohorts", label: "Upcoming Cohorts" },
  { id: "senpais", label: "Senpais" },
  { id: "community", label: "Community" },
  { id: "faq", label: "FAQ" },
];

export function scrollTo(id: string) {
  if (typeof window !== "undefined") {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}
    >
      <nav
        className={`mx-auto flex max-w-7xl items-center gap-4 rounded-2xl px-4 py-3 sm:px-6 ${
          scrolled ? "glass shadow-[var(--shadow-neon)]" : "border border-transparent"
        } mx-3 lg:mx-auto`}
      >
        <a
          href="/"
          className="flex min-w-0 shrink-0 items-center gap-3"
          aria-label="StudySenpai home"
        >
          <img
            src={logoImg}
            alt="StudySenpai Logo"
            className="h-9 w-9 shrink-0 rounded-xl object-cover ring-1 ring-primary/40 shadow-[var(--shadow-neon)]"
          />
          <span className="font-display truncate text-lg font-black tracking-widest">
            STUDY<span className="neon-text">SENPAI</span>
          </span>
        </a>

        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </button>
          ))}

          <a
            href="/academy"
            className="inline-flex items-center gap-1.5 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm font-bold text-accent transition-colors hover:bg-accent/20"
          >
            <GraduationCap className="h-4 w-4" /> Academy
          </a>

          <button
            onClick={() => scrollTo("join")}
            className="ml-2 rounded-xl neon-surface px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[var(--shadow-neon)] transition-transform hover:scale-105"
          >
            Join Next Clan
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-border lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mx-3 mt-2 rounded-2xl p-3 lg:hidden"
        >
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => {
                scrollTo(l.id);
                setOpen(false);
              }}
              className="block w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
          <a
            href="/academy"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-3 text-sm font-bold text-accent hover:bg-accent/20"
          >
            <GraduationCap className="h-4 w-4" /> Free Academy Vault
          </a>
          <button
            onClick={() => {
              scrollTo("join");
              setOpen(false);
            }}
            className="mt-2 w-full rounded-xl neon-surface px-5 py-3 text-sm font-bold text-primary-foreground"
          >
            Join Next Clan
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}

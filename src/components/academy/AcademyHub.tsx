import { useState, useMemo, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Cpu,
  Globe,
  Binary,
  Layers,
  Terminal,
  CircuitBoard,
  Search,
  BookOpen,
  X,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Share2,
  ExternalLink,
} from "lucide-react";
import { ACADEMY_TOPICS, ACADEMY_CATEGORIES, type AcademyTopic } from "./academyData";
import { toast } from "sonner";

function TopicIcon({ name, className }: { name: AcademyTopic["iconName"]; className?: string }) {
  switch (name) {
    case "Cpu":
      return <Cpu className={className} />;
    case "CircuitBoard":
      return <CircuitBoard className={className} />;
    case "Globe":
      return <Globe className={className} />;
    case "Binary":
      return <Binary className={className} />;
    case "Layers":
      return <Layers className={className} />;
    case "Terminal":
      return <Terminal className={className} />;
    default:
      return <Cpu className={className} />;
  }
}

export default function AcademyHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTopic, setActiveTopic] = useState<AcademyTopic | null>(null);

  const filteredTopics = useMemo(() => {
    return ACADEMY_TOPICS.filter((topic) => {
      const matchesCategory =
        selectedCategory === "all" || topic.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        topic.title.toLowerCase().includes(query) ||
        topic.shortSummary.toLowerCase().includes(query) ||
        topic.keyConcepts.some((c) => c.toLowerCase().includes(query)) ||
        topic.tagline.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  function handleShare(topic: AcademyTopic) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `${window.location.origin}/academy#${topic.id}`
      );
      toast.success("Link copied to clipboard!", {
        description: `Direct share link for: ${topic.title}`,
      });
    }
  }

  return (
    <section className="relative px-4 py-16 sm:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 overflow-hidden">
        <div className="absolute left-1/2 -top-24 h-96 w-[700px] -translate-x-1/2 rounded-full bg-primary/20 blur-[130px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-bold tracking-[0.25em] text-accent uppercase backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" /> Free Computer Science & Engineering Vault
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display mt-6 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl"
          >
            StudySenpai <span className="neon-text">Academy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg"
          >
            Real engineers understand how computers actually work beneath the abstractions. 
            Deep-dive into silicon architecture, CPU processing, internet packet journeys, and memory mechanics.
          </motion.p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-12 space-y-5">
          <div className="relative mx-auto max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g., x86 vs ARM, DNS, CPU Cache, Stack vs Heap)..."
              className="w-full rounded-2xl border border-border bg-card/60 py-3.5 pl-12 pr-10 text-sm text-foreground placeholder:text-muted-foreground/70 backdrop-blur-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-lg p-1 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {ACADEMY_CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold tracking-wide transition-all ${
                    active
                      ? "neon-surface text-primary-foreground shadow-(--shadow-neon)"
                      : "glass text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards Grid */}
        {filteredTopics.length === 0 ? (
          <div className="glass mx-auto mt-16 max-w-md rounded-3xl p-8 text-center">
            <p className="font-display text-lg font-bold">No topics found</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Try searching for a different keyword or reset category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 cursor-pointer rounded-xl border border-border bg-secondary/50 px-4 py-2 text-xs font-bold hover:bg-secondary"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTopics.map((topic, i) => (
              <motion.article
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
                className="glass glow-hover group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-7 border border-border/80"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl neon-surface shadow-[var(--shadow-neon)]">
                      <TopicIcon name={topic.iconName} className="h-6 w-6 text-primary-foreground" />
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-secondary/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                        {topic.readTime}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                          topic.difficulty === "Beginner"
                            ? "bg-accent/20 text-accent border border-accent/30"
                            : topic.difficulty === "Intermediate"
                            ? "bg-primary/20 text-primary-foreground border border-primary/30"
                            : "bg-destructive/20 text-destructive border border-destructive/30"
                        }`}
                      >
                        {topic.difficulty}
                      </span>
                    </div>
                  </div>

                  <span className="mt-5 block text-[11px] font-black tracking-widest text-accent uppercase">
                    {topic.categoryLabel}
                  </span>
                  <h2 className="font-display mt-1 text-xl font-black transition-colors group-hover:text-primary-foreground">
                    {topic.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {topic.shortSummary}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {topic.keyConcepts.slice(0, 3).map((concept) => (
                      <span
                        key={concept}
                        className="rounded-lg bg-secondary/40 px-2.5 py-1 text-[10px] font-semibold text-muted-foreground"
                      >
                        #{concept}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between">
                  <span className="inline-flex cursor-pointer items-center gap-2 text-xs font-black tracking-wider text-foreground group-hover:text-accent transition-colors">
                    Explore Deep Dive <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(topic);
                    }}
                    title="Share topic link"
                    className="cursor-pointer rounded-lg p-2 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Free Clan Mentorship Callout Banner */}
        <div className="glass mx-auto mt-20 rounded-3xl p-8 text-center sm:p-12 shadow-[var(--shadow-neon)] border border-primary/30">
          <span className="inline-block rounded-full bg-primary/20 px-4 py-1 text-xs font-bold tracking-widest text-primary-foreground uppercase">
            From Theory to Production Code
          </span>
          <h3 className="font-display mt-4 text-2xl font-black tracking-tight sm:text-4xl">
            Want to Build Real Systems With <span className="neon-text">Senior Senpais?</span>
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Join our live coding clans starting on the 5th of every month. Attend 2 demo classes free — pay ₹499 only if you love the live clan experience.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="/#join"
              className="inline-flex items-center gap-2 rounded-xl neon-surface px-6 py-3.5 font-display text-sm font-black tracking-widest text-primary-foreground uppercase shadow-[var(--shadow-neon)] transition-transform hover:scale-105"
            >
              Enroll In Upcoming Clan <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="/#community"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/60 px-6 py-3.5 text-sm font-bold transition-colors hover:border-primary hover:bg-secondary"
            >
              Join Free Community Vault
            </a>
          </div>
        </div>
      </div>

      {/* Deep Dive Reader Modal */}
      <AnimatePresence>
        {activeTopic && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTopic(null)}
              className="fixed inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="glass relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl p-6 shadow-[var(--shadow-neon)] sm:p-10 border border-border"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveTopic(null)}
                aria-label="Close dialog"
                className="absolute right-5 top-5 rounded-full border border-border bg-secondary/80 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-black tracking-widest text-accent uppercase">
                  {activeTopic.categoryLabel}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {activeTopic.readTime}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-[10px] font-bold text-primary-foreground">
                  {activeTopic.difficulty}
                </span>
              </div>

              <h2 className="font-display mt-3 text-2xl font-black sm:text-4xl">
                {activeTopic.title}
              </h2>
              <p className="mt-2 text-xs font-bold text-accent sm:text-sm">
                ⚡ {activeTopic.tagline}
              </p>

              {/* Overview Box */}
              <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm leading-relaxed text-foreground">
                {activeTopic.deepDive.overview}
              </div>

              {/* Content Sections */}
              <div className="mt-8 space-y-8">
                {activeTopic.deepDive.sections.map((sec) => (
                  <div key={sec.heading} className="space-y-3">
                    <h3 className="font-display text-lg font-bold sm:text-xl text-foreground">
                      {sec.heading}
                    </h3>
                    <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                      {sec.content}
                    </p>

                    {sec.codeOrDiagram && (
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-border bg-black/70 p-4 font-mono text-xs leading-relaxed text-accent">
                        <pre>{sec.codeOrDiagram}</pre>
                      </div>
                    )}

                    {sec.tableData && (
                      <div className="mt-4 overflow-x-auto rounded-2xl border border-border">
                        <table className="w-full text-left text-xs">
                          <thead className="border-b border-border bg-secondary/80 font-bold uppercase tracking-wider text-accent">
                            <tr>
                              {sec.tableData.headers.map((h) => (
                                <th key={h} className="p-3.5">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/60">
                            {sec.tableData.rows.map((r, ri) => (
                              <tr
                                key={ri}
                                className="transition-colors hover:bg-secondary/30"
                              >
                                {r.map((cell, ci) => (
                                  <td
                                    key={ci}
                                    className={`p-3.5 leading-relaxed ${
                                      ci === 0 ? "font-bold text-foreground" : "text-muted-foreground"
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Key Takeaways */}
              <div className="mt-10 rounded-2xl border border-accent/30 bg-accent/10 p-6">
                <h4 className="font-display flex items-center gap-2 text-base font-black text-accent">
                  <CheckCircle2 className="h-5 w-5" /> Key Architectural Takeaways
                </h4>
                <ul className="mt-3 space-y-2 text-xs sm:text-sm text-foreground">
                  {activeTopic.deepDive.takeaways.map((t, ti) => (
                    <li key={ti} className="flex items-start gap-2">
                      <span className="text-accent font-bold">•</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border">
                <button
                  onClick={() => handleShare(activeTopic)}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-2.5 text-xs font-bold hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <Share2 className="h-4 w-4" /> Share This Concept
                </button>
                <a
                  href="/#join"
                  onClick={() => setActiveTopic(null)}
                  className="inline-flex items-center gap-2 rounded-xl neon-surface px-5 py-2.5 text-xs font-black tracking-wider text-primary-foreground shadow-[var(--shadow-neon)] hover:scale-105 transition-transform"
                >
                  Practice in Live Clan <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

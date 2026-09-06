import { useState, type SyntheticEvent } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Sparkles, Loader2 } from "lucide-react";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzc2Vi9u844cCSoLEWSG1EdSe2yZVw8nRCyzodq1mOZePvrDgvYR_LXHOEgX3pqHiGc/exec";

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduated / Working"];
const languages = ["Tamil", "English"];
const tracks = [
  "Web Fundamentals ₹499",
  "React + Firebase ₹499",
  "Node + Express + Mongo ₹499",
  "Advanced Blockchain Track ₹499",
  "Gen AI & RAG Track ₹499",
];

const field =
  "w-full rounded-xl border border-border bg-input/40 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/40";

export default function AdmissionForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Record<string, string> = {};

    if (get("name").length < 2) next["name"] = "Tell us your full name.";
    if (!get("college")) next["college"] = "College / University is required.";
    if (!get("department")) next["department"] = "Department / Branch is required.";
    if (!get("year")) next["year"] = "Select your year of study.";
    if (!/^[0-9]{10}$/.test(get("phone").replace(/\D/g, "").slice(-10)))
      next["phone"] = "Enter a valid 10-digit WhatsApp number.";
    if (get("email") && !/^\S+@\S+\.\S+$/.test(get("email"))) next["email"] = "That email looks off.";
    if (!get("language")) next["language"] = "Select your mode of language.";
    if (!get("track")) next["track"] = "Pick a cohort track.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      toast.error("Your clan scroll is incomplete", { description: "Fix the highlighted fields." });
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", get("name"));
      formData.append("college", get("college"));
      formData.append("department", get("department"));
      formData.append("year", get("year"));
      formData.append("phone", get("phone"));
      formData.append("email", get("email"));
      formData.append("language", get("language"));
      formData.append("track", get("track"));
      formData.append("goals", get("goals"));

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setSent(true);
      toast.success("⚡ Seat reserved, future Senpai!", {
        description: "Watch WhatsApp for your clan links. We never call — promise.",
      });
      form.reset();
    } catch (err) {
      toast.error("Failed to submit admission form", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="mt-1 text-xs font-semibold text-destructive">{errors[k]}</p> : null;

  return (
    <section id="join" className="relative mx-auto max-w-4xl scroll-mt-28 px-4 py-24">
      <div className="dot-overlay pointer-events-none absolute inset-0 opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="glass relative rounded-3xl p-6 shadow-[var(--shadow-neon)] sm:p-10"
      >
        <h2 className="font-display text-2xl font-black tracking-tight sm:text-4xl">
          Enroll in the <span className="neon-text">Upcoming Clan</span>
          <span className="block text-base font-bold text-muted-foreground sm:text-lg">
            (Starts 5th of this month)
          </span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          No upfront fee. Attend 2 demo classes first. We NEVER make voice calls.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 font-bold text-foreground">
            🕒 Live Classes: Mon to Fri • 8 PM – 10 PM (based on availability)
          </span>
          <span className="rounded-lg border border-accent/30 bg-accent/10 px-3 py-1.5 font-bold text-accent">
            💼 Final Class: ATS Resume & Interview Prep
          </span>
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-8 grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">Full Name *</label>
            <input name="name" className={field} placeholder="Your name" />
            <Err k="name" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">
              College / University *
            </label>
            <input name="college" className={field} placeholder="Institute name" />
            <Err k="college" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">
              Department / Branch *
            </label>
            <input name="department" className={field} placeholder="e.g. CSE" />
            <Err k="department" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">Year of Study *</label>
            <select name="year" defaultValue="" className={field}>
              <option value="" disabled>
                Select year
              </option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <Err k="year" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">
              WhatsApp Mobile Number *
            </label>
            <input name="phone" inputMode="tel" className={field} placeholder="10-digit number" />
            <p className="mt-2 text-xs leading-relaxed text-accent">
              ⚠️ We respect your peace: We will NEVER call this number. You will only receive a WhatsApp
              message with batch links. You can opt out anytime by replying STOP.
            </p>
            <Err k="phone" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">
              Email Address (optional)
            </label>
            <input name="email" className={field} placeholder="you@mail.com" />
            <Err k="email" />
          </div>
          <div>
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">
              Mode of Language *
            </label>
            <select name="language" defaultValue="" className={field}>
              <option value="" disabled>
                Select language
              </option>
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <Err k="language" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">
              Select Cohort Track *
            </label>
            <select name="track" defaultValue="" className={field}>
              <option value="" disabled>
                Choose your path
              </option>
              {tracks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Err k="track" />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-2 block text-xs font-bold tracking-widest uppercase">
              Area of Interest / Future Career Goals
            </label>
            <textarea name="goals" rows={4} className={field} placeholder="What do you want to build?" />
          </div>

          <div className="sm:col-span-2 rounded-xl border border-border/80 bg-secondary/40 p-3.5 text-xs text-muted-foreground">
            <span className="font-bold text-foreground">⚠️ Disclaimer:</span> We do NOT provide placement guarantees. We provide real engineer-led training, ATS-optimized resume building, and tech interview preparation to prepare you for industry roles.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-xl neon-surface px-6 py-4 font-display text-sm font-black tracking-widest text-primary-foreground uppercase shadow-[var(--shadow-neon)] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Enrolling In Clan...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" /> Reserve My Seat in Next Clan ⚡
              </>
            )}
          </button>
        </form>

        {sent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 rounded-2xl border border-accent/40 bg-accent/10 p-5 text-center"
          >
            <p className="font-display text-lg font-black tracking-wide text-accent">
              WELCOME TO THE CLAN
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Your scroll has been received. Batch links arrive on WhatsApp before the 5th.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

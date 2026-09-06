import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/site/Navbar";
import { Footer } from "@/components/site/Sections";
import AcademyHub from "@/components/academy/AcademyHub";
import { ACADEMY_TOPICS } from "@/components/academy/academyData";

const academyJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      name: "StudySenpai Academy — Free Computer Science & Engineering Vault",
      url: "https://studysenpai.lovable.app/academy",
      description:
        "Learn essential CS & Computer Engineering fundamentals: how CPUs work, x86 vs ARM architecture, internet routing, memory models, and browser rendering.",
      inLanguage: ["en", "ta"],
    },
    {
      "@type": "ItemList",
      name: "Computer Science Fundamentals Modules",
      itemListElement: ACADEMY_TOPICS.map((topic, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Article",
          name: topic.title,
          description: topic.shortSummary,
          author: {
            "@type": "Organization",
            name: "StudySenpai",
          },
        },
      })),
    },
  ],
};

export const Route = createFileRoute("/academy")({
  head: () => ({
    meta: [
      {
        title: "StudySenpai Academy — Free CS & Computer Engineering Knowledge Hub",
      },
      {
        name: "description",
        content:
          "Explore visual, interactive guides on how CPUs work, x86 vs ARM architecture, internet packet routing, memory management, and browser rendering engines.",
      },
      {
        name: "keywords",
        content:
          "x86 vs arm, how cpu works, how internet works, stack vs heap, computer science fundamentals, browser rendering path, event loop, study senpai academy",
      },
      {
        property: "og:title",
        content: "StudySenpai Academy — Master Real-World Engineering Fundamentals",
      },
      {
        property: "og:description",
        content:
          "Free visual guides on CPU processing, x86 vs ARM, internet mechanics, and memory allocation for future engineers.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://studysenpai.lovable.app/academy" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "StudySenpai Academy — Free CS & Engineering Vault",
      },
      {
        name: "twitter:description",
        content:
          "Learn how CPUs work, x86 vs ARM, internet packet journeys, and memory allocation in minutes.",
      },
    ],
    links: [{ rel: "canonical", href: "https://studysenpai.lovable.app/academy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(academyJsonLd),
      },
    ],
  }),
  component: AcademyPage,
});

function AcademyPage() {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-16 sm:pt-20">
        <AcademyHub />
      </div>
      <Footer />
    </main>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { BentoGrid } from "../components/BentoGrid";
import { ProjectsPreview } from "../components/ProjectsPreview";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "N5 Labs — Digital Studio | Nairobi, Kenya" },
      { name: "description", content: "N5 Labs builds modern websites, AI automation, and digital marketing solutions for businesses across Kenya." },
      { property: "og:title", content: "N5 Labs — Digital Studio | Nairobi, Kenya" },
      { property: "og:description", content: "We build digital products that scale your business." },
    ],
  }),
});

function Index() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <ProjectsPreview />
      <CTASection />
    </>
  );
}

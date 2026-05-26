import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "../components/Hero";
import { BentoGrid } from "../components/BentoGrid";
import { ProcessSection } from "../components/ProcessSection";
import { ProjectsPreview } from "../components/ProjectsPreview";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Tujenge Solutions — Digital Solutions for Kenyan Businesses" },
      { name: "description", content: "Tujenge Solutions builds digital platforms, web applications, and business systems for SMEs and businesses across Kenya." },
      { property: "og:title", content: "Tujenge Solutions — Digital Solutions for Kenyan Businesses" },
      { property: "og:description", content: "We build smart, scalable digital solutions for businesses across Kenya." },
    ],
  }),
});

function Index() {
  return (
    <>
      <Hero />
      <BentoGrid />
      <ProcessSection />
      <ProjectsPreview />
      <CTASection />
    </>
  );
}

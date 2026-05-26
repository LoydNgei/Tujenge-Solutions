export const projects = [
  {
    slug: "kenya-snakebite-research-centre",
    title: "Kenya Snakebite Research Centre",
    client: "KSRIC",
    category: "Web Application",
    description:
      "Developed the official digital platform for the Kenya Snakebite Research Centre (KSRIC) — a dynamic, data-driven system that brings critical research, resources, and hospital information to the public and medical professionals across Kenya.",
    highlights: [
      "Developed the official digital platform for the Kenya Snakebite Research Centre (KSRIC)",
      "Built a dynamic, data-driven system to manage staff profiles, publications, news, events, and hospital directories",
      "Engineered a robust, intuitive admin dashboard to streamline end-to-end content management",
    ],
    results: ["Full CMS & admin dashboard", "Hospital directory system", "Publications & events platform"],
    tags: ["Laravel", "PHP", "MySQL", "Admin Dashboard", "Content Management", "Healthcare"],
    color: "from-emerald-600/80 to-teal-800/90",
    imageUrl: "src/assets/ksric_display.png",
    liveUrl: "https://www.ksric.org/",
  },
  {
    slug: "insdev-consulting",
    title: "Insdev Consulting",
    client: "Insdev Consulting",
    category: "Web Application",
    description:
      "Designed and launched an interactive web application for a premier Kenya-based consultancy firm, featuring seamless program enrollment, end-to-end M-Pesa payment integration, and a growing Learning Management System to scale digital education offerings.",
    highlights: [
      "Designed and launched an interactive application for a premier Kenya-based consultancy firm",
      "Implemented secure, seamless program enrollment workflows with full end-to-end payment integration",
      "Currently architecting an integrated Learning Management System (LMS) to scale digital education offerings",
    ],
    results: ["M-Pesa payment integration", "Program enrollment system", "LMS in development"],
    tags: ["Laravel", "Inertia.js", "React", "M-Pesa", "LMS", "Consultancy"],
    color: "from-blue-600/80 to-indigo-800/90",
    imageUrl: "src/assets/insdev_display.png",
    liveUrl: "https://www.insdevconsulting.com/",
  },
] as const;

export type Project = (typeof projects)[number];

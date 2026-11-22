// The site's original copy. Shown when Supabase isn't configured (or is
// unreachable), and imported into the database from the admin dashboard.
import type { Project, Service, SiteContent, SiteSettings, TeamMember } from "./types";
import ksricDisplay from "../../assets/ksric_display.png";
import insdevDisplay from "../../assets/insdev_display.png";
import serviceWeb from "../../assets/service-web.jpg";
import serviceAi from "../../assets/service-ai.jpg";
import serviceSeo from "../../assets/service-seo.jpg";
import serviceCustom from "../../assets/service-custom.jpg";
import serviceDomain from "../../assets/service-domain.jpg";
import serviceSupport from "../../assets/service-support.jpeg";
import founderPhoto from "../../assets/founder-profile.png";
import powellPhoto from "../../assets/powell-profile.png";
import heroBg from "../../assets/hero-bg.png";

export const defaultServices: Service[] = [
  {
    slug: "web-development",
    icon: "Code",
    title: "Web Development",
    tagline: "Fast, modern websites that convert",
    description: "We craft modern, high-performance websites and web applications using the latest frameworks. Whether it's a sleek landing page or a full-stack SaaS platform, we build it to convert and scale.",
    features: ["React & Next-gen frameworks", "Mobile-first responsive design", "E-commerce platforms", "Progressive Web Apps"],
    details: [
      {
        heading: "Built for Performance",
        text: "Every site we ship scores 90+ on Lighthouse. We use server-side rendering, image optimization, and edge caching to make your site load in under 2 seconds, anywhere in Kenya and beyond.",
      },
      {
        heading: "E-Commerce Ready",
        text: "From Shopify integrations to fully custom storefronts with M-Pesa and card payments. We build online stores that handle real African commerce: multi-currency, mobile-first, and built to sell.",
      },
      {
        heading: "Scalable Architecture",
        text: "We don't build sites that break when you grow. Our architecture handles 10 visitors or 10,000 without flinching. Cloud-native, auto-scaling, and always available.",
      },
    ],
    imageUrl: serviceWeb,
    sortOrder: 0,
    published: true,
  },
  {
    slug: "ai-automation",
    icon: "Zap",
    title: "AI Automation",
    tagline: "Let machines handle the grunt work",
    description: "Streamline your operations with intelligent automation. We integrate AI into your workflows to eliminate manual processes, reduce errors, and free your team to focus on high-value work.",
    features: ["Workflow automation", "AI chatbots & assistants", "Data processing pipelines", "Smart notifications"],
    details: [
      {
        heading: "Custom AI Agents",
        text: "We build AI assistants tailored to your business: customer support bots that speak your brand's voice, data analysts that crunch numbers while you sleep, and smart workflows that run on autopilot.",
      },
      {
        heading: "Process Automation",
        text: "Manual data entry, invoice processing, report generation: we automate it all. Connect your existing tools (Google Sheets, WhatsApp, email) with intelligent pipelines that just work.",
      },
      {
        heading: "Predictive Analytics",
        text: "Turn your data into decisions. Our AI models analyze sales patterns, customer behavior, and market trends to give you actionable insights before your competitors even see them coming.",
      },
    ],
    imageUrl: serviceAi,
    sortOrder: 1,
    published: true,
  },
  {
    slug: "seo-digital-marketing",
    icon: "TrendingUp",
    title: "SEO & Digital Marketing",
    tagline: "Get found. Get clicks. Get customers.",
    description: "Get found. Get clicks. Get customers. Our data-driven marketing strategies combine SEO, social media, and paid advertising to drive real revenue growth.",
    features: ["Search engine optimization", "Social media campaigns", "Google & Meta ads", "Analytics & reporting"],
    details: [
      {
        heading: "Rank Higher on Google",
        text: "We do the keyword research, technical audits, and content optimization that moves you from page 5 to page 1. Local SEO included, so you can dominate 'near me' searches across Nairobi and Kenya.",
      },
      {
        heading: "Social Media That Converts",
        text: "Not just likes, but leads. We create content strategies for Instagram, TikTok, LinkedIn, and X that build your brand and drive actual business results. We handle everything from content creation to community management.",
      },
      {
        heading: "Paid Advertising",
        text: "Google Ads, Facebook Ads, Instagram Ads: we manage campaigns that deliver ROI, not vanity metrics. Data-driven targeting, A/B testing, and continuous optimization to maximize every shilling you spend.",
      },
    ],
    imageUrl: serviceSeo,
    sortOrder: 2,
    published: true,
  },
  {
    slug: "custom-systems",
    icon: "Cog",
    title: "Custom Systems",
    tagline: "Software built around your business",
    description: "Off-the-shelf software doesn't fit? We design and build bespoke systems tailored to your exact business needs: inventory, HR, logistics, you name it.",
    features: ["ERP & CRM systems", "Inventory management", "Booking platforms", "API integrations"],
    details: [
      {
        heading: "Tailored to Your Workflow",
        text: "We don't force your business into a template. We study your processes, identify bottlenecks, and build software that fits like a glove. Your team will wonder how they ever worked without it.",
      },
      {
        heading: "Integrations That Work",
        text: "Connect your new system with M-Pesa, QuickBooks, Google Workspace, WhatsApp Business, and any other tool your team already uses. No more copy-pasting between apps.",
      },
      {
        heading: "Built for African Business",
        text: "Multi-branch support, M-Pesa payment tracking, USSD menus, SMS notifications: we build with the Kenyan and African market in mind because that's where your customers are.",
      },
    ],
    imageUrl: serviceCustom,
    sortOrder: 3,
    published: true,
  },
  {
    slug: "domain-hosting",
    icon: "Globe",
    title: "Domain & Hosting",
    tagline: "Your web infrastructure, handled",
    description: "We handle your entire web infrastructure: domain registration, secure hosting, SSL, and ongoing maintenance so you never have to worry about uptime.",
    features: ["Cloud hosting setup", "Domain management", "SSL certificates", "99.9% uptime guarantee"],
    details: [
      {
        heading: "Enterprise-Grade Hosting",
        text: "Your site runs on world-class cloud infrastructure with automatic backups, DDoS protection, and CDN distribution. Fast load times for visitors in Nairobi, Mombasa, or anywhere globally.",
      },
      {
        heading: "Domain Management",
        text: "We help you find and register the perfect domain, set up DNS, configure email, and manage renewals. One less thing for you to worry about.",
      },
      {
        heading: "SSL & Security",
        text: "Every site we host gets a free SSL certificate, firewall protection, and automated security scanning. Your customers' data stays safe, and Google ranks you higher for it.",
      },
    ],
    imageUrl: serviceDomain,
    sortOrder: 4,
    published: true,
  },
  {
    slug: "maintenance-support",
    icon: "Shield",
    title: "Maintenance & Support",
    tagline: "We keep it running so you don't have to",
    description: "Your digital assets need ongoing care. We provide proactive monitoring, security updates, and technical support to keep everything running smoothly.",
    features: ["24/7 monitoring", "Security patches", "Performance optimization", "Priority support"],
    details: [
      {
        heading: "Proactive Monitoring",
        text: "We don't wait for things to break. Our monitoring systems catch issues before they affect your users: downtime alerts, performance degradation, and security threats handled in real-time.",
      },
      {
        heading: "Regular Updates",
        text: "Software dependencies, security patches, content updates, and feature improvements. We keep your digital assets current, secure, and performing at their best.",
      },
      {
        heading: "Dedicated Support",
        text: "Got an issue? Reach us via WhatsApp, email, or phone. Our team responds within the hour during business hours, with emergency support available 24/7 for critical issues.",
      },
    ],
    imageUrl: serviceSupport,
    sortOrder: 5,
    published: true,
  },
];

export const defaultProjects: Project[] = [
  {
    slug: "kenya-snakebite-research-centre",
    title: "Kenya Snakebite Research Centre",
    client: "KSRIC",
    category: "Web Application",
    description:
      "Developed the official digital platform for the Kenya Snakebite Research Centre (KSRIC), a dynamic, data-driven system that brings critical research, resources, and hospital information to the public and medical professionals across Kenya.",
    highlights: [
      "Developed the official digital platform for the Kenya Snakebite Research Centre (KSRIC)",
      "Built a dynamic, data-driven system to manage staff profiles, publications, news, events, and hospital directories",
      "Engineered a robust, intuitive admin dashboard to streamline end-to-end content management",
    ],
    results: ["Full CMS & admin dashboard", "Hospital directory system", "Publications & events platform"],
    tags: ["Laravel", "PHP", "MySQL", "Admin Dashboard", "Content Management", "Healthcare"],
    color: "from-emerald-600/80 to-teal-800/90",
    imageUrl: ksricDisplay,
    liveUrl: "https://www.ksric.org/",
    featured: true,
    sortOrder: 0,
    published: true,
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
    imageUrl: insdevDisplay,
    liveUrl: "https://www.insdevconsulting.com/",
    featured: true,
    sortOrder: 1,
    published: true,
  },
];

export const defaultTeam: TeamMember[] = [
  {
    name: "Loyd Ngei",
    role: "Co-Founder & Operator",
    bio: "Full-stack developer and builder passionate about creating technology that makes a real difference for businesses. Every project is built with the same care and precision I'd want for my own business.",
    photoUrl: founderPhoto,
    github: "https://github.com/LoydNgei",
    linkedin: null,
    twitter: null,
    sortOrder: 0,
    published: true,
  },
  {
    name: "Powell Habwe",
    role: "Co-Founder & Software Engineer",
    bio: "Software engineer with 3+ years building robust, scalable systems. Proficient in Go, Python, Java, React and TypeScript, with a strong background in backend development, cloud infrastructure (GCP, AWS), and network security (CCNA, CISSP).",
    photoUrl: powellPhoto,
    github: "https://github.com/PowellHabwe",
    linkedin: "https://www.linkedin.com/in/powell-habwe-558b36230/",
    twitter: null,
    sortOrder: 1,
    published: true,
  },
];

export const defaultSettings: SiteSettings = {
  hero: {
    before: "We build digital",
    highlight: "solutions that grow",
    after: "your business",
    subtitle:
      "From powerful web platforms to seamless payment systems, we partner with businesses to build technology that actually works.",
    primaryCta: "Start a project",
    secondaryCta: "View our work",
    imageUrl: heroBg,
    stats: [
      { value: "2+", label: "Projects Delivered" },
      { value: "100%", label: "Client Satisfaction" },
    ],
  },
  homeServices: { eyebrow: "What We Do", before: "Solutions that", highlight: "move the needle", after: "" },
  process: {
    eyebrow: "Our Process",
    before: "How we",
    highlight: "make it happen",
    after: "",
    steps: [
      {
        icon: "MessageSquare",
        title: "Discovery Call",
        description:
          "We start with a conversation. Tell us about your business, goals, and pain points. No jargon, just a real chat about where you want to go.",
      },
      {
        icon: "Search",
        title: "Research & Strategy",
        description:
          "We dig into your market, competitors, and audience. Then we craft a tailored strategy with clear milestones and deliverables.",
      },
      {
        icon: "Code",
        title: "Design & Build",
        description:
          "Our team gets to work: designing, coding, and testing. You get regular updates and previews so nothing catches you off guard.",
      },
      {
        icon: "Rocket",
        title: "Launch & Grow",
        description:
          "We launch your project and stick around. Ongoing support, performance monitoring, and optimizations to keep you growing.",
      },
    ],
  },
  homeProjects: { eyebrow: "Our Work", before: "Featured", highlight: "projects", after: "" },
  cta: {
    title: "Ready to build something great?",
    subtitle: "Let's discuss your business challenges, no pressure, just solutions.",
    buttonLabel: "Get in touch",
  },
  servicesPage: {
    eyebrow: "Our Services",
    before: "Everything you need to",
    highlight: "win online",
    after: "",
    intro: "End-to-end digital solutions designed for businesses that want to grow fast and operate lean.",
  },
  projectsPage: {
    eyebrow: "Our Work",
    before: "Projects that",
    highlight: "speak results",
    after: "",
    intro:
      "Every project is a partnership. Here's a look at the real digital solutions we've built, and the problems we've solved, for businesses across Kenya.",
  },
  about: {
    eyebrow: "About Us",
    before: "Built for business,",
    highlight: "rooted in Kenya",
    after: "",
    paragraphs: [
      "Tujenge Solutions was born from a simple conviction: every Kenyan SME deserves access to world-class technology. We partner with businesses to design, build, and scale digital solutions that drive real, measurable growth, not just beautiful interfaces.",
      "\"Tujenge\" means *let's build* in Swahili, and that's exactly what we do. One solution at a time, one business at a time.",
    ],
    pillars: [
      {
        icon: "Target",
        title: "Our Mission",
        description:
          "To empower Kenyan SMEs and businesses with digital solutions that drive measurable growth, operational efficiency, and competitive advantage.",
      },
      {
        icon: "Eye",
        title: "Our Vision",
        description:
          "To be the most trusted technology partner for ambitious businesses building the future of Kenya's economy.",
      },
      {
        icon: "Users",
        title: "Our Approach",
        description:
          "We listen first, build second. Every solution is deeply tailored to your specific business challenges, your market, and your growth goals.",
      },
    ],
    team: {
      eyebrow: "The Team",
      before: "Small team,",
      highlight: "big impact",
      after: "",
      intro:
        "Two builders united by a shared conviction: that Kenyan businesses deserve world-class technology. Built on dedication, craft, and a genuine passion for results.",
    },
  },
  contact: {
    eyebrow: "Contact",
    before: "Let's build something",
    highlight: "extraordinary",
    after: "",
    email: "inquiry@tujengesolutions.com",
    phone: "+254 786 379 020",
    location: "Nairobi, Kenya",
    whatsappNumber: "254786379020",
    whatsappMessage: "Hi Tujenge Solutions! I'd like to discuss a project.",
  },
  footer: {
    blurb: "Building smart, scalable digital solutions for SMEs and businesses across Kenya. Your growth is our mission.",
    socials: [
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "TikTok", href: "#" },
    ],
  },
};

export const defaultContent: SiteContent = {
  services: defaultServices,
  projects: defaultProjects,
  team: defaultTeam,
  settings: defaultSettings,
};

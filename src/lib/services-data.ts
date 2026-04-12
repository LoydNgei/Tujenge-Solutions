import { Code, Zap, TrendingUp, Cog, Globe, Shield } from "lucide-react";

export const services = [
  {
    slug: "web-development",
    icon: Code,
    title: "Web Development",
    tagline: "Fast, modern websites that convert",
    description: "We craft modern, high-performance websites and web applications using the latest frameworks. Whether it's a sleek landing page or a full-stack SaaS platform, we build it to convert and scale.",
    features: ["React & Next-gen frameworks", "Mobile-first responsive design", "E-commerce platforms", "Progressive Web Apps"],
    details: [
      {
        heading: "Built for Performance",
        text: "Every site we ship scores 90+ on Lighthouse. We use server-side rendering, image optimization, and edge caching to make your site load in under 2 seconds — anywhere in Kenya and beyond.",
      },
      {
        heading: "E-Commerce Ready",
        text: "From Shopify integrations to fully custom storefronts with M-Pesa and card payments. We build online stores that handle real African commerce — multi-currency, mobile-first, and built to sell.",
      },
      {
        heading: "Scalable Architecture",
        text: "We don't build sites that break when you grow. Our architecture handles 10 visitors or 10,000 without flinching. Cloud-native, auto-scaling, and always available.",
      },
    ],
  },
  {
    slug: "ai-automation",
    icon: Zap,
    title: "AI Automation",
    tagline: "Let machines handle the grunt work",
    description: "Streamline your operations with intelligent automation. We integrate AI into your workflows to eliminate manual processes, reduce errors, and free your team to focus on high-value work.",
    features: ["Workflow automation", "AI chatbots & assistants", "Data processing pipelines", "Smart notifications"],
    details: [
      {
        heading: "Custom AI Agents",
        text: "We build AI assistants tailored to your business — customer support bots that speak your brand's voice, data analysts that crunch numbers while you sleep, and smart workflows that run on autopilot.",
      },
      {
        heading: "Process Automation",
        text: "Manual data entry, invoice processing, report generation — we automate it all. Connect your existing tools (Google Sheets, WhatsApp, email) with intelligent pipelines that just work.",
      },
      {
        heading: "Predictive Analytics",
        text: "Turn your data into decisions. Our AI models analyze sales patterns, customer behavior, and market trends to give you actionable insights before your competitors even see them coming.",
      },
    ],
  },
  {
    slug: "seo-digital-marketing",
    icon: TrendingUp,
    title: "SEO & Digital Marketing",
    tagline: "Get found. Get clicks. Get customers.",
    description: "Get found. Get clicks. Get customers. Our data-driven marketing strategies combine SEO, social media, and paid advertising to drive real revenue growth.",
    features: ["Search engine optimization", "Social media campaigns", "Google & Meta ads", "Analytics & reporting"],
    details: [
      {
        heading: "Rank Higher on Google",
        text: "We do the keyword research, technical audits, and content optimization that moves you from page 5 to page 1. Local SEO included — dominate 'near me' searches across Nairobi and Kenya.",
      },
      {
        heading: "Social Media That Converts",
        text: "Not just likes — leads. We create content strategies for Instagram, TikTok, LinkedIn, and X that build your brand and drive actual business results. We handle everything from content creation to community management.",
      },
      {
        heading: "Paid Advertising",
        text: "Google Ads, Facebook Ads, Instagram Ads — we manage campaigns that deliver ROI, not vanity metrics. Data-driven targeting, A/B testing, and continuous optimization to maximize every shilling you spend.",
      },
    ],
  },
  {
    slug: "custom-systems",
    icon: Cog,
    title: "Custom Systems",
    tagline: "Software built around your business",
    description: "Off-the-shelf software doesn't fit? We design and build bespoke systems tailored to your exact business needs — inventory, HR, logistics, you name it.",
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
        text: "Multi-branch support, M-Pesa payment tracking, USSD menus, SMS notifications — we build with the Kenyan and African market in mind because that's where your customers are.",
      },
    ],
  },
  {
    slug: "domain-hosting",
    icon: Globe,
    title: "Domain & Hosting",
    tagline: "Your web infrastructure, handled",
    description: "We handle your entire web infrastructure — domain registration, secure hosting, SSL, and ongoing maintenance so you never have to worry about uptime.",
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
  },
  {
    slug: "maintenance-support",
    icon: Shield,
    title: "Maintenance & Support",
    tagline: "We keep it running so you don't have to",
    description: "Your digital assets need ongoing care. We provide proactive monitoring, security updates, and technical support to keep everything running smoothly.",
    features: ["24/7 monitoring", "Security patches", "Performance optimization", "Priority support"],
    details: [
      {
        heading: "Proactive Monitoring",
        text: "We don't wait for things to break. Our monitoring systems catch issues before they affect your users — downtime alerts, performance degradation, and security threats handled in real-time.",
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
  },
] as const;

export type Service = (typeof services)[number];

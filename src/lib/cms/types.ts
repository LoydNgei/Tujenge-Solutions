export type ServiceDetail = { heading: string; text: string };

export type Service = {
  id?: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  imageUrl: string | null;
  features: string[];
  details: ServiceDetail[];
  sortOrder: number;
  published: boolean;
};

export type Project = {
  id?: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  highlights: string[];
  results: string[];
  tags: string[];
  color: string;
  imageUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  sortOrder: number;
  published: boolean;
};

export type TeamMember = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
  github: string | null;
  linkedin: string | null;
  twitter: string | null;
  sortOrder: number;
  published: boolean;
};

/** A heading rendered as `before <gold>highlight</gold> after`. */
export type Headline = { eyebrow: string; before: string; highlight: string; after: string };

export type IconCard = { icon: string; title: string; description: string };

export type SiteSettings = {
  hero: {
    before: string;
    highlight: string;
    after: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    imageUrl: string | null;
    stats: { value: string; label: string }[];
  };
  homeServices: Headline;
  process: Headline & { steps: IconCard[] };
  homeProjects: Headline;
  cta: { title: string; subtitle: string; buttonLabel: string };
  servicesPage: Headline & { intro: string };
  projectsPage: Headline & { intro: string };
  about: Headline & {
    paragraphs: string[];
    pillars: IconCard[];
    team: Headline & { intro: string };
  };
  contact: Headline & {
    email: string;
    phone: string;
    location: string;
    whatsappNumber: string;
    whatsappMessage: string;
  };
  footer: { blurb: string; socials: { label: string; href: string }[] };
};

export type SiteContent = {
  services: Service[];
  projects: Project[];
  team: TeamMember[];
  settings: SiteSettings;
};

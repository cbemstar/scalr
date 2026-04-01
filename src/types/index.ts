// Shared TypeScript types for the website

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  business: string;
  location: string;
  quote: string;
  avatar?: string;
  result?: string; // e.g. "3x more enquiries in 60 days"
}

export interface PortfolioItem {
  id: string;
  title: string;
  niche: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  isConcept?: boolean; // true for fictional demo sites
}

export interface FAQItem {
  question: string;
  answer: string;
}

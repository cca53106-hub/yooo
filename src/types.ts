export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  iconName: string;
  benefits: string[];
  features: string[];
  badge?: string;
  pkrPrice: number;
}

export interface PricingPlan {
  id: string;
  title: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  ctaText: string;
  whatsappMessage: string;
}

export interface Testimony {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
  avatar: string;
}

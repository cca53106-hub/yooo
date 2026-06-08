import { ServiceItem, PricingPlan, Testimony } from "./types";

export const agencyDetails = {
  name: "M. Mehaal Khattak",
  tagline: "Next-Gen AI Systems & Conversational Automation",
  whatsappNumber: "+923302930930",
  whatsappRaw: "03302930930",
  email: "contact@mehaalkhattak.ai",
  address: "Karachi, Pakistan",
  foundedYear: 2026,
  description: "AI agency providing digital services including AI systems, automation, and website development."
};

export const servicesData: ServiceItem[] = [
  {
    id: "ai-call-agent",
    title: "AI Call Agent",
    description: "AI system that handles customer calls and responses.",
    longDescription: "Deploy human-sounding, low-latency AI voice agents that handle inbound support calls, book appointments, collect client leads, and follow up instantly — active 24/7 with zero downtime.",
    iconName: "PhoneCall",
    pkrPrice: 50000,
    badge: "Most Advanced",
    benefits: [
      "24/7 automated telephone front-desk",
      "Low latency, ultra-realistic human speech synthesis",
      "Dynamic data-lookup (CRM / Sheets integration)"
    ],
    features: [
      "Custom voice selection & matching",
      "Inbound & Outbound calling routes",
      "Automatic call transcripts & sentiment analysis",
      "Unlimited simultaneous lines handling"
    ]
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    description: "Automation for business workflows and messaging.",
    longDescription: "End-to-end integration mapping for complex web workspaces. We link your CRMs, lead magnets, WhatsApp messaging pipelines, and email list triggers using custom scripts & AI brains.",
    iconName: "Cpu",
    pkrPrice: 30000,
    badge: "Highest ROI",
    benefits: [
      "Save thousands of manual repetitive hours",
      "Eliminate human errors in entry & scheduling",
      "Instant response triggering for incoming customer leads"
    ],
    features: [
      "WhatsApp & Slack team-notifications channels",
      "Automated lead capturing & CRM distribution",
      "Smart document & invoice layout parsing",
      "Multi-step app-to-app webhook connectors"
    ]
  },
  {
    id: "website-building",
    title: "Website Building",
    description: "Standard responsive websites for businesses.",
    longDescription: "High-performance, search-optimized landing pages and SaaS portals constructed with lightning-fast framework architectures. Beautiful design meets robust responsive layouts.",
    iconName: "Globe",
    pkrPrice: 15000,
    badge: "Business Standard",
    benefits: [
      "Maximum speed score for better SEO positioning",
      "Meticulous mobile-responsive styling parameters",
      "Includes analytics dashboard tracking"
    ],
    features: [
      "Modern animations & layout elements",
      "SEO setup & Google Search Console indexing",
      "Fast CDN deployment",
      "Interactive forms & automated email outreach"
    ]
  },
  {
    id: "3d-website",
    title: "3D Websites",
    description: "Interactive websites with 3D visuals.",
    longDescription: "Immersive web environments built with WebGL and shaders. Capture visitor attention with premium, tactile interactive custom assets, and ambient particles.",
    iconName: "Layers",
    pkrPrice: 30000,
    badge: "Premium Experience",
    benefits: [
      "Instant brand premium differentiation",
      "10x higher user dwell-time & engagement rate",
      "Memorable aesthetic identity suited for tech niches"
    ],
    features: [
      "Fluid 3D interactive graphics & shading",
      "Scroll-responsive 3D object rendering",
      "Hardware-accelerated performance logic",
      "Physics canvas integration"
    ]
  },
  {
    id: "ai-chatbot",
    title: "AI Chatbots / Business Agents",
    description: "Intelligent messaging agents to qualify leads 24/7.",
    longDescription: "Deploy intelligent automated chat agents onto your websites & social profiles to capture customer numbers, reply to FAQs, and automatically sync leads into your workspace.",
    iconName: "MessageSquare",
    pkrPrice: 25000,
    badge: "Standard Conversions",
    benefits: [
      "Increase website lead conversion rate",
      "Never miss a potential prospect 24/7",
      "Qualify and capture phone numbers instantly"
    ],
    features: [
      "Multi-channel support setup",
      "Dynamic data injection from Sheets",
      "Lead scoring analytics integrations",
      "Custom brand voice training"
    ]
  },
  {
    id: "ai-trading-bot",
    title: "AI Trading Bots",
    description: "Algorithmic automated trading systems with risk-management.",
    longDescription: "Custom programmed risk-managed bots running pre-coded indicators to execute trades based on math, reducing emotional decisions entirely.",
    iconName: "Cpu",
    pkrPrice: 0,
    badge: "Custom Algorithm",
    benefits: [
      "Reduce emotional-based trading decisions",
      "24/7 active market parameters monitoring",
      "Tight risk-hedging drawdowns automated"
    ],
    features: [
      "Multi-indicator custom script logic",
      "Hedge strategy setup protection",
      "Real-time volatility tracking dashboard",
      "Backtested rules calibration"
    ]
  },
  {
    id: "ai-automation-course",
    title: "AI Automation Course",
    description: "Master AI workflow tools and script configurations.",
    longDescription: "Learn to build autonomous calling systems, custom API webhooks, and automatic lead pipelines yourself. Fast-track your mastery of Zapier, Make, and local AI agent scripts step by step directly.",
    iconName: "BookOpen",
    pkrPrice: 15000,
    badge: "Limited Seat Cohort",
    benefits: [
      "1-on-1 practical walkthrough of automation design",
      "Get pre-loaded templates for top automation routines",
      "Lifetime private mastermind group chat access"
    ],
    features: [
      "Make & Zapier end-to-end masterclass",
      "Connecting local AI LLM chat modules via APIs",
      "WhatsApp & CRM automation script setups",
      "Bonus: Active pre-built custom webhook templates"
    ]
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "p0",
    title: "AI Automation Course",
    price: 15000,
    period: "Lifetime",
    description: "Step-by-step custom curriculum to design, wire, and deploy robust autonomous software and workflow systems yourself.",
    features: [
      "9 step-by-step clear video training modules",
      "Pre-configured setup templates for 12 core channels",
      "Live webhook-sync and API chaining instructions",
      "Private Telegram priority mastermind group",
      "Direct peer system support & code blueprints",
      "Authorized Certificate of Completion"
    ],
    ctaText: "Enroll in Masterclass",
    whatsappMessage: "Hi Mehaal! I want to enroll in the AI Automation Course (15,000 PKR). Let me know batch details."
  },
  {
    id: "p1",
    title: "Website Building",
    price: 15000,
    period: "One-Time",
    description: "Standard responsive websites designed to level-up your business on the modern web with rich performance.",
    features: [
      "Fully responsive mobile & desktop UI",
      "Contact forms & lead storage tracking",
      "Speed optimization & SEO essentials",
      "Standard interactive styling integrations",
      "3 dynamic template pages Included",
      "1 month of dedicated post-launch support"
    ],
    ctaText: "Secure Website Build",
    whatsappMessage: "Hi Mehaal! I am interested in the Website Building plan (15,000 PKR). Let's design a high-converting web solution."
  },
  {
    id: "p2",
    title: "AI Automation",
    price: 30000,
    period: "One-Time Setup",
    description: "Intelligent chatbot setups, workflow automation, and automated database sync setups.",
    features: [
      "Custom Zapier / Make automation maps",
      "Auto-sync Google Sheets to your CRM",
      "2 workflow triggers customized",
      "Instant WhatsApp automated notifications",
      "Automated lead qualifier chatbot system",
      "2 weeks of calibration & workflow validation"
    ],
    popular: true,
    ctaText: "Build Automation Setup",
    whatsappMessage: "Hi Mehaal! I want to integrate the AI Automation plan (30,000 PKR) into our company pipeline."
  },
  {
    id: "p5",
    title: "AI Chatbots / Business Agents",
    price: 25000,
    period: "One-Time Setup",
    description: "Intelligent customer capture agents built for maximum conversion on website & social nodes.",
    features: [
      "24/7 prompt website response coverage",
      "Direct GSheets client entry integration",
      "Bilingual chat agent prompt calibration",
      "Lead validation and phone scraping",
      "Dynamic FAQ script custom setup",
      "Full analytics lead tracking board"
    ],
    ctaText: "Deploy Business Chatbots",
    whatsappMessage: "Hi Mehaal! I am looking to deploy the AI Chatbots & Business Agent setup (25,000 PKR)."
  },
  {
    id: "p3",
    title: "3D Website Design",
    price: 30000,
    period: "One-Time",
    description: "Next-level immersive layouts featuring 3D visuals, interactive web elements, and custom premium interfaces.",
    features: [
      "Custom glassmorphism theme components",
      "WebGL rendering canvas integrations",
      "Unique layout scrolling camera motions",
      "Highly responsive custom controls",
      "Up to 4 custom highly-stylized pages",
      "Custom icon set design styling"
    ],
    ctaText: "Build 3D Web Immersive",
    whatsappMessage: "Hi Mehaal! I am looking to build a premium 3D Website (30,000 PKR) with interactive layouts."
  },
  {
    id: "p4",
    title: "AI Call Agent",
    price: 50000,
    period: "One-Time",
    description: "Autonomous high-performance conversational calling agent capable of active customer calls and operations.",
    features: [
      "Advanced natural language processing voice model",
      "Full CRM, booking & GSheets script link",
      "Uncapped concurrent incoming phone lines",
      "Dynamic prompt tuning for custom support pitch",
      "Continuous sentiment scoring database dashboard",
      "30 days dedicated support & live system tweaks"
    ],
    ctaText: "Deploy Call Agent",
    whatsappMessage: "Hi Mehaal! I'm interested in deploying the full-featured AI Call Agent (50,000 PKR) system."
  },
  {
    id: "p6",
    title: "AI Trading Bots",
    price: 0,
    period: "Custom Setup",
    description: "Premium automated algorithmic trading agents modeled under maximum risk control controls.",
    features: [
      "Pre-coded mathematical strategy rules",
      "Automated portfolio hedging scripts",
      "Backtested indicators with 1.5% drawdown buffers",
      "24/7 direct MT4/MT5 bracket integration",
      "Zero emotional-based trading decisions",
      "Lifetime algorithm updates & maintenance"
    ],
    ctaText: "Consult Custom Trading Bot",
    whatsappMessage: "Hi Mehaal! I want to consult for a custom AI Trading Bot setup."
  }
];

export const testimonials: Testimony[] = [
  {
    id: "t1",
    name: "Zidan Ahmed",
    role: "CEO",
    company: "Apex Tech Retail",
    text: "The AI Call Agent designed by M. Mehaal Khattak completely changed how we handle customer support. It fields customer queries instantly and logs them to our database. Best agency ROI by far!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
  },
  {
    id: "t2",
    name: "Sana Malik",
    role: "Operations Director",
    company: "Global Logistics Group",
    text: "Their team built a custom WhatsApp auto-notification workflow that saved our staff about 20 hours of manual work every week. Prompt, professional, and pure quality work.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
  },
  {
    id: "t3",
    name: "Kamran Shah",
    role: "Founder",
    company: "Metaverse Real Estate",
    text: "We ordered the interactive 3D Web environment. Clients always comment on how immersive it is! The kinetic effects and responsive performance feels incredibly premium.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150"
  }
];

export const faqItems = [
  {
    question: "What exactly does M. Mehaal Khattak AI Agency do?",
    answer: "We specialize in developing next-generation automation pipelines, intelligent voice-enabled call agents, standard business websites, and immersive interactive 3D web environments designed to boost engagement and drastically lower operational costs."
  },
  {
    question: "Can the AI Call Agent connect to my existing software tools?",
    answer: "Yes, absolutely! We connect your calling agents directly to Google Sheets, custom CRMs (like HubSpot, Salesforce, or Zoho), booking platforms like Calendly, and other backends via secure webhooks and JSON endpoints."
  },
  {
    question: "How long does it take to deploy a standard website versus an AI system?",
    answer: "Standard modern business websites are fully deployed in 5 to 7 business days. Complex AI Voice Call Systems and full automated pipelines take approximately 10 to 14 days, including rigorous test calibrations and sentiment reporting verification."
  },
  {
    question: "What technology stack do you use for your interactive 3D Websites?",
    answer: "We employ highly portable, top-tier, hardware-accelerated rendering solutions including WebGL, Three.js, lightweight custom shaders, and tailwind layouts to achieve luxurious interactive results while maintaining perfect loading speed scores."
  }
];

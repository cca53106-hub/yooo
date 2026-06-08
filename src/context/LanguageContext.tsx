import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "en" | "ur";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    "nav.services": "Services",
    "nav.tradingBot": "Trading Bot",
    "nav.pricing": "Pricing",
    "nav.faqs": "FAQs",
    "nav.contact": "Contact",
    "nav.consultation": "Consultation",
    "nav.accessTradingBot": "Access Trading Bot",
    "nav.whatsappInquiry": "WhatsApp Inquiry",
    "nav.systemOnline": "SYSTEM ONLINE",
    "nav.systemActive": "SYSTEM ENCRYPTED & ACTIVE",
    "nav.title": "AI SYSTEMS",

    // Hero Section
    "hero.animatedWorkforce": "DEPLOY AUTOMATED WORKFORCE",
    "hero.tagline": "Next-Gen AI Systems & Conversational Automation",
    "hero.sub": "Run low-latency AI caller systems, build multi-step workflow automations, & deploy hardware-accelerated 3D websites.",
    "hero.buildModern": "Build Modern Web",
    "hero.priceRange": "15,000 PKR to 50,000 PKR",
    "hero.noContract": "No retention contracts, high-performance systems with fast code delivery in Pakistan & globally.",
    "hero.viewServices": "View Systems & Services",
    "hero.secureConsultation": "Secure Consultation",
    "hero.scrollExplore": "SCROLL TO EXPLORE PARAMETERS",

    // Services Section
    "services.badge": "OUR Digital Core SERVICES",
    "services.heading": "Architected for Operational Speed & Peak Performance",
    "services.sub": "Expert systems engineered with extreme visual polish, interactive user interfaces, & bulletproof backend automation logic in Pakistan.",
    "services.includes": "Includes:",
    "services.startDiscussion": "Get Started & Project Discussion",

    // Services translations detail
    "service.ai-call-agent.title": "AI Call Agent",
    "service.ai-call-agent.desc": "AI system that handles customer calls and responses.",
    "service.ai-call-agent.longDesc": "Deploy human-sounding, low-latency AI voice agents that handle inbound support calls, book appointments, collect client leads, and follow up instantly — active 24/7 with zero downtime.",
    "service.ai-call-agent.badge": "Most Advanced",
    "service.ai-call-agent.benefit.0": "24/7 automated telephone front-desk",
    "service.ai-call-agent.benefit.1": "Low latency, ultra-realistic human speech synthesis",
    "service.ai-call-agent.benefit.2": "Dynamic data-lookup (CRM / Sheets integration)",
    "service.ai-call-agent.feature.0": "Custom voice selection & matching",
    "service.ai-call-agent.feature.1": "Inbound & Outbound calling routes",
    "service.ai-call-agent.feature.2": "Automatic call transcripts & sentiment analysis",
    "service.ai-call-agent.feature.3": "Unlimited simultaneous lines handling",

    "service.ai-automation.title": "AI Automation",
    "service.ai-automation.desc": "Automation for business workflows and messaging.",
    "service.ai-automation.longDesc": "End-to-end integration mapping for complex web workspaces. We link your CRMs, lead magnets, WhatsApp messaging pipelines, and email list triggers using custom scripts & AI brains.",
    "service.ai-automation.badge": "Highest ROI",
    "service.ai-automation.benefit.0": "Save thousands of manual repetitive hours",
    "service.ai-automation.benefit.1": "Eliminate human errors in entry & scheduling",
    "service.ai-automation.benefit.2": "Instant response triggering for incoming customer leads",
    "service.ai-automation.feature.0": "WhatsApp & Slack team-notifications channels",
    "service.ai-automation.feature.1": "Automated lead capturing & CRM distribution",
    "service.ai-automation.feature.2": "Smart document & invoice layout parsing",
    "service.ai-automation.feature.3": "Multi-step app-to-app webhook connectors",

    "service.website-building.title": "Website Building",
    "service.website-building.desc": "Standard responsive websites for businesses.",
    "service.website-building.longDesc": "High-performance, search-optimized landing pages and SaaS portals constructed with lightning-fast framework architectures. Beautiful design meets robust responsive layouts.",
    "service.website-building.badge": "Business Standard",
    "service.website-building.benefit.0": "Maximum speed score for better SEO positioning",
    "service.website-building.benefit.1": "Meticulous mobile-responsive styling parameters",
    "service.website-building.benefit.2": "Includes analytics dashboard tracking",
    "service.website-building.feature.0": "Modern animations & layout elements",
    "service.website-building.feature.1": "SEO setup & Google Search Console indexing",
    "service.website-building.feature.2": "Fast CDN deployment",
    "service.website-building.feature.3": "Interactive forms & automated email outreach",

    "service.3d-website.title": "3D Websites",
    "service.3d-website.desc": "Interactive websites with 3D visuals.",
    "service.3d-website.longDesc": "Immersive web environments built with WebGL and shaders. Capture visitor attention with premium, tactile interactive custom assets, and ambient particles.",
    "service.3d-website.badge": "Premium Experience",
    "service.3d-website.benefit.0": "Instant brand premium differentiation",
    "service.3d-website.benefit.1": "10x higher user dwell-time & engagement rate",
    "service.3d-website.benefit.2": "Memorable aesthetic identity suited for tech niches",
    "service.3d-website.feature.0": "Fluid 3D interactive graphics & shading",
    "service.3d-website.feature.1": "Scroll-responsive 3D object rendering",
    "service.3d-website.feature.2": "Hardware-accelerated performance logic",
    "service.3d-website.feature.3": "Physics canvas integration",

    "service.ai-automation-course.title": "AI Automation Course",
    "service.ai-automation-course.desc": "Master AI workflow tools and script configurations.",
    "service.ai-automation-course.longDesc": "Learn to build autonomous calling systems, custom API webhooks, and automatic lead pipelines yourself. Fast-track your mastery of Zapier, Make, and local AI agent scripts step by step directly.",
    "service.ai-automation-course.badge": "Limited Seat Cohort",
    "service.ai-automation-course.benefit.0": "1-on-[1] practical walkthrough of automation design",
    "service.ai-automation-course.benefit.1": "Get pre-loaded templates for top automation routines",
    "service.ai-automation-course.benefit.2": "Lifetime private mastermind group chat access",
    "service.ai-automation-course.feature.0": "Make & Zapier end-to-end masterclass",
    "service.ai-automation-course.feature.1": "Connecting local AI LLM chat modules via APIs",
    "service.ai-automation-course.feature.2": "WhatsApp & CRM automation script setups",
    "service.ai-automation-course.feature.3": "Bonus: Active pre-built custom webhook templates",

    "service.ai-chatbot.title": "AI Chatbots / Business Agents",
    "service.ai-chatbot.desc": "Intelligent messaging agents to qualify leads 24/7.",
    "service.ai-chatbot.longDesc": "Deploy intelligent automated chat agents onto your websites & social profiles to capture customer numbers, reply to FAQs, and automatically sync leads into your workspace.",
    "service.ai-chatbot.badge": "Standard Conversions",
    "service.ai-chatbot.benefit.0": "Increase website lead conversion rate",
    "service.ai-chatbot.benefit.1": "Never miss a potential prospect 24/7",
    "service.ai-chatbot.benefit.2": "Qualify and capture phone numbers instantly",
    "service.ai-chatbot.feature.0": "Multi-channel support setup",
    "service.ai-chatbot.feature.1": "Dynamic data injection from Sheets",
    "service.ai-chatbot.feature.2": "Lead scoring analytics integrations",
    "service.ai-chatbot.feature.3": "Custom brand voice training",

    "service.ai-trading-bot.title": "AI Trading Bots",
    "service.ai-trading-bot.desc": "Algorithmic automated trading systems with risk-management.",
    "service.ai-trading-bot.longDesc": "Custom programmed risk-managed bots running pre-coded indicators to execute trades based on math, reducing emotional decisions entirely.",
    "service.ai-trading-bot.badge": "Custom Algorithm",
    "service.ai-trading-bot.benefit.0": "Reduce emotional-based trading decisions",
    "service.ai-trading-bot.benefit.1": "24/7 active market parameters monitoring",
    "service.ai-trading-bot.benefit.2": "Tight risk-hedging drawdowns automated",
    "service.ai-trading-bot.feature.0": "Multi-indicator custom script logic",
    "service.ai-trading-bot.feature.1": "Hedge strategy setup protection",
    "service.ai-trading-bot.feature.2": "Real-time volatility tracking dashboard",
    "service.ai-trading-bot.feature.3": "Backtested rules calibration",

    // Trading Bot
    "trading.badge": "PROPRIETARY TRADING LOGIC",
    "trading.heading": "Live Trading Dashboard Core Engine",
    "trading.sub": "A live look at our state-of-the-art algorithmic systems handling quantitative currency indicators under strict margin controls.",
    "trading.sysIndicators": "System Indicators",
    "trading.realtimeDesc": "Real-time volatility and trend lines rendered directly on custom high-frequency data structures",
    "trading.risk": "Algorithmic Risk Management",
    "trading.riskDesc": "Pre-coded hedge parameter configurations instantly secure drawdowns down to custom 1.5% margins.",
    "trading.strategic": "Strategic Market Insights",
    "trading.strategicDesc": "Analyzing currency shifts with hardware accelerated graphics",
    "trading.signal": "Live Market Trend: High Volatility Cyber-Grid Signal",
    "trading.active": "Active",
    "trading.indicatorActive": "Indicator Active",
    "trading.margin": "Margin Ratio",
    "trading.leverage": "Leverage Tier",
    "trading.hedge": "Hedge Script",
    "trading.calibration": "Dynamic Calibration",
    "trading.passed": "Risk Threshold Passed",
    "trading.cta": "LAUNCH SECURO-CORE TRADING CONVERTOR",

    // Testimonials
    "testimonials.badge": "CLIENT FEEDBACK",
    "testimonials.heading": "What Our Clients Say",
    "testimonials.sub": "Objective evaluations from organizations optimizing production via our expert systems.",
    "testimony.t1.text": "The AI Call Agent designed by M. Mehaal Khattak completely changed how we handle customer support. It fields customer queries instantly and logs them to our database. Best agency ROI by far!",
    "testimony.t1.role": "CEO",
    "testimony.t2.text": "Their team built a custom WhatsApp auto-notification workflow that saved our staff about 20 hours of manual work every week. Prompt, professional, and pure quality work.",
    "testimony.t2.role": "Operations Director",
    "testimony.t3.text": "We ordered the interactive 3D Web environment. Clients always comment on how immersive it is! The kinetic effects and responsive performance feels incredibly premium.",
    "testimony.t3.role": "Founder",

    // Pricing
    "pricing.badge": "INVESTMENT CHANNELS",
    "pricing.heading": "Transparent Pricing Packages",
    "pricing.sub": "No retention plans, simple clear investment layouts customized for Pakistani & International founders.",
    "pricing.pkr": "PKR Rates",
    "pricing.usd": "USD Equivalent",
    "pricing.mostPopular": "MOST POPULAR",

    "pricing.p0.title": "AI Automation Course",
    "pricing.p0.period": "Lifetime",
    "pricing.p0.desc": "Step-by-step custom curriculum to design, wire, and deploy robust autonomous software and workflow systems yourself.",
    "pricing.p0.cta": "Enroll in Masterclass",
    "pricing.p0.feature.0": "9 step-by-step clear video training modules",
    "pricing.p0.feature.1": "Pre-configured setup templates for 12 core channels",
    "pricing.p0.feature.2": "Live webhook-sync and API chaining instructions",
    "pricing.p0.feature.3": "Private Telegram priority mastermind group",
    "pricing.p0.feature.4": "Direct peer system support & code blueprints",
    "pricing.p0.feature.5": "Authorized Certificate of Completion",

    "pricing.p1.title": "Website Building",
    "pricing.p1.period": "One-Time",
    "pricing.p1.desc": "Standard responsive websites designed to level-up your business on the modern web with rich performance.",
    "pricing.p1.cta": "Secure Website Build",
    "pricing.p1.feature.0": "Fully responsive mobile & desktop UI",
    "pricing.p1.feature.1": "Contact forms & lead storage tracking",
    "pricing.p1.feature.2": "Speed optimization & SEO essentials",
    "pricing.p1.feature.3": "Standard interactive styling integrations",
    "pricing.p1.feature.4": "3 dynamic template pages Included",
    "pricing.p1.feature.5": "1 month of dedicated post-launch support",

    "pricing.p2.title": "AI Automation",
    "pricing.p2.period": "One-Time Setup",
    "pricing.p2.desc": "Intelligent chatbot setups, workflow automation, and automated database sync setups.",
    "pricing.p2.cta": "Build Automation Setup",
    "pricing.p2.feature.0": "Custom Zapier / Make automation maps",
    "pricing.p2.feature.1": "Auto-sync Google Sheets to your CRM",
    "pricing.p2.feature.2": "2 workflow triggers customized",
    "pricing.p2.feature.3": "Instant WhatsApp automated notifications",
    "pricing.p2.feature.4": "Automated lead qualifier chatbot system",
    "pricing.p2.feature.5": "2 weeks of calibration & workflow validation",

    "pricing.p5.title": "AI Chatbots / Business Agents",
    "pricing.p5.period": "One-Time Setup",
    "pricing.p5.desc": "Intelligent customer capture agents built for maximum conversion on website & social nodes.",
    "pricing.p5.cta": "Deploy Business Chatbots",
    "pricing.p5.feature.0": "24/7 prompt website response coverage",
    "pricing.p5.feature.1": "Direct GSheets client entry integration",
    "pricing.p5.feature.2": "Bilingual chat agent prompt calibration",
    "pricing.p5.feature.3": "Lead validation and phone scraping",
    "pricing.p5.feature.4": "Dynamic FAQ script custom setup",
    "pricing.p5.feature.5": "Full analytics lead tracking board",

    "pricing.p3.title": "3D Website Design",
    "pricing.p3.period": "One-Time",
    "pricing.p3.desc": "Next-level immersive layouts featuring 3D visuals, interactive web elements, and custom premium interfaces.",
    "pricing.p3.cta": "Build 3D Web Immersive",
    "pricing.p3.feature.0": "Custom glassmorphism theme components",
    "pricing.p3.feature.1": "WebGL rendering canvas integrations",
    "pricing.p3.feature.2": "Unique layout scrolling camera motions",
    "pricing.p3.feature.3": "Highly responsive custom controls",
    "pricing.p3.feature.4": "Up to 4 custom highly-stylized pages",
    "pricing.p3.feature.5": "Custom icon set design styling",

    "pricing.p4.title": "AI Call Agent",
    "pricing.p4.period": "One-Time",
    "pricing.p4.desc": "Autonomous high-performance conversational calling agent capable of active customer calls and operations.",
    "pricing.p4.cta": "Deploy Call Agent",
    "pricing.p4.feature.0": "Advanced natural language processing voice model",
    "pricing.p4.feature.1": "Full CRM, booking & GSheets script link",
    "pricing.p4.feature.2": "Uncapped concurrent incoming phone lines",
    "pricing.p4.feature.3": "Dynamic prompt tuning for custom support pitch",
    "pricing.p4.feature.4": "Continuous sentiment scoring database dashboard",
    "pricing.p4.feature.5": "30 days dedicated support & live system tweaks",

    "pricing.p6.title": "AI Trading Bots",
    "pricing.p6.period": "Custom Setup",
    "pricing.p6.desc": "Premium automated algorithmic trading agents modeled under maximum risk control controls.",
    "pricing.p6.cta": "Consult Custom Trading Bot",
    "pricing.p6.feature.0": "Pre-coded mathematical strategy rules",
    "pricing.p6.feature.1": "Automated portfolio hedging scripts",
    "pricing.p6.feature.2": "Backtested indicators with 1.5% drawdown buffers",
    "pricing.p6.feature.3": "24/7 direct MT4/MT5 bracket integration",
    "pricing.p6.feature.4": "Zero emotional-based trading decisions",
    "pricing.p6.feature.5": "Lifetime algorithm updates & maintenance",

    // FAQs
    "faqs.badge": "SYSTEM DOCUMENTATION",
    "faqs.heading": "Frequently Asked Questions",
    "faqs.sub": "Find immediate clarifications on core custom technical structures & delivery timelines.",
    
    "faq.0.question": "What exactly does M. Mehaal Khattak AI Agency do?",
    "faq.0.answer": "We specialize in developing next-generation automation pipelines, intelligent voice-enabled call agents, standard business websites, and immersive interactive 3D web environments designed to boost engagement and drastically lower operational costs.",
    
    "faq.1.question": "Can the AI Call Agent connect to my existing software tools?",
    "faq.1.answer": "Yes, absolutely! We connect your calling agents directly to Google Sheets, custom CRMs (like HubSpot, Salesforce, or Zoho), booking platforms like Calendly, and other backends via secure webhooks and JSON endpoints.",
    
    "faq.2.question": "How long does it take to deploy a standard website versus an AI system?",
    "faq.2.answer": "Standard modern business websites are fully deployed in 5 to 7 business days. Complex AI Voice Call Systems and full automated pipelines take approximately 10 to 14 days, including rigorous test calibrations and sentiment reporting verification.",
    
    "faq.3.question": "What technology stack do you use for your interactive 3D Websites?",
    "faq.3.answer": "We employ highly portable, top-tier, hardware-accelerated rendering solutions including WebGL, Three.js, lightweight custom shaders, and tailwind layouts to achieve luxurious interactive results while maintaining perfect loading speed scores.",

    // Contact
    "contact.badge": "SECURE ROUTE",
    "contact.heading": "Schedule Your Intelligent Solution",
    "contact.sub": "Let us analyze your digital architecture & deploy elite performance engines directly into your daily routine workflows.",
    "contact.yourName": "Your Full Legal Name",
    "contact.placeholderName": "e.g. Harris Khan",
    "contact.companyName": "Company Name / Business Name",
    "contact.placeholderCompany": "e.g. Apex Tech Retail",
    "contact.selectSolution": "Select Digital Solution",
    "contact.whatsappField": "Let's Talk WhatsApp Directly",
    "contact.projectDetails": "Describe Your Project Structure & Parameters",
    "contact.placeholderDetails": "Specify here how you want the AI systems, databases, websites, or call scripts structured...",
    "contact.ctaButton": "Schedule Deployment Project",
    "contact.inboundSupport": "Inbound Support Lines Queue",
    "contact.secureChannels": "Secure Server Channels",
    "contact.personalCalendar": "Mehaal's Personal Calendar Route",
    "contact.averageSpeed": "Average Project Blueprint Handshake",
    "contact.meetingMin": "28-Minutes Calibration",
    "contact.customTailored": "100% Custom Tailored Systems",

    // Footer
    "footer.rights": "All Rights Reserved.",
    "footer.privacy": "Privacy Charter",
    "footer.agreement": "Digital Master Agreement",
    "footer.whatsapp": "WhatsApp Support"
  },
  ur: {
    // Navbar
    "nav.services": "خدمات",
    "nav.tradingBot": "ٹریڈنگ بوٹ",
    "nav.pricing": "قیمتیں",
    "nav.faqs": "سوالات",
    "nav.contact": "رابطہ کریں",
    "nav.consultation": "مفت مشورہ",
    "nav.accessTradingBot": "ٹریڈنگ بوٹ تک رسائی",
    "nav.whatsappInquiry": "واٹس ایپ انکوائری",
    "nav.systemOnline": "سسٹم آن لائن ہے",
    "nav.systemActive": "سسٹم محفوظ اور فعال ہے",
    "nav.title": "اے آئی سسٹمز",

    // Hero Section
    "hero.animatedWorkforce": "خودکار کارکن سسٹمز کی شروعات",
    "hero.tagline": "اگلی نسل کے آرٹیفیشل انٹیلیجنس اور خودکار کالز سسٹمز",
    "hero.sub": "کم وقت میں جواب دینے والے خودکار اے آئی کالر سسٹمز چلائیں، پیچیدہ ویب ورک فلو کو خودکار بنائیں، اور تیز رفتار تھری ڈی (3D) ویب سائٹس شروع کریں۔",
    "hero.buildModern": "جدید ویب سائٹ بنوائیں",
    "hero.priceRange": "15,000 PKR سے 50,050 PKR تک",
    "hero.noContract": "کوئی طویل معاہدے نہیں، بہترین کارکردگی والے سسٹمز اور پاکستان اور دنیا بھر میں تیز ترین کوڈ کی ڈیلیوری۔",
    "hero.viewServices": "سروسز اور سسٹمز دیکھیں",
    "hero.secureConsultation": "محفوظ مشاورت حاصل کریں",
    "hero.scrollExplore": "نیچے اسکرول کریں",

    // Services Section
    "services.badge": "ہماری ڈیجیٹل سروسز",
    "services.heading": "کاروباری رفتار اور اعلیٰ کارکردگی کے لیے تیار کردہ",
    "services.sub": "ہماری تیار کردہ سروسز میں شاندار ڈیزائن، بہترین یوزر انٹرفیسز اور پاکستان میں زبردست خودکار سسٹمز شامل ہیں۔",
    "services.includes": "شامل ہے:",
    "services.startDiscussion": "گفتگو شروع کریں اور پروجیکٹ پر بات کریں",

    // Services translations detail
    "service.ai-call-agent.title": "اے آئی کسٹمر کال ایجنٹ",
    "service.ai-call-agent.desc": "اے آئی سسٹم جو کسٹمرز کی کالز اور جوابات سنبھالتا ہے۔",
    "service.ai-call-agent.longDesc": "انسان جیسی آواز والے اے آئی وائس ایجنٹس شروع کریں جو آنے والی سپورٹ کالز کا جواب دیں، ملاقاتیں بک کریں اور فوری فالو اپ کریں — بغیر کسی تعطل کے 24/7 فعال۔",
    "service.ai-call-agent.badge": "انتہائی جدید",
    "service.ai-call-agent.benefit.0": "24/7 خودکار ٹیلی فون فرنٹ ڈیسک",
    "service.ai-call-agent.benefit.1": "کم وقت میں جواب اور زبردست انسان جیسی آواز",
    "service.ai-call-agent.benefit.2": "براہ راست ڈیٹا انٹیگریشن (گوگل شیٹس اور مینیجمنٹ سسٹمز)",
    "service.ai-call-agent.feature.0": "کسٹم آواز کا انتخاب اور میچنگ",
    "service.ai-call-agent.feature.1": "ان باؤنڈ اور آؤٹ باؤنڈ کالنگ روٹس",
    "service.ai-call-agent.feature.2": "خودکار کال ٹرانسکرپٹ اور جذبات کا تجزیہ",
    "service.ai-call-agent.feature.3": "لامحدود لائنز ایک ساتھ سنبھالنے کی صلاحیت",

    "service.ai-automation.title": "اے آئی آٹومیشن",
    "service.ai-automation.desc": "کاروباری ورک فلو اور میسجنگ کے لیے خودکار سسٹمز۔",
    "service.ai-automation.longDesc": "پیچیدہ ویب ورکسپیسز کے لیے مکمل سسٹمز۔ ہم آپ کے کسٹمر سسٹمز (CRMs) اور واٹس ایپ پائپ لائنز کو بہترین کوڈز اور خودکار دماغوں سے جوڑتے ہیں۔",
    "service.ai-automation.badge": "بہترین منافع",
    "service.ai-automation.benefit.0": "ہزاروں گھنٹوں کی دستی مشقت بچائیں",
    "service.ai-automation.benefit.1": "درج کرنے اور شیڈولنگ میں کسٹمر سسٹم کی خامیاں ختم کریں",
    "service.ai-automation.benefit.2": "آنے والے کسٹمر لیڈز کے لیے فوری جواب",
    "service.ai-automation.feature.0": "واٹس ایپ اور سلیک ٹیم نوٹیفکیشن چینلز",
    "service.ai-automation.feature.1": "خودکار لیڈ کیپچرنگ اور کسٹمر سسٹم تقسیم",
    "service.ai-automation.feature.2": "سمارٹ دستاویزی اور انوائس لے آؤٹ پارسنگ",
    "service.ai-automation.feature.3": "ملٹی اسپیپ ایپ ٹو ایپ ویب ہک کنیکٹرز",

    "service.website-building.title": "ویب سائٹ بنوانا",
    "service.website-building.desc": "کاروبار کے لیے بہترین اور موبائل دوست ویب سائٹس۔",
    "service.website-building.longDesc": "تیز ترین اور سرچ انجن آپٹیمائزڈ لینڈنگ پیجز اور ویب پورٹلز۔ خوبصورت ڈیزائن اور ہر اسکرین پر ایڈجسٹ ہونے والے لے آؤٹس۔",
    "service.website-building.badge": "کاروباری معیار",
    "service.website-building.benefit.0": "بہترین ایس ای او (SEO) پوزیشننگ کے لیے تیز رفتار",
    "service.website-building.benefit.1": "موبائل اور ٹیبلٹ کے مطابق خوبصورت ڈیزائن",
    "service.website-building.benefit.2": "کارکردگی کی ٹریکنگ کے لیے اینالیٹکس ڈیش بورڈ",
    "service.website-building.feature.0": "جدید اینیمیشنز اور خوبصورت لے آؤٹس",
    "service.website-building.feature.1": "ایس ای او سیٹ اب اور گوگل انڈیکسنگ",
    "service.website-building.feature.2": "تیز ترین سرورز پر ڈیپلائمنٹ",
    "service.website-building.feature.3": "انٹرایکٹو فارمز اور خودکار ای میل سسٹم",

    "service.3d-website.title": "تھری ڈی (3D) ویب سائٹس",
    "service.3d-website.desc": "تھری ڈی مناظر کے ساتھ انٹرایکٹو ویب سائٹس۔",
    "service.3d-website.longDesc": "تھری ڈی مناظر کے ساتھ جدید ویب سسٹمز۔ وزٹرز کی توجہ حاصل کرنے کے لیے شاندار تھری ڈی اینیمیشنز اور انٹرایکٹو گرافکس۔",
    "service.3d-website.badge": "پریمیم تجربہ",
    "service.3d-website.benefit.0": "برانڈ کو مارکیٹ میں الگ اور ممتاز بنانا",
    "service.3d-website.benefit.1": "10 گنا زیادہ کسٹمر مصروفیت اور دورہ کا دورانیہ",
    "service.3d-website.benefit.2": "ٹیکنالوجی کمپنیوں کے لیے منفرد ڈیزائن اور شناخت",
    "service.3d-website.feature.0": "روان تھری ڈی انٹرایکٹو گرافکس اور شیڈنگ",
    "service.3d-website.feature.1": "اسکرول کے مطابق تھری ڈی ماڈلز رینڈرنگ",
    "service.3d-website.feature.2": "سخت ہارڈ ویئر ہینڈلنگ کی کارکردگی",
    "service.3d-website.feature.3": "فزکس کینوس اور اینیمیشن انٹیگریشن",

    "service.ai-automation-course.title": "اے آئی آٹومیشن کورس",
    "service.ai-automation-course.desc": "اے آئی ورک فلو ٹولز اور اسکرپٹ سیٹ اپ میں مہارت حاصل کریں۔",
    "service.ai-automation-course.longDesc": "خودکار کالنگ سسٹمز، کسٹم ویب ہکس، اور خودکار لیڈ پائپ لائنز خود بنانا سیکھیں۔ زپیر، میک، اور اے آئی ایجنٹس کے اسکرپٹس پر قدم بہ قدم مہارت حاصل کریں۔",
    "service.ai-automation-course.badge": "محدود نشستیں",
    "service.ai-automation-course.benefit.0": "آٹومیشن ڈیزائن کی ون آن ون عملی رہنمائی",
    "service.ai-automation-course.benefit.1": "بہترین آٹومیشن روٹینز کے پہلے سے تیار ٹیمپلیٹس",
    "service.ai-automation-course.benefit.2": "تاحیات نجی ماسٹر مائنڈ گروپ چیٹ تک رسائی",
    "service.ai-automation-course.feature.0": "میک اور زپیر کا مکمل ماسٹر کلاس کورس",
    "service.ai-automation-course.feature.1": "مقامی اے آئی سسٹمز کو اے پی آئیز سے جوڑنا",
    "service.ai-automation-course.feature.2": "واٹس ایپ اور کسٹمر ڈیٹا بیس آٹومیشن سکرپٹس",
    "service.ai-automation-course.feature.3": "بونس: فعال اور پہلے سے تیار کسٹم ویب ہک ٹیمپلیٹس",

    "service.ai-chatbot.title": "اے آئی چیٹ بوٹس / بزنس ایجنٹس",
    "service.ai-chatbot.desc": "۲۴/۷ فعال کسٹمر فلٹرنگ اور فوری جوابات کا آٹومیٹک سسٹم۔",
    "service.ai-chatbot.longDesc": "اپنی ویب سائٹ یا پیجز پر خودکار چیٹ ایجنٹ نصب کریں جو گاہکوں سے نمبر وصول کریں، معلومات دیں اور شیٹ پر ڈیٹا منتقل کریں۔",
    "service.ai-chatbot.badge": "معیاری کنورژن",
    "service.ai-chatbot.benefit.0": "کسٹمر لیڈ کنورژن کو تیزی سے بہتر کریں",
    "service.ai-chatbot.benefit.1": "دن رات کسی بھی ممکنہ کسٹمر کو ہاتھ سے نہ جانے دیں",
    "service.ai-chatbot.benefit.2": "صارف کے فون نمبر اور ضروریات خودکار طریقے سے حاصل کریں",
    "service.ai-chatbot.feature.0": "لامحدود چینلز جیسے فیس بک، واٹس ایپ سپورٹ لے آؤٹ",
    "service.ai-chatbot.feature.1": "گوگل شیٹ ڈیٹا پائپ لائن سے معلومات لوڈ کرنا",
    "service.ai-chatbot.feature.2": "سی آر ایم انٹیگریشنز اور لیڈ اسکورنگ کارڈز",
    "service.ai-chatbot.feature.3": "برانڈ کے لہجے اور معلوماتی پینل کے مطابق تربیت",

    "service.ai-trading-bot.title": "اے آئی ٹریڈنگ بوٹس",
    "service.ai-trading-bot.desc": "نقصانات کے کنٹرول کے ساتھ خودکار اور الگورتھمک ٹریڈنگ بوٹ۔",
    "service.ai-trading-bot.longDesc": "ریاضی اور چارٹ انڈیکیٹرز پر چلنے والا ایسا آٹو بوٹ جس میں انسانی جذبات کا عمل دخل صفر ہو جائے اور درست حسابات پر سودے ہوں۔",
    "service.ai-trading-bot.badge": "کسٹم الگورتھم",
    "service.ai-trading-bot.benefit.0": "جذباتی فیصلوں کے بغیر ٹریڈنگ کر کے سرمایہ بڑھائیں",
    "service.ai-trading-bot.benefit.1": "مارکیٹ مانیٹرنگ اور الرٹس چوبیس گھنٹے خودکار کام کریں",
    "service.ai-trading-bot.benefit.2": "سخت ترین ڈرا ڈاؤنز سے بچنے کے لیے ہیج پیرامیٹرز کا نفاذ",
    "service.ai-trading-bot.feature.0": "ملٹی انڈیکیٹر کسٹم فارمولا اور رولز",
    "service.ai-trading-bot.feature.1": "کامیاب اور محفوظ ہیج حکمت عملی کا سیٹ اپ",
    "service.ai-trading-bot.feature.2": "ریئل ٹائم مارکیٹ اسپیڈ اور والٹیلیٹی ڈیش بورڈ",
    "service.ai-trading-bot.feature.3": "ماضی کی کارکردگی کے مطابق کسٹم فائن ٹیوننگ",

    // Trading Bot
    "trading.badge": "ہمارا خودکار ٹریڈنگ کا طریقہ",
    "trading.heading": "براہ راست ٹریڈنگ مانیٹرنگ انجن",
    "trading.sub": "ہمارے جدید ترین الگورتھمک سسٹمز پر ایک نظر جو سخت مارجن کنٹرولز کے تحت فاریکس اور ڈیجیٹل کرنسیوں کی نگرانی کرتے ہیں۔",
    "trading.sysIndicators": "سسٹم انڈیکیٹرز",
    "trading.realtimeDesc": "ریئل ٹائم اتار چڑھاؤ اور ٹرینڈ لائنز جو براہ راست سسٹمز پر حاصل ہوتی ہیں",
    "trading.risk": "الگورتھمک رسک مینجمنٹ",
    "trading.riskDesc": "پہلے سے کوڈ شدہ ہیج پیرامیٹرز ڈرا ڈاؤنز کو 1.5% مارجن تک محفوظ رکھتے ہیں۔",
    "trading.strategic": "مارکیٹ کے اسٹریٹجک تجزیے",
    "trading.strategicDesc": "تیز رفتار گرافکس کی مدد سے کرنسی کی تبدیلیوں کا گہرائی سے تجزیہ",
    "trading.signal": "براہ راست مارکیٹ کا رجحان: ہائی وولٹیلیٹی سگنل",
    "trading.active": "فعال",
    "trading.indicatorActive": "انڈیکیٹر فعال ہے",
    "trading.margin": "مارجن ریشو",
    "trading.leverage": "لیوریج لیول",
    "trading.hedge": "ہیج اسکرپٹ",
    "trading.calibration": "خودکار ایڈجسٹمنٹ",
    "trading.passed": "رسک کی حد محفوظ ہے",
    "trading.cta": "سیکیورو-کور ٹریڈنگ بوٹ شروع کریں",

    // Testimonials
    "testimonials.badge": "گاہکوں کی رائے",
    "testimonials.heading": "ہمارے کلائنٹس کا پیار",
    "testimonials.sub": "ہمارے سسٹمز کے ذریعے اپنے کاروبار کو بہتر بنانے والے برانڈز کی سچی آراء۔",
    "testimony.t1.text": "ایم میہال خٹک کے ڈیزائن کردہ اے آئی کال ایجنٹ نے ہمارے کسٹمر سپورٹ کو یکسر بدل کر رکھ دیا ہے۔ یہ گاہکوں کے تمام سوالات کے فوری جوابات دیتا ہے اور انہیں محفوظ کرتا ہے۔ زبردست سروس!",
    "testimony.t1.role": "سی ای او",
    "testimony.t2.text": "ان کی ٹیم نے کسٹمر واٹس ایپ کی خودکار ورک فلو تیار کی جس نے ہمارے اسٹاف کے ہفتہ وار تقریباً 20 گھنٹے بچائے۔ وقت کے پابند، پیشہ ور اور بہترین معیار کا کام۔",
    "testimony.t2.role": "آپریشنز ڈائریکٹر",
    "testimony.t3.text": "ہم نے ان کی ٹیم سے تھری ڈی ویب سائٹ بنوائی۔ ہمارے کلائنٹس ہمیشہ اس کے شاندار ڈیزائن کی تعریف کرتے ہیں! پریمیم تجربہ اور اینیمیشنز لاجواب ہیں۔",
    "testimony.t3.role": "بانی",

    // Pricing
    "pricing.badge": "سرمایہ کاری کے منصوبے",
    "pricing.heading": "شفاف اور آسان پیکیجز",
    "pricing.sub": "کوئی چھپے ہوئے چارجز نہیں، پاکستانی اور بین الاقوامی بانیوں کے لیے آسان اور شفاف پیکیجز۔",
    "pricing.pkr": "روپے ریٹس (PKR)",
    "pricing.usd": "ڈالر ریٹس (USD)",
    "pricing.mostPopular": "سب سے مشہور",

    "pricing.p0.title": "اے آئی آٹومیشن کورس",
    "pricing.p0.period": "تاحیات",
    "pricing.p0.desc": "خودمختار سافٹ ویئر اور ورک فلو سسٹمز کو ڈیزائن اور ڈیپلوئے کرنے کا مرحلہ وار نصاب۔",
    "pricing.p0.cta": "ماسٹر کلاس میں داخلہ لیں",
    "pricing.p0.feature.0": "9 مرحلہ وار واضح ویڈیو ٹریننگ ماڈیولز",
    "pricing.p0.feature.1": "12 بنیادی چینلز کے لیے پہلے سے تیار شدہ ٹیمپلیٹس",
    "pricing.p0.feature.2": "براہ راست ویب ہک اور اے پی آئی انٹیگریشنز",
    "pricing.p0.feature.3": "خصوصی نجی ٹیلی گرام ماسٹر مائنڈ گروپ",
    "pricing.p0.feature.4": "کمیونٹی سپورٹ اور بنے بنائے کوڈ بلیو پرینٹس",
    "pricing.p0.feature.5": "مستند سرٹیفکیٹ آف کمپلیشن",

    "pricing.p1.title": "ویب سائٹ بنوانا",
    "pricing.p1.period": "ایک بار",
    "pricing.p1.desc": "کاروبار کو جدید ویب پر لانے اور کارکردگی کو بڑھانے کے لیے تیار کردہ معیاری ریسپونسیو ویب سائٹس۔",
    "pricing.p1.cta": "ویب سائٹ کی تیاری شروع کریں",
    "pricing.p1.feature.0": "موبائل اور کمپیوٹر کے لیے مکمل ریسپونسیو لے آؤٹ",
    "pricing.p1.feature.1": "انٹرایکٹو فارمز اور کسٹمر لیڈ ٹریکنگ سسٹم",
    "pricing.p1.feature.2": "اسپیڈ اور بنیادی ایس ای او (SEO) سروس",
    "pricing.p1.feature.3": "معیاری انٹرایکٹو اینیمیشنز انٹیگریشنز",
    "pricing.p1.feature.4": "3 متحرک ٹیمپلیٹ صفحات شامل ہیں",
    "pricing.p1.feature.5": "لانچ کے بعد 1 ماہ کی مکمل تکنیکی مدد",

    "pricing.p2.title": "اے آئی آٹومیشن",
    "pricing.p2.period": "ایک بار سیٹ اب",
    "pricing.p2.desc": "ذہین چیٹ بوٹ سسٹمز، کاروباری آٹومیشن، اور خودکار ڈیٹا بیس سنکرونائزیشن سیٹ اپ۔",
    "pricing.pricing.p2.cta": "آٹومیشن سسٹم تیار کروائیں",
    "pricing.p2.cta": "آٹومیشن تیار کروائیں",
    "pricing.p2.feature.0": "منفرد زپیر اور میک آٹومیشن نقشہ سازی",
    "pricing.p2.feature.1": "گوگل شیٹس اور کسٹمر سسٹم (CRM) کا آٹو سنک",
    "pricing.p2.feature.2": "2 مخصوص کاروباری ورک فلو ٹریگرز",
    "pricing.p2.feature.3": "فوری اور خودکار واٹس ایپ پیغامات نوٹیفیکیشنز",
    "pricing.p2.feature.4": "خودکار طور پر کسٹمرز کو فلٹر کرنے والا چیٹ بوٹ",
    "pricing.p2.feature.5": "سسٹمز کو چلانے اور جانچنے کے لیے 2 ہفتے",

    "pricing.p5.title": "اے آئی چیٹ بوٹس / بزنس ایجنٹس",
    "pricing.p5.period": "ایک بار سیٹ اپ",
    "pricing.p5.desc": "ویب سائٹ اور سوشل میڈیا پر انکوائریز کو ہینڈل کرنے کے لیے خودکار چیٹ سسٹمز۔",
    "pricing.p5.cta": "چیٹ بوٹس لانچ کریں",
    "pricing.p5.feature.0": "۲۴/۷ کسٹمرز کے سوالات کے مائیکرو جوابات",
    "pricing.p5.feature.1": "براہ راست گوگل شیٹس پر ڈیٹا ٹرانسفر انٹیگریشن",
    "pricing.p5.feature.2": "بیک وقت دو زبانوں اردو اور انگلش کی سپورٹ",
    "pricing.p5.feature.3": "جعلی کلائنٹس کو فلٹر کرنا اور نمبرز جمع کرنا",
    "pricing.p5.feature.4": "کاروبار کے لیے کسٹمر سوال و جواب کی کسٹم لاگنگ",
    "pricing.p5.feature.5": "لیڈز مانیٹر کرنے والا لائیو ڈیٹا ٹریکنگ پینل",

    "pricing.p3.title": "تھری ڈی ویب ڈیزائن",
    "pricing.p3.period": "ایک بار",
    "pricing.p3.desc": "جدید تھری ڈی گرافکس، بہترین اینیمیشنز، اور منفرد پریمیم انٹرفیسز پر مشتمل جدید ترین ڈسپلے ویب سائٹ۔",
    "pricing.p3.cta": "تھری ڈی ویب سائٹ شروع کریں",
    "pricing.p3.feature.0": "منفرد گلاسمورفزم ڈیزائن اور لے آؤٹ عناصر",
    "pricing.p3.feature.1": "ویب جی ایل (WebGL) تھری ڈی کینوس رینڈرنگ",
    "pricing.p3.feature.2": "پیج اسکرولنگ پر کیمرے کی خوبصورت حرکت",
    "pricing.p3.feature.3": "انتہائی تیز رفتار اور جدید کنٹرولز",
    "pricing.p3.feature.4": "4 تک بہترین ڈیزائن کردہ کسٹم صفحات",
    "pricing.p3.feature.5": "کاروبار کے لیے مخصوص کسٹم آئیکنز ڈیزائن",

    "pricing.p4.title": "اے آئی کسٹمر کال ایجنٹ",
    "pricing.p4.period": "ایک بار سروس",
    "pricing.p4.desc": "خودکار اور بہترین کارکردگی کا حامل کالنگ ایجنٹ جو گاہکوں سے براہ راست بات چیت اور کاروباری مقاصد نمٹاتا ہے۔",
    "pricing.p4.cta": "کال ایجنٹ لانچ کریں",
    "pricing.p4.feature.0": "جدید ترین گفتگو کرنے والا نیچرل لینگویج ماڈل",
    "pricing.p4.feature.1": "گوگل شیٹس، اپائنٹمنٹ بکنگ اور کسٹمر سسٹم لنک",
    "pricing.p4.feature.2": "ایک ہی وقت میں آنے والی لامحدود فون لائنز",
    "pricing.p4.feature.3": "کاروبار کے مطابق مخصوص کال اسکرپٹ گائیڈز",
    "pricing.p4.feature.4": "مزاج اور کارکردگی ناپنے والا کسٹم ڈیش بورڈ",
    "pricing.p4.feature.5": "30 دن کی لائیو سسٹم ٹیوننگ اور سپورٹ",

    "pricing.p6.title": "اے آئی ٹریڈنگ بوٹس",
    "pricing.p6.period": "کسٹم سیٹ اپ",
    "pricing.p6.desc": "رسک مینجمنٹ رولز کے تحت مارکیٹ کی خودکار مانیٹرنگ اور الگورتھمک روبو ٹریڈنگ۔",
    "pricing.p6.cta": "ٹریڈنگ بوٹ کا کسٹم مشورہ لیں",
    "pricing.p6.feature.0": "ریاضی اور چارٹ انڈیکیٹرز پر مشتمل اسکرپٹس",
    "pricing.p6.feature.1": "کیپیٹل کو لاپس ہونے سے بچانے کے لیے آٹو ہیج لاکس",
    "pricing.p6.feature.2": "سخت مارجن کے تحت صرف ۱۔۵ فیصد ڈرا ڈاؤن بفرز",
    "pricing.p6.feature.3": "مقبول ٹریڈنگ ٹرمینلز (MT4/MT5) سے براہ راست لنک",
    "pricing.p6.feature.4": "جذباتی فیصلوں کے بغیر سوفٹ ویئر کی مدد سے سودے",
    "pricing.p6.feature.5": "تاحیات سسٹمز گائیڈز اور تکنیکی calibration سپورٹ",

    // FAQs
    "faqs.badge": "سسٹم معلومات",
    "faqs.heading": "عام طور پر پوچھے جانے والے سوالات",
    "faqs.sub": "ہمارے کام کے طریقہ کار، ٹیکنالوجی اور ڈیلیوری کے اوقات کے بارے میں فوری معلومات حاصل کریں۔",
    
    "faq.0.question": "ایم میہال خٹک اے آئی ایجنسی بنیادی طور پر کیا کرتی ہے؟",
    "faq.0.answer": "ہم اگلی نسل کی خودکار پائپ لائنز، کال ایجنٹس، کاروباری ویب سائٹس، اور تھری ڈی متحرک ویب ڈیزائنز بنانے میں مہارت رکھتے ہیں جو کسٹمرز کی مصروفیت بڑھاتے اور کاروباری اخراجات کم کرتے ہیں۔",
    
    "faq.1.question": "کیا اے آئی کال ایجنٹ ہمارے موجودہ ٹولز سے منسلک ہو سکتا ہے؟",
    "faq.1.answer": "جی بالکل! ہم کالنگ ایجنٹس کو براہ راست گوگل شیٹس، کسٹمر سسٹمز (مثلاً ہب اسپاٹ یا زوہو)، کیلنڈر شیڈولنگ، اور دیگر ورک اسپیسز سے محفوظ ویب ہکس کے ذریعے جوڑتے ہیں۔",
    
    "faq.2.question": "ویب سائٹ اور اے آئی سسٹمز کی تیاری میں کتنا وقت لگتا ہے؟",
    "faq.2.answer": "معیاری کاروباری ویب سائٹس 5 سے 7 کاروباری دنوں میں مکمل تیار ہو جاتی ہیں۔ جبکہ پیچیدہ اے آئی کالنگ سسٹمز اور خودکار ورک فلو کی تیاری میں لگ بھگ 10 سے 14 دن لگتے ہیں جس میں مکمل ٹیسٹنگ شامل ہے۔",
    
    "faq.3.question": "تھری ڈی ویب سائٹس کے لیے آپ کونسی ٹیکنالوجی استعمال کرتے ہیں؟",
    "faq.3.answer": "ہم اعلیٰ ترین، ہارڈ ویئر ایکسیلیریٹڈ ٹیکنالوجیز مثلاً WebGL، Three.js اور ہلکے پھلکے کسٹم مائیکرو اسکرپٹس کا استعمال کرتے ہیں تاکہ لوڈنگ اسپیڈ کو متاثر کیے بغیر بہترین تھری ڈی تجربہ فراہم کیا جا سکے۔",

    // Contact
    "contact.badge": "ہم سے رابطہ کریں",
    "contact.heading": "اپنے پراجیکٹ کا ہمارے ساتھ آغاز کریں",
    "contact.sub": "آئیں ہم آپ کے کاروباری ورک فلو کا تجزیہ کریں اور آپ کے روزمرہ کے کاموں میں آرٹیفیشل انٹیلیجنس سسٹمز نصب کریں۔",
    "contact.yourName": "آپ کا مکمل قانونی نام",
    "contact.placeholderName": "مثال کے طور پر: حارث خان",
    "contact.companyName": "کمپنی / کاروبار کا نام",
    "contact.placeholderCompany": "مثال کے طور پر: ایپکس ٹیک ریٹیل",
    "contact.selectSolution": "ڈیجیٹل حل منتخب کریں",
    "contact.whatsappField": "براہ راست واٹس ایپ پر بات کریں",
    "contact.projectDetails": "پراجیکٹ کی تفصیلات اور ضروریات",
    "contact.placeholderDetails": "تفصیل سے بتائیں کہ آپ خودکار سسٹم، ویب سائٹ یا کال اسکرپٹ کیسے ترتیب دینا چاہتے ہیں...",
    "contact.ctaButton": "اپنا پروجیکٹ شروع کریں",
    "contact.inboundSupport": "سپورٹ لائنز قطار",
    "contact.secureChannels": "محفوظ سرور چینلز",
    "contact.personalCalendar": "میہال کا ذاتی لنک",
    "contact.averageSpeed": "اوسط پراجیکٹ کی تیاری کا وقت",
    "contact.meetingMin": "28 منٹ کی پہلی میٹنگ",
    "contact.customTailored": "100% کسٹم سسٹمز",

    // Footer
    "footer.rights": "جملہ حقوق محفوظ ہیں۔",
    "footer.privacy": "رازداری چارٹر",
    "footer.agreement": "معاہدہ دستخط",
    "footer.whatsapp": "واٹس ایپ سپورٹ"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("app_lang");
    return (saved === "en" || saved === "ur") ? saved : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
    
    // Set html attribute dir for Urdu support
    if (lang === "ur") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.classList.add("font-urdu");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.classList.remove("font-urdu");
    }
  };

  useEffect(() => {
    // sync initially
    if (language === "ur") {
      document.documentElement.setAttribute("dir", "rtl");
      document.documentElement.classList.add("font-urdu");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      document.documentElement.classList.remove("font-urdu");
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ur" : "en");
  };

  const t = (key: string): string => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

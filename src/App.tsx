import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, MessageSquare, Menu, Activity, Send, Terminal, MessageCircle, Heart, Shield, Cpu, ExternalLink, ArrowUp, Zap, HelpCircle } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import TradingBotSpotlight from "./components/TradingBotSpotlight";
import ClientSandbox from "./components/ClientSandbox";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import { testimonials, agencyDetails } from "./data";
import { useLanguage } from "./context/LanguageContext";
import AdminPortal from "./components/AdminPortal";

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const { language, t } = useLanguage();

  // Monitor scroll height to conditionally render a Back to Top trigger
  useEffect(() => {
    const checkScrollHeight = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", checkScrollHeight);
    return () => window.removeEventListener("scroll", checkScrollHeight);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWhatsAppFloatingClick = () => {
    const rawMsg = "Hi Mehaal! I'm browsing your agency website and would like to prompt an exploratory conversation about AI & Automation services.";
    const encoded = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div 
      className={`relative min-h-screen text-[#eeeeee] bg-[#05060b] select-none selection:bg-neon-cyan/20 selection:text-white overflow-x-hidden ${
        language === "ur" ? "font-urdu rtl" : ""
      }`}
      dir={language === "ur" ? "rtl" : "ltr"}
    >
      
      {/* Cupertino Liquid Background Drifters */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="fluid-blob-one top-[10%] left-[-15%]" />
        <div className="fluid-blob-two top-[45%] right-[-20%]" />
        <div className="fluid-blob-three bottom-[15%] left-[15%]" />
        <div className="fluid-blob-one bottom-[-15%] right-[5%]" />
      </div>
      
      {/* Thin elegant gold header topbar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-purple/50 via-neon-cyan/80 to-neon-purple/50 z-50"></div>

      {/* Persistent global header nav */}
      <Navbar />

      <main className="relative">
        {/* Sections layout progression */}
        <Hero />
        
        <Services />
        
        <TradingBotSpotlight />

        {/* Client Interactive Sandbox */}
        <ClientSandbox />

        {/* Dynamic client testimonial reviews block */}
        <section id="testimonials" className="py-14 bg-transparent relative border-b border-white/5">
          <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-neon-cyan/2 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-6">
            
            <div className="flex flex-col items-center text-center space-y-5 mb-16">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neon-cyan text-[10px] font-mono tracking-[0.16em] uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
                <span>{language === "ur" ? "گارنٹیڈ فیڈ بیک" : "CLIENT FEEDBACK"}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-wide">
                {language === "ur" ? "ہمارے کلائنٹس کی رائے" : "What Our Clients Say"}
              </h2>
              <p className="text-gray-400 max-w-2xl text-xs sm:text-sm font-light mt-2 leading-relaxed">
                {language === "ur"
                  ? "ہمارے جدید ترین اے آئی آٹومیشن سلوشنز سے فائدہ اٹھانے والے برانڈز اور کاروباری افراد کے تصدیق شدہ جائزے"
                  : "Objective evaluations from organizations optimizing production via our expert systems."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimony, idx) => {
                const localizedText = t(`testimony.${testimony.id}.text`);
                const localizedRole = t(`testimony.${testimony.id}.role`);
                return (
                  <motion.div
                    key={testimony.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="rounded-2xl p-8 glass-panel flex flex-col justify-between relative"
                  >
                    <div className="space-y-4">
                      {/* Quotation bracket */}
                      <span className={`text-5xl font-serif text-neon-cyan/15 leading-none block absolute top-3 select-none ${
                        language === "ur" ? "left-6" : "right-6"
                      }`}>
                        “
                      </span>
                      
                      {/* Stars */}
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: testimony.rating }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-3.5 h-3.5 text-neon-cyan fill-neon-cyan" />
                        ))}
                      </div>

                      <p className="text-xs sm:text-sm text-gray-350 leading-relaxed font-light italic">
                        "{localizedText || testimony.text}"
                      </p>
                    </div>

                    {/* Customer author specs */}
                    <div className="flex items-center gap-4 mt-8 pt-5 border-t border-white/5">
                      <img 
                        src={testimony.avatar} 
                        alt={testimony.name}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-white/10"
                      />
                      <div className="text-left">
                        <h4 className="text-xs font-sans font-medium text-white tracking-wider">{testimony.name}</h4>
                        <p className="text-[10px] text-gray-500 font-mono uppercase tracking-wider mt-1">
                          {localizedRole || testimony.role} — <span className="text-neon-cyan">{testimony.company}</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </section>

        <Pricing />

        <Faq />

        <Contact />
      </main>

      {/* Footer implementation */}
      <footer className="bg-transparent backdrop-blur-md border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-white/5 pb-12">
          
          {/* Logo & description column */}
          <div className="space-y-3 md:text-left text-center">
            <div className="flex items-center gap-2.5 justify-center md:justify-start">
              <div className="w-8 h-8 rounded bg-white/[0.02] border border-white/10 flex items-center justify-center">
                <Terminal className="w-3.5 h-3.5 text-neon-cyan" />
              </div>
              <span className="text-md font-display font-medium tracking-wide text-white">{agencyDetails.name}</span>
            </div>
            <p className="text-xs text-gray-500 max-w-sm leading-relaxed">
              {language === "ur" 
                ? "ماہر اے آئی سسٹمز اسپیشلسٹ: خودکار کال ایجنٹس، اسکرپٹ آٹومیشن سسٹمز، اور موبائل دوست ویب سائٹس کے بانی۔" 
                : agencyDetails.description}
            </p>
          </div>

          {/* Structured sitemaps */}
          <div className="flex items-center justify-center gap-8 text-[10px] font-mono tracking-[0.16em] text-gray-550 uppercase">
            <a href="#services" className="hover:text-neon-cyan transition-colors duration-300">
              {language === "ur" ? "خدمات" : "Services"}
            </a>
            <a href="#pricing" className="hover:text-neon-cyan transition-colors duration-300">
              {language === "ur" ? "قیمتیں" : "Pricing"}
            </a>
            <a href="#faqs" className="hover:text-neon-cyan transition-colors duration-300">
              {language === "ur" ? "سوالات" : "FAQs"}
            </a>
            <a href="#contact" className="hover:text-neon-cyan transition-colors duration-300">
              {language === "ur" ? "رابطہ کریں" : "Contact"}
            </a>
          </div>

          {/* Quick contact and indicators */}
          <div className="space-y-2 md:text-right text-center text-xs">
            <div className="text-gray-400">
              {language === "ur" ? "واٹس ایپ سپورٹ:" : "WhatsApp Support:"} <a href="https://wa.me/923302930930" className="text-neon-cyan font-mono hover:underline">{agencyDetails.whatsappRaw}</a>
            </div>
            <div className="flex items-center justify-center md:justify-end gap-2 text-[10px] font-mono text-neon-green">
              <span className="relative flex h-1.5 w-1.5">
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-neon-green"></span>
              </span>
              <span>
                {language === "ur" ? "سسٹم محفوظ اور آن لائن ہے" : "SYSTEM ENCRYPTED & ACTIVE"}
              </span>
            </div>
          </div>

        </div>

        {/* Copyright notice bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div>
            © 2026 {agencyDetails.name}. {language === "ur" ? "جملہ حقوق محفوظ ہیں۔" : "All Rights Reserved."}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-gray-400 cursor-pointer transition-colors">
              {language === "ur" ? "رازداری پالیسی" : "Privacy Charter"}
            </span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer transition-colors">
              {language === "ur" ? "معاہدہ دستخط" : "Digital Master Agreement"}
            </span>
            <span>•</span>
            <span 
              onClick={() => setShowAdmin(true)}
              className="text-neon-cyan font-mono hover:text-white cursor-pointer transition-colors select-none text-[11px]"
            >
              [ CONTROL CONSOLE ]
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Global Quick-Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3.5 z-40">
        
        {/* Back to top scroll button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="p-3 bg-black/90 text-neon-cyan hover:text-white border border-white/10 hover:border-neon-cyan rounded-full transition-all duration-350 cursor-pointer shadow-lg backdrop-blur-md"
            aria-label="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Global floating direct-connect WhatsApp bot shortcut */}
        <button
          onClick={handleWhatsAppFloatingClick}
          title="Direct WhatsApp Query"
          className="p-4 bg-neon-cyan hover:bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all duration-350 shadow-md cursor-pointer"
          aria-label="Contact on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </button>

      </div>

      {/* Admin Portal Overlay */}
      <AnimatePresence>
        {showAdmin && (
          <AdminPortal isOpen={showAdmin} onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>

    </div>
  );
}

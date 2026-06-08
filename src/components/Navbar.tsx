import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, PhoneCall, Terminal, Compass, Tag, HelpCircle, Mail, TrendingUp } from "lucide-react";
import { agencyDetails } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track page scroll to apply background styling dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Block viewport scrolling when mobile menu is open to prevent background bouncing
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: t("nav.services"), id: "services", href: "#services", icon: Compass },
    { name: t("nav.tradingBot"), id: "trading-bot", href: "#trading-bot", icon: TrendingUp },
    { name: t("nav.pricing"), id: "pricing", href: "#pricing", icon: Tag },
    { name: t("nav.faqs"), id: "faqs", href: "#faqs", icon: HelpCircle },
    { name: t("nav.contact"), id: "contact", href: "#contact", icon: Mail },
  ];

  const handleWhatsAppRedirect = () => {
    const rawMsg = "Hello Mehaal! I visited your agency website and would love to get a free automation audit for my business.";
    const encoded = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled
          ? "bg-[#05060b]/70 backdrop-blur-2xl border-b border-white/5 py-4 shadow-[0_4px_30px_rgba(0,0,0,0.2)]"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo / Brand Name */}
        <a 
          href="#" 
          className="flex items-center gap-3 group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-b from-[#dfc299]/30 to-[#b99e7a]/15 p-[1px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#0b0c11] rounded-lg flex items-center justify-center border border-white/5">
              <span className="text-sm font-display font-medium text-neon-cyan tracking-wider">M</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-display font-medium tracking-tight text-white group-hover:text-neon-cyan transition-colors duration-300">
              {agencyDetails.name}
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-gray-500">
              {t("nav.title")}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-xs font-sans font-medium tracking-wider uppercase text-gray-400 hover:text-neon-cyan transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Call to Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher Toggle */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 rounded-lg text-xs font-mono tracking-wider border border-white/10 text-gray-300 hover:text-white hover:border-neon-cyan/50 transition-all duration-350 flex items-center gap-1.5 cursor-pointer bg-white/[0.02] active:scale-95"
            title={language === "en" ? "اردو زبان میں تبدیل کریں" : "Switch to English"}
          >
            <Globe className="w-3.5 h-3.5 text-neon-cyan animate-pulse" />
            <span>{language === "en" ? "اردو" : "EN"}</span>
          </button>

          <a
            href="https://dark-trading-bot-41574942116.asia-southeast1.run.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase border border-neon-purple/20 text-neon-purple hover:bg-neon-purple/5 transition-all duration-350 flex items-center gap-1.5 cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5 text-neon-purple" />
            <span>{t("nav.tradingBot")}</span>
          </a>
          <button
            onClick={handleWhatsAppRedirect}
            id="nav-cta-button"
            className="px-5 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase text-black bg-neon-cyan hover:bg-white transition-all duration-350 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{t("nav.consultation")}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-gray-400 hover:text-white transition-colors duration-300 rounded-lg bg-white/5 border border-white/5 active:scale-95 flex items-center justify-center"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Advanced Mobile Navigation Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/85 z-40 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-4/5 max-w-xs h-full bg-[#05060b]/85 border-l border-white/5 z-50 p-6 flex flex-col justify-between shadow-2xl backdrop-blur-3xl md:hidden"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-display font-medium text-white tracking-wider">M. Mehaal Khattak</span>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-white rounded-lg bg-white/5 active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <nav className="flex flex-col gap-3">
                  {navLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-300 active:scale-98"
                      >
                        <IconComponent className="w-4 h-4 text-neon-cyan" />
                        <span>{link.name}</span>
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                {/* Mobile Language Switcher button */}
                <button
                  onClick={() => {
                    toggleLanguage();
                  }}
                  className="w-full py-3 rounded-lg text-xs font-mono tracking-wider uppercase text-center text-gray-300 bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer shadow-lg"
                >
                  <Globe className="w-4 h-4 text-neon-cyan" />
                  <span>{language === "en" ? "اردو زبان (Urdu)" : "English Language"}</span>
                </button>

                <a
                  href="https://dark-trading-bot-41574942116.asia-southeast1.run.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full py-3 rounded-lg text-xs font-mono tracking-wider uppercase text-center text-white bg-[#7075ff]/10 border border-[#7075ff]/20 hover:bg-[#7075ff]/20 flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer shadow-lg"
                >
                  <TrendingUp className="w-4 h-4 text-neon-purple" />
                  <span>{t("nav.accessTradingBot")}</span>
                </a>

                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleWhatsAppRedirect();
                  }}
                  className="w-full py-3 rounded-lg text-xs font-mono tracking-wider uppercase text-black bg-neon-cyan hover:bg-white flex items-center justify-center gap-2.5 active:scale-95 transition-all cursor-pointer shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{t("nav.whatsappInquiry")}</span>
                </button>

                <div className="flex items-center gap-2 text-[9px] font-mono text-gray-500 justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-green"></span>
                  <span>{t("nav.systemActive")}</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

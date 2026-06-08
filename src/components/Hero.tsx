import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, ArrowRight, Shield, Play, HelpCircle, ArrowUpRight, Cpu, PhoneCall, CheckCircle2, Sparkles } from "lucide-react";
import { agencyDetails } from "../data";
import { useLanguage } from "../context/LanguageContext";
import ThreeDWorld from "./ThreeDWorld";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const { language, t } = useLanguage();

  const startWhatsAppChat = () => {
    const message = "Hi Mehaal! I'm interested in your AI, Automation, and Web Development services. Let's schedule a brief call to align workflows!";
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const bullets = language === "ur" ? [
    "انتہائی حقیقت پسندانہ اور لائیو اے آئی آوازیں",
    "خودکار لیڈ کیپچرنگ اور ڈیٹا کی تقسیم",
    "مخصوص کسٹمر سسٹم (CRM) اور واٹس ایپ روابط"
  ] : [
    "Highly realistic ultra-low latency AI voices",
    "Zero-touch lead capture & data distribution",
    "Custom CRM, Slack & messaging API bridges"
  ];

  return (
    <section
      id="hero"
      className="relative min-h-dvh pt-36 pb-20 flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Floating 3D Cyber Wave Mesh Space */}
      <ThreeDWorld />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Content Structure */}
        <div className="flex flex-col items-center gap-8 max-w-4xl mx-auto">
          {/* Executive Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neon-cyan text-[10px] font-mono tracking-[0.18em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
            <span>{language === "ur" ? "مستند کارگر اے آئی سسٹمز // ۲۰۲۶" : "AUTHENTIC EXPERT SYSTEMS // 2026"}</span>
          </motion.div>

          {/* Majestic Hero Display Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-light tracking-tight leading-[1.1] text-white">
              {language === "ur" ? (
                <>
                  خودکار اے آئی سسٹمز اور
                  <br />
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-[#dfc299] to-neon-cyan">
                    بے مثال کوالٹی
                  </span>{" "}
                  آٹومیشنز
                </>
              ) : (
                <>
                  Autonomous AI Systems, 
                  <br />
                  <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-[#dfc299] to-neon-cyan">
                    High-Conversion
                  </span>{" "}
                  Automation
                </>
              )}
            </h1>
          </motion.div>

          {/* Clean Elite Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-400 max-w-3xl leading-relaxed font-light px-4"
          >
            {t("hero.sub")}
          </motion.p>

          {/* Value Bullet Points */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-x-8 gap-y-4 mt-2 w-full"
          >
            {bullets.map((text, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                <CheckCircle2 className="w-4 h-4 text-neon-cyan flex-shrink-0" />
                <span className="font-sans font-light tracking-wide">{text}</span>
              </div>
            ))}
          </motion.div>

          {/* Luxury CTA Switches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mt-4"
          >
            <a
              href="#sandbox"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-black bg-neon-cyan hover:bg-white font-mono uppercase tracking-wider text-xs font-bold transition-all duration-350 flex items-center justify-center gap-3 cursor-pointer shadow-lg shadow-neon-cyan/20 animate-pulse-subtle"
            >
              <Sparkles className="w-4 h-4 text-black" />
              <span>{language === "ur" ? "لائیو ڈیمو آزمائیں 🎙️" : "Try Live Demo 🎙️"}</span>
            </a>

            <button
              onClick={startWhatsAppChat}
              id="hero-whatsapp-btn"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-black bg-[#dfc299] hover:bg-white font-mono uppercase tracking-wider text-xs font-bold transition-all duration-350 flex items-center justify-center gap-3 cursor-pointer shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t("hero.secureConsultation")}</span>
            </button>
            
            <a
              href="#services"
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/10 hover:border-[#dfc299]/30 text-gray-300 hover:text-white font-mono uppercase tracking-wider text-xs font-bold transition-all duration-350 flex items-center justify-center gap-2 hover:bg-white/5 bg-[#050510]/50"
            >
              <span>{language === "ur" ? "سروسز دیکھیں" : "Explore Services"}</span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white" />
            </a>
          </motion.div>

          {/* Refined Luxury Agency Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="w-full max-w-lg pt-10 mt-10 border-t border-white/5 grid grid-cols-3 gap-3 sm:gap-6 mx-auto"
          >
            <div>
              <div className="text-2xl sm:text-3xl font-display font-light text-white tracking-tight">24 / 7</div>
              <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mt-1">
                {language === "ur" ? "خودکار آپس" : "Autonomous Ops"}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-light text-neon-cyan tracking-tight">85%+</div>
              <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mt-1">
                {language === "ur" ? "کاروباری بچت" : "Efficiency Gain"}
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-display font-light text-neon-purple tracking-tight">&lt; 150ms</div>
              <div className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mt-1">
                {language === "ur" ? "کم ترین تاخیر" : "Voice Latency"}
              </div>
            </div>
          </motion.div>

        </div>
        
      </div>
    </section>
  );
}

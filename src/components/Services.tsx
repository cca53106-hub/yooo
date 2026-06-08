import React from "react";
import { motion } from "motion/react";
import { PhoneCall, Cpu, Globe, Layers, ArrowUpRight, Check, BookOpen } from "lucide-react";
import { servicesData, agencyDetails } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";
import ThreeDTiltCard from "./ThreeDTiltCard";

export default function Services() {
  const { language, t } = useLanguage();
  const { prices } = useApp();
  
  // Icon mapper helper
  const renderIcon = (name: string, className: string) => {
    switch (name) {
      case "PhoneCall":
        return <PhoneCall className={className} />;
      case "Cpu":
        return <Cpu className={className} />;
      case "Globe":
        return <Globe className={className} />;
      case "Layers":
        return <Layers className={className} />;
      case "BookOpen":
        return <BookOpen className={className} />;
      default:
        return <Cpu className={className} />;
    }
  };

  const handleServiceInquiry = (serviceTitle: string) => {
    const textMsg = `Hi Mehaal! I'm interested in the "${serviceTitle}" service. Let's discuss our business requirements and pricing packages.`;
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="services" className="py-14 bg-transparent relative border-b border-white/5">
      
      {/* Decorative premium warm glows */}
      <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-neon-purple/3 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-neon-cyan/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-5 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neon-cyan text-[10px] font-mono tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
            <span>{t("services.badge")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light tracking-wide text-white leading-tight">
            {language === "ur" ? "حیرت انگیز خودکار اور اسمارٹ کاروباری سسٹمز" : "Designed to Automate Business"}
          </h2>
          <p className="text-gray-400 max-w-2xl text-xs sm:text-sm leading-relaxed font-light">
            {t("services.sub")}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {servicesData.map((service, index) => {
            const isPurpleTheme = index % 2 === 1;
            
            // Localized service details
            const title = t(`service.${service.id}.title`);
            const desc = t(`service.${service.id}.desc`);
            const longDesc = t(`service.${service.id}.longDesc`);
            const badge = t(`service.${service.id}.badge`);
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="h-full"
              >
                <ThreeDTiltCard
                  className={`relative rounded-2xl h-full p-6 xs:p-8 sm:p-10 transition-all duration-500 overflow-hidden group hover:scale-[1.01] ${
                    isPurpleTheme ? "glass-panel-purple" : "glass-panel-accent"
                  }`}
                >
                  {/* Subtle header shimmer instead of heavy gaming border */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-cyan/25 to-transparent" />

                  <div className="flex flex-col h-full justify-between gap-8">
                    
                    {/* Card Main Info */}
                    <div className="space-y-5">
                      <div className="flex items-center justify-between">
                        {/* Elegant Minimalist Frame */}
                        <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-white/[0.02] border border-white/10 text-neon-cyan">
                          {renderIcon(service.iconName, "w-5 h-5")}
                        </div>

                        {/* Badge with PKR Price details */}
                        <div className="text-right flex flex-col items-end">
                          <span className="text-[10px] font-mono px-3 py-1 rounded-full uppercase border bg-white/[0.02] border-white/10 text-neon-cyan tracking-wider">
                            {badge}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono mt-1.5 uppercase tracking-wider">
                            {language === "ur" ? `شروعات ${(prices[service.id] ?? service.pkrPrice).toLocaleString()} روپے سے` : `Starting ${(prices[service.id] ?? service.pkrPrice).toLocaleString()} PKR`}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-display font-light tracking-wide text-white">
                        {title}
                      </h3>

                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans font-light">{desc}</p>
                      <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">{longDesc}</p>
                    </div>

                    {/* Highlights and deliverables */}
                    <div className="space-y-4 pt-5 border-t border-white/5">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                        {language === "ur" ? "بنیادی خدمات اور معیار:" : "Core Deliverables & Standards:"}
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                        {service.features.map((feature, fIdx) => {
                          const translatedFeature = t(`service.${service.id}.feature.${fIdx}`);
                          return (
                            <li key={fIdx} className="flex items-center gap-2 text-gray-400 font-light">
                              <Check className="w-3.5 h-3.5 flex-shrink-0 text-neon-cyan/75" />
                              <span>{translatedFeature}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Clean Golden Outline CTA Button */}
                    <div className="pt-6 mt-auto">
                      <button
                        onClick={() => handleServiceInquiry(service.title)}
                        className="w-full py-3.5 px-4 rounded-xl font-mono text-xs tracking-wider uppercase transition-all duration-350 flex items-center justify-center gap-2 cursor-pointer border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black hover:border-transparent active:scale-[0.99]"
                      >
                        <span>{language === "ur" ? "پروجیکٹ پر گفتگو کریں" : `Inquire regarding ${service.title}`}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </ThreeDTiltCard>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

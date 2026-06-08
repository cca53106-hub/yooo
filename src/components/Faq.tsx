import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle, ArrowUpRight } from "lucide-react";
import { faqItems } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function Faq() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { language, t } = useLanguage();

  const toggleFaq = (index: number) => {
    if (activeIdx === index) {
      setActiveIdx(null);
    } else {
      setActiveIdx(index);
    }
  };

  const handleWhatsAppRedirect = () => {
    const rawMsg = "Hi Mehaal! I have a custom question regarding your AI Agency integrations that isn't answered in the FAQ.";
    const encoded = encodeURIComponent(rawMsg);
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="faqs" className="py-24 bg-transparent relative border-b border-white/5">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-neon-purple/2 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-5 mb-16">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neon-cyan text-[10px] font-mono tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
            <span>{language === "ur" ? "عام سوالات" : "COMMON INQUIRIES"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-wide">
            {language === "ur" ? "اکثر پوچھے گئے سوالات" : "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm max-w-lg font-light leading-relaxed">
            {language === "ur"
              ? "خودکار وائس ایجنٹس، اسکرپٹ آٹومیشن سسٹمز، اور ویب سائٹس کے متعلق پوچھے گئے اہم سوالات کے جوابات۔"
              : "Important parameters regarding custom voice agents, script-automation platforms, and responsive landing setups."}
          </p>
        </div>

        {/* FAQ Accordion Lists */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = activeIdx === index;
            const finalQuestion = t(`faq.${index}.question`);
            const finalAnswer = t(`faq.${index}.answer`);
            return (
              <div
                key={index}
                className="rounded-xl overflow-hidden glass-panel"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 select-none focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-neon-cyan/75 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-sans font-medium text-white transition-colors duration-300">
                      {finalQuestion}
                    </span>
                  </div>
                  <div className={`p-1.5 rounded-lg bg-white/[0.02] text-gray-400 transition-all duration-300 ${isOpen ? "rotate-90 text-neon-cyan bg-neon-cyan/5" : ""}`}>
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="p-6 pt-0 border-t border-white/5 text-xs sm:text-sm text-gray-400 leading-relaxed font-light">
                        {finalAnswer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Direct Question Prompt */}
        <div className="text-center mt-12 p-6 rounded-2xl glass-panel border-white/5 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="text-sm font-medium tracking-wide text-white">
              {language === "ur" ? "کوئی اور منفرد سوال ہے؟" : "Have a unique specification?"}
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 font-light">
              {language === "ur" ? "اپنے کاروبار کے مخصوص سلوشنز کے لیے فوری رابطہ کریں۔" : "Contact us instantly for custom platform solutions."}
            </p>
          </div>
          <button
            onClick={handleWhatsAppRedirect}
            className="px-4 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase text-black bg-neon-cyan hover:bg-white transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <span>{language === "ur" ? "میحال سے پوچھیں" : "Ask Mehaal"}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}

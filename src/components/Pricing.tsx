import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ShieldCheck, Zap, AlertCircle, Sparkles } from "lucide-react";
import { pricingPlans } from "../data";
import { useLanguage } from "../context/LanguageContext";
import { useApp } from "../context/AppContext";

export default function Pricing() {
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [activeMobileIdx, setActiveMobileIdx] = useState(2); // Default to high demand AI automation (now index 2)
  const { language, t } = useLanguage();
  const { prices } = useApp();

  // Approximate current exchange rate PKR -> USD
  const exchangeRate = 278;

  const getPriceDisplay = (pkrPrice: number, planId?: string) => {
    if (planId === "p6" || pkrPrice === 0) {
      return language === "ur" ? "کسٹم قیمت" : "Custom Price";
    }
    if (currency === "PKR") {
      return `${pkrPrice.toLocaleString()} PKR`;
    } else {
      const usdPrice = Math.round(pkrPrice / exchangeRate);
      return `$${usdPrice} USD`;
    }
  };

  const handleInquiry = (msg: string) => {
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const renderPlanCard = (plan: typeof pricingPlans[0], index: number) => {
    const isCallAgent = plan.title === "AI Call Agent";
    const localizedTitle = t(`pricing.${plan.id}.title`);
    const localizedDesc = t(`pricing.${plan.id}.desc`) || t(`pricing.${plan.id}.description`);
    const localizedCtaText = t(`pricing.${plan.id}.cta`) || t(`pricing.${plan.id}.ctaText`);
    const localizedPeriod = t(`pricing.${plan.id}.period`) || plan.period;

    return (
      <div
        className={`flex flex-col h-full rounded-2xl relative transition-all duration-500 overflow-hidden ${
          plan.popular 
            ? "glass-panel-accent border-neon-cyan/50 scale-[1.01] sm:scale-[1.03] z-10" 
            : isCallAgent 
            ? "glass-panel-purple border-neon-cyan/35"
            : "glass-panel"
        }`}
      >
        {/* Popular Platinum Bar Indicator */}
        {plan.popular && (
          <div className="bg-gradient-to-r from-neon-purple to-neon-cyan text-[10px] font-mono tracking-[0.2em] uppercase font-bold text-center py-2 text-black flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === "ur" ? "سب سے مقبول آفر" : "HIGH DEMAND SOLUTION"}</span>
          </div>
        )}

        {/* Card Main Info container */}
        <div className="p-6 flex-grow flex flex-col justify-between">
          <div>
            {/* Header Details */}
            <div className="mb-6">
              <span className="text-[9px] font-mono text-neon-cyan tracking-[0.25em] block mb-1">
                {language === "ur" ? `آپشن ۰${index + 1}` : `OPTION 0${index + 1}`}
              </span>
              <h3 className="text-xl font-display font-light text-white tracking-wide uppercase leading-tight">
                {localizedTitle}
              </h3>
              <p className="text-xs text-gray-400 mt-2 min-h-[40px] leading-relaxed font-light">
                {localizedDesc}
              </p>
            </div>

            {/* Cost Output Display */}
            <div className="mb-6">
              <div className="flex items-baseline align-baseline flex-wrap">
                <span className="text-2xl sm:text-3xl font-sans font-medium text-white tracking-tight">
                  {getPriceDisplay(prices[plan.id] ?? plan.price, plan.id)}
                </span>
                <span className="text-xs text-gray-500 font-mono ml-2">
                  / {localizedPeriod}
                </span>
              </div>
            </div>

            {/* Features checklist bullets */}
            <div className="space-y-3 pt-5 border-t border-white/5">
              <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block mb-1">
                {language === "ur" ? "پلان میں شامل سہولیات:" : "SYSTEM INCLUSIONS:"}
              </span>
              <ul className="space-y-2.5">
                {plan.features.map((feature, fIdx) => {
                  const translatedFeat = t(`pricing.${plan.id}.feature.${fIdx}`);
                  return (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-neon-cyan/80" />
                      <span className="leading-relaxed font-light">{translatedFeat}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Operational CTA triggers direct wa checkouts */}
          <div className="pt-6 mt-6 border-t border-white/5">
            <button
              onClick={() => {
                const dynamicPriceNum = prices[plan.id] ?? plan.price;
                const dynamicPriceFormatted = dynamicPriceNum.toLocaleString();
                const dynamicMsg = plan.whatsappMessage
                  .replace("15,000 PKR", `${dynamicPriceFormatted} PKR`)
                  .replace("30,000 PKR", `${dynamicPriceFormatted} PKR`)
                  .replace("50,000 PKR", `${dynamicPriceFormatted} PKR`);
                handleInquiry(dynamicMsg);
              }}
              className={`w-full py-3.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all duration-350 cursor-pointer flex items-center justify-center gap-2 ${
                plan.popular || isCallAgent
                  ? "bg-neon-cyan hover:bg-white text-black font-bold active:scale-[0.98]"
                  : "bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/10 text-white active:scale-[0.99]"
              }`}
            >
              <span>{localizedCtaText}</span>
            </button>
          </div>

        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="py-14 bg-transparent relative border-b border-white/5">
      
      {/* Background radial effects */}
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-neon-cyan/3 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-neon-purple/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center space-y-5 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neon-cyan text-[10px] font-mono tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
            <span>{language === "ur" ? "شفاف فیس اور پلانز" : "TRANSPARENT FEES"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-wide">
            {language === "ur" ? "پیکجز اور لاگت کی تفصیلات" : "Service Tiers & Parameters"}
          </h2>
          <p className="text-gray-400 max-w-2xl text-xs sm:text-sm font-light">
            {language === "ur"
              ? "کاروباری ماڈل سستی قیمت پر۔ ہر سسٹم کو کسٹمر سی آر ایم، سافٹ ویئر اور واٹس ایپ ورک فلوز کے مطابق ڈھالا گیا ہے۔"
              : "Clear pricing bounds. Every deployment is customized to company software, CRMs, and workflows with full support validation."}
          </p>

          {/* Core Currency Switch Tag */}
          <div className="inline-flex p-1 bg-white/[0.02] border border-white/10 rounded-xl mt-6">
            <button
              onClick={() => setCurrency("PKR")}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all duration-300 ${
                currency === "PKR"
                  ? "bg-neon-cyan text-black font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {language === "ur" ? "روپے (پاکستانی)" : "PKR (Locals)"}
            </button>
            <button
              onClick={() => setCurrency("USD")}
              className={`px-4 py-2 text-xs font-mono font-medium rounded-lg transition-all duration-300 ${
                currency === "USD"
                  ? "bg-neon-purple text-white font-semibold"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {language === "ur" ? "ڈالر (عالمی)" : "USD (Global)"}
            </button>
          </div>
        </div>

        {/* Mobile tab-row selection */}
        <div className="flex lg:hidden items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar w-full select-none justify-start">
          {pricingPlans.map((plan, index) => {
            const isActive = activeMobileIdx === index;
            const localizedTitle = t(`pricing.${plan.id}.title`);
            return (
              <button
                key={plan.id}
                onClick={() => setActiveMobileIdx(index)}
                className={`px-4 py-2.5 rounded-xl text-xs font-sans tracking-wide transition-all duration-300 flex-shrink-0 cursor-pointer ${
                  isActive
                    ? "bg-neon-cyan text-black font-medium"
                    : "bg-white/5 text-gray-400 border border-white/5"
                }`}
              >
                {localizedTitle}
              </button>
            );
          })}
        </div>

        {/* Pricing Layout Grid - Desktop Columned and Mobile Tabbed */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="h-full"
            >
              {renderPlanCard(plan, index)}
            </motion.div>
          ))}
        </div>

        {/* Mobile slide tab display container */}
        <div className="block lg:hidden w-full max-w-sm mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMobileIdx}
              initial={{ opacity: 0, scale: 0.98, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderPlanCard(pricingPlans[activeMobileIdx], activeMobileIdx)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Security / Handshake banner */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl glass-panel border-white/5 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-neon-cyan" />
            </div>
            <div>
              <h4 className="text-sm font-display font-medium tracking-wide text-white">
                {language === "ur" ? "محفوظ سروسز چارٹر" : "Protected Service Charter"}
              </h4>
              <p className="text-xs text-gray-400 mt-0.5 font-light">
                {language === "ur" 
                  ? "ہر پروجیکٹ کی شروعات باہمی طور پر منظور شدہ مراحل کے پلان کے تحت ہوتی ہے۔" 
                  : "Every project kickstart builds upon a definitive milestones chart approved beforehand."}
              </p>
            </div>
          </div>
          <div className="text-[10px] font-mono text-neon-cyan bg-white/[0.02] px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5 flex-shrink-0 uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>{language === "ur" ? "شک باہمی کامیابی" : "GUARANTEED MILESTONES"}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

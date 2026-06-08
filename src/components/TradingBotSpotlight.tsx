import React from "react";
import { ExternalLink, Zap, ShieldCheck, Server, ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ThreeDTiltCard from "./ThreeDTiltCard";

export default function TradingBotSpotlight() {
  const { language, t } = useLanguage();

  const openTradingBot = () => {
    window.open("https://dark-trading-bot-41574942116.asia-southeast1.run.app/", "_blank", "noopener,noreferrer");
  };

  const rightList = language === "ur" ? [
    { title: "متحرک سلپیج ایڈجسٹمنٹ", desc: "مارکیٹ میں خرید و فروخت کے رسک کو کم کرے" },
    { title: "لائیو مارکیٹ سگنلز تجزیہ", desc: "سگنلز کو براہ راست انجن تک منتقل کرتا ہے" },
    { title: "سیفٹی سرکٹ بریکر", desc: "خودکار حفاظتی لاک آؤٹ نیٹ ورک" }
  ] : [
    { title: "Dynamic Slippage Tuning", desc: "Reduces execution risk across volatile assets" },
    { title: "Sentiment Feeds Parser", desc: "Pipes real-time signals straight to engines" },
    { title: "Safety Circuit Breaker", desc: "Automated trigger for quick system lockout" }
  ];

  return (
    <section id="trading-bot" className="py-14 bg-transparent relative border-b border-white/5 overflow-hidden">
      {/* Absolute organic ambient shines */}
      <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-neon-cyan/3 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-neon-purple/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center space-y-5 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neon-cyan text-[10px] font-mono tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
            <span>{language === "ur" ? "ٹریڈنگ بوٹ مانیٹرنگ" : "SYSTEM MONITORING"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-wide leading-tight">
            {language === "ur" ? "خودکار ٹریڈنگ سسٹمز" : "Autonomous Trading Systems"}
          </h2>
          <p className="text-gray-400 max-w-2xl text-xs sm:text-sm font-light">
            {language === "ur" 
              ? "ہمارے بہترین اور خودکار ٹریڈنگ انڈیکیٹرز، اور الگورتھمک سسٹمز کا لائیو جائزہ۔ نیچے سینڈ باکس ماحول ٹیسٹ کریں۔" 
              : "Review of high-performance indicators, quantitative pipelines, and algorithmic modules. Test-drive the sandbox environment below."}
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Card 1: System Indicators (7 Cols on desktop) */}
          <ThreeDTiltCard className="lg:col-span-7 h-full flex flex-col justify-between p-8 sm:p-10 rounded-2xl glass-panel relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/3 rounded-full blur-2xl"></div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-neon-cyan/80" />
                  <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest">
                    {language === "ur" ? "ڈپلوئےمنٹ کی حالت" : "DEPLOYMENT STATUS"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.02] border border-white/10 text-[9px] font-mono text-gray-500 uppercase tracking-wider">
                  <span>{language === "ur" ? "محفوظ چینل" : "SECURE CHANNEL"}</span>
                </div>
              </div>

              {/* System specifications lists */}
              <div className="space-y-4">
                <p className="text-sm text-gray-350 leading-relaxed font-light">
                  {language === "ur"
                    ? "ہمارے سسٹمز تیز رفتار رینڈرنگ اور ریئل ٹائم ڈیٹا کے لیے موزوں بنائے گئے ہیں، جو مارکیٹ کے اتار چڑھاؤ کے دوران بالکل درست نتائج دکھاتے ہیں۔"
                    : "A client-facing interactive workstation interfacing directly with high-performance engines, optimized for rapid data visualization and zero latency rendering under market volatility."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                      {language === "ur" ? "انٹرنیٹ اسپیڈ" : "API SPEED"}
                    </span>
                    <span className="text-base font-mono font-medium text-white block mt-1">⏳ &lt; 15 ms</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">
                      {language === "ur" ? "سسٹم روابط" : "BROKER ROUTING"}
                    </span>
                    <span className="text-base font-mono font-medium text-white block mt-1">
                      {language === "ur" ? "🔄 لائیو لنک" : "🔄 REALTIME LINK"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/20 border border-white/5 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-white block">
                    {language === "ur" ? "خودکار رسک مینجمنٹ" : "Algorithmic Risk Management"}
                  </span>
                  <p className="text-[11px] text-gray-400 font-light mt-0.5 leading-relaxed">
                    {language === "ur"
                      ? "ہمارے خودکار سسٹمز ہر ٹریڈ میں سرمایہ کاری کے حجم کو لائیو مانیٹر کرتے ہیں اور آپ کے پورٹ فولیو کو حد سے زیادہ نقصان سے محفوظ رکھتے ہیں۔"
                      : "Custom guardrails automatically enforce margin requirements and account capital balances securely inside custom local environments."}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct navigation CTA */}
            <div className="pt-6 mt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-gray-500 font-mono uppercase tracking-wider">
                {language === "ur" ? "فعال ٹریڈنگ پروجیکٹ" : "ACTIVE PORT PROJECT"}
              </span>
              <button
                onClick={openTradingBot}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-mono tracking-wider uppercase text-black bg-neon-cyan hover:bg-white transition-all duration-350 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>{language === "ur" ? "ٹریڈنگ بوٹ کھولیں" : "Launch Bot Interface"}</span>
                <ExternalLink className="w-3.5 h-3.5 animate-pulse" />
              </button>
            </div>
          </ThreeDTiltCard>

          {/* Card 2: Strategic Insights (5 Cols on desktop) */}
          <ThreeDTiltCard className="lg:col-span-5 h-full flex flex-col justify-between p-8 sm:p-10 rounded-2xl glass-panel relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-purple/3 rounded-full blur-2xl"></div>

            <div className="space-y-6">
              <span className="text-[10px] font-mono text-neon-purple uppercase tracking-widest block">
                {language === "ur" ? "کوانٹ ڈیٹا تجزیہ" : "QUANT LOGISTICS"}
              </span>
              
              <h3 className="text-xl sm:text-2xl font-display font-light text-white tracking-wide">
                {language === "ur" ? "ٹریڈنگ کور اے پی آئی" : "Trading Core API"}
              </h3>
              
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                {language === "ur"
                  ? "ایک جدید ترین حسابی ماڈل جو براہ راست سگنلز پر کام کرتا ہے اور ریئل ٹائم مارکیٹ اور لیکویڈیٹی کی زبردست جانچ کرتا ہے۔"
                  : "A mathematical model trained on real-time trade signals, optimizing order books and analyzing asset liquidity dynamically over active exchanges."}
              </p>

              {/* Mini visual feature list */}
              <ul className="space-y-4 pt-2">
                {rightList.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded bg-white/[0.02] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Zap className="w-3 h-3 text-neon-cyan" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-white block leading-none">{item.title}</span>
                      <span className="text-[10px] text-gray-500 font-light mt-1 block leading-normal">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 mt-8 border-t border-white/5">
              <button
                onClick={openTradingBot}
                className="w-full py-3.5 rounded-xl text-xs font-mono tracking-wider uppercase text-neon-cyan border border-neon-cyan/20 hover:bg-neon-cyan hover:text-black hover:border-transparent transition-all duration-350 flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <span>{language === "ur" ? "سینڈ باکس تک رسائی" : "Access Sandbox"}</span>
                <ArrowRight className="w-4 h-4 text-neon-cyan group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </ThreeDTiltCard>

        </div>

      </div>
    </section>
  );
}

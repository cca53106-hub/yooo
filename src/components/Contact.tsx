import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, MessageSquare, Send, Mail, MapPin, Sparkles, Clock, MessageCircle } from "lucide-react";
import { agencyDetails } from "../data";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    service: "AI Voice Call Agent",
    details: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Concurrent backend log trace to capture client details in Admin Portal
    try {
      const sessionId = sessionStorage.getItem("visit_session_id") || "form_" + Math.random().toString(36).substring(7);
      fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          service: formData.service,
          details: formData.details,
          sessionId
        })
      }).catch(err => console.error("Logged inquiry fail", err));
    } catch (err) {
      console.error("Failed to post inquiry log background telemetry", err);
    }
    
    // Construct beautifully structured text for WhatsApp
    const intro = `*NEW INQUIRY VIA WEBPAGE* 🚀\n\n`;
    const nameSection = formData.name ? `*From:* ${formData.name}\n` : "";
    const companySection = formData.company ? `*Company:* ${formData.company}\n` : "";
    const serviceSection = `*Service Interest:* ${formData.service}\n`;
    const detailsSection = formData.details ? `*Project Details:* ${formData.details}\n` : "";
    
    const formattedMessage = `${intro}${nameSection}${companySection}${serviceSection}${detailsSection}`;
    const encoded = encodeURIComponent(formattedMessage);
    
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const startInstantChat = () => {
    const textMsg = "Hi Mehaal! I'm interested in working with you. Let's arrange a brief intro call.";
    const encoded = encodeURIComponent(textMsg);
    window.open(`https://wa.me/923302930930?text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="py-14 bg-transparent relative border-b border-white/5">
      
      {/* Decorative vector assets */}
      <div className="absolute top-1/2 left-1/0 w-[300px] h-[300px] bg-neon-purple/2 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-[300px] h-[300px] bg-neon-cyan/2 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="flex flex-col items-center text-center space-y-5 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/10 text-neon-cyan text-[10px] font-mono tracking-[0.16em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan"></span>
            <span>{language === "ur" ? "پروجیکٹ شروع کرنے کے لیے تیار ہیں؟" : "READY TO LAUNCH?"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light text-white tracking-wide">
            {language === "ur" ? "ہمارے ساتھ رابطہ کریں" : "Coordinate Your System"}
          </h2>
          <p className="text-gray-400 max-w-2xl text-xs sm:text-sm font-light leading-relaxed">
            {language === "ur"
              ? "نیچے فارم مکمل کر کے اپنے پروجیکٹ کی تفصیلات بھیجیں، یا براہ راست واٹس ایپ پر رابطہ کریں۔"
              : "Outline your system expectations below, or initiate a conversation directly on WhatsApp to coordinate an agency roadmap."}
          </p>
        </div>

        {/* Contact Layout Dual Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Block: Direct Handles and Trust points */}
          <div className="lg:col-span-12 xl:col-span-5 flex flex-col justify-between gap-8 h-full">
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-neon-cyan uppercase">
                  {language === "ur" ? "ماہر اے آئی سسٹمز اسپیشلسٹ" : "ESTABLISHED SYSTEMS DESIGNER"}
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-light text-white tracking-wide">
                  M. Mehaal Khattak
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  {language === "ur"
                    ? "ہمارا مقصد بالکل واضح اور سادہ ہے: اپنے کاروبار کے غیراہم اور تھکا دینے والے کاموں کو خودکار بنانا اور لائیو مواصلاتی اے آئی ایجنٹس سے سجا دینا۔ ہم رفتار اور اعلیٰ معیار کی کوڈنگ پر یقین رکھتے ہیں۔"
                    : "Our core mission is straightforward: to dismantle inefficient manual overhead and build clean, robust voice and standard automation routines. We focus on custom code, native script synchronization, and speed."}
                </p>
              </div>

              {/* Verified details cards */}
              <div className="space-y-4">
                {/* WhatsApp callout */}
                <div className="flex items-center gap-4 p-5 rounded-xl glass-panel-accent border-neon-cyan/15">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4 text-neon-cyan" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-neon-cyan/80 block uppercase tracking-wider">
                      {language === "ur" ? "براہ راست واٹس ایپ رابطہ" : "WHATSAPP DIRECT"}
                    </span>
                    <a 
                      href="https://wa.me/923302930930" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-neon-cyan text-sm sm:text-base font-semibold transition-colors duration-300 font-mono tracking-wide block mt-0.5"
                    >
                      {agencyDetails.whatsappRaw}
                    </a>
                  </div>
                </div>

                {/* Email Handshake */}
                <div className="flex items-center gap-4 p-5 rounded-xl glass-panel">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-wider font-bold">
                      {language === "ur" ? "کاروباری ای میل" : "BUSINESS INQUIRY INBOX"}
                    </span>
                    <a 
                      href={`mailto:${agencyDetails.email}`} 
                      className="text-white hover:text-neon-cyan text-sm sm:text-base font-semibold transition-colors duration-300 font-mono block mt-0.5"
                    >
                      {agencyDetails.email}
                    </a>
                  </div>
                </div>

                {/* Response speed */}
                <div className="flex items-center gap-4 p-5 rounded-xl glass-panel">
                  <div className="w-11 h-11 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-gray-500 block uppercase tracking-wider">
                      {language === "ur" ? "جواب دینے کی اسپیڈ" : "AVERAGE INBOX SLA"}
                    </span>
                    <span className="text-white text-sm sm:text-base font-semibold font-mono block mt-0.5">
                      {language === "ur" ? "۱۵ منٹ کے اندر" : "UNDER 15 MINUTES"}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Instant Chat trigger button */}
            <div className="pt-6 border-t border-white/5">
              <button
                onClick={startInstantChat}
                className="w-full py-4 rounded-xl bg-neon-cyan text-black hover:bg-white text-xs font-mono tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 active:scale-[0.99] shadow-md font-bold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{language === "ur" ? "فوری واٹس ایپ مشاورت" : "Instant Inbound Consultation"}</span>
              </button>
            </div>

          </div>

          {/* Right Block: Instant Live Form Compiler */}
          <div className="lg:col-span-12 xl:col-span-7">
            <div className="rounded-2xl p-6 sm:p-10 glass-panel h-full relative overflow-hidden">
              
              <div className="flex items-center gap-2.5 text-neon-cyan text-xs font-mono uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-5">
                <Sparkles className="w-4 h-4 text-neon-cyan" />
                <span>{language === "ur" ? "واٹس ایپ انفارمیشن فارم" : "WHATSAPP ALIGNMENT ROUTING"}</span>
              </div>

              <form onSubmit={handleWhatsAppSend} className="space-y-6">
                
                {/* Name */}
                <div className="space-y-2">
                  <label htmlFor="name-input" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                    {language === "ur" ? "آپ کا نام / عرفیت:" : "Your Name / Agent Alias:"}
                  </label>
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={language === "ur" ? "مثال کے طور پر: حارث خان" : "e.g. Harris Khan"}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 focus:border-neon-cyan rounded-lg px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none transition-all font-sans font-light"
                    required
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <label htmlFor="company-input" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                    {language === "ur" ? "کاروبار / کمپنی کا نام (اختیاری):" : "Business / Company Name (Optional):"}
                  </label>
                  <input
                    type="text"
                    id="company-input"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={language === "ur" ? "مثال کے طور پر: ایپکس ریٹیل" : "e.g. Apex Tech Retail"}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 focus:border-neon-cyan rounded-lg px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none transition-all font-sans font-light"
                  />
                </div>

                {/* Service of choices dropdown */}
                <div className="space-y-2">
                  <label htmlFor="service-dropdown" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                    {language === "ur" ? "مطلوبہ سروس آرکیٹیکچر:" : "Required Service Architecture:"}
                  </label>
                  <select
                    id="service-dropdown"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 focus:border-neon-cyan rounded-lg px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none transition-all cursor-pointer font-sans font-light"
                  >
                    <option value="AI Voice Call Agent">
                      {language === "ur" ? "اے آئی کالنگ ایجنٹ (50,000 روپے)" : "AI Call Agent (50,000 PKR)"}
                    </option>
                    <option value="AI Workflow Automation">
                      {language === "ur" ? "اے آئی ورک فلو آٹومیشن (30,000 روپے)" : "AI Automation (30,000 PKR)"}
                    </option>
                    <option value="Standard Responsive Website">
                      {language === "ur" ? "موبائل دوست ویب سائٹ بلڈنگ (15,000 روپے)" : "Website Building (15,000 PKR)"}
                    </option>
                    <option value="Interactive 3D Website Rendering">
                      {language === "ur" ? "تھری ڈی (3D) ویب سائٹ انٹرایکٹو (30,000 روپے)" : "3D Website (30,000 PKR)"}
                    </option>
                    <option value="AI Automation Course">
                      {language === "ur" ? "اے آئی آٹومیشن کورس (15,000 روپے)" : "AI Automation Course (15,000 PKR)"}
                    </option>
                    <option value="Custom Complex Multi-Integration Module">
                      {language === "ur" ? "دیگر کسٹم ملٹی پروجیکٹ ماڈیول" : "Custom Multi-Architecture Module"}
                    </option>
                  </select>
                </div>

                {/* Description details */}
                <div className="space-y-2">
                  <label htmlFor="details-input" className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
                    {language === "ur" ? "پروجیکٹ کے اہم تقاضے درج کریں:" : "Outline and Core Requirements:"}
                  </label>
                  <textarea
                    id="details-input"
                    name="details"
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder={language === "ur" ? "یہاں تفصیل سے لکھیں کہ آپ کا اے آئی سسٹم اور ویب سائٹ کس طرح کام کرے۔۔۔" : "Specify here how you want the AI systems, databases, websites, or call scripts structured..."}
                    rows={4}
                    className="w-full bg-black/40 backdrop-blur-md border border-white/10 focus:border-neon-cyan rounded-lg px-4 py-3.5 text-base sm:text-sm text-white focus:outline-none transition-all resize-none font-sans font-light"
                    required
                  />
                </div>

                {/* Submit Compilation Trigger */}
                <button
                  type="submit"
                  id="contact-form-submit"
                  className="w-full py-4 rounded-xl text-black bg-neon-cyan hover:bg-white font-mono uppercase tracking-wider text-xs font-bold transition-all duration-350 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {language === "ur" ? "فارم مرتب کریں اور واٹس ایپ پر بھیجیں" : "Compile and Send over WhatsApp"}
                  </span>
                </button>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, Lock, Shield, Settings, Users, Clock, PlayCircle, Eye, 
  RefreshCw, CheckCircle, TrendingUp, AlertCircle, LogOut, Laptop, Globe,
  Mic, Download, HelpCircle, MessageSquare, Trash2
} from "lucide-react";
import { useApp, AdminStats } from "../context/AppContext";

interface AdminPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPortal({ isOpen, onClose }: AdminPortalProps) {
  const { isAdmin, login, logout, prices, updatePrices, fetchStats } = useApp();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loadingStats, setLoadingStats] = useState(false);
  const [activePanelTab, setActivePanelTab] = useState<"prices" | "sessions" | "inquiries" | "questions" | "voice">("inquiries");
  
  // Local pricing form states
  const [customPrices, setCustomPrices] = useState<Record<string, number>>({});
  const [savingPrices, setSavingPrices] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Stateful delete confirmations to support iframe sandbox context
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteType, setConfirmDeleteType] = useState<string | null>(null);

  // Auto clear confirmation locks after a timeout
  useEffect(() => {
    if (confirmDeleteId || confirmDeleteType) {
      const timer = setTimeout(() => {
        setConfirmDeleteId(null);
        setConfirmDeleteType(null);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [confirmDeleteId, confirmDeleteType]);

  // Sync pricing values when loaded
  useEffect(() => {
    if (prices) {
      setCustomPrices({ ...prices });
    }
  }, [prices]);

  // Load stats if admin is authenticated
  const loadDashboardStats = async () => {
    if (!isAdmin) return;
    setLoadingStats(true);
    try {
      const data = await fetchStats();
      if (data) {
        setStats(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStats(false);
    }
  };

  const handleDeleteRecording = async (id: string) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    setConfirmDeleteId(null);
    try {
      const response = await fetch(`/api/recordings/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "mehaal2026"
        }
      });
      const data = await response.json();
      if (data.success) {
        loadDashboardStats();
      } else {
        console.error("Failed to delete recording:", data.error || "Unknown error");
      }
    } catch (e) {
      console.error("Error deleting recording:", e);
    }
  };

  const handleClearAllRecordings = async () => {
    if (confirmDeleteType !== "all_recordings") {
      setConfirmDeleteType("all_recordings");
      return;
    }
    setConfirmDeleteType(null);
    try {
      const response = await fetch(`/api/recordings/clear`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "mehaal2026"
        }
      });
      const data = await response.json();
      if (data.success) {
        loadDashboardStats();
      } else {
        console.error("Failed to clear recordings:", data.error || "Unknown error");
      }
    } catch (e) {
      console.error("Error clearing recordings:", e);
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    setConfirmDeleteId(null);
    try {
      const response = await fetch(`/api/inquiries/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "mehaal2026"
        }
      });
      const data = await response.json();
      if (data.success) {
        loadDashboardStats();
      } else {
        console.error("Failed to delete inquiry:", data.error || "Unknown error");
      }
    } catch (e) {
      console.error("Error deleting inquiry:", e);
    }
  };

  const handleClearAllInquiries = async () => {
    if (confirmDeleteType !== "all_inquiries") {
      setConfirmDeleteType("all_inquiries");
      return;
    }
    setConfirmDeleteType(null);
    try {
      const response = await fetch(`/api/inquiries/clear`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "mehaal2026"
        }
      });
      const data = await response.json();
      if (data.success) {
        loadDashboardStats();
      } else {
        console.error("Failed to clear inquiries:", data.error || "Unknown error");
      }
    } catch (e) {
      console.error("Error clearing inquiries:", e);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (confirmDeleteId !== id) {
      setConfirmDeleteId(id);
      return;
    }
    setConfirmDeleteId(null);
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "mehaal2026"
        }
      });
      const data = await response.json();
      if (data.success) {
        loadDashboardStats();
      } else {
        console.error("Failed to delete question log:", data.error || "Unknown error");
      }
    } catch (e) {
      console.error("Error deleting question log:", e);
    }
  };

  const handleClearAllQuestions = async () => {
    if (confirmDeleteType !== "all_questions") {
      setConfirmDeleteType("all_questions");
      return;
    }
    setConfirmDeleteType(null);
    try {
      const response = await fetch(`/api/questions/clear`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "mehaal2026"
        }
      });
      const data = await response.json();
      if (data.success) {
        loadDashboardStats();
      } else {
        console.error("Failed to clear questions:", data.error || "Unknown error");
      }
    } catch (e) {
      console.error("Error clearing questions:", e);
    }
  };

  useEffect(() => {
    if (isOpen && isAdmin) {
      loadDashboardStats();
    }
  }, [isOpen, isAdmin]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoggingIn(true);
    
    const success = await login(password);
    setLoggingIn(false);
    
    if (success) {
      setPassword("");
    } else {
      setError("Incorrect administrator credentials.");
    }
  };

  const handlePriceChange = (id: string, value: string) => {
    const numeric = parseInt(value, 10);
    setCustomPrices(prev => ({
      ...prev,
      [id]: isNaN(numeric) ? 0 : numeric
    }));
  };

  const handleSavePrices = async () => {
    setSavingPrices(true);
    setSaveSuccess(false);
    try {
      const success = await updatePrices(customPrices);
      if (success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (e) {
       console.error(e);
    } finally {
      setSavingPrices(false);
    }
  };

  // Diagnostic calculations
  const formatTimeSpent = (seconds: number) => {
    if (seconds === 0) return "0s";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    const parts = [];
    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}m`);
    if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
    return parts.join(" ");
  };

  const getAverageDwellTime = () => {
    if (!stats || stats.totalVisitors === 0) return "0s";
    const avgSecs = Math.round(stats.totalTimeSpent / stats.totalVisitors);
    return formatTimeSpent(avgSecs);
  };

  // Active concurrent users online logic
  const getActiveUsersCount = () => {
    if (!stats) return 0;
    const now = Date.now();
    return stats.sessions.filter(s => {
      const lastActive = new Date(s.lastHeartbeatAt).getTime();
      return (now - lastActive) / 1000 < 60; // Has pinged in last 60 seconds
    }).length;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Portal panel box */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-5xl h-[85vh] bg-[#020306]/95 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10 font-sans"
      >
        {/* Header bar area */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-display font-medium text-white tracking-wider uppercase">
                Mehaal's Operational Control Desk
              </h3>
              <p className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mt-0.5">
                Private Admin Interface
              </p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 transition-all text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content canvas */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {!isAdmin ? (
            /* Passcode submission wall */
            <div className="max-w-md mx-auto h-full flex flex-col justify-center items-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.01] border border-white/10 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-neon-purple" />
              </div>
              <h4 className="text-xl font-display font-light text-center text-white tracking-wide uppercase">
                Restricted Access Area
              </h4>
              <p className="text-xs text-gray-500 text-center max-w-xs leading-relaxed mt-2 mb-6">
                Please unlock the system console using the master credential bypass code.
              </p>

              <form onSubmit={handleLoginSubmit} className="w-full space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-450 uppercase tracking-widest block">
                    Securo-Key Phrase <span className="text-neon-cyan lowercase ml-1">(Hint: mehaal2026)</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Private Passcode..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-sm text-center font-mono focus:border-neon-cyan/50 focus:outline-none transition-all placeholder:text-gray-600"
                    autoFocus
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-[11px] text-red-400 flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loggingIn || !password}
                  className="w-full py-3 rounded-xl bg-neon-cyan hover:bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-350 active:scale-[0.98] disabled:opacity-50 cursor-pointer"
                >
                  {loggingIn ? "Verifying..." : "Handshake Protocol"}
                </button>
              </form>
            </div>
          ) : (
            /* Secure Dashboard View */
            <div className="space-y-8">
              {/* Bento Grid Analytics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Unique guests */}
                <div className="rounded-xl p-5 border border-white/5 bg-white/[0.01] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-cyan/5 border border-neon-cyan/10 flex items-center justify-center text-neon-cyan flex-shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      Total Visitors
                    </span>
                    <span className="text-2xl font-mono text-white mt-1 block">
                      {stats ? stats.totalVisitors : "..."}
                    </span>
                  </div>
                </div>

                {/* Cumulative duration */}
                <div className="rounded-xl p-5 border border-white/5 bg-white/[0.01] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/5 border border-neon-purple/10 flex items-center justify-center text-neon-purple flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      Total Time Spent
                    </span>
                    <span className="text-2xl font-mono text-white mt-1 block">
                      {stats ? formatTimeSpent(stats.totalTimeSpent) : "..."}
                    </span>
                  </div>
                </div>

                {/* Average dwell */}
                <div className="rounded-xl p-5 border border-white/5 bg-white/[0.01] flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-pink-500/5 border border-pink-500/10 flex items-center justify-center text-pink-400 flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      Avg Dwell Time
                    </span>
                    <span className="text-2xl font-mono text-white mt-1 block">
                      {stats ? getAverageDwellTime() : "..."}
                    </span>
                  </div>
                </div>

                {/* Live Online Users */}
                <div className="rounded-xl p-5 border border-white/5 bg-white/[0.02] flex items-center gap-4 relative overflow-hidden">
                  <div className="absolute top-2 right-2 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">
                      Active Guests
                    </span>
                    <span className="text-2xl font-mono text-emerald-400 mt-1 block">
                      {stats ? getActiveUsersCount() : "..."} <span className="text-xs text-gray-550 font-light">Online</span>
                    </span>
                  </div>
                </div>

              </div>

              {/* Tab Navigation Menu */}
              <div className="flex border-b border-white/5 pb-2 overflow-x-auto gap-2">
                <button
                  type="button"
                  onClick={() => setActivePanelTab("prices")}
                  className={`px-4 py-2 border rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === "prices"
                      ? "border-neon-cyan bg-neon-cyan/5 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Settings className="w-3.5 h-3.5 text-neon-cyan" />
                  <span>Pricing Control</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanelTab("inquiries")}
                  className={`px-4 py-2 border rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === "inquiries"
                      ? "border-neon-purple bg-neon-purple/5 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-neon-purple" />
                  <span>Client Details & Leads</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanelTab("questions")}
                  className={`px-4 py-2 border rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer relative ${
                    activePanelTab === "questions"
                      ? "border-pink-500 bg-pink-500/5 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5 text-pink-400" />
                  <span>AI Questions Log</span>
                  {stats && stats.questionsLogged && stats.questionsLogged.some((q: any) => q.unanswered) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanelTab("sessions")}
                  className={`px-4 py-2 border rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === "sessions"
                      ? "border-neon-cyan bg-neon-cyan/5 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Session Traces</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanelTab("voice")}
                  className={`px-4 py-2 border rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer ${
                    activePanelTab === "voice"
                      ? "border-neon-purple bg-neon-purple/5 text-white font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-neon-purple" />
                  <span>Voice Auditing</span>
                </button>
              </div>

              {/* pricing controls panel */}
              {activePanelTab === "prices" && (
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-neon-cyan" />
                      <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider">
                        Pricing and Investment Customizations
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={loadDashboardStats}
                      className="p-1 px-3 space-x-1 border border-white/10 hover:border-white/30 rounded-lg text-xs font-mono tracking-wide text-gray-400 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${loadingStats ? "animate-spin" : ""}`} />
                      <span>Sync Metrics</span>
                    </button>
                  </div>

                  {/* Form layout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Digital services start prices */}
                    <div className="space-y-4">
                      <h5 className="text-[11px] font-mono text-neon-cyan uppercase tracking-widest border-b border-white/5 pb-1">
                        Service starting rates (PKR)
                      </h5>
                      
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">AI Call Agent Initial:</span>
                          <input
                            type="number"
                            value={customPrices["ai-call-agent"] ?? ""}
                            onChange={(e) => handlePriceChange("ai-call-agent", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">AI Automation Initial:</span>
                          <input
                            type="number"
                            value={customPrices["ai-automation"] ?? ""}
                            onChange={(e) => handlePriceChange("ai-automation", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">Website Building Standard:</span>
                          <input
                            type="number"
                            value={customPrices["website-building"] ?? ""}
                            onChange={(e) => handlePriceChange("website-building", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">3D Interactive Websites:</span>
                          <input
                            type="number"
                            value={customPrices["3d-website"] ?? ""}
                            onChange={(e) => handlePriceChange("3d-website", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">Automation Masterclass:</span>
                          <input
                            type="number"
                            value={customPrices["ai-automation-course"] ?? ""}
                            onChange={(e) => handlePriceChange("ai-automation-course", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Card investment tier plans */}
                    <div className="space-y-4">
                      <h5 className="text-[11px] font-mono text-neon-purple uppercase tracking-widest border-b border-white/5 pb-1">
                        Investment plans overrides (PKR)
                      </h5>

                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">Course Plan (p0):</span>
                          <input
                            type="number"
                            value={customPrices["p0"] ?? ""}
                            onChange={(e) => handlePriceChange("p0", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">Web Build Plan (p1):</span>
                          <input
                            type="number"
                            value={customPrices["p1"] ?? ""}
                            onChange={(e) => handlePriceChange("p1", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">Automation Setup (p2):</span>
                          <input
                            type="number"
                            value={customPrices["p2"] ?? ""}
                            onChange={(e) => handlePriceChange("p2", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">3D Design Plan (p3):</span>
                          <input
                            type="number"
                            value={customPrices["p3"] ?? ""}
                            onChange={(e) => handlePriceChange("p3", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-xs text-gray-300">Call Agent Plan (p4):</span>
                          <input
                            type="number"
                            value={customPrices["p4"] ?? ""}
                            onChange={(e) => handlePriceChange("p4", e.target.value)}
                            className="w-32 bg-white/[0.02] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-center font-mono focus:border-neon-cyan"
                          />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Submitions area */}
                  <div className="flex items-center justify-end gap-3.5 pt-4 border-t border-white/5">
                    <AnimatePresence>
                      {saveSuccess && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-emerald-400 flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Dynamic properties successfully saved!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <button
                      type="button"
                      onClick={handleSavePrices}
                      disabled={savingPrices}
                      className="px-5 py-2.5 rounded-lg bg-neon-cyan hover:bg-white text-black text-xs font-mono font-bold tracking-wider uppercase active:scale-[0.98] transition-all duration-350 disabled:opacity-50 cursor-pointer"
                    >
                      {savingPrices ? "Updating System..." : "Apply Price Customization"}
                    </button>
                  </div>
                </div>
              )}

              {/* Client inquiries / detailed lead inputs */}
              {activePanelTab === "inquiries" && (
                <div className="space-y-6">
                  
                  {/* Visual Client Analytics & Distribution Charts Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Card 1: Total Leads Count */}
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Total Client Leads</div>
                      <div className="text-2xl font-bold text-white tracking-tight mt-1">
                        {stats?.clientInquiries?.length || 0}
                      </div>
                      <p className="text-[9px] text-neon-cyan font-mono mt-2 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                        Organic Funnel Active
                      </p>
                    </div>

                    {/* Card 2: Service Distribution Bar Chart */}
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] col-span-1 md:col-span-2 flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Service Request Distribution</div>
                      <div className="space-y-2 flex-1 flex flex-col justify-center">
                        {["AI Call Agent", "AI Automation", "3D Website", "Website Development", "Custom AI"].map((srv, index) => {
                          const occurrences = stats?.clientInquiries?.filter((i: any) => {
                            const iSrv = (i.service || "").toLowerCase();
                            if (srv === "Website Development") return iSrv.includes("website") || iSrv.includes("design") || iSrv.includes("web");
                            if (srv === "AI Call Agent") return iSrv.includes("call") || iSrv.includes("agent") || iSrv.includes("representative") || iSrv.includes("voice");
                            if (srv === "AI Automation") return iSrv.includes("automation") || iSrv.includes("whatsapp") || iSrv.includes("workflow");
                            return iSrv.includes(srv.toLowerCase());
                          }).length || 0;
                          const total = stats?.clientInquiries?.length || 1;
                          const percentage = Math.round((occurrences / total) * 100) || 0;
                          const colors = ["bg-neon-cyan", "bg-neon-purple", "bg-neon-green", "bg-pink-500", "bg-yellow-500"];
                          return (
                            <div key={srv} className="space-y-0.5">
                              <div className="flex items-center justify-between font-mono text-[9px]">
                                <span className="text-gray-400">{srv}</span>
                                <span className="text-white font-medium">{occurrences} ({percentage}%)</span>
                              </div>
                              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className={`h-full ${colors[index % colors.length]}`} style={{ width: `${percentage}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Card 3: Verified Contacts Rate */}
                    <div className="p-4 rounded-xl border border-white/5 bg-white/[0.01] flex flex-col justify-between">
                      <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Leads Contact Rate</div>
                      <div className="text-2xl font-bold text-neon-green tracking-tight mt-1">
                        {stats?.clientInquiries && stats.clientInquiries.length > 0 
                          ? Math.round((stats.clientInquiries.filter((i: any) => i.phone && i.phone !== "N/A").length / stats.clientInquiries.length) * 100)
                          : 0}%
                      </div>
                      <p className="text-[9px] text-gray-400 font-sans mt-2">
                        Leads with active phone coordinates logged for direct WhatsApp sales closure.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider">
                        Client Leads & Inquiries
                      </h4>
                      {stats && stats.clientInquiries && stats.clientInquiries.length > 0 && (
                        <button
                          type="button"
                          onClick={handleClearAllInquiries}
                          className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                            confirmDeleteType === "all_inquiries"
                              ? "border-red-500 bg-red-600 text-white font-bold animate-pulse"
                              : "border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500/30 text-red-200"
                          }`}
                          title="Delete all inquiries permanently"
                        >
                          <Trash2 className="w-3" />
                          <span>{confirmDeleteType === "all_inquiries" ? "CONFIRM DOUBLE-CLICK TO DELETE ALL" : "Delete All Leads"}</span>
                        </button>
                      )}
                    </div>

                    <div className="overflow-x-auto w-full border border-white/5 rounded-xl bg-black/40">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-white/5 text-[10px] uppercase font-mono tracking-wider text-gray-500">
                            <th className="p-3.5 pl-4">Client Name</th>
                            <th className="p-3.5">Company Name</th>
                            <th className="p-3.5">Phone Number</th>
                            <th className="p-3.5">Service Requested</th>
                            <th className="p-3.5">Project Details / Inquiry</th>
                            <th className="p-3.5">Date Submitted</th>
                            <th className="p-3.5">Session ID</th>
                            <th className="p-3.5 text-right pr-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 font-mono text-[11px] text-gray-400">
                          {stats && stats.clientInquiries && stats.clientInquiries.length > 0 ? (
                            [...stats.clientInquiries]
                              .reverse()
                              .map((inq: any) => (
                                <tr key={inq.id} className="hover:bg-white/[0.02] transition-all">
                                  <td className="p-3.5 pl-4 font-sans text-xs text-white font-medium">
                                    {inq.name}
                                  </td>
                                  <td className="p-3.5 text-gray-300">
                                    {inq.company}
                                  </td>
                                  <td className="p-3.5 text-neon-cyan font-semibold">
                                    {inq.phone || "N/A"}
                                  </td>
                                  <td className="p-3.5">
                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-neon-purple/10 border border-neon-purple/20 text-neon-purple font-medium">
                                      {inq.service}
                                    </span>
                                  </td>
                                  <td className="p-3.5 text-gray-355 font-sans max-w-xs break-words" style={{ minWidth: "180px" }}>
                                    {inq.details}
                                  </td>
                                  <td className="p-3.5 text-gray-500 whitespace-nowrap">
                                    {new Date(inq.timestamp).toLocaleString()}
                                  </td>
                                  <td className="p-3.5 text-gray-500 text-[10px] whitespace-nowrap">
                                    {inq.sessionId}
                                  </td>
                                  <td className="p-3.5 text-right pr-4">
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteInquiry(inq.id)}
                                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                        confirmDeleteId === inq.id
                                          ? "border-red-500 bg-red-600 text-white font-bold animate-pulse"
                                          : "border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-105"
                                      }`}
                                      title={confirmDeleteId === inq.id ? "Click again to confirm" : "Delete inquiry"}
                                    >
                                      {confirmDeleteId === inq.id ? <span className="text-[9px] px-1 lowercase font-bold">Sure?</span> : <Trash2 className="w-3.5 h-3.5" />}
                                    </button>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan={8} className="p-8 text-center text-gray-500 italic">
                                No client lead form inquiries logged yet.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Questions audit logs table */}
              {activePanelTab === "questions" && (
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-pink-500" />
                      <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider">
                        AI Questions Log
                      </h4>
                    </div>
                    {stats && stats.questionsLogged && stats.questionsLogged.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllQuestions}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                          confirmDeleteType === "all_questions"
                            ? "border-red-500 bg-red-600 text-white font-bold animate-pulse"
                            : "border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500/30 text-red-200"
                        }`}
                        title="Delete all logs and clean server folder directories"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{confirmDeleteType === "all_questions" ? "CONFIRM DOUBLE-CLICK TO DELETE ALL" : "Delete All Logs & Folders"}</span>
                      </button>
                    )}
                  </div>

                  <div className="p-3 bg-neon-cyan/5 border border-neon-cyan/20 rounded-xl space-y-1">
                    <p className="text-[10px] font-mono text-neon-cyan/90 uppercase tracking-widest leading-normal">
                      📁 Server-Side Organized Logs
                    </p>
                    <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                      All conversation histories are automatically saved into separate folders based on the client's IP address.
                    </p>
                    {stats?.logFolder && (
                      <div className="text-[9px] font-mono text-gray-500 mt-1 flex items-center gap-1 bg-black/35 px-2 py-1 rounded">
                        <span>Path:</span>
                        <code className="text-[#00f5ff] select-all">{stats.logFolder}</code>
                      </div>
                    )}
                  </div>

                  <div className="overflow-x-auto w-full border border-white/5 rounded-xl bg-black/40">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase font-mono tracking-wider text-gray-500">
                          <th className="p-3.5 pl-4">Client Label & Session</th>
                          <th className="p-3.5">Question Asked</th>
                          <th className="p-3.5">AI Response Given</th>
                          <th className="p-3.5">Status Check</th>
                          <th className="p-3.5">Time Asked</th>
                          <th className="p-3.5 text-right pr-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-[11px] text-gray-400">
                        {stats && stats.questionsLogged && stats.questionsLogged.length > 0 ? (
                          [...stats.questionsLogged]
                            .reverse()
                            .map((ql: any) => (
                              <tr key={ql.id} className="hover:bg-white/[0.02] transition-all">
                                <td className="p-3.5 pl-4 space-y-1 leading-tight">
                                  <div className="text-[11px] font-semibold text-neon-cyan flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                                    {ql.clientLabel || "Client Prospect"}
                                  </div>
                                  {ql.clientIp && (
                                    <div className="text-[9px] text-gray-500 tracking-wide">
                                      IP: {ql.clientIp}
                                    </div>
                                  )}
                                  <div className="text-[9px] text-gray-600">
                                    Ref: {ql.sessionId ? ql.sessionId.substring(0, 15) + "..." : "N/A"}
                                  </div>
                                </td>
                                <td className="p-3.5 font-sans font-light text-white text-xs max-w-xs break-words" style={{ minWidth: "150px" }}>
                                  {ql.question}
                                </td>
                                <td className="p-3.5 text-gray-300 font-sans text-xs max-w-md break-words" style={{ minWidth: "220px" }}>
                                  {ql.answer}
                                </td>
                                <td className="p-3.5 whitespace-nowrap">
                                  {ql.unanswered ? (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-orange-500/10 border border-orange-500/35 text-orange-400 font-sans font-semibold uppercase inline-flex items-center gap-1">
                                      <span className="w-1 h-1 rounded-full bg-orange-400 animate-pulse" />
                                      AI Unanswered
                                    </span>
                                  ) : (
                                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 font-sans font-semibold uppercase inline-flex items-center gap-1">
                                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                                      Answered by AI
                                    </span>
                                  )}
                                </td>
                                <td className="p-3.5 text-gray-500 whitespace-nowrap">
                                  {new Date(ql.timestamp).toLocaleString()}
                                </td>
                                <td className="p-3.5 text-right pr-4">
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(ql.id)}
                                    className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                      confirmDeleteId === ql.id
                                        ? "border-red-500 bg-red-600 text-white font-bold animate-pulse"
                                        : "border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-400 animate-none"
                                    }`}
                                    title={confirmDeleteId === ql.id ? "Click again to confirm" : "Delete this query from logs"}
                                  >
                                    {confirmDeleteId === ql.id ? <span className="text-[9px] px-1 lowercase font-bold">Sure?</span> : <Trash2 className="w-3.5 h-3.5" />}
                                  </button>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-gray-500 italic">
                              No questions asked on sandbox caller yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Session duration trace logs and user properties */}
              {activePanelTab === "sessions" && (
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider">
                      Recent Visitor Session Traces
                    </h4>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest pl-2">
                      Showing latest entries (auto-cleaned)
                    </span>
                  </div>

                  <div className="overflow-x-auto w-full border border-white/5 rounded-xl bg-black/40">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase font-mono tracking-wider text-gray-500">
                          <th className="p-3.5 pl-4">Session Token</th>
                          <th className="p-3.5">IP Address</th>
                          <th className="p-3.5">Platform Detail</th>
                          <th className="p-3.5">Initial Visit Timestamp</th>
                          <th className="p-3.5 text-right pr-4">Time Spent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-[11px] text-gray-400">
                        {stats && stats.sessions.length > 0 ? (
                          [...stats.sessions]
                            .reverse()
                            .map((client) => {
                              const showActive = (Date.now() - new Date(client.lastHeartbeatAt).getTime()) / 1000 < 60;
                              return (
                                <tr key={client.id} className="hover:bg-white/[0.02] transition-all">
                                  <td className="p-3.5 pl-4 flex items-center gap-2">
                                    {showActive ? (
                                      <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" title="Active now" />
                                    ) : (
                                      <span className="inline-block w-1.5 h-1.5 bg-gray-600 rounded-full" />
                                    )}
                                    <span className="text-gray-300 font-sans tracking-tight">{client.id}</span>
                                  </td>
                                  <td className="p-3.5 text-gray-300 flex items-center gap-1.5">
                                    <Globe className="w-3.5 h-3.5 text-neon-purple/40" />
                                    <span>{client.ip}</span>
                                  </td>
                                  <td className="p-3.5 text-gray-400 font-sans leading-relaxed text-xs">
                                    <div className="flex items-center gap-1.5">
                                      <Laptop className="w-3.5 h-3.5 text-neon-cyan/45 flex-shrink-0" />
                                      <span className="truncate max-w-[200px]" title={client.userAgent}>
                                        {client.userAgent}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="p-3.5 text-gray-500">
                                    {new Date(client.startedAt).toLocaleString()}
                                  </td>
                                  <td className="p-3.5 text-right pr-4 text-white font-medium">
                                    {formatTimeSpent(client.duration)}
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-gray-500 italic">
                              {loadingStats ? "Analyzing logs..." : "No session metrics recorded on file."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Customer Voice Recordings Section */}
              {activePanelTab === "voice" && (
                <div className="rounded-xl border border-white/5 bg-white/[0.01] p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-neon-purple" />
                      <h4 className="text-sm font-display font-medium text-white uppercase tracking-wider">
                        Customer Voice Recordings
                      </h4>
                    </div>
                    {stats && stats.recordings && stats.recordings.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllRecordings}
                        className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono tracking-wide flex items-center gap-1.5 transition-all cursor-pointer ${
                          confirmDeleteType === "all_recordings"
                            ? "border-red-500 bg-red-600 text-white font-bold animate-pulse"
                            : "border-red-500/30 hover:border-red-500 bg-red-500/10 hover:bg-red-500/30 text-red-200"
                        }`}
                        title="Delete all voice recording files permanently"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>{confirmDeleteType === "all_recordings" ? "CONFIRM DOUBLE-CLICK TO DELETE ALL" : "Delete All Saved Voices"}</span>
                      </button>
                    )}
                  </div>

                  {stats?.recordingsFolder && (
                    <div className="p-3 bg-neon-purple/5 border border-neon-purple/20 rounded-xl space-y-0.5">
                      <p className="text-[10px] font-mono text-neon-purple uppercase tracking-widest leading-normal">
                        🎙️ Audio storage coordinates
                      </p>
                      <p className="text-[10px] text-gray-400 font-sans">
                        Raw voice notes and call recordings are archived in real-time under:
                      </p>
                      <div className="text-[9px] font-mono text-gray-500 mt-1 flex items-center gap-1 bg-black/35 px-2 py-1 rounded">
                        <span>Folder:</span>
                        <code className="text-neon-purple select-all">{stats.recordingsFolder}</code>
                      </div>
                    </div>
                  )}

                  <div className="overflow-x-auto w-full border border-white/5 rounded-xl bg-black/40">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 text-[10px] uppercase font-mono tracking-wider text-gray-500">
                          <th className="p-3.5 pl-4">Recording ID</th>
                          <th className="p-3.5">Session Reference</th>
                          <th className="p-3.5">Captured At</th>
                          <th className="p-3.5 text-right pr-4">Play / Audit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-[11px] text-gray-400">
                        {stats && stats.recordings && stats.recordings.length > 0 ? (
                           [...stats.recordings]
                            .reverse()
                            .map((rec) => (
                              <tr key={rec.id} className="hover:bg-white/[0.02] transition-all">
                                <td className="p-3.5 pl-4 flex items-center gap-2">
                                  <div className="w-2 h-2 rounded-full bg-neon-purple/50 animate-pulse" />
                                  <span className="text-gray-300">{rec.id}</span>
                                </td>
                                <td className="p-3.5 text-gray-400">
                                  {rec.sessionId}
                                </td>
                                <td className="p-3.5 text-gray-500">
                                  {new Date(rec.timestamp).toLocaleString()}
                                </td>
                                <td className="p-3.5 text-right pr-4">
                                  <div className="flex items-center justify-end gap-2">
                                    <audio 
                                      src={rec.path} 
                                      className="h-8 max-w-[150px] opacity-40 hover:opacity-100 transition-opacity bg-transparent"
                                      controls
                                      referrerPolicy="no-referrer"
                                    />
                                    <a 
                                      href={rec.path} 
                                      download={rec.filename}
                                      className="p-1.5 rounded-lg border border-white/5 hover:border-white/20 text-gray-400 hover:text-white transition-all"
                                      title="Download raw file"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteRecording(rec.id)}
                                      className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                        confirmDeleteId === rec.id
                                          ? "border-red-500 bg-red-600 text-white font-bold animate-pulse"
                                          : "border-red-500/20 hover:border-red-500/50 hover:bg-red-500/10 text-red-0"
                                      }`}
                                      title={confirmDeleteId === rec.id ? "Click again to confirm" : "Delete file permanently"}
                                    >
                                      {confirmDeleteId === rec.id ? <span className="text-[9px] px-1 lowercase font-bold">Sure?</span> : <Trash2 className="w-3.5 h-3.5" />}
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={4} className="p-8 text-center text-gray-500 italic">
                              No voice recordings found from recent calls.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Master logout trigger */}
              <div className="flex justify-between items-center bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                <span className="text-xs text-gray-550 leading-relaxed font-light">
                  Administrative session valid until local storage refresh. Keep your password keyphrase private.
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="px-4 py-2 text-xs font-mono border border-red-500/20 bg-red-500/5 hover:bg-red-500 text-red-400 hover:text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>

            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

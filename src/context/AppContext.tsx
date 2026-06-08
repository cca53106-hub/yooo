import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AppContextType {
  prices: Record<string, number>;
  loadingPrices: boolean;
  adminToken: string | null;
  isAdmin: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  updatePrices: (newPrices: Record<string, number>) => Promise<boolean>;
  fetchStats: () => Promise<AdminStats | null>;
  trackSession: () => void;
}

export interface AdminSession {
  id: string;
  ip: string;
  userAgent: string;
  startedAt: string;
  lastHeartbeatAt: string;
  duration: number;
}

export interface AdminRecording {
  id: string;
  sessionId: string;
  filename: string;
  timestamp: string;
  path: string;
}

export interface AdminStats {
  totalVisitors: number;
  totalTimeSpent: number;
  sessions: AdminSession[];
  recordings: AdminRecording[];
  clientInquiries?: any[];
  questionsLogged?: any[];
  logFolder?: string;
  recordingsFolder?: string;
}

const defaultPrices: Record<string, number> = {
  "ai-call-agent": 50000,
  "ai-automation": 30000,
  "website-building": 15000,
  "3d-website": 30000,
  "ai-automation-course": 15000,
  "p0": 15000,
  "p1": 15000,
  "p2": 30000,
  "p3": 30000,
  "p4": 50000,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<Record<string, number>>(defaultPrices);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(true);
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem("mehaal_admin_token");
  });

  // Fetch prices on startup
  const fetchPrices = async () => {
    try {
      const res = await fetch("/api/prices");
      const data = await res.json();
      if (data.success && data.prices) {
        setPrices(data.prices);
      }
    } catch (e) {
      console.error("Failed to load prices from server", e);
    } finally {
      setLoadingPrices(false);
    }
  };

  useEffect(() => {
    fetchPrices();
    trackSession();
  }, []);

  // Initialize and track visitor session
  const trackSession = async () => {
    try {
      let sessionId = sessionStorage.getItem("visit_session_id");
      if (!sessionId) {
        sessionId = "s_" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
        sessionStorage.setItem("visit_session_id", sessionId);
      }

      // register session to backend
      await fetch("/api/analytics/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      // setup heartbeat interval (every 10 seconds)
      const heartbeatInterval = setInterval(async () => {
        try {
          await fetch("/api/analytics/heartbeat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId, elapsed: 10 }),
          });
        } catch (err) {
          // silent fail for analytics
        }
      }, 10000);

      return () => {
        clearInterval(heartbeatInterval);
      };
    } catch (e) {
      console.error("Tracking registration error", e);
    }
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAdminToken(data.token);
        localStorage.setItem("mehaal_admin_token", data.token);
        return true;
      }
    } catch (e) {
      console.error("Admin Login Error", e);
    }
    return false;
  };

  const logout = () => {
    setAdminToken(null);
    localStorage.removeItem("mehaal_admin_token");
  };

  const updatePrices = async (newPrices: Record<string, number>): Promise<boolean> => {
    try {
      const res = await fetch("/api/prices/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": adminToken || "",
        },
        body: JSON.stringify({ password: adminToken, prices: newPrices }),
      });
      const data = await res.json();
      if (data.success) {
        setPrices(data.prices);
        return true;
      }
    } catch (e) {
      console.error("Failed to update prices on server", e);
    }
    return false;
  };

  const fetchStats = async (): Promise<AdminStats | null> => {
    try {
      const res = await fetch("/api/admin/stats", {
        headers: {
          "x-admin-password": adminToken || "",
        },
      });
      const data = await res.json();
      if (data.success) {
        return data.metrics;
      }
    } catch (e) {
      console.error("Failed to fetch statistics", e);
    }
    return null;
  };

  const isAdmin = adminToken === "mehaal2026";

  return (
    <AppContext.Provider
      value={{
        prices,
        loadingPrices,
        adminToken,
        isAdmin,
        login,
        logout,
        updatePrices,
        fetchStats,
        trackSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

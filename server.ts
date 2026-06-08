import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

let aiClient: any = null;
function getGeminiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn("GEMINI_API_KEY environment variable is not defined. Falling back to static responder.");
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  }
  return aiClient;
}

function generateStaticFallback(queryText: string, language: string, prices: any) {
  const query = queryText.toLowerCase();
  const isUrduHindi = language === "ur-PK" || /[\u0600-\u06FF]/.test(queryText);

  if (isUrduHindi) {
    if (query.includes("پراائس") || query.includes("قیمت") || query.includes("ریٹ") || query.includes("پیکج") || query.includes("پیسے") || query.includes("قیمتیں") || query.includes("price") || query.includes("cost") || query.includes("rate") || query.includes("کتنے") || query.includes("چارج")) {
      return "قیمتیں آپ کی مخصوص ضروریات اور پراجیکٹ کے اسکوپ پر منحصر ہیں۔ تفصیلی قیمتوں، کسٹم کوٹیشنز، اور دستیاب ڈسکاؤنٹس کے لیے، براہ کرم ہماری ویب سائٹ وزٹ کریں یا براہ راست میہال خٹک (MEHAAL KHATTAK) سے رابطہ کریں۔";
    } else if (query.includes("آٹومیشن") || query.includes("what is automation") || query.includes("automation کا کیا مطلب ہے")) {
      return "آٹومیشن کا مطلب ہے آپ کے کاروبار کے روزمرہ کے کاموں کو جیسے کسٹمرز کی کالز، ڈیٹا اینٹری یا ای میلز کو ٹیکنالوجی کے ذریعے خودکار بنانا تاکہ آپ کا قیمتی وقت اور اسٹاف کا خرچ بچ سکے۔ کیا آپ اپنے کاروبار میں کسی خاص ٹاسک کو آٹومیٹ کرنا چاہتے ہیں؟";
    } else if (query.includes("واٹس") || query.includes("whatsapp") || query.includes("میسج") || query.includes("کام") || query.includes("ورک فلو")) {
      return "ہم آپ کے لیے ن8ن (n8n) اور کسٹم بوٹس کے ذریعے واٹس ایپ اور سی آر ایم (CRM) آٹومیشن ورک فلوز بناتے ہیں۔ اس سے لیڈز خودکار طور پر ہینڈل ہوتی ہیں۔ تفصیلات کے لیے براہ راست میہال خٹک سے رابطہ کریں!";
    } else if (query.includes("کال") || query.includes("صوتی") || query.includes("ایجنٹ") || query.includes("مائیک") || query.includes("phone") || query.includes("call") || query.includes("voice")) {
      return "ہم انٹیلیجنٹ صوتی اے آئی کال ایجنٹس بناتے ہیں جو آپ کی کالز کا 24/7 فوری جواب دیتے ہیں، تفصیلی معلومات دیتے ہیں اور لیڈز کو محفوظ کرتے ہیں۔ اس بارے میں مزید جاننے کے لیے براہ کرم میہال خٹک سے واٹس ایپ پر رابطہ کریں!";
    } else if (query.includes("ٹریڈنگ") || query.includes("بوٹ") || query.includes("بوٹس") || query.includes("trade") || query.includes("trading")) {
      return "ہمارے اے آئی ٹریڈنگ بوٹس جذبات سے بالاتر ہو کر مارکیٹ کی درست نگرانی اور خودکار ٹریڈنگ کرتے ہیں۔ لائیو منصوبہ بندی کے لیے ابھی میہال خٹک سے واٹس ایپ پر رابطہ کریں!";
    } else if (query.includes("کورس") || query.includes("کلاس") || query.includes("سیکھنا") || query.includes("course") || query.includes("learn")) {
      return "ہمارے کسٹم اے آئی آٹومیشن کورس میں واٹس ایپ بوٹس، ریٹیل اے آئی کالنگ، اور لیڈ سکریپنگ سکھائی جاتی ہے۔ داخلہ اور تفصیلات کے لیے براہ راست میہال خٹک سے رابطہ کریں۔";
    } else if (query.includes("تھری ڈی") || query.includes("3d") || query.includes("انٹرایکٹو") || query.includes("ڈیزائن") || query.includes("ویب") || query.includes("سائٹ") || query.includes("website") || query.includes("web")) {
      return "ہم پریمیم تھری ڈی انٹرایکٹو ویب سائٹس بناتے ہیں جو آپ کے برانڈ کو یونیک بناتی ہیں۔ پراجیکٹ اسکوپ اور اپنی ضروریات شیئر کرنے کے لیے براہ راست میہال خٹک سے رابطہ کریں۔";
    } else if (query.includes("کیا حال") || query.includes("کیسے ہو") || query.includes("ہیلو") || query.includes("سلام") || query.includes("hello") || query.includes("hi")) {
      return "وعلیکم السلام! میں بالکل ٹھیک ہوں۔ میں میہال خٹک کا آفیشل صوتی سیلز ایجنٹ ہوں۔ کیا آپ اپنے کاروبار کو آٹومیٹ کرنا چاہتے ہیں یا ویب سائٹ بنوانا چاہتے ہیں؟";
    } else {
      return "جی بالکل، میں نے آپ کی بات نوٹ کر لی ہے۔ آپ کے کاروبار کی ضروریات کے مطابق بہترین حل تیار کرنے کے لیے براہ کرم ابھی میہال خٹک سے واٹس ایپ نمبر 03302930930 پر رابطہ کریں۔";
    }
  } else {
    if (query.includes("price") || query.includes("cost") || query.includes("rate") || query.includes("how much") || query.includes("packages") || query.includes("pricing") || query.includes("fee") || query.includes("charge")) {
      return "Pricing depends on your specific requirements and project scope. For detailed pricing, custom quotations, and available discounts, please visit our website or contact MEHAAL KHATTAK directly.";
    } else if (query.includes("automation") || query.includes("what is automation")) {
      return "Automation leverages technology to handle repetitive tasks like inquiries or lead routing 24/7 without human error. Are you currently looking to automate a specific process in your business?";
    } else if (query.includes("workflow") || query.includes("n8n") || query.includes("whatsapp") || query.includes("sync")) {
      return "We construct robust CRM and WhatsApp workflows using n8n and customized bots. This minimizes manual effort and boosts conversions. Would you like to set up direct WhatsApp notifications?";
    } else if (query.includes("call") || query.includes("voice") || query.includes("retell") || query.includes("agent") || query.includes("representative")) {
      return "We build advanced AI Call Agents powered by natural calling pipelines that handle inquiries, answer calls, and log leads 24/7. Contact Mehaal Khattak on WhatsApp to discuss setup!";
    } else if (query.includes("chatbot") || query.includes("chat") || query.includes("business agent")) {
      return "Our intelligent chat agents qualify website organic traffic and sync leads instantly to your business pipeline. Let's arrange a call to outline a design plan!";
    } else if (query.includes("trading") || query.includes("trade") || query.includes("bot") || query.includes("forex")) {
      return "We customize algorithmic AI Trading Bots that monitor markets and execute systematically without emotion. Message Mehaal Khattak on WhatsApp for a trading dashboard blueprint.";
    } else if (query.includes("course") || query.includes("learn") || query.includes("class") || query.includes("cohort")) {
      return "Our AI Automation Course guides you directly on building n8n workflows, Chrome web crawlers, and AI calling systems. Contact Mehaal Khattak on WhatsApp to enroll.";
    } else if (query.includes("3d") || query.includes("interactive") || query.includes("website") || query.includes("web") || query.includes("landing")) {
      return "We specialize in standard and immersive 3D WebGL responsive websites. Feel free to contact Mehaal Khattak for customized portfolio or business website layouts.";
    } else if (query.includes("hey") || query.includes("hello") || query.includes("hi") || query.includes("greetings") || query.includes("how are you")) {
      return "Hello! I am MEHAAL KHATTAK's official AI Sales Representative. I am here to understand your business and recommend the best automation or website solutions. How can I help you today?";
    } else {
      return "Based on what you've shared, I believe we can create a solution tailored to your business needs. For a detailed proposal, pricing information, and available discounts, please visit our website or contact MEHAAL KHATTAK directly.";
    }
  }
}

let CONFIG_FILE = path.join(process.cwd(), "admin-config.json");
let RECORDINGS_DIR = path.join(process.cwd(), "recordings");
let QUESTION_LOGS_DIR = path.join(process.cwd(), "question_logs");

// Vercel Serverless environment writeability guard
try {
  const testPath = path.join(process.cwd(), "write-test.tmp");
  fs.writeFileSync(testPath, "test");
  fs.unlinkSync(testPath);
} catch (e) {
  // Read-only filesystem (like Vercel serverless nodes), move target paths to ephemeral /tmp directory
  CONFIG_FILE = path.join("/tmp", "admin-config.json");
  RECORDINGS_DIR = path.join("/tmp", "recordings");
  QUESTION_LOGS_DIR = path.join("/tmp", "question_logs");
}

const defaultPrices = {
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

if (!fs.existsSync(RECORDINGS_DIR)) {
  fs.mkdirSync(RECORDINGS_DIR, { recursive: true });
}
if (!fs.existsSync(QUESTION_LOGS_DIR)) {
  fs.mkdirSync(QUESTION_LOGS_DIR, { recursive: true });
}

function readConfig() {
  const defaultMetrics = {
    totalVisitors: 0,
    totalTimeSpent: 0,
    sessions: [],
    recordings: [],
    clientInquiries: [],
    questionsLogged: []
  };

  if (!fs.existsSync(CONFIG_FILE)) {
    const initial = { prices: defaultPrices, metrics: defaultMetrics };
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }

  try {
    const raw = fs.readFileSync(CONFIG_FILE, "utf-8");
    const data = JSON.parse(raw);
    if (!data.prices) data.prices = {};
    Object.keys(defaultPrices).forEach((k) => {
      if (data.prices[k] === undefined) {
        data.prices[k] = defaultPrices[k as keyof typeof defaultPrices];
      }
    });
    if (!data.metrics) {
      data.metrics = defaultMetrics;
    } else {
      if (typeof data.metrics.totalVisitors !== "number") data.metrics.totalVisitors = 0;
      if (typeof data.metrics.totalTimeSpent !== "number") data.metrics.totalTimeSpent = 0;
      if (!Array.isArray(data.metrics.sessions)) data.metrics.sessions = [];
      if (!Array.isArray(data.metrics.recordings)) data.metrics.recordings = [];
      if (!Array.isArray(data.metrics.clientInquiries)) data.metrics.clientInquiries = [];
      if (!Array.isArray(data.metrics.questionsLogged)) data.metrics.questionsLogged = [];
    }
    return data;
  } catch (err) {
    console.error("Error reading admin-config.json, returning defaults", err);
    return { prices: defaultPrices, metrics: defaultMetrics };
  }
}

function writeConfig(data: any) {
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing admin-config.json", err);
  }
}

function parseGeminiJSON(text: string): any {
  let cleaned = text.trim();
  
  // Strip code block backticks if present (e.g. ```json or ```)
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "");
    cleaned = cleaned.replace(/\n?```$/, "");
    cleaned = cleaned.trim();
  }

  // Find first '{' and last '}' to isolate JSON from any prefix text
  const firstIdx = cleaned.indexOf("{");
  const lastIdx = cleaned.lastIndexOf("}");
  if (firstIdx !== -1 && lastIdx !== -1 && lastIdx > firstIdx) {
    cleaned = cleaned.substring(firstIdx, lastIdx + 1).trim();
  }

  return JSON.parse(cleaned);
}

// Custom metrics and pricing APIs
app.get("/api/prices", (req, res) => {
  const config = readConfig();
  res.json({ success: true, prices: config.prices });
});

app.post("/api/recordings", (req, res) => {
  const { audio, sessionId, timestamp } = req.body;
  if (!audio || !sessionId) {
    res.status(400).json({ success: false, error: "Missing audio or sessionId" });
    return;
  }

  try {
    const base64Data = audio.replace(/^data:audio\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const filename = `rec_${sessionId}_${Date.now()}.webm`;
    const filePath = path.join(RECORDINGS_DIR, filename);

    fs.writeFileSync(filePath, buffer);

    const config = readConfig();
    config.metrics.recordings.push({
      id: "rec_" + Math.random().toString(36).substring(2, 9),
      sessionId,
      filename,
      timestamp: timestamp || new Date().toISOString(),
      path: `/api/recordings/${filename}`
    });

    if (config.metrics.recordings.length > 100) {
      const removed = config.metrics.recordings.shift();
      const oldPath = path.join(RECORDINGS_DIR, removed.filename);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    writeConfig(config);
    res.json({ success: true, filename });
  } catch (err: any) {
    console.error("Failed to save recording", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/api/recordings/:filename", (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(RECORDINGS_DIR, filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("File not found");
  }
});

app.delete("/api/recordings/clear", (req, res) => {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized access" });
    return;
  }

  try {
    const config = readConfig();
    const recordings = config.metrics.recordings || [];
    
    recordings.forEach((rec: any) => {
      const filePath = path.join(RECORDINGS_DIR, rec.filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error("Failed to delete recording file", filePath, e);
        }
      }
    });

    config.metrics.recordings = [];
    writeConfig(config);
    res.json({ success: true, message: "All recordings cleared successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/recordings/:id", (req, res) => {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized access" });
    return;
  }

  const { id } = req.params;
  try {
    const config = readConfig();
    if (!config.metrics.recordings) config.metrics.recordings = [];
    
    const targetId = decodeURIComponent(id).trim().toLowerCase();
    const index = config.metrics.recordings.findIndex(
      (rec: any) => rec.id && rec.id.toString().trim().toLowerCase() === targetId
    );

    if (index !== -1) {
      const rec = config.metrics.recordings[index];
      const filePath = path.join(RECORDINGS_DIR, rec.filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (e) {
          console.error("Failed to delete file", filePath, e);
        }
      }
      config.metrics.recordings.splice(index, 1);
      writeConfig(config);
    }
    
    // Always return success true because the recording is no longer in the list (or already deleted).
    res.json({ success: true, message: "Recording deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/inquiries/clear", (req, res) => {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized access" });
    return;
  }

  try {
    const config = readConfig();
    config.metrics.clientInquiries = [];
    writeConfig(config);
    res.json({ success: true, message: "All inquiries cleared successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/inquiries/:id", (req, res) => {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized access" });
    return;
  }

  const { id } = req.params;
  try {
    const config = readConfig();
    if (!config.metrics.clientInquiries) config.metrics.clientInquiries = [];
    
    const targetId = decodeURIComponent(id).trim().toLowerCase();
    const index = config.metrics.clientInquiries.findIndex(
      (inq: any) => inq.id && inq.id.toString().trim().toLowerCase() === targetId
    );

    if (index !== -1) {
      config.metrics.clientInquiries.splice(index, 1);
      writeConfig(config);
    }
    
    // Always return success true because the inquiry is no longer in the list (or already deleted).
    res.json({ success: true, message: "Inquiry deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/questions/clear", (req, res) => {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized access" });
    return;
  }

  try {
    const config = readConfig();
    config.metrics.questionsLogged = [];
    config.metrics.ipMappings = {};
    writeConfig(config);

    // Also remove local client directories if they exist
    if (fs.existsSync(QUESTION_LOGS_DIR)) {
      const folders = fs.readdirSync(QUESTION_LOGS_DIR);
      folders.forEach((folder) => {
        const folderPath = path.join(QUESTION_LOGS_DIR, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
          try {
            const files = fs.readdirSync(folderPath);
            files.forEach((file) => {
              fs.unlinkSync(path.join(folderPath, file));
            });
            fs.rmdirSync(folderPath);
          } catch (e) {
            console.error("Failed to clean folder", folderPath, e);
          }
        }
      });
    }

    res.json({ success: true, message: "All logging history wiped successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/api/questions/:id", (req, res) => {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized access" });
    return;
  }

  const { id } = req.params;
  try {
    const config = readConfig();
    if (!config.metrics.questionsLogged) config.metrics.questionsLogged = [];
    
    const targetId = decodeURIComponent(id).trim().toLowerCase();
    const index = config.metrics.questionsLogged.findIndex(
      (q: any) => q.id && q.id.toString().trim().toLowerCase() === targetId
    );

    if (index !== -1) {
      config.metrics.questionsLogged.splice(index, 1);
      writeConfig(config);
    }
    
    // Always return success true because the log is no longer in the list (either deleted now or already deleted).
    res.json({ success: true, message: "Question log removed successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/prices/update", (req, res) => {
  const { password, prices } = req.body;
  const authHeader = req.headers["x-admin-password"];
  
  if (password !== "mehaal2026" && authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized access" });
    return;
  }

  const config = readConfig();
  if (prices && typeof prices === "object") {
    Object.keys(defaultPrices).forEach((k) => {
      if (prices[k] !== undefined && typeof prices[k] === "number") {
        config.prices[k] = prices[k];
      }
    });
    writeConfig(config);
    res.json({ success: true, prices: config.prices });
  } else {
    res.status(400).json({ success: false, error: "Invalid prices payload" });
  }
});

function logQuestion(sessionId: string, message: string, answer: string, clientIp: string) {
  try {
    const config = readConfig();
    if (!config.metrics.questionsLogged) {
      config.metrics.questionsLogged = [];
    }
    if (!config.metrics.ipMappings) {
      config.metrics.ipMappings = {};
    }

    // Determine client dynamic name representation based on sequential IPs list
    if (!config.metrics.ipMappings[clientIp]) {
      const clientLabelIndex = Object.keys(config.metrics.ipMappings).length + 1;
      config.metrics.ipMappings[clientIp] = `Client ${clientLabelIndex}`;
    }
    const clientLabel = config.metrics.ipMappings[clientIp];

    // Create a safe directory representation
    const sanitizedIp = clientIp.replace(/[^a-zA-Z0-9.]/g, "-");
    const clientFolderName = `${clientLabel.replace(/\s+/g, "_")}_IP_${sanitizedIp}`;
    const clientDirPath = path.join(QUESTION_LOGS_DIR, clientFolderName);

    // Recursively handle sub-directory provision
    if (!fs.existsSync(clientDirPath)) {
      fs.mkdirSync(clientDirPath, { recursive: true });
    }

    // File 1: Append logging representation to the text log
    const timestampStr = new Date().toISOString();
    const txtEntry = `[${timestampStr}]
Question: ${message}
Answer: ${answer}
--------------------------------------------------\n`;
    fs.appendFileSync(path.join(clientDirPath, "conversations.txt"), txtEntry, "utf-8");

    // File 2: Append logging representation to the structured JSON history
    const jsonPath = path.join(clientDirPath, "history.json");
    let historyArr: any[] = [];
    if (fs.existsSync(jsonPath)) {
      try {
        historyArr = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
      } catch (e) {
        historyArr = [];
      }
    }
    const questionId = "q_" + Math.random().toString(36).substring(2, 9);
    historyArr.push({
      id: questionId,
      question: message,
      answer: answer,
      timestamp: timestampStr
    });
    fs.writeFileSync(jsonPath, JSON.stringify(historyArr, null, 2), "utf-8");

    // Determine if question went unanswered (AI redirecting to Mehaal, prices fallback or general WhatsApp prompt)
    const normalizedAns = answer.toLowerCase();
    const unanswered = 
      answer.includes("قیمتیں آپ کی مخصوص") || 
      answer.includes("منحصر ہیں") || 
      answer.includes("رابطہ کریں") || 
      answer.includes("03302930930") ||
      answer.includes("03 30 29 30 930") ||
      normalizedAns.includes("pricing depends on your specific requirements") ||
      normalizedAns.includes("contact mehaal khattak directly") ||
      normalizedAns.includes("based on what you've shared") ||
      normalizedAns.includes("please visit our website");

    config.metrics.questionsLogged.push({
      id: questionId,
      sessionId: sessionId || "anon_" + Math.random().toString(36).substring(7),
      clientLabel,
      clientIp,
      question: message,
      answer: answer,
      unanswered,
      timestamp: timestampStr
    });

    if (config.metrics.questionsLogged.length > 200) {
      config.metrics.questionsLogged.shift();
    }

    writeConfig(config);
  } catch (err) {
    console.error("Failed to log question to admin stats:", err);
  }
}

app.post("/api/inquiries", (req, res) => {
  const { name, company, service, details, sessionId } = req.body;
  try {
    const config = readConfig();
    if (!config.metrics.clientInquiries) {
      config.metrics.clientInquiries = [];
    }

    const inquiry = {
      id: "inq_" + Math.random().toString(36).substring(2, 9),
      name: name || "Anonymous",
      company: company || "N/A",
      service: service || "Other AI / Web Design",
      details: details || "N/A",
      sessionId: sessionId || "anon_" + Math.random().toString(36).substring(7),
      timestamp: new Date().toISOString()
    };

    config.metrics.clientInquiries.push(inquiry);

    if (config.metrics.clientInquiries.length > 100) {
      config.metrics.clientInquiries.shift();
    }

    writeConfig(config);
    res.json({ success: true, inquiry });
  } catch (err: any) {
    console.error("Failed to log inquiry", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/api/chat", async (req, res) => {
  const { message, language, sessionId, history } = req.body;
  if (!message) {
    res.status(400).json({ success: false, error: "Missing message query parameter" });
    return;
  }

  const clientIp = ((req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "127.0.0.1").split(",")[0].trim();

  const config = readConfig();
  const prices = config.prices || defaultPrices;

  const ai = getGeminiClient();
  if (!ai) {
    const fallbackVal = generateStaticFallback(message, language, prices);
    logQuestion(sessionId, message, fallbackVal, clientIp);
    res.json({ success: true, responseText: fallbackVal, spokenText: fallbackVal });
    return;
  }

  try {
    const systemInstruction = `
You are a professional AI Sales Representative for MEHAAL KHATTAK. Your goal is to understand the client's business, identify problems, recommend the best solution, and MUST ask for their phone number and name to log them as a lead in the admin panel.

SERVICES OFFERED:
1. AI Automation: AI Chatbots, AI Call Agents, WhatsApp Automation, CRM Automation.
2. Website Development: Business/Portfolio Websites, Landing Pages.
3. Premium 3D Websites: Interactive 3D WebGL Experiences.
4. AI Trading Solutions: Automated Trading Bots & Custom Dashboards.
5. Custom AI Solutions: Chrome Extensions, AI Assistants.

CONVERSATION & LEAD GENERATION RULES:
- Be highly professional, polite, friendly, and extremely concise.
- UNDER NO CIRCUMSTANCES mention any numeric service prices or rates!
- Price question fallback: "Pricing depends on your specific requirements and project scope. For detailed pricing, custom quotations, and available discounts, please visit our website or contact MEHAAL KHATTAK directly." (or Urdu equivalent)
- CRITICAL LEAD REQUISITE: You MUST politely ask the client for their contact details (specifically their Name AND Phone Number) so we can register their inquiry and contact them. Take initiative. Example: "Could you please share your name and phone number so we can log your request?" or in Urdu: "براہِ مہربانی اپنا نام اور فون نمبر شیئر کریں تاکہ ہم اسکوپ ڈسکس کرنے کے لیے رابطہ کر سکیں؟"
- Keep responses extremely short, 1 to 2 sentences max (essential for quick vocal response rendering - make it quick!). Never use lists, bullets, or markdown.
- Direct clients to WhatsApp us at 03302930930 for urgent bookings.
`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      // Send the last 12 messages of conversation history to keep the context size optimal
      history.slice(-12).forEach((item: any) => {
        contents.push({
          role: item.sender === "user" ? "user" : "model",
          parts: [{ text: item.text }]
        });
      });
    }
    // Append user's latest query
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const configParams = {
      systemInstruction,
      temperature: 0.2, // Lower temperature makes it generate responses extremely quickly and cleanly!
      maxOutputTokens: 1500, // Sufficiently high token budget to prevent JSON truncation
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          responseText: {
            type: Type.STRING,
            description: "The response text in Urdu script (if Urdu) or English (if English) for screen display."
          },
          spokenText: {
            type: Type.STRING,
            description: "If Urdu, a clean Devanagari transliteration of the response so that the speech engine sounds natural. If English, identical to responseText."
          },
          extractedDetails: {
            type: Type.OBJECT,
            description: "Extract the details of the client from the conversation if mentioned.",
            properties: {
              name: { type: Type.STRING, description: "Name of the client if mentioned." },
              phone: { type: Type.STRING, description: "Phone/mobile number of the client if provided." },
              company: { type: Type.STRING, description: "Company name or business sector mentioned." },
              service: { type: Type.STRING, description: "Service interest (AI Agent, Website, CRM, Custom Automation)." },
              details: { type: Type.STRING, description: "Summary notes / requirements specified by the user." }
            }
          }
        },
        required: ["responseText", "spokenText"]
      }
    };

    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: configParams
      });
    } catch (e: any) {
      console.warn("First fallback retry triggered - gemini-3.5-flash experienced an issue, try gemini-2.5-flash:", e);
      await new Promise(resolve => setTimeout(resolve, 300));
      try {
        response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: contents,
          config: configParams
        });
      } catch (errFallback: any) {
        console.warn("Second fallback retry triggered - trying gemini-3.5-flash again after delay:", errFallback);
        await new Promise(resolve => setTimeout(resolve, 500));
        response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: contents,
          config: configParams
        });
      }
    }

    if (response.text) {
      const parsed = parseGeminiJSON(response.text);
      const resText = parsed.responseText || "";
      const spText = parsed.spokenText || resText;
      
      logQuestion(sessionId, message, resText, clientIp);

      // Save call conversation / extracted details on the fly
      if (parsed.extractedDetails) {
        const ext = parsed.extractedDetails;
        if (ext.phone || ext.name || ext.company || ext.service || ext.details) {
          const configLatest = readConfig();
          if (!configLatest.metrics.clientInquiries) {
            configLatest.metrics.clientInquiries = [];
          }

          let existingIdx = configLatest.metrics.clientInquiries.findIndex(
            (inq: any) => inq.sessionId === sessionId
          );

          if (existingIdx !== -1) {
            const existing = configLatest.metrics.clientInquiries[existingIdx];
            configLatest.metrics.clientInquiries[existingIdx] = {
              ...existing,
              name: ext.name || existing.name,
              phone: ext.phone || existing.phone,
              company: ext.company || existing.company,
              service: ext.service || existing.service,
              details: ext.details || existing.details,
              timestamp: new Date().toISOString()
            };
          } else {
            configLatest.metrics.clientInquiries.push({
              id: "inq_" + Math.random().toString(36).substring(2, 9),
              name: ext.name || "AI Call Prospect",
              company: ext.company || "N/A",
              phone: ext.phone || "N/A",
              service: ext.service || "AI Voice Agent Call Sandbox",
              details: ext.details || "In-call discussion captured from voice representative.",
              sessionId: sessionId,
              timestamp: new Date().toISOString()
            });
          }

          if (configLatest.metrics.clientInquiries.length > 100) {
            configLatest.metrics.clientInquiries.shift();
          }

          writeConfig(configLatest);
        }
      }
      
      res.json({
        success: true,
        responseText: resText,
        spokenText: spText,
        extractedDetails: parsed.extractedDetails || null
      });
    } else {
      throw new Error("Empty response text");
    }
  } catch (err: any) {
    console.error("Gemini API call failed, falling back to static generation:", err);
    const fallbackVal = generateStaticFallback(message, language, prices);
    logQuestion(sessionId, message, fallbackVal, clientIp);
    res.json({ success: true, responseText: fallbackVal, spokenText: fallbackVal });
  }
});

app.post("/api/analytics/session", (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    res.status(400).json({ success: false, error: "sessionId is required" });
    return;
  }

  const config = readConfig();
  let session = config.metrics.sessions.find((s: any) => s.id === sessionId);

  if (!session) {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Unknown";
    const userAgent = req.headers["user-agent"] || "Unknown";
    
    config.metrics.totalVisitors += 1;
    
    session = {
      id: sessionId,
      ip: String(ip).split(",")[0].trim(),
      userAgent,
      startedAt: new Date().toISOString(),
      lastHeartbeatAt: new Date().toISOString(),
      duration: 0,
    };
    
    config.metrics.sessions.push(session);
    
    if (config.metrics.sessions.length > 200) {
      config.metrics.sessions = config.metrics.sessions.slice(-200);
    }
    
    writeConfig(config);
  }

  res.json({ success: true, session });
});

app.post("/api/analytics/heartbeat", (req, res) => {
  const { sessionId, elapsed } = req.body;
  if (!sessionId) {
    res.status(400).json({ success: false, error: "sessionId is required" });
    return;
  }

  const seconds = elapsed && typeof elapsed === "number" ? elapsed : 10;
  const config = readConfig();
  const session = config.metrics.sessions.find((s: any) => s.id === sessionId);

  if (session) {
    session.duration += seconds;
    session.lastHeartbeatAt = new Date().toISOString();
    config.metrics.totalTimeSpent += seconds;
    writeConfig(config);
    res.json({ success: true, totalVisitors: config.metrics.totalVisitors, totalTimeSpent: config.metrics.totalTimeSpent });
  } else {
    config.metrics.totalTimeSpent += seconds;
    writeConfig(config);
    res.json({ success: true, remark: "static update done", totalVisitors: config.metrics.totalVisitors, totalTimeSpent: config.metrics.totalTimeSpent });
  }
});

app.post("/api/admin/login", (req, res) => {
  const { password } = req.body;
  if (password === "mehaal2026") {
    res.json({ success: true, token: "mehaal2026" });
  } else {
    res.status(401).json({ success: false, error: "Incorrect administrator password" });
  }
});

app.get("/api/admin/stats", (req, res) => {
  const authHeader = req.headers["x-admin-password"];
  if (authHeader !== "mehaal2026") {
    res.status(403).json({ success: false, error: "Unauthorized stats request" });
    return;
  }

  const config = readConfig();
  const metricsWithPath = {
    ...config.metrics,
    logFolder: QUESTION_LOGS_DIR,
    recordingsFolder: RECORDINGS_DIR
  };
  res.json({ 
    success: true, 
    metrics: metricsWithPath, 
    prices: config.prices
  });
});

// Helper to find video files recursively in the workspace
function findVideoFiles(dir: string): string[] {
  let results: string[] = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        if (file !== "node_modules" && file !== ".git" && file !== "dist") {
          results = results.concat(findVideoFiles(filePath));
        }
      } else {
        const ext = path.extname(filePath).toLowerCase();
        if (ext === ".mp4" || ext === ".mov" || ext === ".webm") {
          results.push(filePath);
        }
      }
    });
  } catch (e) {
    console.error("Error reading directory", dir, e);
  }
  return results;
}

// Search for any video file on startup
const workspaceRoot = process.cwd();
const foundVideos = findVideoFiles(workspaceRoot);
console.log("Found video files in workspace:", foundVideos);

const activeVideoFile = foundVideos.length > 0 ? foundVideos[0] : null;
if (activeVideoFile) {
  console.log(`Serving active video file: ${activeVideoFile}`);
} else {
  console.log("No video files found in workspace. Using fallback background path.");
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", videosCount: foundVideos.length, activeVideo: activeVideoFile ? path.basename(activeVideoFile) : null });
});

// Diagnostic helper to list all files in workspace to locate any uploaded videos
app.get("/api/debug-files", (req, res) => {
  function getAllFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        if (file !== "node_modules" && file !== ".git" && file !== "dist" && file !== ".npm") {
          results = results.concat(getAllFiles(filePath));
        }
      } else {
        results.push(filePath);
      }
    });
    return results;
  }
  try {
    const files = getAllFiles(process.cwd());
    res.json({ success: true, root: process.cwd(), files: files.map(f => path.relative(process.cwd(), f)) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Route to serve the actual video file dynamically
app.get("/api/video", (req, res) => {
  if (activeVideoFile && fs.existsSync(activeVideoFile)) {
    const stat = fs.statSync(activeVideoFile);
    const fileSize = stat.size;
    const range = req.headers.range;

    const ext = path.extname(activeVideoFile).toLowerCase();
    let contentType = "video/mp4";
    if (ext === ".mov") contentType = "video/quicktime";
    if (ext === ".webm") contentType = "video/webm";

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res.status(416).send("Requested range not satisfiable\n" + start + " >= " + fileSize);
        return;
      }

      const chunksize = (end - start) + 1;
      const file = fs.createReadStream(activeVideoFile, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": contentType,
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": contentType,
      };
      res.writeHead(200, head);
      fs.createReadStream(activeVideoFile).pipe(res);
    }
  } else {
    // If no video is present, we will serve a 404 or a mock 404 response.
    // The client can use a fallback.
    res.status(404).send("No video file available");
  }
});

// Serve static assets or use Vite middleware
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error("Failed to start server:", err);
});

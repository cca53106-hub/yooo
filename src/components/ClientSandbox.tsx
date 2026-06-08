import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  PhoneCall, Play, Square, Volume2, Cpu, Sparkles, Send, Mic, CheckCircle, 
  Settings, Zap, Database, MessageSquare, ArrowRight, RefreshCw, Layers
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

import { useApp } from "../context/AppContext";

const speechTranslationMap: Record<string, string> = {
  "اسلام علیکم! میں میاں میہال خٹک اے آئی کمپنی کا آفیشل صوتی ایجنٹ ہوں۔ میں آپ کے کاروبار کے لیے خودکار کال ایجنٹس، آٹومیشن ورک فلوز اور ویب سائٹس تیار کرتا ہوں۔ آج میں آپ کے کاروبار کی آٹومیشن کے لیے کیا مدد کر سکتا ہوں؟":
    "अस्सलाम वालेकुम! मैं मियां मिहाल खट्टक ए आई कंपनी का ऑफिशियल वॉइस एजेंट हूँ। मैं आपके बिज़नेस के लिए खुदकार कॉल एजेंट्स, ऑटोमेशन वर्कफ़्लोज़ और वेबसाइट्स तैयार करता हूँ। आज मैं आपके बिज़नेस की ऑटोमेशन के लिए क्या मदद कर हूँ?",

  "ہمارے تمام سسٹمز اور پیکجز کی فیس یہ ہے: ویب سائٹ بنوانا 15,000 روپے، تھری ڈی ویب سائٹس 30,000 روپے، اے آئی آٹومیشن سروسز 30,000 روپے، اے آئی چیٹ بوٹس اور بزنس ایجنٹس 25,000 روپے، اے آئی کسٹمر کال ایجنٹ 50,000 روپے، اور اے آئی آٹومیشن کورسز 15,000 روپے۔ اے آئی ٹریڈنگ بوٹس کی قیمت کسٹم ہے۔ یہ سسٹمز آپ کے اسٹاف کا خرچ بچا کر چوبیس گھنٹے کام کرتے ہیں۔ ڈیل فائنل کرنے کے لیے ابھی واٹس ایپ نمبر 03302930930 پر میسج بھیجیں!":
    "हमारे तमाम सिस्टम्स और पैकेजेस की फीस यह है: वेबसाइट बनवाना 15,000 रूपए, थ्री डी वेबसाइट्स 30,000 रूपए, ए आई ऑटोमेशन सर्विसेज़ 30,000 रूपए, ए आई चैटबॉट्स और बिज़नेस एजेंट्स 25,000 रूपए, ए आई कस्टमर कॉल एजेंट 50,000 रूपए, और ए आई ऑटोमेशन कोर्सेज़ 15,000 रूपए। ए आई ट्रेडिंग बॉट्स की कीमत कस्टम है। यह सिस्टम्स आपके स्टाफ का खर्च बचाकर चौबीस घंटे काम करते हैं। पीजी व्हाट्सएप नंबर 03302930930 पर मैसेज भेजें!",

  "ہمارے اے آئی آٹومیشن ورک فلوز اور بوٹس کے ذریعے آپ کے اسٹاف کا وقت اور تنخواہ بچتی ہے۔ جب بھی کوئی گاہک فارم بھرتا ہے، ہمارا سسٹم واٹس ایپ پر کسٹمر کو لائیو میسج بھیج دیتا ہے۔ اس کے علاوہ ہم ریٹیل اے آئی کال ایجنٹس اور گوگل میپس لیڈ سکریپنگ کے لیے کروم ایکسٹینشنز بناتے ہیں۔ تفصیلات کے لیے ابھی واٹس ایپ نمبر 03302930930 پر رابطہ کریں!":
    "हमारे ए आई ऑटोमेशन वर्कफ़्लोज़ और बॉट्स के ज़रिए आपके स्टाफ का समय और सैलरी बचती है। जब भी कोई कस्टमर फॉर्म भरता है, हमारा सिस्टम व्हाट्सएप पर कस्टमर को लाइव मैसेज भेज देता है। इसके अलावा हम रिटेल ए आई कॉल एजेंट्स और गूगल मैप्स लीड स्क्रेपिंग के लिए क्रोम एक्सटेंशन्स बनाते हैं। डिटेल्स के लिए अभी व्हाट्सएप नंबर 03302930930 पर संपर्क करें!",

  "ہم انتہائی خوبصورت اور پریمیم تھری ڈی انٹرایکٹو ویب سائٹس بناتے ہیں جو گاہکوں کا اعتماد اور سیلز بڑھاتی ہیں۔ عام ویب سائٹ 15,000 روپے اور جدید تھری ڈی ویب سائٹ 30,000 روپے کی ہے۔ یہ سسٹمز کسٹمرز کو متوجہ کرتے ہیں اور برانڈ ویلیو بڑھاتے ہیں۔ ابھی واٹس ایپ نمبر 03302930930 پر رابطہ کریں!":
    "हम बेहद खूबसूरत और प्रीमियम थ्री डी इंटरएक्टिव वेबसाइट्स बनाते हैं जो कस्टमर्स का विश्वास और सेल्स बढ़ाती हैं। आम वेबसाइट 15,000 रूपए और आधुनिक थ्री डी वेबसाइट 30,000 रूपए की है। यह सिस्टम्स कस्टमर्स को आकर्षित करते हैं और ब्रांड वैल्यू बढ़ाते हैं। अभी व्हाट्सएप नंबर 03302930930 पर संपर्क करें!",

  "ہمارے اے آئی ٹریڈنگ بوٹس کسٹم ریٹس پر تیار کیے جاتے ہیں۔ یہ سسٹمز جذبات سے بالاتر ہو کر مارکیٹ کی درست نگرانی اور ٹریڈنگ کرتے ہیں جس سے نقصانات کا خدشہ کم ہوتا ہے۔ اس کی لائیو منصوبہ بندی کرنے کے لیے ابھی واٹس ایپ نمبر 03302930930 پر ہم سے بات کریں!":
    "हमारे ए आई ट्रेडिंग बॉट्स कस्टम रेट्स पर तैयार किए जाते हैं। यह सिस्टम्स जज्बात से ऊपर उठकर मार्केट की सही निगरानी और ट्रेडिंग करते हैं जिससे नुकसानात का खतरा कम होता है। इसकी लाइव प्लानिंग करने के लिए अभी व्हाट्सएप नंबर 03302930930 पर हमसे बात करें!",

  "ہمارا اے آئی آٹومیشن کورس محض 15,000 روپے کا ہے جس میں آپ کو خودمختار کالنگ سسٹمز، گوگل میپس لیڈ سکریپنگ کروم ایکسٹینشنز اور این-ایٹ-این واٹس ایپ آٹومیشن بنانا سکھایا جاتا ہے۔ اس سے آپ خودکار آمدنی کے قیمتی ہنر سیکھ سکتے ہیں۔ داخلہ لینے کے لیے ابھی واٹس ایپ نمبر 03302930930 پر میسج کریں!":
    "हमारा ए आई ऑटोमेशन कोर्स महज़ 15,000 रूपए का है जिसमें आपको खुदकार कॉलिंग सिस्टम्स, गूगल मैप्स लीड स्क्रेपिंग क्रोम एक्सटेंशन्स और एन-एट-एन व्हाट्सएप ऑटोमेशन बनाना सिखाया जाता है। इससे आप खुदकार आमदनी के कीमती हुनर सीख सकते हैं। दाखिला लेने के लिए अभी व्हाट्सएप नंबर 03302930930 पर मैसेज करें!",

  "اے آئی کسٹمر کال ایجنٹ کی فیس 50,000 روپے اور چیٹ بوٹ کی فیس 25,000 روپے ہے۔ یہ چوبیس گھنٹے کسٹمرز سے خودکار گفتگو کر کے انہیں گاہک میں تبدیل کرتے ہیں۔ ریٹیل اے آئی پر مشتمل یہ صوتی سسٹمز اسٹاف کا خرچہ اور کسٹمرز ہینڈلنگ کے مسائل ختم کر دیتے ہیں۔ ابھی واٹس ایپ نمبر 03302930930 پر رابطہ کر کے اپنی لائن ایکٹیویٹ کرائیں!":
    "ए आई कस्टमर कॉल एजेंट की फीस 50,000 रूपए और चैटबॉट की फीस 25,000 रूपए है। यह चौबीस घंटे कस्टमर्स से खुदकार बातचीत करके उन्हें कस्टमर में तब्दील करते हैं। रिटेल ए आई पर आधारित यह स्पीच सिस्टम्स स्टाफ का खर्चा और कस्टमर्स हैंडलिंग के मसाइल खत्म कर देते हैं। अभी व्हाट्सएप नंबर 03302930930 पर संपर्क करके अपनी लाइन एक्टिवेट कराएं!",

  "جی بالکل، میں نے آپ کے سوال کو نوٹ کر لیا ہے۔ چونکہ ہم 100% کسٹمائزڈ بہترین سسٹمز بناتے ہیں، اس لیے ابھی ہمارے آفیشل واٹس ایپ نمبر 03302930930 پر رابطہ کریں تاکہ ڈویلپر میہال خٹک آپ کو بہترین لائیو سپورٹ اور خصوصی رعایت فراہم کر سکیں!":
    "जी बिल्कुल, मैंने आपके सवाल को नोट कर लिया है। चूंकि हम 100% कस्टमाइज़्ड बेहतरीन सिस्टम्स बनाते हैं, इसलिए अभी हमारे ऑफिशियल व्हाट्सएप नंबर 03302930930 पर संपर्क करें ताकि डेवलपर मिहाल खट्टक आपको बेहतरीन लाइव सपोर्ट और स्पेशल डिस्‍काउंट प्रोवाइड कर सकें!",

  "وعلیکم السلام! میں بالکل ٹھیک ہوں۔ میں میاں میہال خٹک اے آئی کمپنی کا آفیشل صوتی ایجنٹ ہوں۔ آپ اپنے کاروبار کی آٹومیشن یا ویب سائٹس کے بارے میں کچھ بھی پوچھ سکتے ہیں!":
    "वालेकुम अस्सलाम! मैं बिल्कुल ठीक हूँ। मैं मियां मिहाल खट्टक ए आई कंपनी का ऑफिशियल वॉइस एजेंट हूँ। आप अपने बिज़नेस की ऑटोमेशन या वेबसाइट्स के बारे में कुछ भी पूछ सकते हैं!",

  "مائیکروفون کی اجازت نہیں ملی۔ براہ کرم اپنے براؤزر کے ایڈریس بار میں لاک آئی کان پر کلک کر کے مائیکروفون کی اجازت دیں، یا نیچے لکھ کر سوال ٹائپ کریں۔":
    "माइक्रोफोन की अनुमति नहीं मिली। कृपया अपने ब्राउज़र के एड्रेस बार में लॉक आइकॉन पर क्लिक करके अनुमति दें, या नीचे लिखकर सवाल टाइप करें。"
};

export default function ClientSandbox() {
  const { language } = useLanguage();
  const { prices } = useApp();
  const [activeTab, setActiveTab] = useState<"voice" | "workflow">("voice");

  // Voice Sandbox state
  const [callState, setCallState] = useState<"idle" | "dialing" | "connected" | "ended">("idle");
  const [dialogue, setDialogue] = useState<{ sender: "agent" | "user"; text: string }[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [audioWaves, setAudioWaves] = useState<number[]>(Array(18).fill(12));
  const [callLanguage, setCallLanguage] = useState<"en-US" | "ur-PK">("ur-PK");
  const [isRecording, setIsRecording] = useState(false);
  
  // Voice Recording for Admin state
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // Speech synthesis and recognition refs
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const recognitionRef = useRef<any>(null);
  const callStateRef = useRef(callState);
  const callLanguageRef = useRef(callLanguage);
  const micBlockedRef = useRef(false);
  const isAgentSpeakingRef = useRef(false);
  const agentSpokenTextRef = useRef("");
  const isRecognitionActiveRef = useRef(false);

  // Keep refs absolutely in sync with real-time state changes
  useEffect(() => {
    callStateRef.current = callState;
  }, [callState]);

  useEffect(() => {
    callLanguageRef.current = callLanguage;
  }, [callLanguage]);

  // Workflow Automation Sandbox state
  const [triggeredWorkflow, setTriggeredWorkflow] = useState<string | null>(null);
  const [workflowStep, setWorkflowStep] = useState<number>(-1);
  const [workflowLogs, setWorkflowLogs] = useState<string[]>([]);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);

  // Sync call language with the global toggle language (Keep Urdu as starting default)
  useEffect(() => {
    setCallLanguage("ur-PK");
  }, [language]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.speechSynthesis) {
        synthRef.current = window.speechSynthesis;
        // Warm up voices array early
        window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => {
            if (synthRef.current) synthRef.current.getVoices();
          };
        }
      }

      // Initialize speech recognition if supported
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.maxAlternatives = 1;
        
        rec.onstart = () => {
          setIsRecording(true);
          isRecognitionActiveRef.current = true;
        };

        rec.onspeechstart = () => {
          if (isAgentSpeakingRef.current) {
            console.log("Interruption sound detected! Cut off agent speaking.");
            if (synthRef.current) {
              synthRef.current.cancel();
            }
            isAgentSpeakingRef.current = false;
          }
        };

        rec.onresult = (event: any) => {
          const speechToText = event?.results?.[event.results.length - 1]?.[0]?.transcript;
          if (speechToText) {
            // Check for self-hearing filter to prevent synthetic playback loops.
            const textNormalized = speechToText.trim().toLowerCase();
            const currentAgentNormalized = (agentSpokenTextRef.current || "").trim().toLowerCase();
            const isSelfHearing = isAgentSpeakingRef.current && (
              textNormalized === currentAgentNormalized ||
              currentAgentNormalized.includes(textNormalized) ||
              textNormalized.includes(currentAgentNormalized)
            );

            if (isSelfHearing && textNormalized.length > 2) {
              console.log("Ignored synthetic echo audio:", speechToText);
              return;
            }

            // Real user voice interruption!
            if (isAgentSpeakingRef.current) {
              console.log("Interruption speech recognized! Cancelling synthesis.");
              if (synthRef.current) {
                synthRef.current.cancel();
              }
              isAgentSpeakingRef.current = false;
            }

            setUserInput(speechToText);
            processConversationQuery(speechToText);
            setUserInput("");
          }
        };

        rec.onerror = (event: any) => {
          setIsRecording(false);
          
          if (event.error === "aborted" || event.error === "no-speech" || event.error === "network") {
            // Expected normal events when agent talks, voter is temporarily quiet, or transient network hiccup
            console.log(`Speech recognition state/error: ${event.error}`);
            return;
          }

          console.error("Speech recognition error:", event.error);

          if (event.error === "not-allowed") {
            micBlockedRef.current = true; // Stop auto listening if blocked
            const errorText = callLanguage === "ur-PK"
              ? "مائیکروفون کی اجازت نہیں ملی۔ براہ کرم اپنے براؤزر کے ایڈریس بار میں لاک آئی کان پر کلک کر کے مائیکروفون کی اجازت دیں، یا نیچے لکھ کر سوال ٹائپ کریں۔"
              : "Microphone permission was denied. Please click the lock icon in your browser address bar to allow microphone access, or type your query in the field below.";
            setDialogue(prev => [...prev, { sender: "agent", text: errorText }]);
            if (synthRef.current) {
              const utterance = new SpeechSynthesisUtterance(errorText);
              utterance.lang = callLanguage === "ur-PK" ? "hi-IN" : "en-US";
              synthRef.current.speak(utterance);
            }
          }
        };

        rec.onend = () => {
          setIsRecording(false);
          isRecognitionActiveRef.current = false;
          // Auto restart micro-loop to achieve seamless direct calling system without hitting buttons
          setTimeout(() => {
            if (
              callStateRef.current === "connected" && 
              !micBlockedRef.current &&
              !isRecognitionActiveRef.current
            ) {
              try {
                if (recognitionRef.current) {
                  recognitionRef.current.lang = callLanguageRef.current;
                  recognitionRef.current.start();
                }
              } catch (e) {
                // Ignore instances where recognition is already running
              }
            }
          }, 350);
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, [callLanguage]);

  // Update animated audio visualizer waves randomly during call
  useEffect(() => {
    if (callState !== "connected") {
      setAudioWaves(Array(18).fill(12));
      return;
    }

    const interval = setInterval(() => {
      setAudioWaves(
        Array(18)
          .fill(0)
          .map(() => Math.floor(Math.random() * 45) + 8)
      );
    }, 120);

    return () => clearInterval(interval);
  }, [callState]);

  // Speaks simulated text-to-speech option with native language optimizations and auto-mic trigger
  const speakText = (text: string, isUrduHindi: boolean = false, customSpokenText?: string) => {
    if (!synthRef.current) return;
    try {
      isAgentSpeakingRef.current = true;
      agentSpokenTextRef.current = text;
      
      // Do NOT abort recognition here. This keeps the microphone active for interruptions!
      setIsRecording(true);

      synthRef.current.cancel();

      // Optimize visual Urdu text to Devanagari Hindi for standard browsers support (since spoken Urdu/Hindi sounds identical)
      let spokenText = customSpokenText || text;
      if (!customSpokenText && (isUrduHindi || callLanguage === "ur-PK")) {
        if (speechTranslationMap[text]) {
          spokenText = speechTranslationMap[text];
        }
      }

      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.pitch = 1.0;
      utterance.rate = 1.05; // Slightly faster natural cadence
      
      const voices = synthRef.current.getVoices();
      
      if (isUrduHindi || callLanguage === "ur-PK") {
        // Find Hindi or Urdu voice for high quality South Asian speech rendering
        const SouthAsianVoice = voices.find(v => 
          v.lang.startsWith("ur-") || 
          v.lang.startsWith("hi-") || 
          v.name.toLowerCase().includes("urdu") || 
          v.name.toLowerCase().includes("hindi") ||
          v.name.toLowerCase().includes("india") ||
          v.name.toLowerCase().includes("pakistan")
        );
        if (SouthAsianVoice) {
          utterance.voice = SouthAsianVoice;
          utterance.lang = SouthAsianVoice.lang;
        } else {
          // Fallback lang attribute to let browser auto-assign synthesis engine
          utterance.lang = "hi-IN";
        }
      } else {
        const preferred = voices.find(v => v.name.includes("Google US English") || v.name.includes("Narrator") || v.lang.startsWith("en-"));
        if (preferred) {
          utterance.voice = preferred;
          utterance.lang = preferred.lang;
        } else {
          utterance.lang = "en-US";
        }
      }

      utterance.onend = () => {
        isAgentSpeakingRef.current = false;
        // Automatically start recording when voice finishes speaking for a seamless direct call vibe
        setTimeout(() => {
          if (
            callStateRef.current === "connected" && 
            !micBlockedRef.current && 
            !isAgentSpeakingRef.current &&
            !isRecognitionActiveRef.current
          ) {
            try {
              if (recognitionRef.current) {
                recognitionRef.current.lang = callLanguageRef.current;
                recognitionRef.current.start();
              }
            } catch (err) {
              console.error("Auto transition microphone start error:", err);
            }
          }
        }, 150);
      };

      utterance.onerror = () => {
        isAgentSpeakingRef.current = false;
      };

      synthRef.current.speak(utterance);
    } catch (e) {
      console.error(e);
      isAgentSpeakingRef.current = false;
    }
  };

  const handleStartCall = () => {
    setCallState("dialing");
    setDialogue([]);
    micBlockedRef.current = false; // Reset block on new dial sequence!
    
    // Simulate Ring Tone
    setTimeout(() => {
      setCallState("connected");
      
      // Start Customer Voice Recording for Admin
      startVoiceRecording();

      const isUrduHindi = callLanguage === "ur-PK";
      const intro = isUrduHindi 
        ? "اسلام علیکم! میں میاں میہال خٹک اے آئی کمپنی کا آفیشل صوتی ایجنٹ ہوں۔ میں آپ کے کاروبار کے لیے خودکار کال ایجنٹس، آٹومیشن ورک فلوز اور ویب سائٹس تیار کرتا ہوں۔ آج میں آپ کے کاروبار کی آٹومیشن کے لیے کیا مدد کر سکتا ہوں؟"
        : "Hello! Thank you for calling M. Mehaal Khattak AI Agency. I am your autonomous representative. We design high-converting Websites, 3D experiences, automated n8n workflows, Chrome Extensions, and advanced Retell AI calling agents. How can I optimize and automate your business today to save staff costs and increase profitability?";
      
      setDialogue([{ sender: "agent", text: intro }]);
      speakText(intro, isUrduHindi);
    }, 1800);
  };

  const handleEndCall = () => {
    if (synthRef.current) synthRef.current.cancel();
    isAgentSpeakingRef.current = false;
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }

    // Stop and Upload Voice Recording
    stopAndUploadRecording();

    setCallState("ended");
    setTimeout(() => {
      setCallState("idle");
      setDialogue([]);
    }, 1200);
  };

  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start();
    } catch (err) {
      console.error("Failed to start media recorder", err);
    }
  };

  const stopAndUploadRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = reader.result as string;
          try {
            const sessionId = sessionStorage.getItem("visit_session_id") || "anon_" + Math.random().toString(36).substring(7);
            await fetch("/api/recordings", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                audio: base64Audio,
                sessionId,
                timestamp: new Date().toISOString()
              })
            });
          } catch (e) {
            console.error("Failed to upload recording", e);
          }
        };
        
        // Stop all tracks to release mic
        mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.stop();
    }
  };

  const processConversationQuery = async (queryText: string) => {
    if (!queryText.trim() || callState !== "connected") return;

    // Add user question to state
    setDialogue(prev => [...prev, { sender: "user" as const, text: queryText }]);
    
    try {
      const sessionId = sessionStorage.getItem("visit_session_id") || "anon_" + Math.random().toString(36).substring(7);
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: queryText,
          language: callLanguage,
          sessionId,
          history: dialogue
        })
      });
      const data = await response.json();
      
      const responseText = data.success ? data.responseText : "Error connecting to AI service.";
      const spokenText = data.success ? data.spokenText : responseText;
      
      if (callStateRef.current === "connected") {
        setDialogue(prev => [...prev, { sender: "agent", text: responseText }]);
        speakText(responseText, callLanguage === "ur-PK", spokenText);
      }
    } catch (err) {
      console.error("Error communicating with Gemini backend chat", err);
      // Fallback
      const f = (val: number) => (val || 0).toLocaleString();
      const p = prices || {};
      const query = queryText.toLowerCase();
      const isUrduHindi = callLanguage === "ur-PK";
      let responseText = "";

      if (isUrduHindi) {
        if (query.includes("پراائس") || query.includes("قیمت") || query.includes("ریٹ") || query.includes("پیکج") || query.includes("پیسے") || query.includes("قیمتیں") || query.includes("price") || query.includes("cost") || query.includes("rate") || query.includes("کتنے") || query.includes("چارج")) {
          responseText = `ہمارے تمام سسٹمز اور پیکجز کی فیس یہ ہے: ویب سائٹ بنوانا ${f(p["website-building"] || 15000)} روپے، تھری ڈی ویب سائٹس ${f(p["3d-website"] || 30000)} روپے، اے آئی آٹومیشن سروسز ${f(p["ai-automation"] || 30000)} روپے، اے آئی کسٹمر کال ایجنٹ ${f(p["ai-call-agent"] || 50000)} روپے، اور اے آئی آٹومیشن کورسز ${f(p["ai-automation-course"] || 15000)} روپے۔ اے آئی ٹریڈنگ بوٹس کی قیمت کسٹم ہے۔ یہ سسٹمز آپ کے اسٹاف کا خرچ بچا کر چوبیس گھنٹے کام کرتے ہیں۔ ڈیل فائنل کرنے کے لیے ابھی واٹس ایپ نمبر 03302930930 پر میسج بھیجیں!`;
        } else if (query.includes("آٹومیشن") || query.includes("what is automation") || query.includes("automation کا کیا مطلب ہے")) {
          responseText = "آٹومیشن کا مطلب ہے آپ کے کاروبار کے روزمرہ کے کاموں کو (جیسے کسٹمر کی کالز، ڈیٹا اینٹری یا ای میلز) ٹیکنالوجی کے ذریعے خودکار بنانا تاکہ آپ کا وقت بچے اور انسانوں کی غلطیوں کا امکان نہ رہے۔ ہم ایسے سسٹمز تیار کرتے ہیں جو آپ کے لیے 24/7 کام کرتے ہیں۔";
        } else if (query.includes("واٹس") || query.includes("whatsapp") || query.includes("میسج") || query.includes("کام") || query.includes("ورک فلو")) {
          responseText = "ہمارے اے آئی آٹومیشن ورک فلوز اور بوٹس کے ذریعے آپ کے اسٹاف کا وقت اور تنخواہ بچتی ہے۔ جب بھی کوئی گاہک فارم بھرتا ہے، ہمارا سسٹم واٹس ایپ پر کسٹمر کو لائیو میسج بھیج دیتا ہے۔ اس کے علاوہ ہم ریٹیل اے آئی کال ایجنٹس اور گوگل میپس لیڈ سکریپنگ کے لیے کروم ایکسٹینشنز بناتے ہیں۔ تفصیلات کے لیے ابھی واٹس ایپ نمبر 03302930930 پر رابطہ کریں!";
        } else if (query.includes("کال") || query.includes("صوتی") || query.includes("ایجنٹ") || query.includes("مائیک") || query.includes("phone") || query.includes("call") || query.includes("voice")) {
          responseText = `اے آئی کسٹمر کال ایجنٹ کی فیس ${f(p["ai-call-agent"] || 50000)} روپے ہے۔ یہ چوبیس گھنٹے کسٹمرز سے خودکار گفتگو کر کے انہیں گاہک میں تبدیل کرتے ہیں۔ ریٹیل اے آئی پر مشتمل یہ صوتی سسٹمز اسٹاف کا خرچہ اور کسٹمرز ہینڈلنگ کے مسائل ختم کر دیتے ہیں۔ ابھی واٹس ایپ نمبر 03302930930 پر رابطہ کر کے اپنی لائن ایکٹیویٹ کرائیں!`;
        } else if (query.includes("ٹریڈنگ") || query.includes("بوٹ") || query.includes("بوٹس") || query.includes("trade") || query.includes("trading")) {
          responseText = "ہمارے اے آئی ٹریڈنگ بوٹس کسٹم ریٹس پر تیار کیے جاتے ہیں۔ یہ سسٹمز جذبات سے بالاتر ہو کر مارکیٹ کی درست نگرانی اور ٹریڈنگ کرتے ہیں جس سے نقصانات کا خدشہ کم ہوتا ہے۔ اس کی لائیو منصوبہ بندی کرنے کے لیے ابھی واٹس ایپ نمبر 03302930930 پر ہم سے بات کریں!";
        } else if (query.includes("کورس") || query.includes("کلاس") || query.includes("سیکھنا") || query.includes("course") || query.includes("learn")) {
          responseText = `ہمارا اے آئی آٹومیشن کورس محض ${f(p["ai-automation-course"] || 15000)} روپے کا ہے جس میں آپ کو خودمختار کالنگ سسٹمز، گوگل میپس لیڈ سکریپنگ کروم ایکسٹینشنز اور این-ایٹ-این واٹس ایپ آٹومیشن بنانا سکھایا جاتا ہے۔ اس سے آپ خودکار آمدنی کے قیمتی ہنر سیکھ سکتے ہیں۔ داخلہ لینے کے لیے ابھی واٹس ایپ نمبر 03302930930 پر میسج کریں!`;
        } else if (query.includes("تھری ڈی") || query.includes("3d") || query.includes("انٹرایکٹو") || query.includes("ڈیزائن") || query.includes("ویب") || query.includes("سائٹ") || query.includes("website") || query.includes("web")) {
          responseText = `ہم انتہائی خوبصورت اور پریمیم تھری ڈی انٹرایکٹو ویب سائٹس بناتے ہیں جو گاہکوں کا اعتماد اور سیلز بڑھاتی ہیں۔ عام ویب سائٹ ${f(p["website-building"] || 15000)} روپے اور جدید تھری ڈی ویب سائٹ ${f(p["3d-website"] || 30000)} روپے کی ہے۔ یہ سسٹمز کسٹمرز کو متوجہ کرتے ہیں اور برانڈ ویلیو بڑھاتے ہیں۔ ابھی واٹس ایپ نمبر 03302930930 پر رابطہ کریں!`;
        } else if (query.includes("کیا حال") || query.includes("کیسے ہو") || query.includes("ہیلو") || query.includes("سلام") || query.includes("hello") || query.includes("hi")) {
          responseText = "وعلیکم السلام! میں بالکل ٹھیک ہوں۔ میں میاں میہال خٹک اے آئی کمپنی کا آفیشل صوتی ایجنٹ ہوں۔ آپ اپنے کاروبار کی آٹومیشن یا ویب سائٹس کے بارے میں کچھ بھی پوچھ سکتے ہیں!";
        } else {
          responseText = "جی بالکل، میں نے آپ کے سوال کو نوٹ کر لیا ہے۔ چونکہ ہم 100% کسٹمائزڈ بہترین سسٹمز بناتے ہیں، اس لیے ابھی ہمارے آفیشل واٹس ایپ نمبر 03302930930 پر رابطہ کریں تاکہ ڈویلپر میہال خٹک آپ کو بہترین لائیو سپورٹ اور خصوصی رعایت فراہم کر سکیں!";
        }
      } else {
        if (query.includes("price") || query.includes("cost") || query.includes("rate") || query.includes("how much") || query.includes("packages") || query.includes("pricing") || query.includes("fee") || query.includes("charge")) {
          responseText = `Our official custom systems and enterprise pricing are: Website Development at ${f(p["website-building"] || 15000)} PKR, 3D Websites at ${f(p["3d-website"] || 30000)} PKR, AI Automation at ${f(p["ai-automation"] || 30000)} PKR, AI Call Agents at ${f(p["ai-call-agent"] || 50000)} PKR, and our AI Automation Course at ${f(p["ai-automation-course"] || 15000)} PKR. AI Trading Bot solutions are customized to your trading margins. These systems completely automate lead validation and user responses to eliminate human errors and save significant staff costs. To finalize now, contact us on WhatsApp at 03 30 29 30 930!`;
        } else if (query.includes("automation") || query.includes("what is automation")) {
          responseText = "Automation refers to leveraging technology to perform repetitive tasks, such as customer inquiries, data entry, or lead responses, without constant human intervention. It ensures your business runs 24/7 with improved accuracy and efficiency. Are you looking to automate a specific process?";
        } else if (query.includes("workflow") || query.includes("n8n") || query.includes("whatsapp") || query.includes("sync")) {
          responseText = "We build robust automation workflows utilizing tools like n8n or custom scripts. For instance, when a customer fills a booking form, our system immediately dispatches notification messages directly to WhatsApp in milliseconds. This saves massive staff costs and response delays. Contact developer Mehaal on WhatsApp at 03 30 29 30 930 for custom routes!";
        } else if (query.includes("call") || query.includes("voice") || query.includes("retell") || query.includes("agent") || query.includes("representative")) {
          responseText = `Our intelligent AI Call Agent is powered by Retell AI calling pipelines and costs ${f(p["ai-call-agent"] || 50000)} PKR. It answers calls instantly 24/7, detects customer intent quickly, explains benefits, and channels prospects directly to WhatsApp at 03 30 29 30 930 for closing. It reduces standard front-office administrative costs down to zero!`;
        } else if (query.includes("chatbot") || query.includes("chat") || query.includes("business agent")) {
          responseText = "Our smart conversational Business Chatbots provide enterprise value. They qualify landing page traffic, collect mobile numbers, handle inquiries, and increase web conversion rates instantly. Contact us on WhatsApp at 03 30 29 30 930 to install.";
        } else if (query.includes("trading") || query.includes("trade") || query.includes("bot") || query.includes("forex")) {
          responseText = "AI Trading Bots provide highly systematic mathematical market research and execution, removing emotional decisions completely, under strict drawdown rules. Pricing is custom configured based on your trading volume. Let's discuss details on WhatsApp at 03 30 29 30 930!";
        } else if (query.includes("course") || query.includes("learn") || query.includes("class") || query.includes("cohort")) {
          responseText = `Our custom AI Automation Course is ${f(p["ai-automation-course"] || 15000)} PKR. You will learn to construct n8n pipelines, build Chrome lead scraping extensions, and chain autonomous voice lines to establish high-income technical skills. Chat with us on WhatsApp at 03 30 29 30 930 to enroll!`;
        } else if (query.includes("3d") || query.includes("interactive") || query.includes("website") || query.includes("web") || query.includes("landing")) {
          responseText = `We build standard high-speed Websites for ${f(p["website-building"] || 15000)} PKR and immersive WebGL 3D Websites for ${f(p["3d-website"] || 30000)} PKR. Interactive 3D layouts capture attention instantly and increase trust, resulting in higher sales. To design yours, message us on WhatsApp at 03 30 29 30 930.`;
        } else if (query.includes("hey") || query.includes("hello") || query.includes("hi") || query.includes("greetings") || query.includes("how are you")) {
          responseText = "Hello! I am Mehaal Khattak AI Agency's voice representative. I am ready to answer your inquiries on custom automation workflows, websites, and chat systems. How can I help you automate today?";
        } else {
          responseText = "That is highly valuable! To map this custom requirement, coordinate directly with our developer Mehaal Khattak on WhatsApp at 03 30 29 30 930. He is live to assist with discounts and deployment parameters.";
        }
      }

      if (callStateRef.current === "connected") {
        setDialogue(prev => [...prev, { sender: "agent", text: responseText }]);
        speakText(responseText, isUrduHindi);
      }
    }
  };

  // Run structured workflow animation sequence
  const startWorkflowSimulation = (id: string) => {
    if (isRunningWorkflow) return;
    setIsRunningWorkflow(true);
    setTriggeredWorkflow(id);
    setWorkflowStep(0);
    
    const logs: string[] = [];
    const steps = id === "lead" 
      ? [
          "⚡ Webhook caught: Incoming lead from landing website",
          "🔍 AI Parsing: Segmenting contact parameters via neural engine",
          "🗄️ Database sync: Writing credentials to master database rows",
          "💬 Trigger dispatch: Launching automated WhatsApp customer welcome pitch",
          "✅ Success: Pipeline verified in 143ms. Absolute zero-human-effort!"
        ]
      : [
          "⚡ Trigger: Missed corporate support telephone call detected",
          "🎙️ Transcription: Audio processed into query logs",
          "🧠 Sentiment: Formulating priority escalation ranking",
          "🔔 Slack ping: Directing customer dashboard alert to administrative agents",
          "✅ Success: Lead logged and scheduled for dynamic callback."
        ];

    let currentStepIndex = 0;
    
    const timer = setInterval(() => {
      if (currentStepIndex < steps.length) {
        logs.push(steps[currentStepIndex]);
        setWorkflowLogs([...logs]);
        setWorkflowStep(currentStepIndex);
        currentStepIndex++;
      } else {
        clearInterval(timer);
        setIsRunningWorkflow(false);
      }
    }, 1200);
  };

  return (
    <section id="sandbox" className="py-16 relative overflow-hidden bg-transparent border-t border-white/5">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/2 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Title area */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.02] border border-white/10 rounded-full text-[10px] font-mono tracking-widest text-neon-cyan uppercase">
            <Sparkles className="w-3 h-3 text-neon-cyan" />
            <span>Interactive Operational Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-light text-white tracking-wide uppercase">
            {language === "ur" ? "لائیو آٹومیشن اور اے آئی ڈیمو" : "Test Drive the Intelligence"}
          </h2>
          <p className="text-sm sm:text-base text-gray-400 font-sans font-light max-w-2xl mx-auto">
            {language === "ur" 
              ? "ہمارے حقیقت پسندانہ صوتی ایجنٹوں کے ساتھ براہ راست گفتگو کریں یا اپنے پسندیدہ بزنس ورک فلو پائپ لائنز کا معائنہ کریں۔"
              : "Experience low-latency synthetic conversations live from your browser, or trigger multi-step integration triggers to see autonomous business logic active in real-time."}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-[#05060b] border border-white/10 rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setActiveTab("voice")}
              className={`px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "voice" 
                  ? "bg-neon-cyan text-black font-bold shadow-md" 
                  : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>{language === "ur" ? "اے آئی صوتی ایجنٹ" : "Voice Agent Simulator"}</span>
            </button>
            
            <button
              onClick={() => setActiveTab("workflow")}
              className={`px-6 py-2.5 rounded-lg text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "workflow" 
                  ? "bg-neon-purple text-white font-bold shadow-md shadow-neon-purple/10" 
                  : "text-gray-400 hover:text-white hover:bg-white/[0.02]"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>{language === "ur" ? "آٹومیشن پائپ لائن" : "Workflow Constructor"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Sandbox Display Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {activeTab === "voice" ? (
            <>
              {/* Voice Agent Simulator Dashboard (7 columns) */}
              <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#020306]/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group min-h-[480px]">
                <div className="absolute top-0 right-0 w-48 h-48 bg-neon-cyan/2 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header detail */}
                <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between border-b border-white/5 pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-pulse" />
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block">Operational Space</span>
                      <span className="text-xs font-mono text-white tracking-widest uppercase">Agent ID: Mehaal-T600</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Live Dial Language Switcher Toggle */}
                    {callState === "connected" && (
                      <div className="bg-black/80 border border-white/10 rounded-lg p-0.5 flex gap-0.5 mr-2">
                        <button
                          type="button"
                          onClick={() => {
                            setCallLanguage("en-US");
                            const alertMsg = "Language switched to English. You can speak English now!";
                            setDialogue(d => [...d, { sender: "agent", text: alertMsg }]);
                            speakText(alertMsg, false);
                          }}
                          className={`px-2 py-1 rounded text-[9px] font-mono transition-all uppercase cursor-pointer ${
                            callLanguage === "en-US" 
                              ? "bg-neon-cyan text-black font-bold" 
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          ENG
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setCallLanguage("ur-PK");
                            const alertMsg = "سسٹم زبان اب تبدیل ہو چکی ہے۔ آپ اب مائیک کا بٹن دبا کر لائیو اردو یا ہندی بول سکتے ہیں!";
                            setDialogue(d => [...d, { sender: "agent", text: alertMsg }]);
                            speakText(alertMsg, true);
                          }}
                          className={`px-2 py-1 rounded text-[9px] font-mono transition-all cursor-pointer ${
                            callLanguage === "ur-PK" 
                              ? "bg-neon-cyan text-black font-bold" 
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          اردو / HIN
                        </button>
                      </div>
                    )}

                    <span className="text-[10px] font-mono bg-white/[0.02] border border-white/10 px-2.5 py-1 rounded text-neon-cyan uppercase">
                      Latency: ~120ms
                    </span>
                  </div>
                </div>

                {/* Content body based on call status */}
                <div className="flex-1 flex flex-col justify-center items-center py-6">
                  {callState === "idle" && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-5"
                    >
                      <div className="w-20 h-20 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 flex items-center justify-center mx-auto text-neon-cyan group-hover:scale-105 transition-all">
                        <PhoneCall className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xl font-display font-light text-white tracking-wide uppercase">
                          {language === "ur" ? "صوتی کال کا آزمائشی آغاز کریں" : "Initialize Dialing Sequence"}
                        </h4>
                        <p className="text-xs text-gray-500 max-w-sm leading-relaxed font-sans font-light">
                          {language === "ur" 
                            ? "ایک حقیقی آزمائشی کاروباری کال شروع کرنے کے لیے بٹن دبائیں۔ یہ صوتی سنتھیسس کی مدد سے لائیو بات کرے گا اور آپ مائیک کے ذریعے بول بھی سکتے ہیں!"
                            : "Press Dial Call to spin up a fully reactive browser voice agent. Converse hands-free using your Microphone, or type to query prices, workflows, and integrations."}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <button
                          onClick={() => {
                            setCallLanguage("ur-PK");
                            handleStartCall();
                          }}
                          className="py-3 px-6 rounded-xl bg-neon-cyan hover:bg-white text-black font-semibold text-xs tracking-wider uppercase transition-all duration-350 active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-neon-cyan/5"
                        >
                          <Play className="w-3.5 h-3.5 fill-black" />
                          <span>اردو / HINDI CALL</span>
                        </button>

                        <button
                          onClick={() => {
                            setCallLanguage("en-US");
                            handleStartCall();
                          }}
                          className="py-3 px-6 rounded-xl bg-[#06080e] border border-white/10 hover:border-white text-white font-semibold text-xs tracking-wider uppercase transition-all duration-350 active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white" />
                          <span>ENGLISH CALL</span>
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {callState === "dialing" && (
                    <div className="text-center space-y-6">
                      <div className="relative flex justify-center items-center">
                        <div className="absolute w-24 h-24 bg-neon-cyan/10 rounded-full animate-ping" />
                        <div className="relative w-16 h-16 rounded-full bg-neon-cyan/20 border border-neon-cyan/40 flex items-center justify-center text-neon-cyan font-mono animate-pulse">
                          D01
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-neon-cyan uppercase tracking-widest block">Establishing Secure Route</span>
                        <span className="text-base text-white tracking-wider uppercase font-sans font-light">
                          {callLanguage === "ur-PK" ? "صوتی رابطہ قائم کیا جا رہا ہے..." : "Dialing +92 (330) 293-0930..."}
                        </span>
                      </div>
                    </div>
                  )}

                  {callState === "connected" && (
                    <div className="w-full flex flex-col justify-between h-full gap-6">
                      {/* Audio visualizer spectrum bars */}
                      <div className="flex items-center justify-center gap-1.5 h-20">
                        {audioWaves.map((height, i) => (
                           <motion.div
                            key={i}
                            animate={{ height: isRecording ? Math.floor(Math.random() * 25) + 6 : height }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className={`w-1 px-0.5 rounded-full transition-all ${
                              isRecording
                                ? "bg-gradient-to-t from-red-500 to-red-400"
                                : "bg-gradient-to-t from-neon-cyan via-neon-cyan/70 to-neon-purple/20"
                            }`}
                          />
                        ))}
                      </div>

                      {/* Conversation Feed */}
                      <div className="flex-1 bg-black/40 border border-white/5 rounded-xl p-4 overflow-y-auto max-h-[170px] space-y-3 font-mono text-xs scrollbar-thin">
                        {dialogue.map((m, idx) => (
                          <div 
                            key={idx} 
                            className={`flex ${m.sender === "agent" ? "justify-start" : "justify-end"}`}
                          >
                            <div className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                              m.sender === "agent" 
                                ? "bg-white/[0.02] border border-white/10 text-gray-300 rounded-tl-none" 
                                : "bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan rounded-tr-none"
                            }`}>
                              <span className="text-[9px] uppercase tracking-wider block mb-1 text-gray-400 font-bold">
                                {m.sender === "agent" 
                                  ? (callLanguage === "ur-PK" ? "🤖 اے آئی نمائندہ" : "🤖 AI Representative")
                                  : (callLanguage === "ur-PK" ? "👤 آپ کی آواز" : "👤 Business Visitor")}
                              </span>
                              <p className="font-sans font-light">{m.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dial message form response input with Speech Mic and Send buttons */}
                      <form 
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!userInput.trim()) return;
                          processConversationQuery(userInput);
                          setUserInput("");
                        }} 
                        className="flex gap-2 items-center"
                      >
                        <input
                          type="text"
                          placeholder={
                            isRecording
                              ? (callLanguage === "ur-PK" ? "سن رہا ہوں... بات کیجیے" : "Listening to your voice... Speak now")
                              : (callLanguage === "ur-PK" ? "اے آئی بول رہا ہے..." : "AI speaking...")
                          }
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          disabled={isRecording}
                          className="flex-grow bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-neon-cyan placeholder:text-gray-500 disabled:opacity-50"
                        />

                        {/* Hands-free Microphone Voice Vibe Status Indicator */}
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all relative ${
                            isRecording
                              ? "bg-red-500/20 border border-red-500 text-red-500 shadow-md shadow-red-500/10"
                              : "bg-white/[0.02] border border-white/5 text-gray-600"
                          }`}
                          title={
                            isRecording 
                              ? (callLanguage === "ur-PK" ? "مائیکرو فون خودکار فعال ہے - بولیں" : "Hands-free Microphones Active - Speak Now")
                              : (callLanguage === "ur-PK" ? "صوتی نمائندہ بول رہا ہے" : "Agent is currently speaking")
                          }
                        >
                          {isRecording && (
                            <span className="absolute inset-0 rounded-xl border border-red-500 animate-ping opacity-40 pointer-events-none" />
                          )}
                          <Mic className={`w-4 h-4 ${isRecording ? "animate-pulse" : ""}`} />
                        </div>

                        <button
                          type="submit"
                          disabled={!userInput.trim() || isRecording}
                          className="w-11 h-11 rounded-xl bg-neon-cyan hover:bg-white disabled:opacity-35 disabled:cursor-not-allowed text-black flex items-center justify-center cursor-pointer transition-all active:scale-95"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      </form>
                    </div>
                  )}

                  {callState === "ended" && (
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-red-500/5 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
                        <Square className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-red-400 font-mono tracking-widest uppercase">
                        {callLanguage === "ur-PK" ? "صوتی رابطہ منقطع کر دیا گیا ہے" : "Call Connection Terminated"}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer controller bar */}
                {callState === "connected" && (
                  <div className="border-t border-white/5 pt-4 mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-neon-cyan" />
                      <span>
                        {callLanguage === "ur-PK" ? "خودکار صوتی آواز فعال ہے" : "Speech Audio Synthesizer Active"}
                      </span>
                    </span>
                    <button
                      onClick={handleEndCall}
                      className="px-4 py-2 border border-red-500/20 hover:border-transparent bg-red-500/5 hover:bg-red-500 rounded-lg text-[10px] uppercase tracking-wider font-mono text-red-400 hover:text-white transition-all cursor-pointer"
                    >
                      {callLanguage === "ur-PK" ? "کال بند کریں" : "Disconnect Line"}
                    </button>
                  </div>
                )}
              </div>

              {/* Suggestions Side Guide (5 columns) */}
              <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#020306]/40 relative overflow-hidden">
                <div className="space-y-6">
                  <span className="text-[10px] font-mono bg-neon-cyan/5 border border-neon-cyan/15 uppercase tracking-widest px-3 py-1 rounded-full text-neon-cyan">
                    Interactive Speech Guide
                  </span>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-display font-light text-white tracking-wide uppercase">
                      Recommended Prompts to Speak
                    </h4>
                    <p className="text-xs text-gray-400 font-light leading-relaxed">
                      Our synthetic phone engine responds dynamically to conversational intent in both English and Urdu/Hindi. Try saying or clicking these triggers:
                    </p>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        if (callState === "connected") {
                          const val = callLanguage === "ur-PK" ? "اپنے پیکجز اور پرائسز بتائیں؟" : "What is the price of the AI Voice call agent?";
                          setUserInput(val);
                          processConversationQuery(val);
                          setUserInput("");
                        }
                      }}
                      className="w-full text-left p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-start gap-3.5 group cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Investment inquiry</span>
                        <span className="text-xs font-light text-gray-300 group-hover:text-white transition-colors">
                          {callLanguage === "ur-PK" ? "اپنے پیکجز اور پرائسز بتائیں؟" : "What is the price of the AI Voice call agent?"}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        if (callState === "connected") {
                          const val = callLanguage === "ur-PK" ? "واٹس ایپ آٹومیشن کا ورک فلو کیسے کام کرتا ہے؟" : "How does your automatic GSheets to WhatsApp sync work?";
                          setUserInput(val);
                          processConversationQuery(val);
                          setUserInput("");
                        }
                      }}
                      className="w-full text-left p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-start gap-3.5 group cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-neon-purple flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">System capabilities</span>
                        <span className="text-xs font-light text-gray-300 group-hover:text-white transition-colors">
                          {callLanguage === "ur-PK" ? "واٹس ایپ آٹومیشن کا ورک فلو کیسے کام کرتا ہے؟" : "How does your automatic GSheets to WhatsApp sync work?"}
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => {
                        if (callState === "connected") {
                          const val = callLanguage === "ur-PK" ? "ہیلو، کیا یہ پرائس کنٹرول پینل سے لنکڈ ہے؟" : "Hello, is this price linked to the control panel?";
                          setUserInput(val);
                          processConversationQuery(val);
                          setUserInput("");
                        }
                      }}
                      className="w-full text-left p-3.5 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all flex items-start gap-3.5 group cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-neon-cyan flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block">Panel customization Sync</span>
                        <span className="text-xs font-light text-gray-300 group-hover:text-white transition-colors">
                          {callLanguage === "ur-PK" ? "ہیلو، کیا یہ پرائس کنٹرول پینل سے لنکڈ ہے؟" : "Hello, is this price linked to the control panel?"}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 space-y-3 text-[11px] text-gray-500">
                  <p className="leading-relaxed font-light">
                    *M. Mehaal Khattak develops systems utilizing advanced natural-audio pipelines. Physical deployments maintain dedicated voice-channels and customized business CRM parameters.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Workflow Constructor Simulator (12 cols) */}
              <div className="lg:col-span-12 rounded-2xl border border-white/10 bg-[#020306]/85 p-6 sm:p-10 flex flex-col gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-neon-purple/2 rounded-full blur-3xl" />
                
                {/* Visual construction grid of nodes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                  
                  {/* Node 1: Incoming trigger */}
                  <div className={`p-6 rounded-xl border transition-all duration-300 ${
                    workflowStep >= 0 
                      ? "border-neon-cyan bg-neon-cyan/[0.01]" 
                      : "border-white/5 bg-white/[0.01]"
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-neon-cyan">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full uppercase bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan">
                        Trigger
                      </span>
                    </div>
                    <h4 className="text-base text-white font-medium font-sans">01 // Lead Capturing</h4>
                    <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                      SaaS portal form submission triggers instantly, formatting variable fields.
                    </p>
                  </div>

                  {/* Node 2: Database Storage Processing */}
                  <div className={`p-6 rounded-xl border transition-all duration-300 ${
                    workflowStep >= 2 
                      ? "border-neon-purple bg-neon-purple/[0.01]" 
                      : "border-white/5 bg-white/[0.01]"
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-neon-purple">
                        <Database className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full uppercase bg-neon-purple/10 border border-neon-purple/20 text-neon-purple">
                        Database Engine
                      </span>
                    </div>
                    <h4 className="text-base text-white font-medium font-sans">02 // GSheets Chaining</h4>
                    <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                      Intelligently matches client category, appends spreadsheet records, and maps variables.
                    </p>
                  </div>

                  {/* Node 3: Messaging Output Dispatch */}
                  <div className={`p-6 rounded-xl border transition-all duration-300 ${
                    workflowStep >= 3 
                      ? "border-emerald-500 bg-emerald-500/[0.01]" 
                      : "border-white/5 bg-white/[0.01]"
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-white/[0.02] border border-white/10 flex items-center justify-center text-emerald-400">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full uppercase bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                        Integration Output
                      </span>
                    </div>
                    <h4 className="text-base text-white font-medium font-sans">03 // WhatsApp Dispatch</h4>
                    <p className="text-xs text-gray-400 mt-2 font-light leading-relaxed">
                      Sends structured notifications to the admin and dispatches tailored welcome templates to leads.
                    </p>
                  </div>

                </div>

                {/* Simulated action interface */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                  
                  {/* Action launcher */}
                  <div className="md:w-1/3 flex flex-col justify-between p-6 rounded-xl border border-white/5 bg-white/[0.01]">
                    <div className="space-y-4">
                      <h4 className="text-sm font-mono text-white tracking-widest uppercase">
                        Select Integration Logic
                      </h4>
                      <p className="text-xs text-gray-400 font-light leading-relaxed">
                        Watch how automation links API triggers to clean actions in milliseconds.
                      </p>
                    </div>

                    <div className="space-y-3 mt-6">
                      <button
                        onClick={() => startWorkflowSimulation("lead")}
                        disabled={isRunningWorkflow}
                        className="w-full py-3 rounded-lg border border-neon-cyan/20 text-neon-cyan hover:bg-neon-cyan hover:text-black font-mono text-[11px] tracking-wider uppercase transition-all duration-350 cursor-pointer disabled:opacity-40"
                      >
                        Launch landing lead integration
                      </button>
                      
                      <button
                        onClick={() => startWorkflowSimulation("missed")}
                        disabled={isRunningWorkflow}
                        className="w-full py-3 rounded-lg border border-neon-purple/20 text-neon-purple hover:bg-neon-purple hover:text-white font-mono text-[11px] tracking-wider uppercase transition-all duration-350 cursor-pointer disabled:opacity-40"
                      >
                        Launch missed support callback
                      </button>
                    </div>
                  </div>

                  {/* Realtime debug and log visualizer console */}
                  <div className="flex-1 rounded-xl bg-black border border-white/5 p-5 font-mono text-xs flex flex-col justify-between min-h-[220px]">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-3">
                      <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">
                        Workspace Terminal Monitor
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[9px] text-gray-400 uppercase">Local Dev Node Connected</span>
                      </div>
                    </div>

                    <div className="flex-1 space-y-2 overflow-y-auto max-h-[140px] text-gray-400">
                      {workflowLogs.length === 0 ? (
                        <p className="text-gray-600 italic">Select an integration trigger on the left to review local telemetry flows...</p>
                      ) : (
                        workflowLogs.map((log, lIdx) => (
                          <div 
                            key={lIdx} 
                            className={`flex gap-2 items-center text-[11px] leading-relaxed ${
                              log.startsWith("✅") ? "text-emerald-400 font-bold" : "text-gray-300"
                            }`}
                          >
                            <ArrowRight className="w-3 h-3 text-neon-cyan" />
                            <span>{log}</span>
                          </div>
                        ))
                      )}
                    </div>

                    {isRunningWorkflow && (
                      <div className="flex items-center gap-1.5 text-neon-purple mt-3 border-t border-white/5 pt-2 text-[10px] uppercase">
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Calibrating dynamic triggers...</span>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </>
          )}

        </div>

      </div>
    </section>
  );
}

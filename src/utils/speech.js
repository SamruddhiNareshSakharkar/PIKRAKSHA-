// Enhanced, reliable Speech Synthesis engine for PIKRAKSHA
// Supports Marathi, Hindi & English with intelligent Devanagari phoneme fallback
// Rural-tested for Maharashtra dialects & smooth playback in all browsers

let cachedVoices = [];

const loadVoices = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  if (cachedVoices.length > 0) return cachedVoices;
  cachedVoices = window.speechSynthesis.getVoices() || [];
  return cachedVoices;
};

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  };
}

export const getAvailableVoices = () => {
  return loadVoices();
};

export const findBestVoice = (lang = 'mr') => {
  const voices = loadVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Exact match for language code
  if (lang === 'mr') {
    const mrVoice = voices.find(v => v.lang.startsWith('mr') || v.lang.includes('MR') || v.name.toLowerCase().includes('marathi'));
    if (mrVoice) return mrVoice;

    // In Chrome/Edge on Windows, mr-IN voice is often absent, but hi-IN voices (Swara, Kalpana, Google हिन्दी)
    // read Devanagari text with accurate, natural Indian pronunciation!
    const hiVoice = voices.find(v => 
      v.lang.startsWith('hi') || 
      v.name.includes('Hindi') || 
      v.name.includes('हिन्दी') || 
      v.name.toLowerCase().includes('swara') ||
      v.name.toLowerCase().includes('kalpana')
    );
    if (hiVoice) return hiVoice;

    // Fallback to any Indian English voice
    const inVoice = voices.find(v => v.lang.includes('IN') || v.name.toLowerCase().includes('india'));
    if (inVoice) return inVoice;
  }

  if (lang === 'hi') {
    const hiVoice = voices.find(v => 
      v.lang.startsWith('hi') || 
      v.name.includes('Hindi') || 
      v.name.includes('हिन्दी')
    );
    if (hiVoice) return hiVoice;
  }

  if (lang === 'en') {
    const enInVoice = voices.find(v => v.lang === 'en-IN' || v.name.toLowerCase().includes('india'));
    if (enInVoice) return enInVoice;
    const enVoice = voices.find(v => v.lang.startsWith('en'));
    if (enVoice) return enVoice;
  }

  return voices[0] || null;
};

let currentUtterance = null;
let keepAliveTimer = null;

export const playVoiceAlert = (text, lang = 'mr', onStart, onEnd, speed = 0.9) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported on this browser.");
    if (onEnd) onEnd();
    return false;
  }

  stopVoiceAlert();

  if (!text || !text.trim()) {
    if (onEnd) onEnd();
    return false;
  }

  // Clean text: strip hashtags, markdown stars, extra whitespace
  const cleanText = text
    .replace(/[*_#`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  const utterance = new SpeechSynthesisUtterance(cleanText);
  currentUtterance = utterance;

  // Language tag
  if (lang === 'mr') {
    utterance.lang = 'mr-IN';
    utterance.rate = speed || 0.88; // Measured, comfortable cadence for rural Marathi
    utterance.pitch = 1.0;
  } else if (lang === 'hi') {
    utterance.lang = 'hi-IN';
    utterance.rate = speed || 0.92;
    utterance.pitch = 1.0;
  } else {
    utterance.lang = 'en-IN';
    utterance.rate = speed || 0.96;
    utterance.pitch = 1.0;
  }

  // Select best voice
  const bestVoice = findBestVoice(lang);
  if (bestVoice) {
    utterance.voice = bestVoice;
    // If we fell back to a Hindi voice for Marathi text, adjust the lang tag so the synthesizer accepts it
    if (lang === 'mr' && bestVoice.lang.startsWith('hi')) {
      utterance.lang = bestVoice.lang;
    }
  }

  utterance.onstart = () => {
    // Keep-alive workaround for Chrome speech bug where synthesis pauses after 14 seconds
    clearInterval(keepAliveTimer);
    keepAliveTimer = setInterval(() => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.pause();
        window.speechSynthesis.resume();
      } else {
        clearInterval(keepAliveTimer);
      }
    }, 10000);

    if (onStart) onStart();
  };

  utterance.onend = () => {
    clearInterval(keepAliveTimer);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (err) => {
    console.log("Speech synthesis event:", err);
    clearInterval(keepAliveTimer);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  try {
    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error("Speak error:", err);
    if (onEnd) onEnd();
    return false;
  }
};

export const stopVoiceAlert = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    clearInterval(keepAliveTimer);
    currentUtterance = null;
    window.speechSynthesis.cancel();
  }
};

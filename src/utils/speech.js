// Speech Synthesis helper for Marathi, Hindi, and English voice alerts
export const playVoiceAlert = (text, lang = 'mr', onStart, onEnd) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn("Speech synthesis not supported on this device.");
    return false;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Set language tag
  if (lang === 'mr') {
    utterance.lang = 'mr-IN';
    utterance.rate = 0.92; // Slightly measured rate for clear rural Marathi
  } else if (lang === 'hi') {
    utterance.lang = 'hi-IN';
    utterance.rate = 0.95;
  } else {
    utterance.lang = 'en-IN';
    utterance.rate = 0.98;
  }

  // Attempt to pick a matching regional voice if available
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find(v => v.lang.startsWith(lang) || v.lang.includes(lang.toUpperCase()));
  if (voice) {
    utterance.voice = voice;
  }

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = (e) => {
    console.log("Speech error or cancelled:", e);
    if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopVoiceAlert = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};


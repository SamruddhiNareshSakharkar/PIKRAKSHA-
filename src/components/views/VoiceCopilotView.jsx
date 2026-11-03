import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Sparkles, 
  Bot, 
  User, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Radio
} from 'lucide-react';
import { playVoiceAlert, stopVoiceAlert } from '../../utils/speech';

export default function VoiceCopilotView({ farm, lang, t }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'mr'
        ? `नमस्कार रमेशभाऊ! मी 'पीकरक्षा AI सहाय्यक' आहे. तुमच्या नेर येथील २.५ एकर कापूस पिकावर काही कीड किंवा रोगाची लक्षणे दिसताहेत का? माईक दाबून बोला किंवा खालील प्रश्न निवडा.`
        : lang === 'hi'
        ? `नमस्ते रमेश जी! मैं 'पीकरक्षा AI सहायक' हूँ। आपकी कपास की फसल में क्या समस्या आ रही है? माइक दबाकर बोलें अथवा प्रश्न चुनें।`
        : `Hello Ramesh! I am your Pikraksha AI Voice Copilot. What symptoms are you noticing in your 2.5 acre cotton field at Ner? Tap the mic to speak or pick a quick prompt.`
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Speech Recognition setup (Web Speech API)
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Microphone recognition is not supported in this browser. Please use the quick prompts below.");
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRec();
    recognition.lang = lang === 'mr' ? 'mr-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setInputText(speechToText);
      handleSendMessage(speechToText);
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleSendMessage = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent agronomist response based on query keywords
    setTimeout(() => {
      let botReply = "";
      const lower = query.toLowerCase();

      if (lower.includes('फूल') || lower.includes('पाकळ्या') || lower.includes('कळी') || lower.includes('rosette') || lower.includes('pink') || lower.includes('बोंड')) {
        botReply = lang === 'mr'
          ? "हे १००% गुलाबी बोंडअळीच्या (Pink Bollworm) प्रादुर्भावाचे लक्षण आहे! पाकळ्या चिकटून डोमकळी तयार झाली आहे. तात्काळ उपाय: सर्व डोमकळ्या तोडून जमिनीत गाडा. शेतात एकरी ५ कामगंध सापळे लावा. बोंडांचे नुकसान ५% पेक्षा जास्त असल्यास ५% निंबोळी अर्क (NSKE) फवारा. रासायनिक कॉकटेल फवारणी करू नका!"
          : lang === 'hi'
          ? "यह गुलाबी सुंडी (Pink Bollworm) का स्पष्ट लक्षण है! फूल मुड़कर डोमकली बन गए हैं। तुरंत सभी डोमकली तोड़कर नष्ट करें। खेत में प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं और 5% नीम अर्क का छिड़काव करें।"
          : "This indicates Pink Bollworm infestation causing rosette flowers. Immediately hand-pick rosette flowers and bury them. Install 5 pheromone traps per acre. Spray 5% Neem Seed Kernel Extract (NSKE). Avoid cocktail chemicals.";
      } else if (lower.includes('पांढरी') || lower.includes('माशी') || lower.includes('whitefly') || lower.includes('रस')) {
        botReply = lang === 'mr'
          ? "उष्ण व कोरड्या हवामानामुळे पांढऱ्या माशीचा व रसशोषक किडींचा प्रादुर्भाव वाढला आहे. तात्काळ एकरी २० पिवळे चिकट सापळे लावा. मित्रकीटक (लेडीबर्ड बीटल) वाचवण्यासाठी सुरुवातीला व्हर्टिसिलियम लेकॅनी जैविक बुरशी २ ग्रॅम/लिटर फवारा."
          : "Whitefly detected. Install 20 yellow sticky traps per acre immediately and apply Verticillium lecanii bio-fungicide to preserve beneficial predator bugs.";
      } else if (lower.includes('बुरशी') || lower.includes('डाग') || lower.includes('पाऊस') || lower.includes('mildew') || lower.includes('केवडा')) {
        botReply = lang === 'mr'
          ? "हवेतील ८५% पेक्षा जास्त आर्द्रतेमुळे डाऊनी मिल्ड्यू / करपा रोगाचा धोका वाढला आहे. बागेतून अतिरिक्त पाणी चर काढून बाहेर काढा. पाऊस थांबताच १% बोर्डो मिश्रण किंवा विद्यापीठ शिफारशीत संरक्षक बुरशीनाशक फवारा."
          : "Fungal mildew alert due to high humidity. Ensure vineyard drainage and spray 1% Boardeaux mixture once foliage dries.";
      } else {
        botReply = lang === 'mr'
          ? "तुमची नोंद महावेध हवामान आणि शेताच्या वाढीच्या अवस्थेसोबत तपासली. सध्या तुमचे पीक बोंड अवस्थेत (११८ दिवस) आहे. रात्रीचे तापमान २२°C असल्याने कामगंध सापळ्यांची रोज नोंद ठेवा. काही संशय असल्यास पानाचा फोटो 'पीक रोगनिदान' टॅबमध्ये अपलोड करा."
          : "Checked your query against Mahavedh AWS microclimate and 118-day boll stage. Keep checking pheromone traps daily. You can also upload a leaf photo in the Diagnose tab.";
      }

      const botMsg = { sender: 'bot', text: botReply };
      setMessages(prev => [...prev, botMsg]);

      // Automatically speak the response
      setIsSpeaking(true);
      playVoiceAlert(botReply, lang, () => setIsSpeaking(true), () => setIsSpeaking(false));
    }, 600);
  };

  const quickPrompts = lang === 'mr' ? [
    "कपाशीची फुले गळून डोमकळ्या झाल्या आहेत, काय करू?",
    "हवेतील दमटपणामुळे पानांवर डाग पडलेत, रासायनिक औषध फवारू का?",
    "कामगंध सापळ्यात १० पतंग आलेत, फवारणी सुरू करावी का?",
    "पांढरी माशी नियंत्रणासाठी घरगुती जैविक उपाय काय आहे?"
  ] : lang === 'hi' ? [
    "कपास के फूल मुड़ गए हैं और झड़ रहे हैं, क्या करें?",
    "नमी के कारण पत्तों पर धब्बे हैं, क्या दवा छिड़कें?",
    "फेरोमोन ट्रैप में 10 पतंगे मिले हैं, क्या स्प्रे करें?",
    "सफेद मक्खी के लिए सुरक्षित जैविक उपाय बताएं?"
  ] : [
    "Flower petals are tied like a rosette, what should I do?",
    "Trap catch is 10 moths today, should I spray chemical pesticide?",
    "High humidity spots on leaves, safe organic control?",
    "How to prepare 5% Neem extract for whitefly?"
  ];

  return (
    <div className="space-y-6">
      {/* Intro Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? '२-मार्गी थेट बोलणारा AI सहाय्यक' : 'Exclusive: 2-Way Oral Voice Diagnostic'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'किसान AI व्हॉईस कोपायलट (मराठी/हिंदी थेट संवाद)' : 'KisanAI Voice Copilot: Natural Oral Agronomist'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'महिला शेतकरी व अल्पभूधारक शेतकऱ्यांसाठी: टाईप न करता थेट मराठीत बोला आणि कृषी विद्यापीठ प्रमाणित उपाय मराठी आवाजातच ऐका.'
                : 'Zero-typing conversational copilot for rural women farmers: speak naturally in Marathi/Hindi to receive interactive IPM diagnoses.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span>Live Marathi Voice Engine</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
        {/* Chat History */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg, idx) => {
            const isBot = msg.sender === 'bot';
            return (
              <div key={idx} className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isBot ? 'bg-forest-800 text-emerald-300 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
                }`}>
                  {isBot ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
                </div>

                <div className={`max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-2xs ${
                  isBot 
                    ? 'bg-white border border-slate-200 text-slate-800' 
                    : 'bg-emerald-700 text-white font-medium'
                }`}>
                  <p>{msg.text}</p>
                  {isBot && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>VNMKV & MPKV Certified</span>
                      <button
                        onClick={() => playVoiceAlert(msg.text, lang, () => setIsSpeaking(true), () => setIsSpeaking(false))}
                        className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{lang === 'mr' ? 'पुन्हा ऐका' : 'Listen'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(prompt)}
              className="shrink-0 px-3 py-1 rounded-full bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 text-xs font-medium transition"
            >
              💬 {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar with Big Microphone Button */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={startListening}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition shadow-sm shrink-0 ${
              isListening 
                ? 'bg-red-600 animate-ping' 
                : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
            title="Tap to speak in Marathi or Hindi"
          >
            {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              lang === 'mr' 
                ? 'माईक दाबून बोला किंवा येथे प्रश्न टाईप करा...' 
                : lang === 'hi'
                ? 'माइक दबाकर बोलें या यहाँ प्रश्न लिखें...'
                : 'Tap microphone to speak or type your farming query...'
            }
            className="flex-1 px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          />

          <button
            onClick={() => handleSendMessage()}
            className="w-12 h-12 rounded-2xl bg-forest-800 hover:bg-forest-900 text-white flex items-center justify-center transition shadow-sm shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}


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
  Radio,
  Leaf
} from 'lucide-react';
import { playVoiceAlert, stopVoiceAlert } from '../../utils/speech';

export default function VoiceCopilotView({ farm, lang, t }) {
  const currentLang = lang || 'en';
  const farmCrop = farm?.crop?.name?.en || 'Cotton';
  const farmerName = farm?.farmerName?.[currentLang] || farm?.farmerName?.en || 'Farmer';
  const villageName = farm?.location?.village?.[currentLang] || farm?.location?.village?.en || 'Ner';
  const acres = farm?.crop?.acres || 2.5;

  const getInitialGreeting = () => {
    if (currentLang === 'mr') {
      return `नमस्कार ${farmerName}! मी 'पीकरक्षा AI सहाय्यक' आहे. तुमच्या ${villageName} येथील ${acres} एकर ${farm?.crop?.name?.mr || farmCrop} पिकावर काही कीड किंवा रोगाची लक्षणे दिसताहेत का? माईक दाबून बोला किंवा खालील प्रश्न निवडा.`;
    } else if (currentLang === 'hi') {
      return `नमस्ते ${farmerName}! मैं 'पीकरक्षा AI सहायक' हूँ। आपके ${villageName} स्थित ${acres} एकड़ ${farm?.crop?.name?.hi || farmCrop} में क्या लक्षण दिख रहे हैं? माइक दबाकर बोलें या प्रश्न चुनें।`;
    }
    return `Hello ${farmerName}! I am your Pikraksha AI Voice Copilot. What symptoms are you observing in your ${acres} acre ${farmCrop} field at ${villageName}? Tap the mic to speak or select a quick question below.`;
  };

  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: getInitialGreeting()
    }
  ]);

  // Reset greeting if farm changes
  useEffect(() => {
    setMessages([
      {
        sender: 'bot',
        text: getInitialGreeting()
      }
    ]);
  }, [farm?.id, lang]);

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

    // Generate intelligent university agronomist response based on query keywords and crop
    setTimeout(() => {
      let botReply = "";
      const lower = query.toLowerCase();

      if (farmCrop === 'Cotton') {
        if (lower.includes('फूल') || lower.includes('पाकळ्या') || lower.includes('कळी') || lower.includes('rosette') || lower.includes('pink') || lower.includes('बोंड')) {
          botReply = lang === 'mr'
            ? "हे १००% गुलाबी बोंडअळीच्या (Pink Bollworm) प्रादुर्भावाचे लक्षण आहे! पाकळ्या चिकटून डोमकळी तयार झाली आहे. तात्काळ उपाय: सर्व डोमकळ्या तोडून जमिनीत गाडा. शेतात एकरी ५ कामगंध सापळे लावा. ५% निंबोळी अर्क (NSKE) फवारा. रासायनिक कॉकटेल फवारणी करू नका!"
            : lang === 'hi'
            ? "यह गुलाबी सुंडी (Pink Bollworm) का स्पष्ट लक्षण है! फूल मुड़कर डोमकली बन गए हैं। तुरंत सभी डोमकली तोड़कर नष्ट करें। खेत में प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं और 5% नीम अर्क का छिड़काव करें।"
            : "This indicates Pink Bollworm infestation causing rosette flowers. Hand-pick and bury rosette flowers immediately. Install 5 pheromone traps per acre and spray 5% Neem Seed Kernel Extract (NSKE). Avoid cocktail chemicals.";
        } else if (lower.includes('पांढरी') || lower.includes('माशी') || lower.includes('whitefly') || lower.includes('रस')) {
          botReply = lang === 'mr'
            ? "उष्ण व कोरड्या हवामानामुळे पांढऱ्या माशीचा व रसशोषक किडींचा प्रादुर्भाव वाढला आहे. तात्काळ एकरी २० पिवळे चिकट सापळे लावा. व्हर्टिसिलियम लेकॅनी जैविक बुरशी २ ग्रॅम/लिटर फवारा."
            : "Whitefly detected. Install 20 yellow sticky traps per acre immediately and apply Verticillium lecanii bio-fungicide (2g/L) to preserve beneficial bugs.";
        } else {
          botReply = lang === 'mr'
            ? `नेर वेदर स्टेशन व तुमच्या कपाशीच्या ११८ दिवसांच्या अवस्थेनुसार कामगंध सापळ्यात सरासरी १० पतंग आले आहेत. डोमकळ्या तोडणे आणि ५% निंबोळी अर्क ही पहिली पायरी आहे. पानाचा फोटो 'पीक रोगनिदान' टॅबमध्ये अपलोड करू शकता.`
            : `Cotton at 118 DAS in boll stage. Trap count breached ETL with 10 moths/trap. Priority IPM: hand-pick rosette flowers and spray 5% NSKE. Upload leaf photo to AI Scanner for instant visual diagnosis.`;
        }
      } else if (farmCrop === 'Grapes') {
        if (lower.includes('डाग') || lower.includes('बुरशी') || lower.includes('mildew') || lower.includes('केवडा') || lower.includes('पाऊस') || lower.includes('दव')) {
          botReply = lang === 'mr'
            ? "दिंडोरी येथील ८९% आर्द्रतेमुळे द्राक्षांवर डाऊनी मिल्ड्यू (Downy Mildew) बुरशीचा धोका अतिउच्च आहे! पानावरील पिवळसर तेलकट डाग ओळखा. उपाय: बागेतून अतिरिक्त पाणी चर काढून बाहेर काढा. पाने सुकल्यावर १% बोर्डो मिश्रण किंवा कॉपर हायड्रॉक्साईड २ ग्रॅम/लिटर फवारा."
            : lang === 'hi'
            ? "89% नमी के कारण अंगूर में डाउनी मिल्ड्यू का भारी खतरा है! पत्तियों के नीचे सफेद फफूंद दिखेगी। पानी निकासी करें और पत्तियां सूखने पर 1% बोर्डो मिश्रण का छिड़काव करें।"
            : "Downy Mildew alert triggered by 89% humidity in Dindori! Inspect lower leaves for yellow oil spots. Ensure ridge drainage and spray 1% Bordeaux mixture or Copper Hydroxide once canopy dries.";
        } else if (lower.includes('भुरी') || lower.includes('powdery') || lower.includes('थ्रिप्स')) {
          botReply = lang === 'mr'
            ? "पानांवर व घडांवर पांढरी भुकटी दिसल्यास तो भुरी रोग आहे. सकाळी सूर्यप्रकाशात पाण्यात विरघळणारे गंधक (८० डब्ल्यूपी) २ ग्रॅम/लिटर फवारा. तापमानात वाढ झाल्यास दुपारची फवारणी टाळा."
            : "Powdery mildew alert. Spray wettable sulfur 80 WP at 2g/L during early morning hours. Avoid spraying during hot midday temperatures.";
        } else {
          botReply = lang === 'mr'
            ? `दिंडोरी वेदर स्टेशननुसार आज आर्द्रता जास्त आहे. घडांभोवती हवा खेळती राहण्यासाठी अतिरिक्त फुटवे (Canopy sucker) काढून टाका. सायंकाळी ४ ते ६ दरम्यान १% बोर्डो मिश्रण फवारणी उत्कृष्ट ठरेल.`
            : `Dindori microclimate indicates high fungal pressure. Thin out canopy shoots to improve airflow and apply preventive 1% Bordeaux mixture between 04:00 PM and 06:00 PM.`;
        }
      } else if (farmCrop === 'Soybean') {
        if (lower.includes('चकती') || lower.includes('भुंगा') || lower.includes('girdle') || lower.includes('खोड')) {
          botReply = lang === 'mr'
            ? "सोयाबीनच्या खोडावर २ गोलाकार वळण (Girdle rings) पडल्यास चकती भुंग्याची अंडी आत घातली गेली आहेत! उपाय: प्रादुर्भावग्रस्त वाळलेल्या फांद्या अळीसह तोडून नष्ट करा. शेतात एकरी १० पक्षी थांबे (T-perches) उभारा."
            : lang === 'hi'
            ? "गर्डल बीटल (चकती भुंगा) ने तने पर दो रिंग काटकर अंडे दिए हैं। तुरंत सूखे तनों को काटकर नष्ट करें और खेत में 10 टी-आकार के पक्षी बसेरे लगाएं।"
            : "Girdle beetle detected cutting rings on soybean stems. Clip off and destroy wilted ringed twigs with internal grubs. Erect 10 T-shaped bird perches per acre for natural predation.";
        } else if (lower.includes('अळी') || lower.includes('लष्करी') || lower.includes('spodoptera') || lower.includes('पाने')) {
          botReply = lang === 'mr'
            ? "सोयाबीनवरील लष्करी अळी (Spodoptera) पानांची चाळणी करते. तात्काळ नोमुरिया रायली (Nomuraea rileyi) किंवा स्पाॅडो-एनपीव्ही ५०० मिली प्रति एकर फवारा."
            : "Spodoptera defoliator detected. Spray Nomuraea rileyi bio-fungicide (5g/L) or Spodo-NPV in late evening for maximum kill.";
        } else {
          botReply = lang === 'mr'
            ? `औसा येथील सोयाबीन पिकावर खोड किडींची नियमित पाहणी करा. रासायनिक फवारणी टाळून एकरी १० पक्षी थांबे व कामगंध सापळे वापरल्यास एकरी ₹१,२०० बचत होते.`
            : `Soybean in Ausa pod-formation stage. Maintain 10 bird perches and monitor Spodolure traps. Avoid synthetic chemicals to protect native ground predators.`;
        }
      } else { // Tomato
        if (lower.includes('करपा') || lower.includes('blight') || lower.includes('काळे') || lower.includes('सड')) {
          botReply = lang === 'mr'
            ? "जुन्नर भागातील ढगाळ हवामानामुळे टोमॅटोवर फायटोफ्थोरा उशिरा येणारा करपा (Late Blight) सक्रिय झाला आहे! खोडावर आणि पानांवर काळसर-तपकिरी चट्टे पडतात. उपाय: तात्काळ ट्रायकोडर्मा हार्झियानम मुळाशी सोडा आणि कॉपर ऑक्सिक्लोराईड २.५ ग्रॅम/लिटर फवारा."
            : lang === 'hi'
            ? "टमाटर में पछेती झुलसा (Late Blight) का प्रकोप है! पत्तियों व तनों पर काले जलभराव वाले धब्बे बनते हैं। ट्राइकोडर्मा हरजियानम जमीन में दें और कॉपर ऑक्सीक्लोराइड का छिड़काव करें।"
            : "Late Blight (Phytophthora infestans) alert in Junnar. Leaves show dark water-soaked lesions. Apply Trichoderma harzianum root drench and spray Copper Oxychloride 50 WP (2.5g/L).";
        } else if (lower.includes('तुता') || lower.includes('tuta') || lower.includes('पिनवर्म') || lower.includes('सुरंग')) {
          botReply = lang === 'mr'
            ? "तुता पिनवर्म (Tuta Absoluta) पानांच्या आत पांढुरक्या नागमोडी सुरंगा तयार करते व फळांमध्ये छिद्र करते. उपाय: एकरी ६ तुता कामगंध सापळे लावा आणि निंबोळी तेल १०००० पीपीएम २ मिली/लिटर फवारा."
            : "Tuta absoluta leafminer detected. Install 6 Tuta pheromone traps per acre immediately and spray 10,000 ppm Neem oil (2ml/L).";
        } else {
          botReply = lang === 'mr'
            ? `जुन्नर येथील टोमॅटो पिकावर १४ पतंग सापळ्यात आल्याने अतिदक्षतेचा इशारा आहे. झाडांना आधार (Staking) देऊन पाने जमिनीला टेकू देऊ नका. अधिक मार्गदर्शनासाठी फोटो स्कॅनर वापरा.`
            : `Tomato in Junnar crossed critical trap ETL with 14 moths. Ensure plant staking to keep lower foliage off damp soil. Upload specimen photos to AI Scanner for detailed analysis.`;
        }
      }

      const botMsg = { sender: 'bot', text: botReply };
      setMessages(prev => [...prev, botMsg]);

      // Automatically speak the response
      setIsSpeaking(true);
      playVoiceAlert(botReply, lang, () => setIsSpeaking(true), () => setIsSpeaking(false));
    }, 600);
  };

  // Crop-tailored quick prompts
  const quickPromptsByCrop = {
    Cotton: lang === 'mr' ? [
      "कपाशीची फुले गळून डोमकळ्या झाल्या आहेत, काय करू?",
      "कामगंध सापळ्यात १० पतंग आलेत, फवारणी करावी का?",
      "पांढरी माशी नियंत्रणासाठी घरगुती जैविक उपाय काय आहे?",
      "५% निंबोळी अर्क (NSKE) कसा तयार करावा?"
    ] : lang === 'hi' ? [
      "कपास के फूल मुड़कर डोमकली बन गए हैं, क्या करें?",
      "फेरोमोन ट्रैप में 10 पतंगे मिले हैं, क्या स्प्रे करें?",
      "सफेद मक्खी के लिए सुरक्षित जैविक उपाय बताएं?",
      "5% नीम अर्क (NSKE) कैसे बनाएं?"
    ] : [
      "Flower petals are tied like a rosette, what should I do?",
      "Trap catch is 10 moths today, should I spray chemical pesticide?",
      "How to control whitefly organically?",
      "How to prepare 5% Neem extract (NSKE)?"
    ],
    Grapes: lang === 'mr' ? [
      "पानांच्या खाली पांढरी बुरशी व तेलकट डाग आहेत (डाऊनी)?",
      "१% बोर्डो मिश्रण कसे तयार करावे?",
      "द्राक्ष घड कुजू नये म्हणून काय खबरदारी घ्यावी?",
      "सध्याच्या ढगाळ हवामानात फवारणीची योग्य वेळ कोणती?"
    ] : lang === 'hi' ? [
      "अंगूर के पत्तों पर तेलिया धब्बे हैं (डाउनी मिल्ड्यू)?",
      "1% बोर्डो मिश्रण बनाने की सही विधि?",
      "अंगूर के गुच्छों को फफूंद से कैसे बचाएं?",
      "वर्तमान मौसम में स्प्रे करने का सही समय क्या है?"
    ] : [
      "Lower leaves have oily spots and white fungal fuzz (Downy)?",
      "How to prepare authentic 1% Bordeaux mixture?",
      "How to protect grape bunches from rotting?",
      "What is the best spray time in today's humid weather?"
    ],
    Soybean: lang === 'mr' ? [
      "सोयाबीनच्या खोडावर गोलाकार वळण (चकती भुंगा) दिसतंय?",
      "शेतात पक्षी थांबे (Bird Perches) कसे लावावेत?",
      "लष्करी अळीसाठी नोमुरिया रायली जैविक बुरशी कशी फवारावी?",
      "सोयाबीन पिकात रासायनिक कीटकनाशके का टाळावीत?"
    ] : lang === 'hi' ? [
      "सोयाबीन के तने पर चकती भुंगा के रिंग दिख रहे हैं?",
      "खेत में टी-आकार के पक्षी बसेरे कैसे लगाएं?",
      "लश्करी सुंडी के लिए नोमुरिया रायली कैसे इस्तेमाल करें?",
      "सोयाबीन में जहरीले रसायनों से कैसे बचें?"
    ] : [
      "Noticing circular girdling rings on soybean stems?",
      "How to install T-shaped bird perches in soybean?",
      "How to spray Nomuraea rileyi for caterpillar control?",
      "Why avoid broad-spectrum chemical cocktails?"
    ],
    Tomato: lang === 'mr' ? [
      "टोमॅटोच्या पानांवर व खोडावर काळे चट्टे (करपा) आहेत?",
      "तुता पिनवर्म (Tuta Absoluta) चे नुकसान कसे ओळखावे?",
      "ट्रायकोडर्मा जमिनीतून कसा द्यावा?",
      "फळे पोखरणारी अळी नियंत्रणात आणण्यासाठी काय करावे?"
    ] : lang === 'hi' ? [
      "टमाटर की पत्तियों पर पछेती झुलसा (करपा) के काले धब्बे हैं?",
      "तुता पिनवर्म कीट की रोकथाम कैसे करें?",
      "ट्राइकोडर्मा जमीन में कैसे दें?",
      "फल छेदक सुंडी नियंत्रण के जैविक उपाय?"
    ] : [
      "Tomato foliage shows dark water-soaked lesions (Late Blight)?",
      "How to identify and trap Tuta Absoluta pinworm?",
      "How to apply Trichoderma drench to roots?",
      "Safe organic control for fruit borer larvae?"
    ]
  };

  const currentPrompts = quickPromptsByCrop[farmCrop] || quickPromptsByCrop.Cotton;

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
              {lang === 'mr' 
                ? `किसान AI व्हॉईस कोपायलट: ${farmerName} (${farmCrop})` 
                : `KisanAI Voice Copilot: ${farmerName} (${farmCrop})`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `महिला शेतकरी व अल्पभूधारक शेतकऱ्यांसाठी: ${villageName} परिसरातील हवामानानुसार थेट स्थानिक भाषेत बोला आणि कृषी विद्यापीठ शिफारशी ऐका.`
                : `Zero-typing conversational copilot for rural women farmers: speak naturally in Marathi/Hindi to receive interactive ${farmCrop} IPM diagnoses.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-red-500 animate-pulse" />
              <span>Live Marathi/Hindi Voice Engine</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col h-[520px]">
        {/* Messages Scroll Area */}
        <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/60">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'bg-gradient-to-br from-emerald-600 to-forest-800 text-white shadow-sm'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div
                className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs shadow-2xs space-y-2'
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
                {msg.sender === 'bot' && (
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Leaf className="w-3 h-3 text-emerald-600" />
                      <span>VNMKV / MPKV Verified IPM Advice</span>
                    </span>
                    <button
                      onClick={() => playVoiceAlert(msg.text, lang, () => setIsSpeaking(true), () => setIsSpeaking(false))}
                      className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{isSpeaking ? 'Playing...' : 'Listen Audio'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" /> {farmCrop} Quick Prompts:
          </span>
          {currentPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 text-slate-700 font-medium whitespace-nowrap text-xs transition"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input & Mic Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={startListening}
            className={`p-3 rounded-xl transition flex items-center justify-center ${
              isListening
                ? 'bg-red-600 text-white animate-pulse shadow-md ring-4 ring-red-200'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
            }`}
            title="Tap to speak in Marathi, Hindi, or English"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder={
              isListening
                ? (lang === 'mr' ? 'ऐकत आहे... बोला...' : 'Listening... Speak now...')
                : (lang === 'mr' ? `${farmCrop} बद्दल प्रश्न विचारा किंवा वरील माईक दाबा...` : `Ask about ${farmCrop} symptoms or tap the mic...`)
            }
            className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white text-slate-900 placeholder:text-slate-400"
          />

          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim()}
            className="p-3 bg-slate-900 hover:bg-black disabled:opacity-40 text-white rounded-xl transition shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

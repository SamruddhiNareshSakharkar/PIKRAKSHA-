import React, { useState } from 'react';
import { 
  Bell, 
  MessageSquare, 
  PhoneCall, 
  Volume2, 
  Share2, 
  Send, 
  CheckCheck, 
  Smartphone, 
  Sparkles,
  Users,
  ShieldCheck
} from 'lucide-react';

export default function AlertsView({ farm, lang, t, onPlayAudio, isPlayingAudio }) {
  const [activeChannel, setActiveChannel] = useState('whatsapp'); // 'whatsapp' | 'sms' | 'voice'
  const [mobileNumber, setMobileNumber] = useState('');
  const [dispatchStatus, setDispatchStatus] = useState(null);

  const currentLang = lang || 'en';

  const handleSendTestAlert = (e) => {
    e.preventDefault();
    if (mobileNumber.length >= 10) {
      setDispatchStatus('sent');
      setTimeout(() => setDispatchStatus(null), 4000);
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*PIKRAKSHA (पीकरक्षा) पूर्वसूचना*\n` +
      `गाव: ${farm.location.village[currentLang]}, ${farm.location.district[currentLang]}\n` +
      `पीक: ${farm.crop.name[currentLang]}\n` +
      `धोका: *${farm.primaryAlert.pestName[currentLang]}*\n` +
      `अंदाज: ${farm.primaryAlert.peakText[currentLang]}\n\n` +
      `तात्काळ उपाय:\n1. ${farm.ipmSteps[0][currentLang]}\n2. ${farm.ipmSteps[1][currentLang]}\n\n` +
      `महाराष्ट्र शासन व कृषी विद्यापीठ मार्गदर्शक तत्त्वे.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Bell className="w-3.5 h-3.5 text-emerald-700" />
          {lang === 'mr' ? 'बहुभाषिक संदेश व ऑडिओ कॉल प्रणाली' : 'Multilingual Outreach Channels'}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {lang === 'mr' ? 'मराठी व हिंदी भाषेत SMS, व्हॉट्सॲप आणि व्हॉईस अलर्ट्स' : 'Marathi & Hindi Alerts via SMS, WhatsApp & Automated Voice'}
        </h2>
        <p className="text-sm text-slate-600">
          {lang === 'mr'
            ? 'विशेषतः महिला शेतकरी व अल्पभूधारक शेतकऱ्यांसाठी ऑडिओ संदेश जेणेकरून वाचता येत नसले तरी वेळेत ऐकून उपाय करता येतो.'
            : 'Slide 5 Social Impact: Automated voice calls bridge literacy barriers for rural women farmers and smallholders.'}
        </p>
      </div>

      {/* Main Grid: Mobile Phone Simulator + Dispatch Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (5 cols): Smartphone Mockup */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full max-w-sm rounded-[36px] bg-slate-900 p-3 shadow-2xl border-4 border-slate-800">
            {/* Phone Notch & Speaker */}
            <div className="h-4 flex items-center justify-center gap-2 mb-2">
              <div className="w-12 h-1 bg-slate-700 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-slate-800 rounded-full"></div>
            </div>

            {/* Phone Screen Container */}
            <div className="bg-[#f0f2f5] rounded-[28px] overflow-hidden min-h-[520px] flex flex-col justify-between border border-slate-300">
              {/* Channel Selector Header */}
              <div className="bg-[#075e54] text-white p-3 flex items-center justify-between shadow">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-bold">PIKRAKSHA Alert</span>
                </div>
                {/* Switch between WhatsApp / SMS / Voice */}
                <div className="flex gap-1">
                  <button
                    onClick={() => setActiveChannel('whatsapp')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      activeChannel === 'whatsapp' ? 'bg-white text-[#075e54]' : 'text-emerald-100 hover:bg-emerald-800'
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setActiveChannel('sms')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      activeChannel === 'sms' ? 'bg-white text-[#075e54]' : 'text-emerald-100 hover:bg-emerald-800'
                    }`}
                  >
                    SMS
                  </button>
                  <button
                    onClick={() => setActiveChannel('voice')}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      activeChannel === 'voice' ? 'bg-white text-[#075e54]' : 'text-emerald-100 hover:bg-emerald-800'
                    }`}
                  >
                    Voice 📞
                  </button>
                </div>
              </div>

              {/* Channel Body Content */}
              <div className="p-4 flex-1 overflow-y-auto">
                {/* 1. WHATSAPP VIEW */}
                {activeChannel === 'whatsapp' && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <span className="text-[10px] bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                        Today • Mahavedh & CROPSAP
                      </span>
                    </div>

                    <div className="bg-white rounded-2xl p-3.5 shadow-xs text-xs text-slate-800 space-y-2 border-l-4 border-emerald-500">
                      <div className="font-extrabold text-red-700 flex items-center gap-1">
                        <span>🚨</span>
                        <span>{farm.primaryAlert.pestName[currentLang] || farm.primaryAlert.pestName.en}</span>
                      </div>

                      <p className="font-medium text-slate-700 text-[11px] leading-relaxed">
                        {farm.primaryAlert.peakText[currentLang] || farm.primaryAlert.peakText.en}
                      </p>

                      <div className="bg-slate-50 p-2 rounded-lg text-[10px] text-slate-600 space-y-1">
                        <p><strong>{lang === 'mr' ? 'स्थान:' : 'Location:'}</strong> {farm.location.village[currentLang]}, {farm.location.district[currentLang]}</p>
                        <p><strong>{lang === 'mr' ? 'कामगंध सापळा:' : 'Trap Count:'}</strong> {farm.trapData.currentCount} moths/day ({t.thresholdCrossed})</p>
                      </div>

                      <div className="text-[11px] font-bold text-slate-800 pt-1">
                        {lang === 'mr' ? 'तात्काळ उपाययोजना:' : 'Urgent Safe Action:'}
                      </div>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        1. {farm.ipmSteps[0][currentLang] || farm.ipmSteps[0].en}
                      </p>
                      <p className="text-[11px] text-slate-600 leading-normal">
                        2. {farm.ipmSteps[1][currentLang] || farm.ipmSteps[1].en}
                      </p>

                      {/* Interactive Voice Note Player in WhatsApp */}
                      <div className="mt-2 p-2 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                        <button
                          onClick={() => onPlayAudio(farm.primaryAlert.audioText[currentLang] || farm.primaryAlert.audioText.en)}
                          className="flex items-center gap-2 text-xs font-bold text-emerald-900 hover:text-emerald-950"
                        >
                          <Volume2 className="w-4 h-4 text-emerald-700" />
                          <span>{isPlayingAudio ? (lang === 'mr' ? 'थांबवा' : 'Pause') : (lang === 'mr' ? 'ऑडिओ ऐका (Voice Note)' : 'Play Voice Note')}</span>
                        </button>
                        <span className="text-[10px] text-emerald-700 font-mono">0:24</span>
                      </div>

                      <div className="flex justify-end items-center gap-1 text-[9px] text-slate-400 pt-1">
                        <span>10:45 AM</span>
                        <CheckCheck className="w-3 h-3 text-sky-500" />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. SMS VIEW */}
                {activeChannel === 'sms' && (
                  <div className="space-y-3">
                    <div className="text-center text-[10px] text-slate-500">
                      SENDER: MH-KRISHI (Govt of Maharashtra)
                    </div>
                    <div className="bg-white rounded-2xl p-4 shadow-xs text-xs text-slate-800 space-y-2 border border-slate-200">
                      <p className="leading-relaxed font-sans text-[11px]">
                        {farm.primaryAlert.audioText[currentLang] || farm.primaryAlert.audioText.en}
                      </p>
                      <div className="flex justify-end text-[9px] text-slate-400">
                        <span>10:45 AM • Delivered via SMS Gateway</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. VOICE CALL SIMULATION */}
                {activeChannel === 'voice' && (
                  <div className="space-y-4 text-center pt-8">
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-lg animate-bounce">
                      <PhoneCall className="w-10 h-10" />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-slate-900">PIKRAKSHA Voice Call</h4>
                      <p className="text-xs text-slate-500">+91 1800-180-1551 (Toll-Free)</p>
                      <p className="text-xs text-emerald-600 font-bold mt-1">
                        {isPlayingAudio ? '● In Call (Speaking Marathi/Hindi...)' : 'Tap to start automated voice call'}
                      </p>
                    </div>

                    <button
                      onClick={() => onPlayAudio(farm.primaryAlert.audioText[currentLang] || farm.primaryAlert.audioText.en)}
                      className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
                    >
                      {isPlayingAudio ? 'End Call' : '📞 Answer Call & Listen Advisory'}
                    </button>
                  </div>
                )}
              </div>

              {/* Phone Footer Action */}
              <div className="p-3 bg-white border-t border-slate-200 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Free for farmers (₹0 Cost)</span>
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-800"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Send Test Alert & Impact Info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dispatch Sandbox Form */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <h3 className="font-bold text-slate-900 text-base">
              {lang === 'mr' ? 'मोबाईलवर चाचणी अलर्ट पाठवून पाहा' : 'Test Alert Delivery Sandbox'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {lang === 'mr'
                ? 'खाली आपला १० अंकी मोबाईल नंबर टाका आणि प्रणालीद्वारे प्रत्यक्ष संदेश कसा पाठवला जातो ते तपासा:'
                : 'Enter a 10-digit mobile number to simulate direct gateway delivery to field farmers:'}
            </p>

            <form onSubmit={handleSendTestAlert} className="space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-11 pr-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs flex items-center gap-1.5 transition shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{lang === 'mr' ? 'अलर्ट पाठवा' : 'Send Test Alert'}</span>
                </button>
              </div>
            </form>

            {dispatchStatus === 'sent' && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCheck className="w-4 h-4 text-emerald-700" />
                <span>
                  {lang === 'mr' 
                    ? `यशस्वी! +91 ${mobileNumber} वर मराठी संदेश व ऑडिओ कॉल तयार करण्यात आला.`
                    : `Dispatched successfully! Multi-channel alert generated for +91 ${mobileNumber}.`}
                </span>
              </div>
            )}
          </div>

          {/* Social Impact: Women Farmers & Literacy (Slide 5) */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 shadow-2xs space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-base">
              <Users className="w-5 h-5 text-emerald-700" />
              <span>{lang === 'mr' ? 'महिला शेतकरी सक्षमीकरण व सामाजिक प्रभाव (Slide 5)' : 'Women Farmers & Social Impact (Slide 5)'}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              {lang === 'mr'
                ? 'महाराष्ट्रातील अनेक ग्रामीण महिला शेतकरी मजकूर वाचू शकत नसल्याने केवळ ऑडिओ कॉलद्वारे त्यांना त्यांच्या स्थानिक भाषेत (मराठी/हिंदी) थेट शेतात उपाययोजना ऐकता येतात. यामुळे पिकांचे नुकसान टळून कुटुंबाचे उत्पन्न सुरक्षित राहते.'
                : 'Protects smallholder farmers\' income. Automated regional voice calls reach farmers who cannot read text SMS, including thousands of women farmers across Vidarbha and Marathwada. Safe IPM thresholds stop expensive unnecessary chemical sprays.'}
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <div className="text-xl font-extrabold text-emerald-700">₹0</div>
                <div className="text-[10px] text-slate-500 font-medium">Cost to Farmer</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-emerald-200">
                <div className="text-xl font-extrabold text-emerald-700">2–7 Days</div>
                <div className="text-[10px] text-slate-500 font-medium">Early Warning Window</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';
import { X, Volume2, Play, Square, RotateCcw, Sparkles, PhoneCall, Radio, CheckCircle2 } from 'lucide-react';
import { playVoiceAlert, stopVoiceAlert, findBestVoice } from '../../utils/speech';

export default function VoiceBulletinModal({ 
  isOpen, 
  onClose, 
  farm, 
  lang = 'mr' 
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0.88); // rural comfortable default
  const [selectedVoiceName, setSelectedVoiceName] = useState('');

  if (!isOpen || !farm) return null;

  const currentLang = lang || 'mr';

  const defaultMarathiBulletin = `नमस्कार शेतकरी बंधूंनो, पीकरक्षा कृषी पूर्वसूचना प्रणालीत आपले स्वागत आहे. ${farm.location?.district?.mr || 'यवतमाळ'} जिल्ह्यातील आपल्या कापूस पिकासाठी हा महत्त्वाचा इशारा आहे. आपल्या शेतातील कामगंध सापळ्यात सलग ३ दिवस ८ पेक्षा जास्त बोंडअळीचे पतंग आढळले आहेत. त्यामुळे आर्थिक नुकसान पातळी ओलांडली गेली आहे. आजच शेतातील २० हिरवी बोंडे फोडून आतील अळीची पाहणी करा आणि सर्व डोमकळ्या हाताने तोडून नष्ट करा. विद्यापीठाच्या शिफारशीनुसार निंबोळी अर्क ५ टक्के फवारणी करावी. धन्यवाद.`;

  const defaultHindiBulletin = `नमस्कार किसान भाइयों, पीकरक्षा कृषि पूर्व चेतावनी प्रणाली में आपका स्वागत है। ${farm.location?.district?.hi || 'यवतमाल'} जिले में आपकी कपास फसल के लिए जरूरी सूचना। आपके फेरोमोन ट्रैप में लगातार ३ दिन तक ८ से अधिक पतंगे दर्ज हुए हैं। आर्थिक नुकसान सीमा पार हो चुकी है। आज ही खेत में २० डोडों की जांच करें और मुड़े हुए फूल नष्ट करें। धन्यवाद।`;

  const defaultEnglishBulletin = `Welcome to Pikraksha Early Warning Bulletin. Critical advisory for your cotton crop in ${farm.location?.district?.en || 'Yavatmal'}. Pheromone trap threshold exceeded: 8 or more pink bollworm moths recorded for 3 consecutive days. Inspect 20 bolls immediately and destroy rosette flowers. Apply 5% NSKE neem extract as advised by VNMKV University.`;

  const bulletinText = currentLang === 'mr' 
    ? (farm.primaryAlert?.audioText?.mr || defaultMarathiBulletin)
    : currentLang === 'hi'
    ? (farm.primaryAlert?.audioText?.hi || defaultHindiBulletin)
    : (farm.primaryAlert?.audioText?.en || defaultEnglishBulletin);

  const handleStartPlay = () => {
    setIsPlaying(true);
    playVoiceAlert(
      bulletinText, 
      currentLang, 
      () => setIsPlaying(true), 
      () => setIsPlaying(false),
      speed
    );
  };

  const handleStop = () => {
    stopVoiceAlert();
    setIsPlaying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-forest-900 to-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-[10px] font-extrabold uppercase">
                {currentLang === 'mr' ? 'मराठी ध्वनी बुलेटिन' : currentLang === 'hi' ? 'हिंदी वॉयस बुलेटिन' : 'Audio Bulletin'}
              </div>
              <h3 className="font-black text-base mt-0.5">
                {currentLang === 'mr' ? 'पीकरक्षा शेतकरी आकाशवाणी आवाज' : 'Pikraksha Rural Voice Radio'}
              </h3>
            </div>
          </div>
          <button
            onClick={() => {
              handleStop();
              onClose();
            }}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Player Body */}
        <div className="p-6 space-y-5">
          {/* Audio Visualizer Pill */}
          <div className="bg-emerald-950 text-white rounded-2xl p-5 text-center space-y-3 shadow-inner">
            <div className="flex items-center justify-center gap-1.5 h-10">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full bg-emerald-400 transition-all duration-300 ${
                    isPlaying ? 'animate-bounce' : 'h-2 opacity-40'
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(12, ((i * 7) % 36) + 8)}px` : '6px',
                    animationDelay: `${(i * 0.08)}s`
                  }}
                ></div>
              ))}
            </div>

            <p className="text-xs text-emerald-300 font-semibold">
              {isPlaying 
                ? (currentLang === 'mr' ? '🎙️ आवाज सुरू आहे... काळजीपूर्वक ऐका' : '🎙️ Audio advisory is speaking...')
                : (currentLang === 'mr' ? 'आवाज ऐकण्यासाठी खालील हिरव्या बटनावर दाबा' : 'Press Play below to listen to advisory')}
            </p>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              {!isPlaying ? (
                <button
                  onClick={handleStartPlay}
                  className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-black text-sm flex items-center gap-2 shadow-lg transition transform hover:scale-105"
                >
                  <Play className="w-4 h-4 fill-current" />
                  {currentLang === 'mr' ? 'आवाज ऐका (Play)' : 'Play Voice'}
                </button>
              ) : (
                <button
                  onClick={handleStop}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center gap-2 shadow-lg transition"
                >
                  <Square className="w-4 h-4 fill-current" />
                  {currentLang === 'mr' ? 'थांबवा (Stop)' : 'Stop Voice'}
                </button>
              )}

              <button
                onClick={handleStartPlay}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition"
                title="पुन्हा ऐका (Replay)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {currentLang === 'mr' ? 'पुन्हा ऐका' : 'Replay'}
              </button>
            </div>
          </div>

          {/* Speed / Cadence Controls */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700">
              {currentLang === 'mr' ? 'बोलण्याचा वेग (Speed):' : 'Speech Speed:'}
            </span>
            <div className="flex items-center gap-1.5">
              {[
                { label: currentLang === 'mr' ? 'सावकाश (0.8x)' : 'Slow (0.8x)', val: 0.8 },
                { label: currentLang === 'mr' ? 'सामान्य (1.0x)' : 'Normal (1.0x)', val: 0.95 },
                { label: currentLang === 'mr' ? 'जलद (1.2x)' : 'Fast (1.2x)', val: 1.15 }
              ].map(s => (
                <button
                  key={s.val}
                  onClick={() => {
                    setSpeed(s.val);
                    if (isPlaying) {
                      stopVoiceAlert();
                      playVoiceAlert(bulletinText, currentLang, () => setIsPlaying(true), () => setIsPlaying(false), s.val);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    Math.abs(speed - s.val) < 0.08
                      ? 'bg-emerald-700 text-white shadow-2xs' 
                      : 'bg-white text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Read-Along Subtitle Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>{currentLang === 'mr' ? 'बुलेटिन मजकूर (मराठी):' : 'Advisory Transcript:'}</span>
              <span className="text-[11px] text-emerald-700 font-semibold">
                {currentLang === 'mr' ? 'देवनागरी फॉन्ट' : 'High Legibility'}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-slate-900 text-sm font-medium leading-relaxed font-sans max-h-48 overflow-y-auto">
              {bulletinText}
            </div>
          </div>

          {/* Toll-Free Call Simulation */}
          <div className="p-3 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-between text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>
                {currentLang === 'mr' 
                  ? 'इंटरनेट नसताना टोल-फ्री कॉलवर ऐका:' 
                  : 'Call Toll-Free without internet:'}
              </span>
            </div>
            <span className="font-mono font-extrabold text-emerald-800 bg-white px-2.5 py-0.5 rounded-lg border border-slate-300">
              1800-PIK-RAKSHA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

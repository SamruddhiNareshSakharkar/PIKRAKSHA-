import React from 'react';
import { X, Volume2, Share2, Smartphone, ShieldCheck, CheckCheck } from 'lucide-react';

export default function AlertPreviewModal({ farm, lang, isOpen, onClose, onPlayAudio, isPlayingAudio }) {
  if (!isOpen || !farm) return null;

  const currentLang = lang || 'en';

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*PIKRAKSHA (पीकरक्षा) अलर्ट*\n` +
      `गाव: ${farm.location.village[currentLang]}, ${farm.location.district[currentLang]}\n` +
      `पीक: ${farm.crop.name[currentLang]}\n` +
      `धोका: ${farm.primaryAlert.pestName[currentLang]}\n` +
      `अंदाज: ${farm.primaryAlert.peakText[currentLang]}\n\n` +
      `सल्ला: ${farm.ipmSteps[0][currentLang]}\n\n` +
      `Seva First Innovation Challenge 2026.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-forest-900 to-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Farmer Alert Broadcast Preview</h3>
              <p className="text-xs text-emerald-300">
                {typeof farm?.farmerName === 'object' ? (farm.farmerName[currentLang] || farm.farmerName.en) : (farm?.farmerName || 'Farmer')} • {typeof farm?.location?.village === 'object' ? (farm.location.village[currentLang] || farm.location.village.en) : (farm?.location?.village || '')}, {typeof farm?.location?.district === 'object' ? (farm.location.district[currentLang] || farm.location.district.en) : (farm?.location?.district || '')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Preview */}
        <div className="p-6 space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase px-2 py-0.5 rounded bg-red-100 text-red-800">
                🚨 {farm.primaryAlert.pestName[currentLang] || farm.primaryAlert.pestName.en}
              </span>
              <span className="text-[10px] text-slate-500 font-bold">Priority High</span>
            </div>
            <p className="text-xs font-bold text-slate-900">
              {farm.primaryAlert.peakText[currentLang] || farm.primaryAlert.peakText.en}
            </p>
            <p className="text-xs text-slate-700 leading-relaxed">
              {farm.primaryAlert.trapStatusText[currentLang] || farm.primaryAlert.trapStatusText.en}
            </p>
          </div>

          {/* Voice Player Pill */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onPlayAudio(farm.primaryAlert.audioText[currentLang] || farm.primaryAlert.audioText.en)}
                className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center hover:bg-emerald-800 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div>
                <span className="text-xs font-bold text-slate-900 block">
                  {isPlayingAudio 
                    ? (lang === 'mr' ? 'आवाज सुरू आहे...' : 'Speaking Audio Alert...') 
                    : (lang === 'mr' ? 'ध्वनी संदेश ऐका (Marathi TTS)' : 'Listen Voice Bulletin')}
                </span>
                <span className="text-[10px] text-slate-500">Audio call reaches non-literate farmers</span>
              </div>
            </div>
            <span className="text-xs font-mono text-emerald-800 font-bold">0:24</span>
          </div>

          {/* Text preview */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-xs text-slate-600 font-mono">
            {farm.primaryAlert.audioText[currentLang] || farm.primaryAlert.audioText.en}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={handleShareWhatsApp}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share to WhatsApp</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold transition"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}


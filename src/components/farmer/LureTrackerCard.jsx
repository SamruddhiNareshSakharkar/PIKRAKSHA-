import React from 'react';
import { Clock, AlertCircle, CheckCircle2, RefreshCw, ShieldAlert, Sparkles } from 'lucide-react';

export default function LureTrackerCard({ farm, lang = 'en' }) {
  // Pheromone lures (Gossyplure / Helilure) degrade after 25-30 days in Vidarbha heat
  const lureInstalledDaysAgo = farm?.trapData?.daysInField ?? 18;
  const lureMaxLifeDays = 30;
  const daysRemaining = Math.max(0, lureMaxLifeDays - lureInstalledDaysAgo);
  const percentUsed = Math.min(100, Math.round((lureInstalledDaysAgo / lureMaxLifeDays) * 100));

  const isLureExpiringSoon = daysRemaining <= 7;

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black">
            🧪
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              {lang === 'mr' ? 'कामगंध ल्यूर कार्यक्षमता ट्रॅकर' : lang === 'hi' ? 'फेरोमोन ल्यूर सक्रियता ट्रैकर' : 'Pheromone Lure Efficacy Tracker'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'mr' ? 'गोसिप्ल्यूर (Gossyplure) रबरी नळीची कार्यक्षमता' : 'Gossyplure rubber septa active lifespan'}
            </p>
          </div>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
          isLureExpiringSoon ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
        }`}>
          {isLureExpiringSoon 
            ? (lang === 'mr' ? 'लवकरच बदला' : 'Replace Soon') 
            : (lang === 'mr' ? 'सक्रिय व प्रभावी' : 'Active & Potent')}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-semibold">
          <span className="text-slate-600">
            {lang === 'mr' ? `वापरलेले दिवस: ${lureInstalledDaysAgo} / ${lureMaxLifeDays} दिवस` : `Used: ${lureInstalledDaysAgo} of ${lureMaxLifeDays} days`}
          </span>
          <span className={daysRemaining <= 5 ? "text-red-600 font-bold" : "text-emerald-700 font-bold"}>
            {lang === 'mr' ? `${daysRemaining} दिवस शिल्लक` : `${daysRemaining} days left`}
          </span>
        </div>
        <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
          <div 
            className={`h-full rounded-full transition-all duration-500 ${
              percentUsed > 80 ? 'bg-amber-500' : 'bg-gradient-to-r from-emerald-500 to-teal-600'
            }`}
            style={{ width: `${percentUsed}%` }}
          ></div>
        </div>
      </div>

      {/* Field Note */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5">
        <RefreshCw className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {lang === 'mr' ? (
            <>
              <strong>कृषी विद्यापीठ (VNMKV) शिफारस:</strong> कामगंध सापळ्यातील ल्यूर दर ३० दिवसांनी बदलावी. जुनी ल्यूर मंदावल्यास पतंग आकर्षित होत नाहीत व शेतात अचानक अळीचा प्रादुर्भाव होतो. पुढील ल्यूर बदल तारीख: <strong>१५ नोव्हेंबर २०२६</strong>.
            </>
          ) : lang === 'hi' ? (
            <>
              <strong>कृषि विश्वविद्यालय (VNMKV) सिफारिश:</strong> फेरोमोन ल्यूर हर 30 दिन में बदलें। पुरानी ल्यूर कमजोर होने से कीट आकर्षित नहीं होते। अगली बदलाव तिथि: <strong>15 नवंबर 2026</strong>।
            </>
          ) : (
            <>
              <strong>VNMKV University Standard:</strong> Pheromone lure potency declines after 30 days of high solar exposure. Next scheduled lure replacement: <strong>15 Nov 2026</strong>.
            </>
          )}
        </p>
      </div>
    </div>
  );
}


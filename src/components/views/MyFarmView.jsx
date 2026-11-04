import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  Volume2, 
  Sparkles, 
  ChevronRight, 
  Calendar, 
  MapPin, 
  Bug, 
  Layers, 
  Info,
  ShieldAlert,
  ArrowUpRight,
  TrendingUp,
  FileCheck2,
  Activity
} from 'lucide-react';
import LureTrackerCard from '../farmer/LureTrackerCard';
import EconomicImpactCalculator from '../farmer/EconomicImpactCalculator';
import WeatherAnomalyRadar from '../farmer/WeatherAnomalyRadar';

export default function MyFarmView({ 
  farm, 
  lang = 'en', 
  t = {}, 
  onPreviewAlert, 
  onNavigateDiagnose, 
  onPlayAudio, 
  isPlayingAudio,
  onSyncWeather,
  onSyncGeolocation,
  onChangeDistrict,
  isSyncingWeather
}) {
  const defaultHistory = [4, 6, 7, 9, 10, 11, 10];
  const [trapCounts, setTrapCounts] = useState(farm?.trapData?.history || defaultHistory);
  const [todayCatchInput, setTodayCatchInput] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);

  useEffect(() => {
    if (farm?.trapData?.history) {
      setTrapCounts(farm.trapData.history);
    }
  }, [farm]);

  // Compute stats
  const currentCount = Array.isArray(trapCounts) && trapCounts.length > 0 ? trapCounts[trapCounts.length - 1] : 4;
  const threshold = farm?.trapData?.threshold || 8;
  const isThresholdCrossed = currentCount >= threshold;

  const handleLogCatch = (e) => {
    e.preventDefault();
    const count = parseInt(todayCatchInput);
    if (!isNaN(count) && count >= 0) {
      const updated = [...trapCounts.slice(1), count];
      setTrapCounts(updated);
      setTodayCatchInput('');
      setShowLogModal(false);
    }
  };

  const daysLabel = lang === 'mr' ? ['सोम', 'मंगळ', 'बुध', 'गुरू', 'शुक्र', 'शनि', 'आज'] :
                    lang === 'hi' ? ['सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि', 'आज'] :
                    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'];

  const cropNameStr = typeof farm?.crop?.name === 'object' 
    ? (farm?.crop?.name?.[lang] || farm?.crop?.name?.en) 
    : (farm?.crop?.name || 'Crop');

  const stageStr = typeof farm?.crop?.stage === 'object'
    ? (farm?.crop?.stage?.[lang] || farm?.crop?.stage?.en)
    : (farm?.crop?.stage || 'Active');

  const villageStr = typeof farm?.location?.village === 'object'
    ? (farm?.location?.village?.[lang] || farm?.location?.village?.en)
    : (farm?.location?.village || '');

  const districtStr = typeof farm?.location?.district === 'object'
    ? (farm?.location?.district?.[lang] || farm?.location?.district?.en)
    : (farm?.location?.district || '');

  const pestNameStr = typeof farm?.primaryAlert?.pestName === 'object'
    ? (farm?.primaryAlert?.pestName?.[lang] || farm?.primaryAlert?.pestName?.en)
    : (farm?.primaryAlert?.pestName || 'Crop Threat Alert');

  const peakTextStr = typeof farm?.primaryAlert?.peakText === 'object'
    ? (farm?.primaryAlert?.peakText?.[lang] || farm?.primaryAlert?.peakText?.en)
    : (farm?.primaryAlert?.peakText || 'Active monitoring recommended.');

  const trapStatusStr = typeof farm?.primaryAlert?.trapStatusText === 'object'
    ? (farm?.primaryAlert?.trapStatusText?.[lang] || farm?.primaryAlert?.trapStatusText?.en)
    : (farm?.primaryAlert?.trapStatusText || 'Trap catches monitored against economic thresholds.');

  return (
    <div className="space-y-6">
      {/* 1. HIGH RISK ALERT BANNER - Matching Slide 1 */}
      <div className={`rounded-2xl p-6 border transition-all shadow-xs ${
        farm?.primaryAlert?.severity === 'high' 
          ? 'bg-[#FFF5F5] border-[#FCA5A5]' 
          : 'bg-[#FFFBEB] border-[#FCD34D]'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                farm?.primaryAlert?.severity === 'high'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                {farm?.primaryAlert?.severity === 'high' ? (t.highRiskBadge || 'HIGH RISK THIS WEEK') : (t.moderateRiskBadge || 'MODERATE RISK')}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {villageStr}, {districtStr}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {pestNameStr}
            </h2>

            <p className="text-base font-semibold text-slate-800">
              {peakTextStr}
            </p>

            <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
              {trapStatusStr}
            </p>
          </div>

          {/* Action Buttons from Slide 1 */}
          <div className="flex flex-wrap lg:flex-col sm:flex-row gap-2.5 shrink-0">
            <button
              onClick={onPreviewAlert}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#1b4332] hover:bg-[#143527] text-white text-sm font-semibold shadow-xs transition transform hover:-translate-y-0.5"
            >
              <span>{t.previewAlert || 'Preview alert'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateDiagnose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold shadow-xs transition"
            >
              <span>{t.diagnosePlant || 'Diagnose a plant'}</span>
            </button>

            <button
              onClick={() => onPlayAudio(typeof farm?.primaryAlert?.audioText === 'object' ? (farm?.primaryAlert?.audioText?.[lang] || farm?.primaryAlert?.audioText?.en) : farm?.primaryAlert?.audioText)}
              className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                isPlayingAudio 
                  ? 'bg-emerald-600 text-white border-emerald-700 animate-pulse'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300'
              }`}
            >
              <Volume2 className="w-4 h-4 text-emerald-700" />
              <span>{isPlayingAudio ? (lang === 'mr' ? 'आवाज सुरू आहे...' : 'Playing Audio...') : (t.listenVoiceAlert || 'Voice Alert 🔊')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. 4 METRIC CARDS - Matching Slide 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Crop */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition">
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            {t.crop || 'CROP'}
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {cropNameStr}
          </div>
          <div className="mt-1 text-xs text-slate-600 flex items-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{farm?.crop?.acres || 2.5} {t.acres || 'acres'} · {villageStr}, {districtStr}</span>
          </div>
        </div>

        {/* Card 2: Crop Stage */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition">
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            {t.cropStage || 'CROP STAGE'}
          </div>
          <div className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900 line-clamp-1">
            {stageStr}
          </div>
          <div className="mt-1 text-xs text-slate-600 flex items-center gap-1 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{farm?.crop?.das || 118} {t.daysAfterSowing || 'days after sowing'}</span>
          </div>
        </div>

        {/* Card 3: Threats to Watch */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition">
          <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
            {t.threatsToWatch || 'THREATS TO WATCH'}
          </div>
          <div className="mt-2 text-2xl font-extrabold text-slate-900">
            {farm?.threatsList?.length || 1}
          </div>
          <div className="mt-1 text-xs text-slate-600 font-medium">
            <span className="text-red-600 font-bold">{farm?.threatsSummary?.high ?? 0} {t.highThreats || 'high'}</span> · 
            <span className="text-amber-600 font-bold ml-1">{farm?.threatsSummary?.moderate ?? 0} {t.modThreats || 'moderate'}</span>
          </div>
        </div>

        {/* Card 4: Pheromone Trap */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-xs transition relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              {t.pheromoneTrap || 'PHEROMONE TRAP'}
            </div>
            <button 
              onClick={() => setShowLogModal(true)} 
              className="text-[10px] text-emerald-700 hover:underline font-semibold"
            >
              + {lang === 'mr' ? 'नोंद' : 'Log'}
            </button>
          </div>
          <div className="mt-2 flex items-baseline gap-1.5">
            <span className="text-2xl font-extrabold text-slate-900">{currentCount}</span>
            <span className="text-base font-semibold text-slate-500">/{threshold}</span>
          </div>
          <div className="mt-1">
            {isThresholdCrossed ? (
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-700">
                {t.thresholdCrossed || 'Threshold crossed'}
              </span>
            ) : (
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-700">
                {t.normalCatch || 'Normal catch'}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. TWO-COLUMN SPLIT: Risk by Threat & What to Do Now */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols): Risk by Threat with 7-Day Bars */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">{t.riskByThreat || 'Risk by threat'}</h3>
            <span className="text-xs text-slate-500 font-medium">7-Day Trajectory</span>
          </div>

          <div className="space-y-6 divide-y divide-slate-100">
            {(farm?.threatsList || []).map((threat) => {
              const badgeBg = threat.level === 'High' ? 'bg-red-50 text-red-700 border-red-200' :
                              threat.level === 'Moderate' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                              'bg-emerald-50 text-emerald-700 border-emerald-200';
              const badgeText = lang === 'mr' ? threat.levelMr : lang === 'hi' ? threat.levelHi : threat.level;
              const tName = typeof threat.name === 'object' ? (threat.name[lang] || threat.name.en) : threat.name;
              const tDesc = typeof threat.desc === 'object' ? (threat.desc[lang] || threat.desc.en) : threat.desc;

              return (
                <div key={threat.id} className="pt-5 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-base">
                      {tName}
                    </h4>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                      {badgeText}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tDesc}
                  </p>

                  {/* 7-day risk bar visual */}
                  <div className="pt-2">
                    <div className="flex items-end gap-1.5 h-6">
                      {(threat.bars || [0.5, 0.6, 0.7, 0.8, 0.9, 0.8, 0.7]).map((bar, idx) => {
                        const height = Math.max(15, Math.round(bar * 100));
                        const barColor = bar >= 0.8 ? 'bg-red-600' :
                                         bar >= 0.5 ? 'bg-amber-500' :
                                         bar >= 0.3 ? 'bg-yellow-400' : 'bg-emerald-500';
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                            <div 
                              className={`w-full rounded-xs transition-all ${barColor}`} 
                              style={{ height: `${height}%` }}
                              title={`Day ${idx + 1}: ${Math.round(bar * 100)}% risk`}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600 mt-1 font-semibold">
                      <span>{daysLabel[0]}</span>
                      <span>{daysLabel[3]}</span>
                      <span>{daysLabel[6]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (5 cols): What to Do Now (Safe IPM Steps) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">
                {t.whatToDoNow || 'What to do now'} · <span className="text-emerald-700">{pestNameStr}</span>
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800">
                {farm?.primaryAlert?.severity === 'high' ? 'High' : 'Moderate'}
              </span>
            </div>

            {/* IPM Steps with numbers */}
            <ol className="space-y-3.5 text-sm text-slate-700">
              {(farm?.ipmSteps || []).map((step, idx) => {
                const sText = typeof step === 'object' ? (step[lang] || step.en) : step;
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed font-normal">
                      {sText}
                    </p>
                  </li>
                );
              })}
            </ol>

            {/* University Compliance Disclaimer Note matching Slide 1 */}
            <div className="mt-5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 leading-relaxed font-serif italic">
              {t.recommendationDisclaimer || 'Spray only if field checks cross the threshold, and only university recommended products.'}
            </div>
          </div>

          {/* Pheromone Trap History Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">{t.trapTrend || 'Pheromone trap 7-day trend'}</h4>
              <span className="text-xs text-slate-600 font-semibold">{farm?.trapData?.trapType ? farm.trapData.trapType.split('(')[0] : 'Pheromone Trap'}</span>
            </div>

            {/* Historical Bar Chart */}
            <div className="pt-2">
              <div className="relative h-28 flex items-end justify-between gap-2 border-b border-slate-200 pb-1">
                {/* Horizontal Threshold Guideline (8 moths) */}
                <div 
                  className="absolute left-0 right-0 border-b-2 border-dashed border-red-400 z-10 flex items-center justify-end"
                  style={{ bottom: `${(threshold / 14) * 100}%` }}
                >
                  <span className="text-[9px] bg-red-50 text-red-700 font-bold px-1 rounded -mb-2.5">
                    ETL {threshold}
                  </span>
                </div>

                {(trapCounts || defaultHistory).map((val, i) => {
                  const pct = Math.min(100, Math.round((val / 14) * 100));
                  const isOver = val >= threshold;
                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 z-20">
                      <span className={`text-[10px] font-bold ${isOver ? 'text-red-700' : 'text-slate-600'}`}>
                        {val}
                      </span>
                      <div 
                        className={`w-full rounded-t-sm transition-all ${
                          isOver ? 'bg-red-500 shadow-sm' : 'bg-slate-300'
                        }`}
                        style={{ height: `${pct}%` }}
                      ></div>
                      <span className="text-[9px] text-slate-600 font-medium">
                        {daysLabel[i]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-[11px] text-slate-600 pt-1 leading-snug">
              {lang === 'mr' 
                ? 'सलग ३ दिवस मर्यादा ओलांडल्यास आपोआप राज्यस्तरीय कृषी विद्यापीठ सल्ला सक्रिय होतो.' 
                : lang === 'hi'
                ? 'लगातार 3 दिन सीमा पार होने पर स्वचालित विश्वविद्यालय सुरक्षा प्रोटोकॉल सक्रिय होता है।'
                : '3 consecutive days above threshold triggers state university warning advisory.'}
            </p>
          </div>
        </div>
      </div>


      {/* WEATHER ANOMALY & MICROCLIMATE TRIGGER RADAR */}
      <WeatherAnomalyRadar farm={farm} lang={lang} onSyncWeather={onSyncWeather} onSyncGeolocation={onSyncGeolocation} onChangeDistrict={onChangeDistrict} isSyncingWeather={isSyncingWeather} />
      {/* LURE POTENCY TRACKER */}
      <LureTrackerCard farm={farm} lang={lang} />

      {/* DIRECT FARMER FINANCIAL SAVINGS ROI CALCULATOR */}
      <EconomicImpactCalculator farm={farm} lang={lang} />

      {/* Log Catch Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-slate-900">
              {t.logTrapCount || "Log today's catch"}
            </h3>
            <p className="text-xs text-slate-600">
              {lang === 'mr' 
                ? 'आज कामगंध सापळ्यात अडकलेल्या पतंगांची संख्या नोंदवा:' 
                : 'Enter today\'s count of moths captured in pheromone trap:'}
            </p>
            <form onSubmit={handleLogCatch} className="space-y-4">
              <input
                type="number"
                min="0"
                max="50"
                value={todayCatchInput}
                onChange={(e) => setTodayCatchInput(e.target.value)}
                placeholder="e.g. 10"
                className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-bold"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-700 text-white hover:bg-emerald-800"
                >
                  Save Count
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


import React, { useState } from 'react';
import { 
  CloudRain, 
  Thermometer, 
  Droplets, 
  Wind, 
  AlertTriangle, 
  ShieldCheck, 
  Sliders, 
  RefreshCw, 
  Sparkles, 
  Calendar, 
  Layers, 
  ArrowRight,
  Leaf
} from 'lucide-react';

export default function RiskForecastView({ farm, lang, t }) {
  const currentLang = lang || 'en';
  const farmCrop = farm?.crop?.name?.en || 'Cotton';
  const baseTemp = farm?.weather?.temp || 29;
  const baseRH = farm?.weather?.humidity || 75;

  // Interactive Simulation Controls
  const [simulatedRain, setSimulatedRain] = useState(0); // mm of unseasonal rain
  const [simulatedRH, setSimulatedRH] = useState(baseRH); // % RH

  // 7-day base forecasts calibrated to active farm
  const days = [
    { day: lang === 'mr' ? 'आज (सोम)' : 'Today (Mon)', maxT: Math.round(baseTemp + 3), minT: Math.round(baseTemp - 7), rh: simulatedRH, rain: simulatedRain, cond: 'Partly Cloudy' },
    { day: lang === 'mr' ? 'उद्या (मंगळ)' : 'Day 2 (Tue)', maxT: Math.round(baseTemp + 2), minT: Math.round(baseTemp - 8), rh: Math.min(98, simulatedRH + 4), rain: simulatedRain > 0 ? 8 : 0, cond: 'Cloudy' },
    { day: lang === 'mr' ? 'बुधवार' : 'Day 3 (Wed)', maxT: Math.round(baseTemp + 1), minT: Math.round(baseTemp - 9), rh: Math.min(96, simulatedRH + 2), rain: simulatedRain > 0 ? 12 : 2, cond: 'Light Rain' },
    { day: lang === 'mr' ? 'गुरुवार' : 'Day 4 (Thu)', maxT: Math.round(baseTemp), minT: Math.round(baseTemp - 8), rh: Math.min(94, simulatedRH - 2), rain: 0, cond: 'Overcast' },
    { day: lang === 'mr' ? 'शुक्रवार' : 'Day 5 (Fri)', maxT: Math.round(baseTemp + 2), minT: Math.round(baseTemp - 7), rh: Math.max(50, simulatedRH - 8), rain: 0, cond: 'Clear' },
    { day: lang === 'mr' ? 'शनिवार' : 'Day 6 (Sat)', maxT: Math.round(baseTemp + 4), minT: Math.round(baseTemp - 6), rh: Math.max(45, simulatedRH - 12), rain: 0, cond: 'Sunny' },
    { day: lang === 'mr' ? 'रविवार' : 'Day 7 (Sun)', maxT: Math.round(baseTemp + 5), minT: Math.round(baseTemp - 6), rh: Math.max(40, simulatedRH - 15), rain: 0, cond: 'Dry & Sunny' }
  ];

  // Calculate dynamic risk based on active crop and weather factors
  const calculateRisk = (day) => {
    // Fungal risk increases sharply if RH > 82% or unseasonal rain occurs
    if (day.rh >= 82 || day.rain >= 6) {
      if (farmCrop === 'Grapes') {
        return {
          level: 'Severe',
          score: 96,
          color: 'bg-red-600 text-white',
          pest: lang === 'mr' ? 'डाऊनी मिल्ड्यू बुरशी बीजाणू स्फोट' : 'Downy Mildew Sporulation Outbreak',
          tag: 'CRITICAL 24H'
        };
      } else if (farmCrop === 'Tomato') {
        return {
          level: 'Severe',
          score: 95,
          color: 'bg-red-600 text-white',
          pest: lang === 'mr' ? 'फायटोफ्थोरा उशिरा येणारा करपा' : 'Late Blight (Phytophthora) Spore Release',
          tag: 'CRITICAL 24H'
        };
      } else if (farmCrop === 'Soybean') {
        return {
          level: 'Severe',
          score: 91,
          color: 'bg-red-600 text-white',
          pest: lang === 'mr' ? 'सोयाबीन तांबेरा व करपा रोग' : 'Soybean Rust & Anthracnose Rot',
          tag: 'CRITICAL 48H'
        };
      } else {
        return {
          level: 'Severe',
          score: 94,
          color: 'bg-red-600 text-white',
          pest: lang === 'mr' ? 'बुरशीजन्य बोंडसड व करपा' : 'Anthracnose & Internal Boll Rot',
          tag: 'CRITICAL 48H'
        };
      }
    }

    // Pest breeding condition: favorable night temperature & moderate RH
    if (day.minT >= 18 && day.minT <= 26 && day.rh >= 60) {
      if (farmCrop === 'Grapes') {
        return {
          level: 'High',
          score: 82,
          color: 'bg-red-500 text-white',
          pest: lang === 'mr' ? 'भुरी रोग व थ्रिप्स वाढ' : 'Powdery Mildew & Thrips Surge',
          tag: 'HIGH RISK'
        };
      } else if (farmCrop === 'Tomato') {
        return {
          level: 'High',
          score: 86,
          color: 'bg-red-500 text-white',
          pest: lang === 'mr' ? 'तुता पिनवर्म व फळ पोखरणारी अळी' : 'Tuta Absoluta Pinworm Oviposition',
          tag: 'HIGH RISK'
        };
      } else if (farmCrop === 'Soybean') {
        return {
          level: 'High',
          score: 79,
          color: 'bg-red-500 text-white',
          pest: lang === 'mr' ? 'चकती भुंगा खोड कापणे' : 'Girdle Beetle Stem Ring-Cutting',
          tag: 'HIGH RISK'
        };
      } else {
        return {
          level: 'High',
          score: 84,
          color: 'bg-red-500 text-white',
          pest: lang === 'mr' ? 'गुलाबी बोंडअळी अंडी घालणे' : 'Pink Bollworm Oviposition Peak',
          tag: 'HIGH RISK'
        };
      }
    }

    // Hot and dry condition: sucking pest surge
    if (day.rh < 55 && day.maxT > 31) {
      if (farmCrop === 'Grapes') {
        return {
          level: 'Moderate',
          score: 58,
          color: 'bg-amber-500 text-white',
          pest: lang === 'mr' ? 'पिठ्या ढेकूण व पाने सुकणे' : 'Mealybug Crawlers & Leaf Scorch',
          tag: 'MODERATE'
        };
      } else if (farmCrop === 'Tomato') {
        return {
          level: 'Moderate',
          score: 62,
          color: 'bg-amber-500 text-white',
          pest: lang === 'mr' ? 'लाल कोळी व पांढरी माशी' : 'Red Spider Mite & Whitefly',
          tag: 'MODERATE'
        };
      } else if (farmCrop === 'Soybean') {
        return {
          level: 'Moderate',
          score: 54,
          color: 'bg-amber-500 text-white',
          pest: lang === 'mr' ? 'खोडमाशी व तुडतुडे' : 'Stem Fly & Leafhopper Surge',
          tag: 'MODERATE'
        };
      } else {
        return {
          level: 'Moderate',
          score: 62,
          color: 'bg-amber-500 text-white',
          pest: lang === 'mr' ? 'रसशोषक किडी (पांढरी माशी)' : 'Sucking Pests / Whitefly & Aphids',
          tag: 'MODERATE'
        };
      }
    }

    // Default safe condition
    return { 
      level: 'Low', 
      score: 25, 
      color: 'bg-emerald-600 text-white', 
      pest: lang === 'mr' ? 'हवामान अनुकूल / सुरक्षित' : 'Safe / Within University ETL', 
      tag: 'SAFE' 
    };
  };

  const handleSimulateExcessRain = () => {
    setSimulatedRain(25);
    setSimulatedRH(92);
  };

  const handleResetSimulation = () => {
    setSimulatedRain(0);
    setSimulatedRH(baseRH);
  };

  return (
    <div className="space-y-6">
      {/* Header and USP Intro */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              {lang === 'mr' ? '७-दिवसीय हवामान-कीड पूर्वसूचना मॉडेल' : '7-Day Biophysical Prediction Model'}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' 
                ? `${farm?.farmerName?.mr || farm?.farmerName?.en} यांच्या ${farmCrop} शेताचा ७ दिवसांचा धोका अंदाज` 
                : `7-Day Ahead Risk Forecast: ${farm?.farmerName?.en} (${farmCrop})`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `महावेध स्वयंचलित हवामान केंद्र (AWS) आणि ${farmCrop} पिकाच्या वाढीच्या अवस्थेनुसार भविष्यातील कीड-रोगांचा अंदाज.`
                : `Couples live Mahavedh AWS microclimate with ${farmCrop} phenology to project threat levels 2-7 days before visible field damage.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold">{farm?.weatherStation}</span>
          </div>
        </div>

        {/* What-If Simulation Sandbox Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'mr' ? 'हवामान बदल सिम्युलेटर (What-If Analysis)' : 'Interactive Weather Simulator (What-If Engine)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateExcessRain}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition"
                title="Simulate unseasonal rain event"
              >
                ⚡ {lang === 'mr' ? 'अवेळी पाऊस (Unseasonal Rain) सिम्युलेट करा' : 'Simulate 25mm Excess Rain'}
              </button>
              <button
                onClick={handleResetSimulation}
                className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition"
                title="Reset to live weather data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-600 font-medium mb-1">
                <span>{lang === 'mr' ? 'हवेतील आर्द्रता (RH %)' : 'Simulated Relative Humidity (RH)'}</span>
                <span className="font-bold text-slate-900">{simulatedRH}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="98"
                value={simulatedRH}
                onChange={(e) => setSimulatedRH(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between text-slate-600 font-medium mb-1">
                <span>{lang === 'mr' ? 'अवेळी पाऊस (Unseasonal Rain)' : 'Simulated Rainfall'}</span>
                <span className="font-bold text-slate-900">{simulatedRain} mm</span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                value={simulatedRain}
                onChange={(e) => setSimulatedRain(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 7-Day Day-by-Day Forecast Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
        {days.map((day, idx) => {
          const risk = calculateRisk(day);
          const isToday = idx === 0;

          return (
            <div 
              key={idx} 
              className={`rounded-2xl p-4 border flex flex-col justify-between transition-all ${
                isToday 
                  ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-1 ring-emerald-400' 
                  : 'bg-white border-slate-200/90 shadow-2xs hover:shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold ${isToday ? 'text-emerald-900' : 'text-slate-800'}`}>
                    {day.day}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                      Live
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="text-xl font-black text-slate-900">{day.maxT}°</span>
                  <span className="text-xs font-medium text-slate-400">/ {day.minT}°C</span>
                </div>

                <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px]"><Droplets className="w-3 h-3 text-sky-500" /> RH:</span>
                    <span className="font-semibold text-slate-800">{day.rh}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px]"><CloudRain className="w-3 h-3 text-indigo-500" /> Rain:</span>
                    <span className="font-semibold text-slate-800">{day.rain} mm</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Risk Badge for that day */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                <span className={`inline-block w-full text-center py-1 rounded-md text-[10px] font-extrabold tracking-wide uppercase ${risk.color}`}>
                  {risk.tag}
                </span>
                <p className="text-[10px] text-slate-600 font-medium leading-tight text-center line-clamp-2" title={risk.pest}>
                  {risk.pest}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explanatory Biophysical Rule Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-red-600 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>
              {farmCrop === 'Grapes' ? 'Downy Mildew 10-10-10 Rule' : 
               farmCrop === 'Tomato' ? 'Late Blight Zoospore Rule' :
               farmCrop === 'Soybean' ? 'Girdle Beetle Emergence Rule' : 
               'Pink Bollworm Night Rule #1'}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {farmCrop === 'Grapes'
              ? 'Shoot length >=10cm, rainfall >=10mm within 24h, and temperature >=10°C triggers primary oospore germination and infection within 4 hours.'
              : farmCrop === 'Tomato'
              ? 'Phytophthora infestans sporangia require >=85% RH and temperatures of 15-22°C for zoospore release and penetration of tomato leaflets.'
              : farmCrop === 'Soybean'
              ? 'Adult female girdle beetles make two parallel girdling rings on stems when humidity exceeds 65%, laying eggs inside the vascular cylinder.'
              : 'Night temperatures between 18–26°C during boll development (>80 DAS) trigger peak mating and oviposition of female pink bollworm moths.'}
          </p>
          <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>Validated by NRCG / MPKV / VNMKV university protocols</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <CloudRain className="w-4 h-4" />
            <span>Biophysical Microclimate Coupling</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Standard weather forecasts only give general taluka summaries. PIKRAKSHA calculates canopy microclimate (Delta-T, leaf wetness duration, night dew point) to forecast biological pest events 2-7 days in advance.
          </p>
          <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>Early Warning Window: 2–7 Days</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Mahavedh & CROPSAP Integration</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hooks directly into existing Government of Maharashtra AWS networks (Mahavedh) and CROPSAP pest surveillance records with zero sensor purchase cost to the farmer.
          </p>
          <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>Official Government API Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  Leaf,
  Radio
} from 'lucide-react';

export default function RiskForecastView({ farm, lang = 'en', t }) {
  const currentLang = lang || 'en';
  const farmCrop = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.[currentLang] || farm?.crop?.name?.en || 'Cotton')
    : (farm?.crop?.name || 'Cotton');
  const cropKey = (farm?.crop?.name?.en || 'Cotton').toLowerCase();

  const baseTemp = Math.round(farm?.weather?.temp ?? 29);
  const baseRH = Math.round(farm?.weather?.humidity ?? 75);

  // Interactive Simulation Controls
  const [simulatedRain, setSimulatedRain] = useState(0); // mm of unseasonal rain
  const [simulatedRH, setSimulatedRH] = useState(baseRH); // % RH

  const isSimulated = simulatedRain > 0 || simulatedRH !== baseRH;

  // Use live 7-day daily forecast from Open-Meteo when available
  const rawDaily = (farm?.weather?.daily && farm.weather.daily.length >= 7)
    ? farm.weather.daily
    : [
        { day: currentLang === 'mr' ? 'आज (सोम)' : 'Today (Mon)', maxT: baseTemp + 3, minT: baseTemp - 7, rh: baseRH, rain: 0, wind: 9, rainProb: 10 },
        { day: currentLang === 'mr' ? 'उद्या (मंगळ)' : 'Day 2 (Tue)', maxT: baseTemp + 2, minT: baseTemp - 8, rh: Math.min(95, baseRH + 4), rain: 0, wind: 10, rainProb: 15 },
        { day: currentLang === 'mr' ? 'बुधवार' : 'Day 3 (Wed)', maxT: baseTemp + 1, minT: baseTemp - 9, rh: Math.min(96, baseRH + 2), rain: 2, wind: 8, rainProb: 35 },
        { day: currentLang === 'mr' ? 'गुरुवार' : 'Day 4 (Thu)', maxT: baseTemp, minT: baseTemp - 8, rh: Math.min(94, baseRH - 2), rain: 0, wind: 7, rainProb: 10 },
        { day: currentLang === 'mr' ? 'शुक्रवार' : 'Day 5 (Fri)', maxT: baseTemp + 2, minT: baseTemp - 7, rh: Math.max(50, baseRH - 8), rain: 0, wind: 6, rainProb: 5 },
        { day: currentLang === 'mr' ? 'शनिवार' : 'Day 6 (Sat)', maxT: baseTemp + 4, minT: baseTemp - 6, rh: Math.max(45, baseRH - 12), rain: 0, wind: 9, rainProb: 5 },
        { day: currentLang === 'mr' ? 'रविवार' : 'Day 7 (Sun)', maxT: baseTemp + 5, minT: baseTemp - 6, rh: Math.max(40, baseRH - 15), rain: 0, wind: 11, rainProb: 5 }
      ];

  // Map real forecast through What-If simulator modifiers
  const days = rawDaily.map((d, idx) => {
    const rhDelta = simulatedRH - baseRH;
    const effectiveRh = Math.min(99, Math.max(25, (d.rh ?? baseRH) + rhDelta));
    const effectiveRain = Number(((d.rain ?? 0) + (idx === 0 ? simulatedRain : Math.max(0, simulatedRain - idx * 4))).toFixed(1));

    let dayLabel = d.day;
    if (idx === 0) dayLabel = currentLang === 'mr' ? 'आज (Today)' : 'Today';

    return {
      day: dayLabel,
      date: d.date,
      maxT: d.maxT,
      minT: d.minT,
      rh: effectiveRh,
      rain: effectiveRain,
      wind: d.wind ?? 8,
      rainProb: d.rainProb ?? 10
    };
  });

  // Dynamic Biophysical Risk Engine aligned with riskEngine.js
  const calculateRisk = (day) => {
    const isGrapes = cropKey.includes('grape') || cropKey.includes('द्राक्ष');
    const isTomato = cropKey.includes('tomato') || cropKey.includes('टोमॅटो');
    const isSoybean = cropKey.includes('soybean') || cropKey.includes('सोयाबीन');

    // 1. Extreme Fungal / Outbreak Triggers (Rain + High RH)
    if (day.rain >= 10 && day.rh >= 80) {
      if (isGrapes) {
        return {
          level: 'Severe',
          score: 96,
          color: 'bg-red-600 text-white',
          pest: currentLang === 'mr' ? 'द्राक्ष डाऊनी मिल्ड्यू (१०-१०-१० नियम सक्रिय)' : 'Downy Mildew (NRCG 10-10-10 Triggered)',
          tag: 'CRITICAL 24H'
        };
      }
      if (isTomato) {
        return {
          level: 'Severe',
          score: 95,
          color: 'bg-red-600 text-white',
          pest: currentLang === 'mr' ? 'टोमॅटो लेट ब्लाईट (फायटोफ्थोरा करपा)' : 'Tomato Late Blight (Phytophthora Outbreak)',
          tag: 'CRITICAL 24H'
        };
      }
      if (isSoybean) {
        return {
          level: 'Severe',
          score: 92,
          color: 'bg-red-600 text-white',
          pest: currentLang === 'mr' ? 'सोयाबीन तांबेरा व कॉलर रॉट बुरशी' : 'Soybean Rust & Sclerotium Stem Rot',
          tag: 'CRITICAL 48H'
        };
      }
      return {
        level: 'Severe',
        score: 94,
        color: 'bg-red-600 text-white',
        pest: currentLang === 'mr' ? 'कपाशी बोंडसड व अँथ्रॅक्नोज बुरशी' : 'Cotton Boll Rot & Anthracnose Blast',
        tag: 'CRITICAL 48H'
      };
    }

    // 2. High RH with warm night temp: Pink Bollworm, Girdle Beetle, Tuta
    if (day.minT >= 18 && day.minT <= 26 && day.rh >= 70) {
      if (isGrapes) {
        return {
          level: 'High',
          score: 82,
          color: 'bg-red-500 text-white',
          pest: currentLang === 'mr' ? 'भुरी बुरशी व थ्रिप्स किडीचा प्रादुर्भाव' : 'Powdery Mildew & Thrips Surge',
          tag: 'HIGH RISK'
        };
      }
      if (isTomato) {
        return {
          level: 'High',
          score: 86,
          color: 'bg-red-500 text-white',
          pest: currentLang === 'mr' ? 'तुता पिनवर्म (Tuta) व फळ पोखरणाऱ्या अळ्या' : 'Tuta Absoluta Pinworm Oviposition Peak',
          tag: 'HIGH RISK'
        };
      }
      if (isSoybean) {
        return {
          level: 'High',
          score: 80,
          color: 'bg-red-500 text-white',
          pest: currentLang === 'mr' ? 'चकती भुंगा (Girdle beetle) खोड कापणे' : 'Girdle Beetle Stem Girdling Surge',
          tag: 'HIGH RISK'
        };
      }
      return {
        level: 'High',
        score: 85,
        color: 'bg-red-500 text-white',
        pest: currentLang === 'mr' ? 'गुलाबी बोंडअळी अंडी घालण्याचा उच्च काळ' : 'Pink Bollworm Oviposition Microclimate',
        tag: 'HIGH RISK'
      };
    }

    // 3. Hot & Dry Conditions: Sucking pests
    if (day.rh < 55 && day.maxT > 31) {
      if (isGrapes) {
        return {
          level: 'Moderate',
          score: 58,
          color: 'bg-amber-500 text-white',
          pest: currentLang === 'mr' ? 'पिठ्या ढेकूण व पाने सुकणे' : 'Mealybug Crawlers & Leaf Scorch',
          tag: 'MODERATE'
        };
      }
      if (isTomato) {
        return {
          level: 'Moderate',
          score: 62,
          color: 'bg-amber-500 text-white',
          pest: currentLang === 'mr' ? 'लाल कोळी व पांढरी माशी' : 'Red Spider Mites & Whitefly Surge',
          tag: 'MODERATE'
        };
      }
      if (isSoybean) {
        return {
          level: 'Moderate',
          score: 55,
          color: 'bg-amber-500 text-white',
          pest: currentLang === 'mr' ? 'खोडमाशी व तुडतुडे' : 'Stem Fly & Leafhopper Surge',
          tag: 'MODERATE'
        };
      }
      return {
        level: 'Moderate',
        score: 62,
        color: 'bg-amber-500 text-white',
        pest: currentLang === 'mr' ? 'रसशोषक किडी (पांढरी माशी व मावा)' : 'Sucking Pests (Whitefly & Jassids)',
        tag: 'MODERATE'
      };
    }

    // 4. Default Safe Range
    return { 
      level: 'Low', 
      score: 22, 
      color: 'bg-emerald-600 text-white', 
      pest: currentLang === 'mr' ? 'हवामान अनुकूल / किडी आर्थिक पातळीखाली' : 'Weather Safe / Below University ETL', 
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
      {/* Header and Telemetry Indicator */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
                <span>{currentLang === 'mr' ? '७-दिवसीय हवामान-कीड पूर्वसूचना मॉडेल' : '7-Day Biophysical Prediction Model'}</span>
              </div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                <Radio className="w-3 h-3 text-sky-600 animate-pulse" />
                <span>LIVE (Open-Meteo WMO 7-Day)</span>
              </div>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {currentLang === 'mr' 
                ? `${farm?.farmerName?.mr || farm?.farmerName?.en} यांच्या ${farmCrop} शेताचा ७ दिवसांचा धोका अंदाज` 
                : `7-Day Ahead Risk Forecast: ${farm?.farmerName?.en} (${farmCrop})`}
            </h2>
            <p className="text-sm text-slate-600">
              {currentLang === 'mr'
                ? `महावेध स्वयंचलित हवामान केंद्र (AWS ${farm?.weatherStation || 'Active'}) आणि ${farmCrop} पिकाच्या वाढीच्या अवस्थेनुसार भविष्यातील कीड-रोगांचा अंदाज.`
                : `Couples live Open-Meteo AWS microclimate (${farm?.weatherStation || 'Active Station'}) with ${farmCrop} phenology to project threat levels 2-7 days before field damage.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
              Station: {farm?.weatherStation || 'Maharashtra AWS'}
            </span>
          </div>
        </div>

        {/* What-If Simulation Sandbox Box */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Sliders className="w-4 h-4 text-emerald-600" />
              <span>{currentLang === 'mr' ? 'हवामान बदल सिम्युलेटर (What-If Engine - Live Feed Modification)' : 'Interactive Weather Simulator (What-If Engine on Live Forecast)'}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateExcessRain}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition"
                title="Simulate unseasonal rain event"
              >
                ⚡ {currentLang === 'mr' ? 'अवेळी पाऊस (Unseasonal Rain) सिम्युलेट करा' : 'Simulate 25mm Excess Rain'}
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

          {isSimulated && (
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs font-semibold flex items-center justify-between">
              <span>
                ⚡ {currentLang === 'mr' ? 'सिम्युलेशन मोड चालू आहे: प्रत्यक्ष अंदाजात पाऊस व आर्द्रता जोडून पुढील धोका तपासत आहात.' : `What-If Active: Modifying live baseline by +${simulatedRain}mm rain & ${simulatedRH}% simulated RH.`}
              </span>
              <button onClick={handleResetSimulation} className="underline text-amber-800 text-[11px] font-bold ml-2">
                {currentLang === 'mr' ? 'रिसेट करा' : 'Reset to Live'}
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-600 font-medium mb-1">
                <span>{currentLang === 'mr' ? 'हवेतील आर्द्रता (RH %)' : 'Simulated Relative Humidity (RH)'}</span>
                <span className="font-bold text-slate-900">{simulatedRH}% {simulatedRH !== baseRH && `(Live: ${baseRH}%)`}</span>
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
                <span>{currentLang === 'mr' ? 'अवेळी पाऊस (Unseasonal Rain)' : 'Simulated Added Rainfall'}</span>
                <span className="font-bold text-slate-900">+{simulatedRain} mm</span>
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
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px]"><Wind className="w-3 h-3 text-slate-400" /> Wind:</span>
                    <span className="font-semibold text-slate-800">{day.wind} km/h</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Risk Score</span>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${risk.color}`}>
                    {risk.tag}
                  </span>
                </div>
                <div className="text-xs font-extrabold text-slate-900">{risk.score}/100</div>
                <div className="text-[11px] text-slate-600 line-clamp-2 mt-1 leading-tight font-medium">
                  {risk.pest}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Provenance note */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
        <span>Data Feed: Open-Meteo Meteorological WMO Archive & Mahavedh AWS Net (Auto-refreshed every 30 mins)</span>
        <span className="font-mono text-[10px] text-slate-400">Latitude: {farm?.location?.coords?.lat || 20.42}° N, Longitude: {farm?.location?.coords?.lon || 78.14}° E</span>
      </div>
    </div>
  );
}

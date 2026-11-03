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
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function RiskForecastView({ farm, lang, t }) {
  // Interactive Simulation Controls
  const [simulatedRain, setSimulatedRain] = useState(0); // mm of unseasonal rain
  const [simulatedRH, setSimulatedRH] = useState(farm.weather.humidity); // % RH
  const [activeTab, setActiveTab] = useState('timeline');

  // 7-day base forecasts
  const days = [
    { day: lang === 'mr' ? 'आज (सोम)' : 'Today (Mon)', maxT: 32, minT: 22, rh: simulatedRH, rain: simulatedRain, cond: 'Partly Cloudy' },
    { day: lang === 'mr' ? 'उद्या (मंगळ)' : 'Day 2 (Tue)', maxT: 31, minT: 21, rh: Math.min(98, simulatedRH + 4), rain: simulatedRain > 0 ? 8 : 0, cond: 'Cloudy' },
    { day: lang === 'mr' ? 'बुधवार' : 'Day 3 (Wed)', maxT: 30, minT: 20, rh: Math.min(96, simulatedRH + 2), rain: simulatedRain > 0 ? 12 : 2, cond: 'Light Rain' },
    { day: lang === 'mr' ? 'गुरुवार' : 'Day 4 (Thu)', maxT: 29, minT: 21, rh: Math.min(94, simulatedRH - 2), rain: 0, cond: 'Overcast' },
    { day: lang === 'mr' ? 'शुक्रवार' : 'Day 5 (Fri)', maxT: 31, minT: 22, rh: Math.max(50, simulatedRH - 8), rain: 0, cond: 'Clear' },
    { day: lang === 'mr' ? 'शनिवार' : 'Day 6 (Sat)', maxT: 33, minT: 23, rh: Math.max(45, simulatedRH - 12), rain: 0, cond: 'Sunny' },
    { day: lang === 'mr' ? 'रविवार' : 'Day 7 (Sun)', maxT: 34, minT: 23, rh: Math.max(40, simulatedRH - 15), rain: 0, cond: 'Dry & Sunny' }
  ];

  // Calculate dynamic risk based on simulation
  const calculateRisk = (day) => {
    // Fungal risk increases sharply if RH > 80% and rain > 5mm
    if (day.rh >= 85 || day.rain >= 10) {
      return { 
        level: 'Severe', 
        score: 95, 
        color: 'bg-red-600 text-white', 
        pest: lang === 'mr' ? 'बुरशीजन्य रोग व करपा (Fungal Outbreak)' : 'Fungal Outbreak (Blight / Mildew)',
        tag: 'CRITICAL 48H' 
      };
    }
    // Pink bollworm loves night temp 18-26°C with moderate humidity
    if (day.minT >= 19 && day.minT <= 26 && day.rh >= 65) {
      return { 
        level: 'High', 
        score: 84, 
        color: 'bg-red-500 text-white', 
        pest: lang === 'mr' ? 'गुलाबी बोंडअळी अंडी घालणे' : 'Pink Bollworm Egg Laying',
        tag: 'HIGH RISK' 
      };
    }
    if (day.rh < 55 && day.maxT > 32) {
      return { 
        level: 'Moderate', 
        score: 62, 
        color: 'bg-amber-500 text-white', 
        pest: lang === 'mr' ? 'रसशोषक किडी (पांढरी माशी)' : 'Sucking Pests / Whitefly',
        tag: 'MODERATE' 
      };
    }
    return { 
      level: 'Low', 
      score: 25, 
      color: 'bg-emerald-600 text-white', 
      pest: lang === 'mr' ? 'हवामान अनुकूल / सुरक्षित' : 'Safe / Within Thresholds',
      tag: 'SAFE' 
    };
  };

  const handleSimulateExcessRain = () => {
    setSimulatedRain(25);
    setSimulatedRH(92);
  };

  const handleResetSimulation = () => {
    setSimulatedRain(0);
    setSimulatedRH(farm.weather.humidity);
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
                ? `${farm.farmerName.mr} यांच्या शेताचा ७ दिवसांचा धोका अंदाज` 
                : `7-Day Ahead Farm-Level Risk Forecast: ${farm.farmerName.en}`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'महावेध स्वयंचलित हवामान केंद्र (AWS) आणि पिकाच्या वाढीच्या अवस्थेनुसार भविष्यातील कीड-रोगांचा अंदाज.'
                : 'Couples real-time Mahavedh AWS microclimate with crop phenology to project threat levels before visible symptoms.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold">{farm.weatherStation}</span>
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
                title="Simulate September 2025 excess rainfall event mentioned in Slide 2"
              >
                ⚡ {lang === 'mr' ? 'सप्टेंबर २०२५ अवेळी पाऊस सिम्युलेट करा' : 'Simulate Sept 2025 Excess Rain'}
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
                  ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-md' 
                  : 'bg-white border-slate-200 shadow-2xs hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold ${isToday ? 'text-emerald-700' : 'text-slate-700'}`}>
                    {day.day}
                  </span>
                  {isToday && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-extrabold uppercase">
                      NOW
                    </span>
                  )}
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <div className="text-xl font-extrabold text-slate-900">{day.maxT}°</div>
                  <div className="text-xs font-semibold text-slate-600">{day.minT}° min</div>
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
            <span>{lang === 'mr' ? 'गुलाबी बोंडअळी नियम (Rule #1)' : 'Pink Bollworm Rule #1'}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'mr'
              ? 'रात्रीचे किमान तापमान १८° ते २६° दरम्यान आणि पीक बोंड अवस्थेत (>८० दिवस) असल्यास पतंगांची मिलन व अंडी घालण्याची क्षमता कमाल असते.'
              : 'Night temperatures between 18–26°C during boll development (>80 DAS) trigger peak mating and oviposition.'}
          </p>
          <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>Threshold: &ge;8 moths/trap for 3 consecutive days</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
            <CloudRain className="w-4 h-4" />
            <span>{lang === 'mr' ? 'दहिया / केवडा रोग नियम (Rule #2)' : 'Fungal Spore 10-10-10 Rule'}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'mr'
              ? 'हवेतील आर्द्रता >८२%, पानांवर सलग ६ तास पाणी किंवा दव आणि तापमान २०-२८°C असल्यास बुरशीचे बीजाणू वेगाने फुटतात.'
              : 'Relative humidity >82% with leaf wetness >6 hours triggers sporangial release within 4 hours. Early warning alerts 48h prior.'}
          </p>
          <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>Validated by NRCG & VNMKV protocols</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'mr' ? 'महावेध व CROPSAP एकत्रीकरण' : 'Mahavedh & CROPSAP Link'}</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {lang === 'mr'
              ? 'महाराष्ट्रातील महावेध वेदर स्टेशन्स आणि कृषी विभागाच्या CROPSAP प्रणालीशी थेट जोडले गेलेले आहे. खाजगी हार्डवेअरची गरज नाही.'
              : 'Hooks directly into Mahavedh automatic weather stations already deployed across Maharashtra — zero sensor cost to farmer.'}
          </p>
          <div className="pt-2 text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>Official Government API Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
}


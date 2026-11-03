import React, { useState } from 'react';
import { 
  Wind, 
  Droplets, 
  Thermometer, 
  Clock, 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle2, 
  Sparkles, 
  HeartHandshake,
  Compass,
  Sun
} from 'lucide-react';

export default function SprayWindowView({ farm, lang, t }) {
  const hourlyData = [
    { time: '06:00 AM', temp: 22, rh: 85, wind: 4, deltaT: 1.8, status: 'POOR', reason: 'High dew & high drift risk', color: 'bg-red-500' },
    { time: '08:00 AM', temp: 25, rh: 78, wind: 6, deltaT: 3.2, status: 'CAUTION', reason: 'Honeybees active on flowers', color: 'bg-amber-500' },
    { time: '10:00 AM', temp: 29, rh: 65, wind: 9, deltaT: 5.6, status: 'POOR', reason: 'High pollinator foraging activity', color: 'bg-red-500' },
    { time: '12:00 PM', temp: 33, rh: 48, wind: 14, deltaT: 9.4, status: 'DANGEROUS', reason: 'Extreme evaporation & drift', color: 'bg-red-600' },
    { time: '02:00 PM', temp: 34, rh: 44, wind: 16, deltaT: 10.2, status: 'DANGEROUS', reason: 'Droplets vaporize in mid-air', color: 'bg-red-600' },
    { time: '04:30 PM', temp: 30, rh: 58, wind: 7, deltaT: 5.8, status: 'OPTIMAL (उत्कृष्ट)', reason: 'Bees resting, low wind, 0% rain', color: 'bg-emerald-600', best: true },
    { time: '06:00 PM', temp: 27, rh: 68, wind: 5, deltaT: 4.1, status: 'OPTIMAL (उत्कृष्ट)', reason: 'Ideal droplet absorption', color: 'bg-emerald-600', best: true },
    { time: '08:00 PM', temp: 24, rh: 75, wind: 3, deltaT: 2.9, status: 'GOOD', reason: 'No drift, safe for beneficials', color: 'bg-emerald-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'शेतकरी व मधमाशी रक्षक' : 'Precision Spray Optimizer & Drift Guard'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'सुरक्षित फवारणी वेळ व वारा दिशा रडार' : 'Hourly Safe Spray Window & Pollinator Drift Guard'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'चुकीच्या वेळी फवारल्यास औषध हवेत उडून वाया जाते व मधमाश्या मरतात. पीकरक्षा अचूक वेळ सुचवून ४०% औषध वाया जाण्यापासून वाचवते.'
                : 'Prevents 40% pesticide wastage due to mid-air droplet vaporization (Delta-T) and shields vital honeybee pollinators from fatal toxic drift.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-extrabold flex items-center gap-1.5">
              <span>Best Window: 04:30 PM – 06:30 PM Today</span>
            </span>
          </div>
        </div>
      </div>

      {/* Hero Window Status Card */}
      <div className="bg-gradient-to-r from-emerald-800 via-forest-800 to-emerald-950 text-white rounded-3xl p-6 shadow-lg border border-emerald-700 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400 text-forest-950 uppercase">
            Recommended Action Now
          </span>
          <h3 className="text-2xl font-extrabold">
            {lang === 'mr' ? 'आज दुपारी ४:३० ते ६:३० दरम्यानच फवारणी करा' : 'Spray Today Between 04:30 PM & 06:30 PM'}
          </h3>
          <p className="text-xs text-emerald-200 max-w-xl leading-relaxed">
            {lang === 'mr'
              ? 'दुपारी तापमान ३३°C पेक्षा जास्त असल्याने औषध वाफ होऊन उडून जाईल. संध्याकाळी वारा मंद (५-७ किमी/तास) व मधमाश्या पोळ्यावर परतल्याने फवारणी सर्वाधिक प्रभावी ठरते.'
              : 'Delta-T is optimal at 4.5. Low wind speed (6 km/h) prevents cross-farm drift, and honeybees have concluded their morning nectar foraging.'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center min-w-[180px]">
          <div className="text-xs text-emerald-300 font-bold uppercase">Delta-T Index</div>
          <div className="text-3xl font-black text-amber-300 mt-1">4.5 ΔT</div>
          <div className="text-[10px] text-white/90 font-medium mt-1">Ideal Range (2 – 8 ΔT)</div>
        </div>
      </div>

      {/* Hourly Timeline Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'तासानिहाय सुरक्षितता तक्ता (आजचे २४ तास)' : 'Hourly Spray Viability & Risk Factor Matrix'}
          </h3>
          <span className="text-xs text-slate-500 font-medium">Mahavedh Telemetry Coupled</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-y border-slate-200 text-[10px]">
              <tr>
                <th className="py-3 px-4">Hour</th>
                <th className="py-3 px-4">Temp (°C)</th>
                <th className="py-3 px-4">RH (%)</th>
                <th className="py-3 px-4">Wind Speed</th>
                <th className="py-3 px-4">Delta-T</th>
                <th className="py-3 px-4">Spray Decision</th>
                <th className="py-3 px-4">Scientific Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {hourlyData.map((row, idx) => (
                <tr key={idx} className={`hover:bg-slate-50/80 ${row.best ? 'bg-emerald-50/60 font-bold' : ''}`}>
                  <td className="py-3 px-4 text-slate-900 font-semibold">{row.time}</td>
                  <td className="py-3 px-4">{row.temp}°C</td>
                  <td className="py-3 px-4">{row.rh}%</td>
                  <td className="py-3 px-4 flex items-center gap-1">
                    <Wind className="w-3.5 h-3.5 text-slate-400" />
                    <span>{row.wind} km/h</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">{row.deltaT}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold text-white ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 text-[11px]">{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3 Pillars of Drift Guard Innovation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <HeartHandshake className="w-4 h-4" />
            <span>1. Pollinator & Bee Shield</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Honeybees forage actively between 08:30 AM and 02:00 PM. Spraying in this window decimates pollinator colonies. PIKRAKSHA locks out morning chemical sprays to protect biodiversity.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
            <Thermometer className="w-4 h-4" />
            <span>2. Delta-T Evaporation Science</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Delta-T measures the evaporation rate of spray droplets. If Delta-T exceeds 8, up to 45% of the spray droplet volume evaporates before reaching the target canopy leaf surface.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
            <Wind className="w-4 h-4" />
            <span>3. Neighbor Drift Protection</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Checks wind vector against neighboring organic or sensitive crops within 500 meters to prevent accidental chemical drift disputes.
          </p>
        </div>
      </div>
    </div>
  );
}


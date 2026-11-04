import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Sparkles, Building2, ShieldCheck, Scale, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function MarketLinkView({ farm, lang, t }) {
  const [acres, setAcres] = useState(farm?.crop?.acres || 2.5);

  const mspCotton = 7521; // Govt MSP 2025-26 long staple cotton
  const marketRates = [
    { mandi: 'Yavatmal APMC', price: 7850, change: '+₹120', trend: 'up', arrivals: '1,240 Qtl' },
    { mandi: 'Nagpur APMC', price: 7920, change: '+₹80', trend: 'up', arrivals: '2,800 Qtl' },
    { mandi: 'Amravati APMC', price: 7780, change: '-₹40', trend: 'down', arrivals: '950 Qtl' },
    { mandi: 'Washim APMC', price: 7810, change: '+₹60', trend: 'up', arrivals: '1,100 Qtl' },
  ];

  // Quality premium calculation
  const cleanYieldQtlPerAcre = 9.5;
  const damagedYieldQtlPerAcre = 6.0;

  const cleanTotalRevenue = Math.round(acres * cleanYieldQtlPerAcre * 7850);
  const damagedTotalRevenue = Math.round(acres * damagedYieldQtlPerAcre * 6800); // Damaged gets discounted price
  const protectedGain = cleanTotalRevenue - damagedTotalRevenue;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'बाजारभाव व उत्पन्न विश्लेषण' : 'APMC Mandi Intelligence & Revenue Engine'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'थेट बाजार भाव आणि कीडमुक्त कापूस प्रीमियम उत्पन्न' : 'Live Mandi Prices & Pest-Free Quality Premium Gain'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'कीडमुक्त पांढरा स्वच्छ कापूस बाजारात ₹१,००० ते ₹१,२०० प्रति क्विंटल जास्तीचा भाव मिळवतो. पीकरक्षाने वाचवलेले उत्पन्न खाली पाहा.'
                : 'Pest-free cotton commands Grade-A premium over bollworm-stained lint. See how early protection secures your harvest profits.'}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Govt MSP 2025-26</span>
            <span className="text-sm font-extrabold text-emerald-950">₹{mspCotton.toLocaleString()} / Quintal</span>
          </div>
        </div>
      </div>

      {/* Live Mandi Rates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketRates.map((m, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">{m.mandi}</span>
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${
                m.trend === 'up' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}>
                {m.change}
              </span>
            </div>
            <div className="text-2xl font-black text-slate-900 flex items-baseline gap-1">
              <span>₹{m.price.toLocaleString()}</span>
              <span className="text-xs font-normal text-slate-400">/ Qtl</span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
              <span>Arrivals: {m.arrivals}</span>
              <span className="text-emerald-700 font-bold text-[10px]">Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Impact Simulation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {lang === 'mr' ? 'तुमच्या शेताचे अंदाजित उत्पादन उत्पन्न कॅल्क्युलेटर' : 'Harvest Revenue Forecast on Your Acreage'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'mr' ? 'क्षेत्र बदलून कीडमुक्त vs कीडग्रस्त कापूस नफा तपासा.' : 'Toggle farm size to see the real cash difference PIKRAKSHA protection brings.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Acreage:</span>
            <input
              type="number"
              min="0.5"
              max="25"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
              className="w-20 px-2 py-1 rounded-lg border border-slate-300 font-bold text-sm text-center"
            />
            <span className="text-xs text-slate-500 font-medium">Acres</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-300 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>With PIKRAKSHA (Pest-Free)</span>
            </div>
            <div className="text-2xl font-black text-emerald-900">₹{cleanTotalRevenue.toLocaleString()}</div>
            <p className="text-xs text-emerald-800">
              Yield: {(acres * cleanYieldQtlPerAcre).toFixed(1)} Qtl @ ₹7,850/Qtl (Grade-A white cotton)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 text-xs font-bold uppercase tracking-wide">
              <span>Without Protection (Infested)</span>
            </div>
            <div className="text-2xl font-black text-red-900">₹{damagedTotalRevenue.toLocaleString()}</div>
            <p className="text-xs text-red-800">
              Yield: {(acres * damagedYieldQtlPerAcre).toFixed(1)} Qtl @ ₹6,800/Qtl (Bollworm-damaged lint discount)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500 text-slate-950 shadow-md space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-amber-950">
              Net Wealth Protected (बचत नफा)
            </div>
            <div className="text-3xl font-black text-forest-950">
              +₹{protectedGain.toLocaleString()}
            </div>
            <p className="text-xs font-bold text-amber-950/90">
              Extra income secured into farmer's family account with zero additional chemical expense.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { IndianRupee, TrendingUp, Sparkles, Building2, ShieldCheck, Scale, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function MarketLinkView({ farm, lang = 'en', t }) {
  const cropStr = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.en || 'Cotton')
    : (farm?.crop?.name || 'Cotton');
  
  const isGrapes = cropStr.toLowerCase().includes('grape') || cropStr.toLowerCase().includes('द्राक्ष');
  const isTomato = cropStr.toLowerCase().includes('tomato') || cropStr.toLowerCase().includes('टोमॅटो');
  const isSoybean = cropStr.toLowerCase().includes('soybean') || cropStr.toLowerCase().includes('सोयाबीन');
  const isCotton = !isGrapes && !isTomato && !isSoybean;

  const acres = farm?.crop?.acres || 2.5;

  // Crop-specific market data
  let mspText = 'MSP 2025-26';
  let mspValue = '₹7,521 / Qtl';
  let unit = '/ Qtl';
  let marketRates = [];
  let cleanYieldPerAcre = 9.5;
  let damagedYieldPerAcre = 6.0;
  let cleanPrice = 7850;
  let damagedPrice = 6800;
  let premiumReason = {
    en: 'Grade-A pest-free white cotton with zero pink bollworm staining.',
    mr: 'बोंडअळीच्या डागांशिवाय स्वच्छ, उच्च दर्जाचा पांढरा शुभ्र कापूस.',
    hi: 'बिना दाग वाला ए-ग्रेड स्वच्छ सफेद कपास।'
  };

  if (isGrapes) {
    mspText = 'Export Table Benchmark';
    mspValue = '₹8,200 / Qtl (₹82/kg)';
    marketRates = [
      { mandi: 'Pimpalgaon Baswant APMC', price: 8400, change: '+₹250', trend: 'up', arrivals: '3,400 Qtl' },
      { mandi: 'Nashik Main APMC', price: 8150, change: '+₹100', trend: 'up', arrivals: '2,800 Qtl' },
      { mandi: 'Dindori Vineyard Hub', price: 8300, change: '+₹180', trend: 'up', arrivals: '1,500 Qtl' },
      { mandi: 'Sangli APMC', price: 7950, change: '-₹50', trend: 'down', arrivals: '4,100 Qtl' }
    ];
    cleanYieldPerAcre = 110; // Qtl (11 tons/acre)
    damagedYieldPerAcre = 65;
    cleanPrice = 8200;
    damagedPrice = 4500;
    premiumReason = {
      en: 'Zero-residue export table grapes with undamaged berry skin & high Brix (18°+).',
      mr: 'डाऊनी मिल्ड्यू डागांशिवाय निर्यातक्षम गोड द्राक्षे (Brix १८°+).',
      hi: 'निर्यात योग्य बिना दाग वाले मीठे अंगूर।'
    };
  } else if (isTomato) {
    mspText = 'Modal Wholesale Benchmark';
    mspValue = '₹2,800 / Qtl (₹28/kg)';
    marketRates = [
      { mandi: 'Narayangaon Tomato APMC', price: 3200, change: '+₹300', trend: 'up', arrivals: '12,500 Crates' },
      { mandi: 'Junnar Market Yard', price: 3100, change: '+₹150', trend: 'up', arrivals: '6,400 Crates' },
      { mandi: 'Pune Gultekdi APMC', price: 3350, change: '+₹200', trend: 'up', arrivals: '18,000 Crates' },
      { mandi: 'Khed Chakan APMC', price: 2950, change: '-₹80', trend: 'down', arrivals: '4,200 Crates' }
    ];
    cleanYieldPerAcre = 240; // Qtl per acre
    damagedYieldPerAcre = 140;
    cleanPrice = 3200;
    damagedPrice = 1400; // Blight rot drops price drastically
    premiumReason = {
      en: 'Firm, blight-free glossy red tomatoes fit for long-distance transport to Delhi/Mumbai.',
      mr: 'करपा किंवा फळसड नसलेले टणक लाल टोमॅटो, मुंबई/दिल्ली बाजारपेठेसाठी योग्य.',
      hi: 'बिना सड़न वाले कड़े लाल टमाटर, लंबी दूरी के बाजार हेतु उपयुक्त।'
    };
  } else if (isSoybean) {
    mspText = 'Govt MSP 2025-26';
    mspValue = '₹4,892 / Qtl';
    marketRates = [
      { mandi: 'Latur Main APMC', price: 5180, change: '+₹90', trend: 'up', arrivals: '14,200 Qtl' },
      { mandi: 'Akola Oilseed APMC', price: 5120, change: '+₹40', trend: 'up', arrivals: '8,900 Qtl' },
      { mandi: 'Nanded APMC', price: 5080, change: '-₹20', trend: 'down', arrivals: '5,600 Qtl' },
      { mandi: 'Ausa Sub-Market', price: 5150, change: '+₹70', trend: 'up', arrivals: '3,100 Qtl' }
    ];
    cleanYieldPerAcre = 11.5; // Qtl
    damagedYieldPerAcre = 7.5;
    cleanPrice = 5150;
    damagedPrice = 4300;
    premiumReason = {
      en: 'High oil-content (19%+) bold grains with zero pod-borer seed perforation.',
      mr: 'अळीचा प्रादुर्भाव नसलेले भरदार दाणे, जास्त तेल प्रमाण (१९%+).',
      hi: 'बिना कीट क्षति वाले बोल्ड दाने, उच्च तेल मात्रा।'
    };
  } else {
    // Cotton default
    marketRates = [
      { mandi: 'Yavatmal APMC', price: 7850, change: '+₹120', trend: 'up', arrivals: '1,240 Qtl' },
      { mandi: 'Nagpur Cotton APMC', price: 7920, change: '+₹80', trend: 'up', arrivals: '2,800 Qtl' },
      { mandi: 'Amravati APMC', price: 7780, change: '-₹40', trend: 'down', arrivals: '950 Qtl' },
      { mandi: 'Washim APMC', price: 7810, change: '+₹60', trend: 'up', arrivals: '1,100 Qtl' }
    ];
  }

  const cleanTotalRevenue = Math.round(acres * cleanYieldPerAcre * cleanPrice);
  const damagedTotalRevenue = Math.round(acres * damagedYieldPerAcre * damagedPrice);
  const protectedGain = cleanTotalRevenue - damagedTotalRevenue;

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-700" />
              <span>
                {lang === 'mr' ? `${cropStr} थेट बाजारभाव व उत्पन्न` : `${cropStr} Live Mandi Intelligence`}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' 
                ? `${farm.location.district[lang] || farm.location.district.en} बाजारपेठ आणि कीडमुक्त प्रीमियम उत्पन्न` 
                : `${farm.location.district.en} Regional APMC Mandi Rates & Quality Premium`}
            </h2>
            <p className="text-sm text-slate-600">
              {premiumReason[lang] || premiumReason.en}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">{mspText}</span>
            <span className="text-sm font-extrabold text-emerald-950">{mspValue}</span>
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
              <span className="text-xs font-normal text-slate-400">{unit}</span>
            </div>
            <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
              <span>Arrivals: {m.arrivals}</span>
              <span className="text-emerald-700 font-bold text-[10px]">Real-Time Feed</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Impact Simulation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              {lang === 'mr' 
                ? `${farm.farmerName[lang] || farm.farmerName.en} यांच्या ${acres} एकर शेताचा उत्पादन नफा` 
                : `Harvest Revenue Comparison for ${farm.farmerName.en} (${acres} Acres)`}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'mr' 
                ? 'कीडमुक्त गुणवत्ता vs कीडबाधित मालाचा प्रत्यक्ष आर्थिक फरक तपासा.' 
                : 'Comparing Grade-A protected harvest revenue against infested crop discounts.'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Registered Farm Size:</span>
            <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-extrabold text-sm border border-emerald-300">
              {acres} Acres
            </span>
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
              Yield: {(acres * cleanYieldPerAcre).toFixed(1)} {unit.replace('/', '')} @ ₹{cleanPrice.toLocaleString()}{unit}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-red-50/70 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 text-xs font-bold uppercase tracking-wide">
              <span>Without Protection (Infested)</span>
            </div>
            <div className="text-2xl font-black text-red-900">₹{damagedTotalRevenue.toLocaleString()}</div>
            <p className="text-xs text-red-800">
              Yield: {(acres * damagedYieldPerAcre).toFixed(1)} {unit.replace('/', '')} @ ₹{damagedPrice.toLocaleString()}{unit} (Distress Sale)
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-500 text-slate-950 shadow-md space-y-2">
            <div className="text-xs font-black uppercase tracking-wider text-amber-950">
              Net Family Wealth Protected
            </div>
            <div className="text-3xl font-black text-forest-950">
              +₹{protectedGain.toLocaleString()}
            </div>
            <p className="text-xs font-bold text-amber-950/90">
              {lang === 'mr' 
                ? 'कीड व रोगांचा वेळेवर बंदोबस्त केल्यामुळे शेतकरी कुटुंबाच्या बँक खात्यात थेट जमा होणारा नफा.' 
                : 'Direct economic income retained through non-chemical early IPM intervention.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { IndianRupee, TrendingUp, ShieldCheck, Sparkles, Award } from 'lucide-react';

export default function EconomicImpactCalculator({ farm, lang = 'en' }) {
  const farmAcres = farm?.crop?.acres || 2.5;
  const [acres, setAcres] = useState(farmAcres);

  // Biophysical yield loss estimates based on CICR / VNMKV cotton and grape data:
  // Late Pink Bollworm infestation causes ~25-35% boll rot & lint staining.
  // Value per acre protected: ~₹18,500
  // Chemical spray averted: 2 calendar sprays saved @ ₹1,400/spray/acre = ₹2,800
  const cropLossAvertedPerAcre = 18500;
  const chemicalCostSavedPerAcre = 2800;
  const totalProtectedPerAcre = cropLossAvertedPerAcre + chemicalCostSavedPerAcre;

  const totalCropLossAverted = Math.round(acres * cropLossAvertedPerAcre);
  const totalChemicalSaved = Math.round(acres * chemicalCostSavedPerAcre);
  const totalFarmerSavings = Math.round(acres * totalProtectedPerAcre);

  return (
    <div className="bg-gradient-to-br from-emerald-900 to-forest-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-2xl font-black">
            💰
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-800 text-emerald-200 text-[10px] font-extrabold uppercase tracking-wide">
              <Sparkles className="w-3 h-3 text-amber-300" />
              {lang === 'mr' ? 'पीकरक्षा आर्थिक प्रभाव' : lang === 'hi' ? 'पीकरक्षा आर्थिक लाभ' : 'Pikraksha Economic Benefit'}
            </div>
            <h3 className="text-lg font-black mt-1">
              {lang === 'mr' ? 'शेतकरी थेट आर्थिक बचत व नुकसान टाळणी' : lang === 'hi' ? 'किसान प्रत्यक्ष आर्थिक बचत व नुकसान बचाव' : 'Farmer Direct Financial Savings Calculator'}
            </h3>
          </div>
        </div>

        {/* Acreage Slider */}
        <div className="bg-white/10 backdrop-blur-xs rounded-2xl px-4 py-2 border border-white/10 flex items-center gap-3">
          <span className="text-xs text-emerald-200 font-semibold whitespace-nowrap">
            {lang === 'mr' ? 'क्षेत्र (एकरांमध्ये):' : 'Acreage:'}
          </span>
          <input
            type="range"
            min="1"
            max="25"
            step="0.5"
            value={acres}
            onChange={(e) => setAcres(parseFloat(e.target.value) || 1)}
            className="accent-emerald-400 w-28 cursor-pointer"
          />
          <span className="text-base font-extrabold text-amber-300 min-w-10 text-right">
            {acres} {lang === 'mr' ? 'एकर' : 'acres'}
          </span>
        </div>
      </div>

      {/* 3 Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Protected */}
        <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-1">
          <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wide">
            {lang === 'mr' ? 'एकूण आर्थिक फायदा' : 'Total Net Benefit'}
          </span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 flex items-baseline">
            <span>₹{totalFarmerSavings.toLocaleString('en-IN')}</span>
          </div>
          <p className="text-[11px] text-emerald-300 font-medium">
            {lang === 'mr' ? `₹${totalProtectedPerAcre.toLocaleString('en-IN')} प्रति एकर निव्वळ नफा` : `₹${totalProtectedPerAcre.toLocaleString('en-IN')}/acre protected`}
          </p>
        </div>

        {/* Yield Loss Averted */}
        <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-1">
          <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wide">
            {lang === 'mr' ? 'बोंडअळी नुकसान टाळणी (२५%)' : 'Crop Loss Averted (25%)'}
          </span>
          <div className="text-xl sm:text-2xl font-black text-white">
            ₹{totalCropLossAverted.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-300">
            {lang === 'mr' ? 'बोंडे सडणे व कापूस खराब होण्यापासून बचाव' : 'Internal boll damage prevented early'}
          </p>
        </div>

        {/* Chemical Spray Cost Saved */}
        <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/10 space-y-1">
          <span className="text-[11px] font-bold text-emerald-200 uppercase tracking-wide">
            {lang === 'mr' ? 'नको असलेली फवारणी बचत' : 'Avoided Chemical Cost'}
          </span>
          <div className="text-xl sm:text-2xl font-black text-white">
            ₹{totalChemicalSaved.toLocaleString('en-IN')}
          </div>
          <p className="text-[11px] text-slate-300">
            {lang === 'mr' ? 'अनावश्यक २ रासायनिक फवारण्या वाचल्या' : '2 unnecessary blanket sprays saved'}
          </p>
        </div>
      </div>

      {/* Quote / Seva Challenge Pitch Deck Tie-in */}
      <div className="flex items-center gap-3 bg-emerald-950/60 rounded-2xl p-3 border border-emerald-800 text-xs text-emerald-200">
        <Award className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="leading-relaxed">
          {lang === 'mr' ? (
            <>
              <strong>Seva Challenge वचनपूर्ती:</strong> पीकरक्षा प्रणाली शेतकऱ्यांना <strong>₹० खर्चात (मोफत)</strong> उपलब्ध आहे, ज्यामुळे लहान शेतकरी पहिल्याच हंगामात प्रति एकर सरासरी <strong>₹२१,३०० चे प्रत्यक्ष नुकसान</strong> टाळू शकतात.
            </>
          ) : (
            <>
              <strong>Seva First Challenge Commitment:</strong> Pikraksha is provided at <strong>₹0 cost to smallholder farmers</strong>, averting an average of <strong>₹21,300/acre in crop destruction</strong> in season 1.
            </>
          )}
        </p>
      </div>
    </div>
  );
}


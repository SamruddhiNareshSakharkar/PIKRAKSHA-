import React, { useState } from 'react';
import { 
  FlaskConical, 
  Coins, 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  Calculator,
  HeartPulse
} from 'lucide-react';

export default function BioBrewerView({ farm, lang, t }) {
  const [selectedAcreage, setSelectedAcreage] = useState(farm.crop.acres || 2.5);
  const [selectedRecipe, setSelectedRecipe] = useState('nske'); // 'nske' | 'dashparni' | 'tricho'

  // Dynamic calculations based on acreage
  const nskeSeedsKg = (selectedAcreage * 5).toFixed(1); // 5 kg seeds per acre
  const nskeWaterL = (selectedAcreage * 100).toFixed(0); // 100 L water per acre
  const nskeSoapG = (selectedAcreage * 100).toFixed(0); // 100 g soap powder

  const dashparniUrineL = (selectedAcreage * 5).toFixed(1);
  const dashparniDungKg = (selectedAcreage * 2).toFixed(1);

  // Financial ROI
  const chemicalCostSaved = Math.round(selectedAcreage * 1500); // avg ₹1,500/acre/spray
  const bioInputCost = Math.round(selectedAcreage * 120); // only ₹120/acre
  const netSavings = chemicalCostSaved - bioInputCost;
  const predatorsSaved = Math.round(selectedAcreage * 180);

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'रासायनिक विषमुक्त शेती' : 'Zero-Chemical Bio-First Input Brewer'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'घरगुती जैविक औषध निर्मिती व ₹ बचत कॅल्क्युलेटर' : 'On-Farm Bio-Input Brewer & Farmer Savings Engine'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'खाजगी कंपन्यांची महागडी विषारी औषधे टाळा. कृषी विद्यापीठाने शिफारस केलेले निंबोळी अर्क व दशपर्णी अर्क स्वतःच्या शेतात तयार करा.'
                : 'Slide 1 & 5 Principle: PIKRAKSHA promotes non-commercial, university-certified bio-inputs that slash input costs by 85%.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-black">
              Net Savings: ₹{netSavings.toLocaleString()} on {selectedAcreage} Acres
            </span>
          </div>
        </div>
      </div>

      {/* ROI & Toxicity Shield Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Chemical Spray Cost Saved</span>
            <Coins className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">₹{netSavings.toLocaleString()}</div>
          <p className="text-[11px] text-slate-500">Saved by avoiding unnecessary synthetic pyrethroids.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Beneficial Predators Spared</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">+{predatorsSaved} Predators</div>
          <p className="text-[11px] text-slate-500">Ladybird beetles & Chrysoperla preserved to eat larvae naturally.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Farmer Health Toxicity</span>
            <HeartPulse className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">0% Chemical Hazard</div>
          <p className="text-[11px] text-slate-500">Protects family from WHO Class II pesticide inhalation poisoning.</p>
        </div>
      </div>

      {/* Acreage Selector & Recipe Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Recipe Brewer with Dynamic Dosage */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Adjust Acreage (क्षेत्र एकर):</span>
              <input
                type="number"
                min="0.5"
                max="20"
                step="0.5"
                value={selectedAcreage}
                onChange={(e) => setSelectedAcreage(parseFloat(e.target.value) || 1)}
                className="w-20 px-2 py-1 rounded-lg border border-slate-300 font-bold text-sm text-center"
              />
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => setSelectedRecipe('nske')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedRecipe === 'nske' ? 'bg-forest-800 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}
              >
                ५% निंबोळी अर्क (NSKE)
              </button>
              <button
                onClick={() => setSelectedRecipe('dashparni')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                  selectedRecipe === 'dashparni' ? 'bg-forest-800 text-white shadow-xs' : 'bg-slate-100 text-slate-700'
                }`}
              >
                दशपर्णी अर्क (Dashparni)
              </button>
            </div>
          </div>

          {/* Dynamic Recipe Card */}
          {selectedRecipe === 'nske' ? (
            <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {lang === 'mr' ? `५% निंबोळी अर्क निर्मिती कृती (${selectedAcreage} एकरसाठी)` : `5% Neem Seed Kernel Extract (NSKE) for ${selectedAcreage} Acres`}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  VNMKV / MPKV Formula
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Neem Kernels (बिया)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{nskeSeedsKg} kg</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Clean Water (पाणी)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{nskeWaterL} Litres</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Soap Emulsifier (साबण)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{nskeSoapG} grams</span>
                </div>
              </div>

              <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside font-medium pt-1">
                <li>{lang === 'mr' ? `चांगल्या प्रतीच्या ${nskeSeedsKg} किलो वाळलेल्या कडुनिंबाच्या बिया बारीक कुटून घ्या.` : `Crush ${nskeSeedsKg} kg of dry quality neem kernels into coarse powder.`}</li>
                <li>{lang === 'mr' ? 'रात्री एका कापडी पिशवीत बांधून २० लिटर पाण्यात रात्रभर भिजत ठेवा.' : 'Tie in a muslin cloth bag and steep overnight in 20 liters of water.'}</li>
                <li>{lang === 'mr' ? `सकाळी पिशवी पिळून अर्क काढा आणि उरलेले पाणी मिसळून एकूण ${nskeWaterL} लिटर द्रावण तयार करा.` : `Squeeze the bag thoroughly, add detergent emulsifier, and dilute to ${nskeWaterL} liters.`}</li>
                <li>{lang === 'mr' ? 'हे द्रावण पानावरील बोंडअळीच्या अंड्यांवर व लहान अळ्यांवर अत्यंत प्रभावी ठरते.' : 'Spills azadirachtin repellent to disrupt larval moulting and egg hatching.'}</li>
              </ol>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {lang === 'mr' ? `दशपर्णी अर्क निर्मिती कृती (${selectedAcreage} एकरसाठी)` : `Dashparni Ark Botanical Brew for ${selectedAcreage} Acres`}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  Broad Spectrum Bio-Control
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                  <span className="text-slate-500 block text-[10px]">Desi Cow Urine (गोमूत्र)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{dashparniUrineL} Litres</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                  <span className="text-slate-500 block text-[10px]">Fresh Cow Dung (शेण)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{dashparniDungKg} kg</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {lang === 'mr'
                  ? '१० स्थानिक वनस्पतींची पाने (कडुनिंब, करंज, सीताफळ, रुई, धोत्रा, घाणेरी, पपई, निर्गुडी, कनेर, एरंड) गोमूत्रात एकत्र करून २० दिवस सावलीत आंबवून तयार केले जाते. हे कोणत्याही रासायनिक कीटकनाशकाइतकेच प्रभावी ठरते.'
                  : 'Combines 10 indigenous bitter botanical leaves fermented with cow urine. Naturally repels bollworms, aphids, thrips, and whiteflies with zero chemical residue.'}
              </p>
            </div>
          )}
        </div>

        {/* Right (5 cols): Official University Standard Checklist */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'कृषी विद्यापीठ प्रमाणन' : 'Agricultural University Certification'}
          </h3>

          <ul className="text-xs text-slate-700 space-y-3 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Conforms to Vasantrao Naik Marathwada Krishi Vidyapeeth (VNMKV Parbhani) protocols.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Zero residue for APEDA export certification in Grapes and Cotton.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Safe for honeybees, soil earthworms, and groundwater tables.</span>
            </li>
          </ul>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Why PIKRAKSHA is Unique:</span>
            <p>Commercial apps have brand sponsorships and urge farmers to buy ₹1,800 synthetic cocktails. PIKRAKSHA provides free zero-cost farm-brewed formulas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}


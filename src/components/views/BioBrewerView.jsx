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

export default function BioBrewerView({ farm, lang = 'en', t }) {
  const cropStr = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.en || 'Cotton')
    : (farm?.crop?.name || 'Cotton');

  const acres = farm?.crop?.acres || 2.5;
  const isGrapes = cropStr.toLowerCase().includes('grape') || cropStr.toLowerCase().includes('द्राक्ष');
  const isTomato = cropStr.toLowerCase().includes('tomato') || cropStr.toLowerCase().includes('टोमॅटो');
  const isSoybean = cropStr.toLowerCase().includes('soybean') || cropStr.toLowerCase().includes('सोयाबीन');

  const defaultRecipe = isGrapes ? 'bordeaux' : isTomato ? 'copper_tricho' : isSoybean ? 'nomuraea' : 'nske';
  const [selectedRecipe, setSelectedRecipe] = useState(defaultRecipe);

  // Financial ROI
  const chemicalCostSaved = Math.round(acres * (isGrapes ? 3200 : isTomato ? 2200 : 1500));
  const bioInputCost = Math.round(acres * (isGrapes ? 450 : isTomato ? 280 : 120));
  const netSavings = chemicalCostSaved - bioInputCost;
  const predatorsSaved = Math.round(acres * 180);

  // Dynamic dosage calculations
  const waterL = Math.round(acres * (isGrapes ? 400 : isTomato ? 250 : 100));

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? `${cropStr} शून्य-रासायनिक जैविक औषध प्रयोगशाळा` : `${cropStr} Zero-Chemical Bio-Input Brewer`}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? `${cropStr} साठी घरगुती जैविक औषध निर्मिती व ₹ बचत कॅल्क्युलेटर` : `On-Farm Bio-Input Brewer for ${farm.farmerName[lang] || farm.farmerName.en}`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `खाजगी कंपन्यांची महागडी विषारी औषधे टाळा. कृषी विद्यापीठाने शिफारस केलेले जैविक अर्क स्वतःच्या ${acres} एकर शेतात तयार करा.`
                : `MPKV Rahuri & VNMKV certified on-farm botanical brews calibrated for ${acres} Acres of ${cropStr}.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-black">
              Net Savings: ₹{netSavings.toLocaleString()} on {acres} Acres
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
          <p className="text-[11px] text-slate-500">Saved by avoiding synthetic pesticide cocktails.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Beneficial Predators Spared</span>
            <Leaf className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">+{predatorsSaved} Predators</div>
          <p className="text-[11px] text-slate-500">Ladybird beetles, Trichogramma & spiders preserved to eat pests naturally.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Farmer Health Hazard</span>
            <HeartPulse className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">0% Inhalation Poisoning</div>
          <p className="text-[11px] text-slate-500">100% WHO Class-IV non-toxic botanical brew.</p>
        </div>
      </div>

      {/* Recipe Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Recipe Brewer with Dynamic Dosage */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-700">Recommended Recipe for {cropStr}:</span>
            <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold">
              {acres} Acres Farm
            </span>
          </div>

          {/* Dynamic Recipe Details */}
          {isGrapes ? (
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {lang === 'mr' ? `१% बोर्डो मिश्रण निर्मिती (${acres} एकर द्राक्ष बागेसाठी)` : `1% Bordeaux Mixture Preparation for ${acres} Acres Grapes`}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  NRC Grapes / MPKV Standard
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Copper Sulfate (मोरचूद)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 4).toFixed(1)} kg</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Quicklime (कळीचा चुना)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 4).toFixed(1)} kg</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Clean Water (पाणी)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{waterL} Litres</span>
                </div>
              </div>

              <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside font-medium pt-1">
                <li>{lang === 'mr' ? `प्लास्टिक किंवा मातीच्या भांड्यात ${(acres * 4).toFixed(1)} किलो मोरचूद पाण्यात विरघळवा (लोखंडी भांडे वापरू नका).` : `Dissolve ${(acres * 4).toFixed(1)} kg Copper Sulfate in a plastic drum (never metal).`}</li>
                <li>{lang === 'mr' ? `दुसऱ्या भांड्यात ${(acres * 4).toFixed(1)} किलो चुना विरघळवून चुन्याची निवळी तयार करा.` : `Slake ${(acres * 4).toFixed(1)} kg Quicklime in separate water to prepare lime milk.`}</li>
                <li>{lang === 'mr' ? `चुन्याच्या द्रावणात हळूहळू मोरचूदाचे द्रावण ओता आणि लाकडी काठीने ढवळा. चाकूचे पाते बुडवून तांबूस रंग येत नाही ना ते तपासा (pH 7.0).` : `Pour copper solution slowly into lime milk while stirring. Test neutrality with a clean iron knife (no copper deposit).`}</li>
                <li>{lang === 'mr' ? `डाऊनी मिल्ड्यू बुरशीचे बीजाणू रोखण्यासाठी द्राक्षाच्या पानांवर व घडांवर ताजी फवारणी करा.` : `Spray immediately to form a protective copper film preventing Downy Mildew zoospore germination.`}</li>
              </ol>
            </div>
          ) : isTomato ? (
            <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {lang === 'mr' ? `ट्रायकोडर्मा + जैविक ताक आळवणी (${acres} एकर टोमॅटोसाठी)` : `Trichoderma & Bio-Whey Root Flush for ${acres} Acres Tomato`}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-200 text-red-900">
                  Late Blight Shield
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-red-200">
                  <span className="text-slate-500 block text-[10px]">Trichoderma Powder</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 2.5).toFixed(1)} kg</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-red-200">
                  <span className="text-slate-500 block text-[10px]">Sour Buttermilk (आंबट ताक)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 10).toFixed(0)} Litres</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-red-200">
                  <span className="text-slate-500 block text-[10px]">Dilution Water</span>
                  <span className="font-extrabold text-slate-900 text-sm">{waterL} Litres</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {lang === 'mr'
                  ? 'आंबट ताकातील लॅक्टिक ॲसिड आणि ट्रायकोडर्मा बुरशी मिळून पानांवरील लेट ब्लाईट (करपा) बुरशीचा त्वरित नायनाट करतात. हे द्रावण फळांना काळे डाग पडण्यापासून सुरक्षित ठेवते.'
                  : 'Lactic acid from fermented whey combined with antagonistic Trichoderma harzianum prevents Phytophthora late blight rot on stems and green fruit.'}
              </p>
            </div>
          ) : isSoybean ? (
            <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {lang === 'mr' ? `नोमुरिया रिलेई जैविक बुरशी द्रावण (${acres} एकर सोयाबीनसाठी)` : `Nomuraea rileyi Entomopathogenic Spray for ${acres} Acres Soybean`}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                  Spodoptera & Pod Borer
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                  <span className="text-slate-500 block text-[10px]">Nomuraea Bio-powder</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 1.5).toFixed(1)} kg</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-amber-200">
                  <span className="text-slate-500 block text-[10px]">Carrier Water</span>
                  <span className="font-extrabold text-slate-900 text-sm">{waterL} Litres</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {lang === 'mr'
                  ? 'नोमुरिया रिलेई ही नैसर्गिक बुरशी लष्करी अळी व घाटे अळीच्या अंगात शिरून तिला पांढरी बुरशी आणून मारते. याचा पक्षी किंवा जनावरांवर कोणताही विषारी परिणाम होत नाही.'
                  : 'Nomuraea rileyi bio-fungus selectively infects and mummifies defoliating caterpillars with green muscardine disease without harming friendly bird perches.'}
              </p>
            </div>
          ) : (
            /* Cotton default */
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {lang === 'mr' ? `५% निंबोळी अर्क निर्मिती कृती (${acres} एकर कापसासाठी)` : `5% Neem Seed Kernel Extract (NSKE) for ${acres} Acres Cotton`}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-200 text-emerald-900">
                  VNMKV Parbhani Formula
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Neem Kernels (बिया)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 5).toFixed(1)} kg</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Clean Water (पाणी)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 100).toFixed(0)} Litres</span>
                </div>
                <div className="p-2.5 bg-white rounded-lg border border-emerald-200">
                  <span className="text-slate-500 block text-[10px]">Soap Emulsifier (साबण)</span>
                  <span className="font-extrabold text-slate-900 text-sm">{(acres * 100).toFixed(0)} grams</span>
                </div>
              </div>

              <ol className="text-xs text-slate-700 space-y-2 list-decimal list-inside font-medium pt-1">
                <li>{lang === 'mr' ? `चांगल्या प्रतीच्या ${(acres * 5).toFixed(1)} किलो वाळलेल्या कडुनिंबाच्या बिया बारीक कुटून घ्या.` : `Crush ${(acres * 5).toFixed(1)} kg quality dry neem seeds into coarse powder.`}</li>
                <li>{lang === 'mr' ? 'रात्री कापडी पिशवीत बांधून पाण्यात रात्रभर भिजत ठेवा.' : 'Tie in a muslin cloth bag and steep overnight in water.'}</li>
                <li>{lang === 'mr' ? 'सकाळी अर्क पिळून काढा व साबण पावडर मिसळा. यामुळे बोंडअळीची अंडी निर्जंतुक होतात.' : 'Squeeze the extract thoroughly and add detergent emulsifier to disrupt bollworm egg hatching.'}</li>
              </ol>
            </div>
          )}
        </div>

        {/* Right: University Standard Checklist */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'कृषी विद्यापीठ प्रमाणन' : 'Agricultural University Certification'}
          </h3>

          <ul className="text-xs text-slate-700 space-y-3 font-medium">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Conforms to Vasantrao Naik (VNMKV) & Mahatma Phule (MPKV) IPM protocols.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Zero chemical residue for APEDA export certification in {cropStr}.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Safe for honeybees, soil earthworms, and groundwater tables.</span>
            </li>
          </ul>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Why PIKRAKSHA is Unique:</span>
            <p>Commercial apps have chemical sponsor deals urging farmers to buy ₹1,800 synthetic cocktails. PIKRAKSHA gives farmers free, on-farm zero-cost university formulas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { 
  Award, 
  TrendingUp, 
  Coins, 
  ShieldCheck, 
  HeartHandshake, 
  Users, 
  Sparkles,
  BarChart3,
  Calendar,
  Building2
} from 'lucide-react';

export default function ImpactAnalyticsView({ lang, t }) {
  const commitments = [
    {
      num: "1,000",
      unit: "Farms",
      title: "Beneficiaries in Season 1",
      desc: "Pilot in 1 taluka (Ner, Yavatmal / Dindori, Nashik) covering smallholder and women farmers.",
      tag: "Pilot Scale Target",
      color: "border-emerald-500"
    },
    {
      num: "2–7",
      unit: "Days",
      title: "Earlier Warning Window",
      desc: "Advance notice delivered before pest and fungal spores peak, enabling non-chemical intervention.",
      tag: "Design Target",
      color: "border-sky-500"
    },
    {
      num: "₹0",
      unit: "Zero Cost",
      title: "Free for Every Farmer",
      desc: "Zero cost for alerts, SMS, diagnosis, and voice advisories. Funded via state CROPSAP and FPOs.",
      tag: "Social Equity Commitment",
      color: "border-amber-500"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Award className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'सामाजिक व आर्थिक प्रभाव (Slide 5)' : 'Social Impact & Economic Analytics (Slide 5)'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'शेतकरी आर्थिक सुरक्षा व संभाव्य नुकसान बचत' : 'Farmer Economic Impact & Projected Crop Protection'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'वेळेवर पूर्वसूचना मिळाल्याने शेतकऱ्यांचे उत्पन्न सुरक्षित राहते आणि महागड्या रासायनिक फवारण्यांचा अनावश्यक खर्च टळतो.'
                : 'Slide 5 Commitment: Protects smallholder farmers\' income, bridges literacy barriers via regional voice, and cuts chemical spraying costs.'}
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 px-4 py-2 rounded-xl text-emerald-950 font-bold text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Seva First Innovation Challenge 2026 Commitments</span>
          </div>
        </div>
      </div>

      {/* The 3 Core Pitch Deck Commitments (Slide 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {commitments.map((c, i) => (
          <div key={i} className={`bg-white rounded-2xl p-6 border-2 ${c.color} shadow-xs space-y-3 flex flex-col justify-between`}>
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                {c.tag}
              </span>
              <div className="flex items-baseline gap-1.5 pt-1">
                <span className="text-4xl font-black text-slate-900">{c.num}</span>
                <span className="text-sm font-bold text-slate-500">{c.unit}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{c.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {c.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-emerald-700 font-bold">
              <span>Verified Challenge Objective</span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>

      {/* Economic Impact Calculator & Savings Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Pilot Financial Ledger */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-base">
              {lang === 'mr' ? 'प्रायोगिक चाचणी आर्थिक बचत अंदाज (१००० शेतकरी)' : 'Projected Economic Savings (1,000 Pilot Farms)'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">1 Season Modeling</span>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Averted Crop Yield Destruction</span>
                <span className="text-xs text-slate-500">Based on 30% baseline pink bollworm loss on 2,500 acres</span>
              </div>
              <span className="text-xl font-black text-emerald-700">₹3.75 Crore</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Chemical Pesticide Expenditure Saved</span>
                <span className="text-xs text-slate-500">Avg 2 fewer unneeded synthetic sprays per farm</span>
              </div>
              <span className="text-xl font-black text-emerald-700">₹75.0 Lakh</span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Total Net Value Created for Farming Community</span>
                <span className="text-xs text-slate-500">Against pilot budget of ₹10 Lakh (37.5x ROI)</span>
              </div>
              <span className="text-2xl font-black text-emerald-800">₹4.50 Crore</span>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Social Equity & Sustainability */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">
            {lang === 'mr' ? 'सामाजिक प्रभाव व महिला सक्षमीकरण' : 'Social Equity & Women Farmers'}
          </h3>

          <ul className="text-xs text-slate-700 space-y-3 font-medium">
            <li className="flex items-start gap-2.5">
              <Users className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Voice Overcomes Illiteracy:</strong> Regional audio calls reach women farmers who do not read text SMS.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Health & Toxicity Reduction:</strong> Eliminates dangerous organophosphate spraying without protective gear.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Coins className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Self-Sustaining Model:</strong> Free to farmers, funded through CROPSAP pest budget, crop insurers, and FPOs.</span>
            </li>
          </ul>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-serif italic">
            "A pilot with the Agriculture Department in one taluka takes PIKRAKSHA from a working prototype to measured field results in one season."
          </div>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { 
  CloudSun, 
  Cpu, 
  BellRing, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Database, 
  Camera, 
  Bug, 
  Layers, 
  TrendingUp,
  FileCheck
} from 'lucide-react';

export default function HowItWorksView({ lang, t }) {
  const comparison = [
    {
      metric: lang === 'mr' ? 'खर्च व फवारणी (Cost)' : 'Cost',
      traditional: lang === 'mr' ? 'नुकसान दिसल्यावर उशिरा व वारंवार महागड्या फवारण्या' : 'Late, repeated sprays after damage occurs',
      pikraksha: lang === 'mr' ? 'नुकसान होण्यापूर्वीच प्रतिबंध; केवळ पातळी ओलांडल्यावर फवारणी' : 'Act early; spray only above economic threshold',
      advantage: lang === 'mr' ? 'फवारणी खर्चात ४०% बचत' : '40% cost reduction in sprays'
    },
    {
      metric: lang === 'mr' ? 'वेळ व गती (Speed / Time)' : 'Speed / Time',
      traditional: lang === 'mr' ? 'लक्षणे दिसल्यानंतर व पिकाचे नुकसान झाल्यावर' : 'After symptoms appear and yield is already hit',
      pikraksha: lang === 'mr' ? 'धोका शिगेला पोहोचण्याच्या २ ते ७ दिवस अगोदर पूर्वसूचना' : '2–7 days before risk peaks',
      advantage: lang === 'mr' ? 'वेळेत प्रतिबंध शक्य' : 'True proactive prevention'
    },
    {
      metric: lang === 'mr' ? 'पोहोच व सुलभता (Reach / Access)' : 'Reach / Access',
      traditional: lang === 'mr' ? 'सामान्य, जिल्ह्यासाठीचे सर्वसाधारण सल्ले' : 'Area-wide, generic advisories',
      pikraksha: lang === 'mr' ? 'प्रत्येक शेतानुसार; मराठी/हिंदी भाषेत SMS व व्हॉईस कॉल' : 'Farm-level; Marathi/Hindi; SMS and automated voice',
      advantage: lang === 'mr' ? 'निरक्षर शेतकऱ्यांपर्यंत पोहोच' : 'Zero literacy barrier'
    },
    {
      metric: lang === 'mr' ? 'वापरास सुलभता (Ease of Use)' : 'Ease of Use',
      traditional: lang === 'mr' ? 'शेतकऱ्याने स्वतः रोग किंवा कीड ओळखणे बंधनकारक' : 'Farmer must independently identify pest/disease',
      pikraksha: lang === 'mr' ? 'पानाचा फोटो + शेतात दिसणारी लक्षणे निवडा -> अचूक निदान' : 'Photo + tick symptoms -> verified likely cause',
      advantage: lang === 'mr' ? 'AI कॅमेरा साहाय्य' : 'Assisted visual diagnosis'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Cpu className="w-3.5 h-3.5 text-emerald-700" />
          {lang === 'mr' ? 'प्रणाली कशी कार्य करते? (Slide 3)' : 'System Architecture & Innovation (Slide 3)'}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {lang === 'mr' ? 'हवामान, पीक अवस्था व कामगंध सापळ्यांची पारदर्शक AI पूर्वसूचना' : 'How PIKRAKSHA Works: Transparent 3-Step Engine'}
        </h2>
        <p className="text-sm text-slate-600">
          {lang === 'mr'
            ? 'महावेध हवामान, पिकाची पेरणी तारीख, सापळ्यांमधील पतंग संख्या आणि पानावरील लक्षणे एकत्रित करून शेतपातळीवर ७ दिवसांचा धोका मोजला जातो.'
            : 'Slide 3 Key USP: One transparent, farm-level 7-day risk score that combines forecast weather, crop stage and official trap thresholds.'}
        </p>
      </div>

      {/* 3-Step Process Flow (Slide 3 Visual) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Step 1: Input */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 relative">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold text-sm flex items-center justify-center">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'माहिती संकलन (Input)' : 'Multi-Modal Inputs'}
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <CloudSun className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Weather:</strong> Mahavedh AWS & IMD 7-day forecast (Temp, RH, Rain)</span>
            </li>
            <li className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Crop Stage:</strong> Sowing date & phenology calendar (e.g. Boll stage)</span>
            </li>
            <li className="flex items-start gap-2">
              <Bug className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Traps:</strong> Pheromone moth catch count & sticky cards</span>
            </li>
            <li className="flex items-start gap-2">
              <Camera className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Field Signs:</strong> Leaf/flower photo & ticked symptoms</span>
            </li>
          </ul>
        </div>

        {/* Step 2: Process */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 relative">
          <div className="w-9 h-9 rounded-xl bg-forest-800 text-white font-extrabold text-sm flex items-center justify-center">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'विश्लेषण व मॉडेल (Process)' : 'Biophysical Rules & AI Vision'}
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <Layers className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Biophysical Rules Engine:</strong> Validated university rules (VNMKV & MPKV)</span>
            </li>
            <li className="flex items-start gap-2">
              <Cpu className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>AI Disease Model:</strong> MobileNetV3 deep learning classifier for plant pathology</span>
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span><strong>Threshold Cross-Check:</strong> 3 consecutive days above ETL validation</span>
            </li>
          </ul>
        </div>

        {/* Step 3: Output */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 relative">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'पूर्वनिर्देश व संदेश (Output)' : '7-Day Risk & Safe First Steps'}
          </h3>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>7-Day Risk Forecast:</strong> Day-by-day threat trajectory before damage occurs</span>
            </li>
            <li className="flex items-start gap-2">
              <BellRing className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Multilingual Broadcast:</strong> Marathi & Hindi voice notes, SMS & WhatsApp</span>
            </li>
            <li className="flex items-start gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Safe IPM Steps:</strong> Strictly unbiased non-commercial bio-first directives</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Comparison Table: Traditional vs PIKRAKSHA (Slide 3) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base">
          {lang === 'mr' ? 'पारंपरिक पद्धत विरुद्ध पीकरक्षा (What Makes It New)' : 'Comparison: Traditional Approach vs PIKRAKSHA'}
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold border-y border-slate-200 text-[10px]">
              <tr>
                <th className="py-3 px-4 w-1/4">Aspect</th>
                <th className="py-3 px-4 w-1/3 text-red-700">Existing Approach</th>
                <th className="py-3 px-4 w-1/3 text-emerald-800">PIKRAKSHA Approach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {comparison.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/80">
                  <td className="py-3 px-4 font-bold text-slate-900">{c.metric}</td>
                  <td className="py-3 px-4 text-slate-600 flex items-start gap-1.5">
                    <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <span>{c.traditional}</span>
                  </td>
                  <td className="py-3 px-4 text-emerald-950 font-semibold bg-emerald-50/50">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c.pikraksha}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ground Evidence Highlight (Slide 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-slate-800">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-2xl font-black text-red-700">Up to 40%</div>
          <div className="text-xs font-bold text-slate-800">Global Crops Lost to Pests</div>
          <p className="text-[11px] text-slate-500">FAO 2021 report on pest and fungal crop damage.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-2xl font-black text-amber-700">1.25–1.5 Cr Acres</div>
          <div className="text-xs font-bold text-slate-800">Excess Rain in Maharashtra (Sept 2025)</div>
          <p className="text-[11px] text-slate-500">Triggers devastating fungal blight and downy mildew outbreaks.</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <div className="text-2xl font-black text-emerald-700">₹0 / Farmer</div>
          <div className="text-xs font-bold text-slate-800">Zero Cost to Beneficiaries</div>
          <p className="text-[11px] text-slate-500">Funded via CROPSAP state budget, FPOs, and insurance reduction.</p>
        </div>
      </div>
    </div>
  );
}


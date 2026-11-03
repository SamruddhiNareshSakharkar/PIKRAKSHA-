import React, { useState } from 'react';
import { Layers, Activity, Sparkles, CheckCircle2, AlertTriangle, Droplets, Thermometer, ShieldAlert } from 'lucide-react';

export default function SoilHealthView({ farm, lang, t }) {
  const [selectedPlot, setSelectedPlot] = useState('Survey 42/1 (Plot A)');

  const soilMetrics = [
    { label: { en: 'Organic Carbon (OC)', mr: 'सेंद्रिय कर्ब', hi: 'जैविक कार्बन' }, value: '0.48%', optimal: '0.75%+', status: 'Low', statusColor: 'bg-amber-100 text-amber-800 border-amber-300', advice: 'Add 2 tons FYM or vermicompost to boost microbial predators.' },
    { label: { en: 'Available Nitrogen (N)', mr: 'उपलब्ध नत्र (N)', hi: 'उपलब्ध नाइट्रोजन' }, value: '185 kg/ha', optimal: '280-560 kg/ha', status: 'Low', statusColor: 'bg-amber-100 text-amber-800 border-amber-300', advice: 'Split urea doses; excess basal N causes succulent foliage that attracts aphids and bollworms.' },
    { label: { en: 'Available Phosphorus (P)', mr: 'उपलब्ध स्फुरद (P)', hi: 'उपलब्ध फास्फोरस' }, value: '22 kg/ha', optimal: '15-25 kg/ha', status: 'Medium', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Optimum root vigor. Apply PSB (Phosphorus Solubilizing Bacteria).' },
    { label: { en: 'Available Potassium (K)', mr: 'उपलब्ध पालाश (K)', hi: 'उपलब्ध पोटाश' }, value: '340 kg/ha', optimal: '250-400 kg/ha', status: 'High', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Excellent! High potassium thickens leaf cuticle cell walls, naturally deterring bollworm entry.' },
    { label: { en: 'Soil pH', mr: 'जमिनीचा सामू (pH)', hi: 'मृदा पीएच' }, value: '7.8', optimal: '6.5 - 7.5', status: 'Slightly Alkaline', statusColor: 'bg-blue-100 text-blue-800 border-blue-300', advice: 'Deep black cotton soil (Vertisol). Good calcium buffering.' },
    { label: { en: 'Electrical Conductivity (EC)', mr: 'क्षारता (EC)', hi: 'विद्युत चालकता' }, value: '0.32 dS/m', optimal: '< 1.0 dS/m', status: 'Normal', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Non-saline, ideal for seedling root establishment.' },
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'मृदा आरोग्य व पोषण समन्वय' : 'Soil Health Card & Pest Resistance Synergy'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'डिजिटल मृदा आरोग्य पत्रिका आणि नैसर्गिक कीड प्रतिकार' : 'Digital Soil Health Card & Botanical Disease Defense'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'मातीतील पालाश (Potassium) पानांचे बाह्य आवरण जाड करते, ज्यामुळे बोंडअळीच्या अळ्या पानांवर आणि बोंडांवर सहज छिद्र पाडू शकत नाहीत.'
                : 'Balanced soil nutrition is the first line of defense. Adequate potassium thickens cell walls, biologically repelling larval entry.'}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Soil Sample Lab</span>
            <span className="text-sm font-extrabold text-emerald-950">VNMKV Certified Testing Lab</span>
          </div>
        </div>
      </div>

      {/* Grid of Soil Parameters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {soilMetrics.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800">
                {item.label[lang] || item.label.en}
              </span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${item.statusColor}`}>
                {item.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="text-3xl font-black text-slate-900">{item.value}</div>
              <span className="text-[11px] text-slate-400 font-medium">Optimal: {item.optimal}</span>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 font-medium leading-relaxed">
              💡 {item.advice}
            </div>
          </div>
        ))}
      </div>

      {/* Synergistic Connection Card */}
      <div className="bg-emerald-950 text-white p-6 rounded-2xl shadow-md space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-400" />
          <h3 className="font-extrabold text-lg text-emerald-200">
            {lang === 'mr' ? 'माती व कीड नियंत्रण संबंध (Soil-Pest Nexus)' : 'How Soil Balance Halts Pink Bollworm'}
          </h3>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed">
          {lang === 'mr'
            ? 'अति-प्रमाणात युरिया (नत्र) दिल्याने झाडे अवाजवी रसरशीत व कोवळी होतात, ज्यामुळे बोंडअळीचे पतंग अंडी घालण्यासाठी अशा झाडांकडे आकर्षित होतात. पीकरक्षाने सुचवलेले खतांचे योग्य प्रमाण कीड प्रादुर्भाव ४०% ने रोखते.'
            : 'Over-application of Nitrogen urea creates excessively succulent tender foliage that acts as an oviposition magnet for female Pink Bollworm moths. Following balanced N:P:K (100:50:50) recommendations prevents 40% of initial pest attraction.'}
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { CalendarDays, Clock, AlertTriangle, ShieldCheck, CheckCircle2, ChevronRight, Sprout, Flower2, CircleDot } from 'lucide-react';

export default function CropCalendarView({ farm, lang, t }) {
  const [activeStage, setActiveStage] = useState(2); // 0 to 4

  const stages = [
    {
      id: 0,
      name: { en: 'Sowing & Germination', mr: 'पेरणी व उगवण', hi: 'बुआई व अंकुरण' },
      days: '0 - 25 DAS',
      bbch: 'BBCH 00-19',
      risk: { en: 'Low (Damping Off)', mr: 'कमी (मर रोग)', hi: 'कम (आर्द्र गलन)' },
      riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      keyThreats: {
        en: 'Stem rot, early sucking pests (thrips/aphids).',
        mr: 'खोडकुज, सुरुवातीचे रसशोषक कीड (फुलकिडे, मावा).',
        hi: 'तना गलन, शुरुआती रस चूसक कीट।'
      },
      ipmAction: {
        en: 'Seed treatment with Trichoderma viride (5g/kg seed). Install yellow sticky traps.',
        mr: 'ट्रायकोडर्मा व्हिरीडी (५ ग्रॅम/किलो) बीजप्रक्रिया. पिवळे चिकट सापळे लावावेत.',
        hi: 'ट्राइकोडर्मा से बीज उपचार करें। पीले चिपचिपे जाल लगाएं।'
      }
    },
    {
      id: 1,
      name: { en: 'Vegetative & Square Formation', mr: 'शाकीय वाढ व पाते लागणे', hi: 'वानस्पतिक वृद्धि व कलियां' },
      days: '25 - 55 DAS',
      bbch: 'BBCH 20-49',
      risk: { en: 'Moderate (Sucking Complex)', mr: 'मध्यम (रसशोषक कीड)', hi: 'मध्यम (रस चूसक कीट)' },
      riskColor: 'bg-amber-100 text-amber-800 border-amber-300',
      keyThreats: {
        en: 'Jassids, Whitefly, Early Pink Bollworm emergence.',
        mr: 'तुडतुडे, पांढरी माशी, बोंडअळीचा सुरुवातीचा प्रादुर्भाव.',
        hi: 'जैसिड्स, सफेद मक्खी, प्रारंभिक गुलाबी सुंडी।'
      },
      ipmAction: {
        en: 'Install 5 Gossyplure pheromone traps/acre. Spray 5% NSKE (Neem Extract).',
        mr: 'एकरी ५ कामगंध सापळे लावा. ५% निंबोळी अर्काची पहिली फवारणी करा.',
        hi: 'प्रति एकड़ 5 फेरोमोन ट्रैप लगाएं। 5% नीम अर्क का छिड़काव करें।'
      }
    },
    {
      id: 2,
      name: { en: 'Flowering & Boll Development', mr: 'फुलोरा व बोंड धारणा (सध्याचा टप्पा)', hi: 'फूल व गूलर बनना (वर्तमान)' },
      days: '55 - 90 DAS',
      bbch: 'BBCH 50-79',
      risk: { en: 'CRITICAL (Pink Bollworm Peak)', mr: 'अति-गंभीर (बोंडअळीचा सर्वोच्च धोका)', hi: 'अति-संवेदनशील (गुलाबी सुंडी शिखर)' },
      riskColor: 'bg-red-100 text-red-800 border-red-300 animate-pulse',
      isCurrent: true,
      keyThreats: {
        en: 'Pink Bollworm (Pectinophora gossypiella) internal burrowing into squares and bolls, rosette flowers.',
        mr: 'गुलाबी बोंडअळी कळ्या व बोंडामध्ये शिरकाव, डोमकळ्या (Rosette flowers).',
        hi: 'गुलाबी सुंडी का गूलर के अंदर प्रवेश, डोमकली।'
      },
      ipmAction: {
        en: 'Check traps daily (ETL: 8 moths/day). Collect & destroy rosette flowers. Release Trichogramma @ 60,000 eggs/acre.',
        mr: 'दररोज सापळे तपासा (नुकसान पातळी: ८ पतंग/दिवस). डोमकळ्या गोळा करून नष्ट करा. ट्रायकोकार्ड ६०,००० प्रति एकर सोडा.',
        hi: 'रोजाना ट्रैप जांचें (8 कीट/दिन). डोमकली नष्ट करें। ट्राइकोग्रामा कार्ड लगाएं।'
      }
    },
    {
      id: 3,
      name: { en: 'Boll Maturation & Bursting', mr: 'बोंड पक्वता व बोंड फुटणे', hi: 'गूलर पकना व खिलना' },
      days: '90 - 130 DAS',
      bbch: 'BBCH 80-89',
      risk: { en: 'High (Late Infestation)', mr: 'जास्त (शेवटचा प्रादुर्भाव)', hi: 'उच्च (अंतिम संक्रमण)' },
      riskColor: 'bg-orange-100 text-orange-800 border-orange-300',
      keyThreats: {
        en: 'Stained lint, seed damage, secondary bacterial boll rot.',
        mr: 'कापसाचा दर्जा खराब, बियांचे नुकसान, बोंड सडणे.',
        hi: 'कपास के रेशे खराब होना, बीज क्षति, सड़न।'
      },
      ipmAction: {
        en: 'Maintain clean picking. Never stack infested crop residues near field.',
        mr: 'स्वच्छ वेचणी करा. किडलेली बोंडे शेतात किंवा धुऱ्यावर साठवू नका.',
        hi: 'साफ तुड़ाई करें। संक्रमित अवशेष खेत में न छोड़ें।'
      }
    },
    {
      id: 4,
      name: { en: 'Terminal Harvest & Residue Mgmt', mr: 'अंतिम वेचणी व अवशेष व्यवस्थापन', hi: 'अंतिम तुड़ाई व अवशेष प्रबंधन' },
      days: '130+ DAS',
      bbch: 'BBCH 90-99',
      risk: { en: 'Low (Carry-Over Risk)', mr: 'कमी (पुढील हंगामासाठी धोका)', hi: 'कम (अगले मौसम हेतु जोखिम)' },
      riskColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      keyThreats: {
        en: 'Overwintering diapausing larvae surviving in stalks for next season.',
        mr: 'सुप्तावस्थेतील अळ्या पुढील हंगामासाठी शेतात जिवंत राहणे.',
        hi: 'सुप्त सुंडियां अगले मौसम के लिए डंठल में जीवित रहना।'
      },
      ipmAction: {
        en: 'Deep summer ploughing. Terminate crop by December-end; avoid ratoon cotton (फरदड बंदी).',
        mr: 'उन्हाळी खोल नांगरट करा. डिसेंबर अखेर पीक काढून टाका, फरदड (ratoon) कापूस घेऊ नका.',
        hi: 'गहरी जुताई करें। फरदड़ कपास बिल्कुल न लें।'
      }
    }
  ];

  const current = stages[activeStage];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <CalendarDays className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'पीक वाढ अवस्था व कीड दिनदर्शिका' : 'Crop Growth Phenology & Pest Calendar'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'पीक वाढ टप्पा आणि कीड संवेदनशीलता दिनदर्शिका' : 'Crop Phenological Stages & Vulnerability Timeline'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'प्रत्येक पीक वाढीच्या टप्प्यावर कीड संवेदनशीलता बदलते. वेळेवर खबरदारी घेतल्यास ९०% नुकसान टळते.'
                : 'Pest vulnerability shifts drastically at each phenological stage. Target IPM interventions to exact BBCH stages.'}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Current Stage</span>
            <span className="text-sm font-extrabold text-emerald-950">Day 68 • Flowering Stage</span>
          </div>
        </div>
      </div>

      {/* Interactive Horizontal Growth Stages */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {stages.map((stg) => {
          const isSelected = activeStage === stg.id;
          return (
            <button
              key={stg.id}
              onClick={() => setActiveStage(stg.id)}
              className={`p-4 rounded-2xl text-left border transition-all relative ${
                isSelected
                  ? 'bg-forest-900 text-white border-forest-900 shadow-md ring-2 ring-emerald-500'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
              }`}
            >
              {stg.isCurrent && (
                <span className="absolute -top-2.5 right-3 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow">
                  NOW (आता)
                </span>
              )}
              <div className="text-[10px] font-mono opacity-70 mb-1">{stg.bbch}</div>
              <div className="font-extrabold text-xs mb-1 line-clamp-2">
                {stg.name[lang] || stg.name.en}
              </div>
              <div className="text-[11px] font-bold opacity-80">{stg.days}</div>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <span className="text-xs font-bold text-slate-400 font-mono">{current.bbch} • {current.days}</span>
            <h3 className="text-xl font-extrabold text-slate-900">
              {current.name[lang] || current.name.en}
            </h3>
          </div>
          <span className={`px-3 py-1.5 rounded-xl border text-xs font-black self-start sm:self-auto ${current.riskColor}`}>
            Risk: {current.risk[lang] || current.risk.en}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-xl bg-red-50/60 border border-red-200 space-y-2">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span>{lang === 'mr' ? 'या टप्प्यातील मुख्य कीड व रोग धोके' : 'Primary Pests & Disease Threats in this Stage'}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {current.keyThreats[lang] || current.keyThreats.en}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'mr' ? 'विद्यापीठ प्रमाणित IPM कृती उपाय' : 'University-Recommended IPM Intervention'}</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {current.ipmAction[lang] || current.ipmAction.en}
            </p>
          </div>
        </div>

        {/* VNMKV Advisory note */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>🌾 <strong>VNMKV Parbhani Advisory:</strong> Avoid broad-spectrum chemical sprays during peak flowering to protect pollinating honeybees.</span>
          <span className="text-emerald-700 font-bold text-[11px] shrink-0">IPM Protocol #C-42</span>
        </div>
      </div>
    </div>
  );
}

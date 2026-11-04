import React, { useState } from 'react';
import { Layers, Activity, Sparkles, CheckCircle2, AlertTriangle, Droplets, Thermometer, ShieldAlert } from 'lucide-react';

export default function SoilHealthView({ farm, lang = 'en', t }) {
  const cropStr = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.en || 'Cotton')
    : (farm?.crop?.name || 'Cotton');

  const villageName = farm?.location?.village?.[lang] || farm?.location?.village?.en || 'Ner';
  const districtName = farm?.location?.district?.[lang] || farm?.location?.district?.en || 'Yavatmal';
  const farmerName = farm?.farmerName?.[lang] || farm?.farmerName?.en || 'Ramesh Jadhav';

  const isGrapes = cropStr.toLowerCase().includes('grape') || cropStr.toLowerCase().includes('द्राक्ष');
  const isTomato = cropStr.toLowerCase().includes('tomato') || cropStr.toLowerCase().includes('टोमॅटो');
  const isSoybean = cropStr.toLowerCase().includes('soybean') || cropStr.toLowerCase().includes('सोयाबीन');

  let soilType = 'Vertisol (Deep Black Cotton Soil / काळी कसदार जमीन)';
  let nexusTitle = `How Soil Balance Halts Pink Bollworm in Cotton`;
  let nexusTitleMr = `माती व कीड नियंत्रण संबंध (Soil-Pest Nexus)`;
  let nexusDesc = 'Over-application of Nitrogen urea creates excessively succulent tender foliage that acts as an oviposition magnet for female Pink Bollworm moths. Following balanced N:P:K (100:50:50) recommendations prevents 40% of initial pest attraction.';
  let nexusDescMr = 'अति-प्रमाणात युरिया (नत्र) दिल्याने झाडे अवाजवी रसरशीत व कोवळी होतात, ज्यामुळे बोंडअळीचे पतंग अंडी घालण्यासाठी अशा झाडांकडे आकर्षित होतात. पीकरक्षाने सुचवलेले खतांचे योग्य प्रमाण कीड प्रादुर्भाव ४०% ने रोखते.';

  let soilMetrics = [];

  if (isGrapes) {
    soilType = 'Red Gravelly Loam (लाल पोयटा जमीन - नाशिक)';
    nexusTitle = `Calcium & Potassium Nexus Against Grape Downy Mildew`;
    nexusTitleMr = `द्राक्षातील डाऊनी मिल्ड्यू व मणी तडकण्याविरुद्ध माती पोषण संबंध`;
    nexusDesc = 'High available Calcium and Potassium directly strengthen berry skins and vine cane vascular bundles, preventing unseasonal rain from splitting berries and halting downy mildew zoospore entry.';
    nexusDescMr = 'मातीतील मुबलक कॅल्शियम आणि पालाश द्राक्षाच्या मण्यांची साल मजबूत करतात. त्यामुळे अवकाळी पावसात मणी तडकणे टळते आणि डाऊनी मिल्ड्यूचा शिरकाव रोखला जातो.';
    soilMetrics = [
      { label: { en: 'Organic Carbon (OC)', mr: 'सेंद्रिय कर्ब', hi: 'जैविक कार्बन' }, value: '0.85%', optimal: '0.75%+', status: 'Optimal (उत्कृष्ट)', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Rich vineyard microbial activity. Supports beneficial mycorrhiza.' },
      { label: { en: 'Available Calcium (Ca)', mr: 'उपलब्ध कॅल्शियम (Ca)', hi: 'कैल्शियम' }, value: '28 meq/100g', optimal: '20-30 meq', status: 'Good (चांगले)', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Crucial for berry skin elasticity. Prevents unseasonal berry cracking.' },
      { label: { en: 'Available Potassium (K)', mr: 'उपलब्ध पालाश (K)', hi: 'पोटाश' }, value: '380 kg/ha', optimal: '250-400 kg/ha', status: 'High (भरपूर)', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Ensures rapid sugar accumulation (Brix 18°+) and export firmness.' },
      { label: { en: 'Available Boron (B)', mr: 'उपलब्ध बोरॉन (B)', hi: 'बोरॉन' }, value: '0.75 ppm', optimal: '0.5 - 1.0 ppm', status: 'Normal', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Promotes uniform pollen germination and uniform fruit setting in bunches.' },
      { label: { en: 'Soil pH', mr: 'जमिनीचा सामू (pH)', hi: 'मृदा पीएच' }, value: '7.2', optimal: '6.5 - 7.5', status: 'Ideal Neutral', statusColor: 'bg-blue-100 text-blue-800 border-blue-300', advice: 'Ideal neutral pH for maximum micronutrient availability.' },
      { label: { en: 'Electrical Conductivity (EC)', mr: 'क्षारता (EC)', hi: 'विद्युत चालकता' }, value: '0.45 dS/m', optimal: '< 1.5 dS/m', status: 'Non-Saline', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Roots can draw water freely without osmotic salt stress.' }
    ];
  } else if (isTomato) {
    soilType = 'Sandy Loam with Organic Compost (गाळाची जमीन - जुन्नर, पुणे)';
    nexusTitle = `Soil Drainage & Calcium Defense Against Late Blight`;
    nexusTitleMr = `टोमॅटो करपा व फळ सडण्याविरुद्ध जमिनीचा निचरा व पोषण`;
    nexusDesc = 'Soil drainage is the primary defense against Late Blight. Saturated furrows generate the 90%+ micro-humidity that releases millions of Phytophthora zoospores. Calcium strengthens cell walls to resist fungal enzymatic rotting.';
    nexusDescMr = 'जमिनीत पाण्याचा निचरा योग्य असल्यास लेट ब्लाईटचा धोका ६०% कमी होतो. मुळांशी पाणी साचून न दिल्याने आणि कॅल्शियमची मात्रा योग्य ठेवल्याने फळे सडत नाहीत.';
    soilMetrics = [
      { label: { en: 'Organic Carbon (OC)', mr: 'सेंद्रिय कर्ब', hi: 'जैविक कार्बन' }, value: '0.62%', optimal: '0.75%+', status: 'Medium', statusColor: 'bg-amber-100 text-amber-800 border-amber-300', advice: 'Incorporate 1.5 tons vermicompost to increase beneficial Trichoderma.' },
      { label: { en: 'Available Nitrogen (N)', mr: 'उपलब्ध नत्र (N)', hi: 'नाइट्रोजन' }, value: '210 kg/ha', optimal: '250-400 kg/ha', status: 'Balanced', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Avoid urea spikes during flowering; excess N softens fruit cuticle.' },
      { label: { en: 'Available Calcium (Ca)', mr: 'कॅल्शियम (Ca)', hi: 'कैल्शियम' }, value: '18 meq/100g', optimal: '20+ meq', status: 'Mild Deficit', statusColor: 'bg-amber-100 text-amber-800 border-amber-300', advice: 'Apply agricultural gypsum to prevent Blossom End Rot on fruit tips.' },
      { label: { en: 'Available Potassium (K)', mr: 'उपलब्ध पालाश (K)', hi: 'पोटाश' }, value: '290 kg/ha', optimal: '200-350 kg/ha', status: 'Optimal', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Imparts solid firmness to tomatoes for long transport.' },
      { label: { en: 'Soil pH', mr: 'सामू (pH)', hi: 'पीएच' }, value: '6.8', optimal: '6.0 - 7.0', status: 'Perfect', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Optimum acidic-neutral range for hybrid staked tomato roots.' },
      { label: { en: 'Soil Drainage Index', mr: 'निचरा निर्देशांक', hi: 'जल निकासी' }, value: 'Moderate', optimal: 'High', status: 'Watch Furrows', statusColor: 'bg-blue-100 text-blue-800 border-blue-300', advice: 'Clear raised bed drainage furrows before the 48-hour rain spell.' }
    ];
  } else if (isSoybean) {
    soilType = 'Medium Deep Black Clay (मध्यम काळी जमीन - औसा, लातूर)';
    nexusTitle = `Rhizobium Nodulation & Balanced Phosphorus in Soybean`;
    nexusTitleMr = `सोयाबीन मधील रायझोबियम गाठी व स्फुरद पोषण समन्वय`;
    nexusDesc = 'Healthy root nodules fix up to 80 kg of atmospheric nitrogen naturally for zero cost. Applying balanced phosphorus and bio-fungicides ensures roots resist Rhizoctonia collar rot without chemical inputs.';
    nexusDescMr = 'मुळांवरील गाठी हवेतील नत्र जमिनीत साठवतात. योग्य स्फुरद (P) दिल्यामुळे मुळांची वाढ जोमदार होते व खोडकुज रोगाला नैसर्गिक प्रतिकार मिळतो.';
    soilMetrics = [
      { label: { en: 'Organic Carbon (OC)', mr: 'सेंद्रिय कर्ब', hi: 'जैविक कार्बन' }, value: '0.52%', optimal: '0.75%+', status: 'Medium', statusColor: 'bg-amber-100 text-amber-800 border-amber-300', advice: 'Apply PSB (Phosphate Solubilizing Bacteria) to release bound phosphorus.' },
      { label: { en: 'Root Nodules Count', mr: 'मुळांवरील रायझोबियम गाठी', hi: 'जड़ गांठें' }, value: '28 / Plant', optimal: '20-35 / Plant', status: 'Excellent', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Natural bio-nitrogen factory active; saves ₹1,200/acre in urea fertilizer.' },
      { label: { en: 'Available Phosphorus (P)', mr: 'उपलब्ध स्फुरद (P)', hi: 'फास्फोरस' }, value: '18 kg/ha', optimal: '15-25 kg/ha', status: 'Optimal', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Essential for vigorous pod filling and bold grain weight.' },
      { label: { en: 'Available Potassium (K)', mr: 'उपलब्ध पालाश (K)', hi: 'पोटाश' }, value: '310 kg/ha', optimal: '250-400 kg/ha', status: 'High', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Thickens pod husk walls, naturally deterring pod borer caterpillars.' },
      { label: { en: 'Soil pH', mr: 'सामू (pH)', hi: 'पीएच' }, value: '7.6', optimal: '6.5 - 7.5', status: 'Slightly Alkaline', statusColor: 'bg-blue-100 text-blue-800 border-blue-300', advice: 'Calcareous Marathwada soil. Add sulfur compost for nutrient uptake.' },
      { label: { en: 'Electrical Conductivity (EC)', mr: 'क्षारता (EC)', hi: 'विद्युत चालकता' }, value: '0.28 dS/m', optimal: '< 1.0 dS/m', status: 'Normal', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Non-saline, ideal for seedling emergence.' }
    ];
  } else {
    // Cotton default
    soilMetrics = [
      { label: { en: 'Organic Carbon (OC)', mr: 'सेंद्रिय कर्ब', hi: 'जैविक कार्बन' }, value: '0.48%', optimal: '0.75%+', status: 'Low', statusColor: 'bg-amber-100 text-amber-800 border-amber-300', advice: 'Add 2 tons FYM or vermicompost to boost soil microbial predators.' },
      { label: { en: 'Available Nitrogen (N)', mr: 'उपलब्ध नत्र (N)', hi: 'उपलब्ध नाइट्रोजन' }, value: '185 kg/ha', optimal: '280-560 kg/ha', status: 'Low', statusColor: 'bg-amber-100 text-amber-800 border-amber-300', advice: 'Split urea doses; excess basal N causes succulent foliage that attracts aphids and bollworms.' },
      { label: { en: 'Available Phosphorus (P)', mr: 'उपलब्ध स्फुरद (P)', hi: 'उपलब्ध फास्फोरस' }, value: '22 kg/ha', optimal: '15-25 kg/ha', status: 'Medium', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Optimum root vigor. Apply PSB (Phosphorus Solubilizing Bacteria).' },
      { label: { en: 'Available Potassium (K)', mr: 'उपलब्ध पालाश (K)', hi: 'उपलब्ध पोटाश' }, value: '340 kg/ha', optimal: '250-400 kg/ha', status: 'High', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Excellent! High potassium thickens leaf cuticle cell walls, naturally deterring bollworm entry.' },
      { label: { en: 'Soil pH', mr: 'जमिनीचा सामू (pH)', hi: 'मृदा पीएच' }, value: '7.8', optimal: '6.5 - 7.5', status: 'Slightly Alkaline', statusColor: 'bg-blue-100 text-blue-800 border-blue-300', advice: 'Deep black cotton soil (Vertisol). Good calcium buffering.' },
      { label: { en: 'Electrical Conductivity (EC)', mr: 'क्षारता (EC)', hi: 'विद्युत चालकता' }, value: '0.32 dS/m', optimal: '< 1.0 dS/m', status: 'Normal', statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300', advice: 'Non-saline, ideal for seedling root establishment.' }
    ];
  }

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? `${cropStr} मृदा आरोग्य व पोषण समन्वय` : `${cropStr} Soil Health & Pest Resistance Synergy`}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? `डिजिटल मृदा आरोग्य पत्रिका: ${farmerName} (${villageName}, ${districtName})` : `Digital Soil Health Card for ${farmerName} (${districtName})`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `जमिनीचा प्रकार: ${soilType}. मातीतील संतुलित पोषण हे कीड व रोगाविरुद्ध संरक्षणाची पहिली ढाल असते.`
                : `Soil classification: ${soilType}. Balanced nutrition biologically arms ${cropStr} plants against larval boring and fungal rot.`}
            </p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">Soil Sample Lab</span>
            <span className="text-sm font-extrabold text-emerald-950">
              {districtName} Agricultural Research Station
            </span>
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
            {lang === 'mr' ? nexusTitleMr : nexusTitle}
          </h3>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed">
          {lang === 'mr' ? nexusDescMr : nexusDesc}
        </p>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { 
  Satellite, 
  Layers, 
  MapPin, 
  Compass, 
  Sparkles, 
  Eye, 
  Thermometer, 
  Droplets, 
  CheckCircle2, 
  AlertTriangle,
  ZoomIn,
  RefreshCw,
  Info
} from 'lucide-react';

export default function SatelliteView({ farm, lang = 'en', t }) {
  const [activeLayer, setActiveLayer] = useState('ndre'); // 'rgb' | 'ndre' | 'cwsi' | 'hotspot'
  const [selectedSubplot, setSelectedSubplot] = useState('Plot B2');

  const cropStr = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.en || 'Cotton')
    : (farm?.crop?.name || 'Cotton');

  const acres = farm?.crop?.acres || 2.5;
  const villageName = farm?.location?.village?.[lang] || farm?.location?.village?.en || 'Ner';
  const districtName = farm?.location?.district?.[lang] || farm?.location?.district?.en || 'Yavatmal';
  const farmerName = farm?.farmerName?.[lang] || farm?.farmerName?.en || 'Ramesh Jadhav';

  const isGrapes = cropStr.toLowerCase().includes('grape') || cropStr.toLowerCase().includes('द्राक्ष');
  const isTomato = cropStr.toLowerCase().includes('tomato') || cropStr.toLowerCase().includes('टोमॅटो');
  const isSoybean = cropStr.toLowerCase().includes('soybean') || cropStr.toLowerCase().includes('सोयाबीन');

  let hotspotLabel = 'Pink Bollworm Internal Larvae Focus';
  let hotspotGuide = 'Do not spray the entire farm! Send your field scout directly to Plot B2 (South-East coordinate) to inspect 20 bolls. Saves 70% of chemical cost by micro-targeting.';
  let hotspotGuideMr = 'संपूर्ण शेतात महागडी फवारणी न करता, केवळ दक्षिण-पूर्व भागातील प्लॉट B2 मध्ये जाऊन २० बोंडांची पाहणी करा. यामुळे ७०% फवारणी खर्चाची बचत होते.';

  if (isGrapes) {
    hotspotLabel = 'Downy Mildew High-Dew Canopy Stress';
    hotspotGuide = 'Plot B2 is positioned in a wind-sheltered dip with 92% leaf wetness. Apply 1% Bordeaux mixture strictly to this 0.7-acre vine zone to stop spore release.';
    hotspotGuideMr = 'प्लॉट B2 हा सखल भागात असल्याने तिथे पानांवर सर्वाधिक ओलावा (९२%) आहे. केवळ या भागावर १% बोर्डो मिश्रणाची सूक्ष्म फवारणी करा.';
  } else if (isTomato) {
    hotspotLabel = 'Late Blight Soil Drainage Depression';
    hotspotGuide = 'Plot B2 shows water stagnation in drainage furrows. Dig an outlet trench immediately and apply protective copper spray before Phytophthora spreads upwind.';
    hotspotGuideMr = 'प्लॉट B2 मध्ये पाण्याच्या चरीत पाणी साचले आहे. त्वरित चर काढून पाणी बाहेर काढा आणि करपा रोगाचा फैलाव रोखा.';
  } else if (isSoybean) {
    hotspotLabel = 'Girdle Beetle Infestation Center';
    hotspotGuide = 'Canopy depression indicates wilted petioles from girdle beetle ring cuts. Collect dry twigs in Plot B2 before larvae bore into main stems.';
    hotspotGuideMr = 'प्लॉट B2 मध्ये चक्री भुंग्यामुळे फांद्या सुकल्या आहेत. अळ्या मुख्य खोडात जाण्यापूर्वी सुकलेल्या फांद्या तोडून नष्ट करा.';
  }

  const subplots = [
    { id: 'Plot A1', label: `North-West (${(acres * 0.25).toFixed(1)} ac)`, ndvi: 0.82, stress: 'Healthy (निरोगी)', color: 'bg-emerald-500' },
    { id: 'Plot A2', label: `North-East (${(acres * 0.25).toFixed(1)} ac)`, ndvi: 0.79, stress: 'Normal (सामान्य)', color: 'bg-emerald-400' },
    { id: 'Plot B1', label: `South-West (${(acres * 0.25).toFixed(1)} ac)`, ndvi: 0.78, stress: 'Normal (सामान्य)', color: 'bg-emerald-400' },
    { id: 'Plot B2', label: `South-East Hotspot (${(acres * 0.25).toFixed(1)} ac)`, ndvi: 0.54, stress: 'Pre-Symptomatic Stress (लक्षणपूर्व धोका)', color: 'bg-red-500', alert: true }
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Satellite className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? `${cropStr} अदृश्य रोग शोधक उपग्रह रडार` : `Pre-Symptomatic Satellite & Thermal Radar`}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' 
                ? `पीकदृष्टी ३६०°: ${farmerName} (${villageName}, ${districtName})` 
                : `PikDrishti 360°: Satellite Multi-Spectral Stress Map for ${farmerName}`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `डोळ्यांना पाने खराब दिसण्यापूर्वीच सेंटिनेल-२ उपग्रहाद्वारे ${cropStr} पिकातील अंतर्गत ताण ३-५ दिवस आधी शोधून काढणारा रडार.`
                : `Detecting vascular crop stress 72 hours before visible symptoms in ${cropStr} (${acres} Acres in ${villageName}, ${districtName}).`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sentinel-2 (10m Multi-Spectral)</span>
            </span>
          </div>
        </div>

        {/* Multispectral Layer Selector */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveLayer('rgb')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'rgb' ? 'bg-forest-800 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>1. RGB True Color (डोळ्यांनी दिसणारे)</span>
          </button>
          <button
            onClick={() => setActiveLayer('ndre')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'ndre' ? 'bg-forest-800 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>2. NDRE Chlorophyll Red-Edge (हरितद्रव्य ताण)</span>
          </button>
          <button
            onClick={() => setActiveLayer('cwsi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'cwsi' ? 'bg-forest-800 text-white shadow-xs' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5 text-amber-400" />
            <span>3. Thermal Canopy Stress (थर्मल तापमान)</span>
          </button>
          <button
            onClick={() => setActiveLayer('hotspot')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeLayer === 'hotspot' ? 'bg-red-600 text-white shadow-xs animate-pulse' : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>4. Pre-Symptomatic Hotspot Radar (धोका क्षेत्र)</span>
          </button>
        </div>
      </div>

      {/* Satellite Imagery Canvas Simulation & Subplot breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Interactive Multispectral Field Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900">
                {farmerName} • Survey No. {farm.id.replace('farm-', '7')}/2, {villageName}, {districtName} ({acres} Acres {cropStr})
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500">Pass: Today 08:30 IST</span>
          </div>

          {/* Interactive GIS Field Plot Grid */}
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-inner p-4 flex flex-col justify-between"
               style={{
                 background: activeLayer === 'rgb' 
                   ? 'linear-gradient(135deg, #2d5a27 0%, #3e7336 50%, #4f8c44 100%)'
                   : activeLayer === 'ndre'
                   ? 'linear-gradient(135deg, #104928 0%, #1e7040 50%, #bd4b2b 85%, #d13030 100%)'
                   : activeLayer === 'cwsi'
                   ? 'linear-gradient(135deg, #1d4ed8 0%, #0284c7 40%, #f59e0b 75%, #ef4444 100%)'
                   : 'radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.9) 0%, rgba(234, 179, 8, 0.7) 35%, rgba(16, 185, 129, 0.6) 70%, #064e3b 100%)'
               }}>
            
            {/* Overlay grid lines representing 4 sub-plots */}
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none border border-white/20">
              <div className="border-r border-b border-white/30 p-3 text-white/90 text-xs font-bold">Plot A1 (NW)</div>
              <div className="border-b border-white/30 p-3 text-white/90 text-xs font-bold">Plot A2 (NE)</div>
              <div className="border-r border-white/30 p-3 text-white/90 text-xs font-bold">Plot B1 (SW)</div>
              <div className="p-3 text-white font-extrabold text-xs flex justify-between items-start">
                <span>Plot B2 (SE)</span>
                <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce shadow">
                  🚨 Early Hotspot
                </span>
              </div>
            </div>

            {/* Target Reticle on Plot B2 */}
            <div className="absolute right-12 bottom-12 w-28 h-28 rounded-full border-2 border-red-300 border-dashed bg-red-600/30 backdrop-blur-[1px] flex flex-col items-center justify-center animate-pulse pointer-events-none">
              <span className="text-[10px] font-black text-white bg-black/70 px-2 py-0.5 rounded shadow">
                NDRE Drop -38%
              </span>
              <span className="text-[9px] text-yellow-200 font-semibold mt-0.5 text-center px-1">
                {hotspotLabel}
              </span>
            </div>

            {/* Layer Legend in Corner */}
            <div className="mt-auto relative z-10 bg-black/70 backdrop-blur-xs text-white p-2.5 rounded-xl text-[10px] max-w-xs space-y-1">
              <div className="font-bold flex items-center justify-between">
                <span>Current Layer: {activeLayer.toUpperCase()}</span>
                <span className="text-emerald-400">Cloud cover: 0%</span>
              </div>
              <p className="text-slate-300 text-[9px] leading-tight">
                {activeLayer === 'rgb' ? `Entire ${cropStr} field appears green to the human eye.` :
                 activeLayer === 'ndre' ? 'Red area in Plot B2 indicates early vascular depression.' :
                 activeLayer === 'cwsi' ? 'Canopy temperature in B2 is +1.8°C warmer due to stomatal stress.' :
                 'Combined fusion: Precision micro-targeting directive generated for Plot B2.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Sub-Plot Diagnostic Report & Action */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              {lang === 'mr' ? 'उप-प्लॉट निहाय उपग्रह ताण' : 'Sub-Plot Stress Breakdown'}
            </h3>
            <span className="text-xs text-emerald-700 font-bold">{acres} Acres Covered</span>
          </div>

          <div className="space-y-2.5">
            {subplots.map((p) => {
              const isSelected = selectedSubplot === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedSubplot(p.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    p.alert 
                      ? 'bg-red-50 border-red-300 ring-2 ring-red-400/20 shadow-xs' 
                      : isSelected 
                      ? 'bg-emerald-50 border-emerald-500' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-xs">{p.id} • {p.label}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      p.alert ? 'bg-red-600 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {p.stress}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                    <span>Chlorophyll Index (NDRE): <strong>{p.ndvi}</strong></span>
                    <span className="font-mono text-[10px]">{p.alert ? 'High Risk' : 'Normal'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Directive based on satellite discovery */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>{lang === 'mr' ? 'थेट क्षेत्रीय सूक्ष्म-मार्गदर्शन:' : 'Pre-Symptomatic Scouting Guide:'}</span>
            </div>
            <p className="leading-relaxed">
              {lang === 'mr' ? hotspotGuideMr : hotspotGuide}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

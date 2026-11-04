import React, { useState } from 'react';
import { 
  Radio, 
  Users, 
  MapPin, 
  Wind, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  CheckCheck,
  Compass,
  Layers
} from 'lucide-react';

export default function CommunitySwarmView({ farm, lang, t }) {
  const [ringFenceRadius, setRingFenceRadius] = useState(2.0); // km

  const currentLang = lang || 'en';
  const farmId = farm?.id || 'farm-1';
  const cropNameEn = farm?.crop?.name?.en || 'Cotton';
  const villageName = farm?.location?.village?.[currentLang] || farm?.location?.village?.en || 'Ner';
  const districtName = farm?.location?.district?.[currentLang] || farm?.location?.district?.en || 'Yavatmal';
  const farmerName = farm?.farmerName?.[currentLang] || farm?.farmerName?.en || 'Ramesh Jadhav';

  // Dynamic neighbor clusters tailored to each farm
  const clusterData = {
    'farm-1': {
      clusterTitle: {
        en: 'Ner Cotton Cluster (Vidarbha)',
        mr: 'नेर शिवार कापूस कीड कॉरिडॉर (विदर्भ)',
        hi: 'नेर क्लस्टर कपास कीट कॉरिडोर (विदर्भ)'
      },
      pestName: {
        en: 'Pink Bollworm (गुलाबी बोंडअळी)',
        mr: 'गुलाबी बोंडअळी (Pink Bollworm)',
        hi: 'गुलाबी सुंडी (Pink Bollworm)'
      },
      windVector: '7 km/h ENE (East-North-East) →',
      activeSwarmText: 'Active Swarm Vector: North-East 7 km/h',
      centerLabel: 'Your Farm (10 moths / day)',
      centerSub: 'SWARM ORIGIN (धोका उगम)',
      neighbors: [
        { id: 1, name: `${farmerName} (You)`, crop: 'Cotton (कापूस)', trapCatch: '10 moths', dist: '0.0 km', status: 'Threshold Crossed (१० पतंग)', risk: 'Origin Swarm', color: 'bg-red-500' },
        { id: 2, name: 'Suresh Rathod', crop: 'Cotton (कापूस)', trapCatch: '8 moths', dist: '0.4 km Downwind', status: 'High Threat in 24h', risk: 'Immediate Threat', color: 'bg-red-500', alert: true },
        { id: 3, name: 'Anita Chavan', crop: 'Soybean / Cotton', trapCatch: '4 moths', dist: '0.9 km East', status: 'Moderate Vigilance', risk: 'Buffer Zone', color: 'bg-amber-500' },
        { id: 4, name: 'Bhagwan Patil', crop: 'Cotton (कापूस)', trapCatch: '2 moths', dist: '1.4 km North', status: 'Safe for Now', risk: 'Low Risk', color: 'bg-emerald-500' },
        { id: 5, name: 'Vithalrao Shinde', crop: 'Pigeonpea (तूर)', trapCatch: '1 moth', dist: '1.8 km North-East', status: 'Safe', risk: 'Low Risk', color: 'bg-emerald-500' }
      ]
    },
    'farm-2': {
      clusterTitle: {
        en: 'Dindori Vineyard Valley (Nashik)',
        mr: 'दिंडोरी द्राक्ष बागायतदार पट्टा (नाशिक)',
        hi: 'दिंडोरी अंगूर बेल्ट (नासिक)'
      },
      pestName: {
        en: 'Downy Mildew Spores (डाऊनी मिल्ड्यू बुरशी बीजाणू)',
        mr: 'डाऊनी मिल्ड्यू बुरशी बीजाणू (Downy Mildew Spores)',
        hi: 'डाउनी मिल्ड्यू फंगल स्पोर्स'
      },
      windVector: '11 km/h WNW (West-North-West) →',
      activeSwarmText: 'Spore Dispersal Corridor: 11 km/h WNW (89% RH)',
      centerLabel: 'Your Farm (89% RH, Sporulation)',
      centerSub: 'SPORE EPICENTER (बीजाणू उगम)',
      neighbors: [
        { id: 1, name: `${farmerName} (You)`, crop: 'Grapes (Thompson)', trapCatch: 'High Spores', dist: '0.0 km', status: 'Severe Fungal Alert (८९% दमटपणा)', risk: 'Infection Epicenter', color: 'bg-red-600' },
        { id: 2, name: 'Kailas Bhor', crop: 'Grapes (Sharad Seedless)', trapCatch: 'Dew > 6 hrs', dist: '0.3 km Downwind', status: 'Severe Dew - High Spore Drift', risk: 'Immediate Threat', color: 'bg-red-500', alert: true },
        { id: 3, name: 'Ashok Gangurde', crop: 'Grapes (Tas-A-Ganesh)', trapCatch: 'Moderate Spores', dist: '0.8 km North', status: 'Dense Canopy Vigilance', risk: 'Caution Advised', color: 'bg-amber-500' },
        { id: 4, name: 'Madhukar Shinde', crop: 'Pomegranate (डाळिंब)', trapCatch: 'Low Spores', dist: '1.2 km South', status: 'Low Cross-Crop Drift', risk: 'Low Risk', color: 'bg-emerald-500' },
        { id: 5, name: 'Sunita More', crop: 'Grapes (Sonaka)', trapCatch: 'Controlled', dist: '1.7 km East', status: 'Well Ventilated Canopy', risk: 'Safe', color: 'bg-emerald-500' }
      ]
    },
    'farm-3': {
      clusterTitle: {
        en: 'Ausa Oilseed Belt (Marathwada)',
        mr: 'औसा सोयाबीन तेलबिया पट्टा (मराठवाडा)',
        hi: 'औसा सोयाबीन बेल्ट (मराठवाड़ा)'
      },
      pestName: {
        en: 'Girdle Beetle & Spodoptera (चकती भुंगा व लष्करी अळी)',
        mr: 'चकती भुंगा व लष्करी अळी (Girdle Beetle & Spodoptera)',
        hi: 'गर्डल बीटल व सैनिक सुंडी'
      },
      windVector: '8 km/h SW (South-West) →',
      activeSwarmText: 'Active Swarm Vector: South-West 8 km/h',
      centerLabel: 'Your Farm (5 moths / 4% stem cuts)',
      centerSub: 'SWARM SURGE (कीड वाढ)',
      neighbors: [
        { id: 1, name: `${farmerName} (You)`, crop: 'Soybean (JS-335)', trapCatch: '5 moths', dist: '0.0 km', status: 'Threshold Reached (५ पतंग/सापळा)', risk: 'Origin Swarm', color: 'bg-amber-500' },
        { id: 2, name: 'Pandurang Mane', crop: 'Soybean (सोयाबीन)', trapCatch: '4 moths', dist: '0.5 km Downwind', status: 'Approaching ETL in 36h', risk: 'Immediate Threat', color: 'bg-amber-500', alert: true },
        { id: 3, name: 'Meena Shinde', crop: 'Soybean / Urad', trapCatch: '2 moths', dist: '0.9 km North', status: 'Early Stage Monitoring', risk: 'Buffer Zone', color: 'bg-emerald-500' },
        { id: 4, name: 'Rameshwar Biradar', crop: 'Cotton / Pigeonpea', trapCatch: '1 moth', dist: '1.3 km East', status: 'Safe for Now', risk: 'Low Risk', color: 'bg-emerald-500' },
        { id: 5, name: 'Govind Patil', crop: 'Soybean (सोयाबीन)', trapCatch: '1 moth', dist: '1.8 km South-West', status: 'Safe', risk: 'Low Risk', color: 'bg-emerald-500' }
      ]
    },
    'farm-4': {
      clusterTitle: {
        en: 'Narayangaon Tomato Valley (Junnar, Pune)',
        mr: 'नारायणगाव टोमॅटो खोरे (जुन्नर, पुणे)',
        hi: 'नारायणगांव टमाटर घाटी (जुन्नर, पुणे)'
      },
      pestName: {
        en: 'Tuta Absoluta & Late Blight (तुता व करपा)',
        mr: 'तुता पिनवर्म व करपा रोग (Tuta & Late Blight)',
        hi: 'तुता पिनवर्म व पछेती झुलसा'
      },
      windVector: '9 km/h NNW (North-North-West) →',
      activeSwarmText: 'Critical Outbreak Vector: NNW 9 km/h (14 moths)',
      centerLabel: 'Your Farm (14 moths / Leaf Blight)',
      centerSub: 'CRITICAL HOTSPOT (अतिधोका केंद्र)',
      neighbors: [
        { id: 1, name: `${farmerName} (You)`, crop: 'Tomato (Abhinav)', trapCatch: '14 moths', dist: '0.0 km', status: 'Critical Breach (१४ पतंग + करपा)', risk: 'Hotspot Origin', color: 'bg-red-600' },
        { id: 2, name: 'Balasaheb Tambe', crop: 'Tomato (टोमॅटो)', trapCatch: '11 moths', dist: '0.3 km Downwind', status: 'Severe Pinworm Influx Expected', risk: 'Immediate Threat', color: 'bg-red-600', alert: true },
        { id: 3, name: 'Vikas Sable', crop: 'Capsicum / Tomato', trapCatch: '6 moths', dist: '0.7 km East', status: 'High Vigilance Required', risk: 'High Threat', color: 'bg-amber-500' },
        { id: 4, name: 'Sangita Gaikwad', crop: 'Marigold Trap Crop', trapCatch: '3 moths', dist: '1.1 km South', status: 'Bio-Trap Barrier Effective', risk: 'Moderate Risk', color: 'bg-emerald-500' },
        { id: 5, name: 'Sachin Joshi', crop: 'Tomato (Polyhouse)', trapCatch: '0 moths', dist: '1.6 km North', status: 'Net Protected / Safe', risk: 'Safe', color: 'bg-emerald-500' }
      ]
    }
  };

  const activeCluster = clusterData[farmId] || clusterData['farm-1'];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Radio className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'गावनिहाय सामूहिक कीड रडार' : 'Collective Bio-Pheromone Swarm Radar'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' 
                ? `${villageName} (${districtName}) २ किमी सामूहिक कीड स्थलांतर इशारा` 
                : `${villageName} (${districtName}) 2km Swarm Vector Radar`}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `कीड शेताची हद्द मानत नाही. ${villageName} परिसरातील कामगंध सापळे व हवेच्या दिशेनुसार पुढील २४-४८ तासांत किडीचा प्रसार कुठे होईल याचा अचूक अंदाज.`
                : `Pests do not obey property boundaries. PIKRAKSHA links peer traps in ${villageName} to predict pest flight & spore migration vectors.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-red-50 text-red-800 border border-red-300 text-xs font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>{activeCluster.activeSwarmText}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Swarm Vector Radar Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Visual Geographic Swarm Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base">
                {activeCluster.clusterTitle[currentLang] || activeCluster.clusterTitle.en}
              </h3>
              <span className="text-xs text-slate-500">
                Target: {activeCluster.pestName[currentLang] || activeCluster.pestName.en}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500">Ring-Fence Radius:</span>
              <span className="font-bold text-slate-900">{ringFenceRadius} km</span>
            </div>
          </div>

          {/* Interactive Geographic Map Canvas */}
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 border-2 border-slate-700 p-6 flex flex-col justify-between">
            {/* Concentric radar rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-24 h-24 rounded-full border border-emerald-500/30"></div>
              <div className="w-52 h-52 rounded-full border border-emerald-500/20 absolute"></div>
              <div className="w-80 h-80 rounded-full border border-dashed border-red-500/30 absolute"></div>
              {/* Radar sweep beam */}
              <div className="w-40 h-40 bg-gradient-to-tr from-emerald-500/20 to-transparent absolute rounded-full origin-bottom-left animate-spin" style={{ animationDuration: '8s' }}></div>
            </div>

            {/* Farm Markers plotted */}
            <div className="relative z-10 flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-black/60 backdrop-blur-xs text-white p-2 rounded-xl text-[10px] border border-white/10">
                  <div className="font-bold text-emerald-400">{villageName} Cluster</div>
                  <div>Wind: {activeCluster.windVector}</div>
                </div>

                {/* Plot 4 */}
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 mx-auto shadow-md"></div>
                  <span className="text-[9px] text-slate-300 font-bold block mt-0.5">
                    {activeCluster.neighbors[3]?.name} ({activeCluster.neighbors[3]?.dist})
                  </span>
                </div>
              </div>

              {/* Center Origin: Active farmer's farm */}
              <div className="self-center text-center">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-red-600 border-2 border-white mx-auto shadow-xl flex items-center justify-center text-white text-xs font-black animate-pulse">
                    🚨
                  </div>
                  <div className="w-16 h-16 rounded-full bg-red-500/30 -inset-3.5 absolute animate-ping pointer-events-none"></div>
                </div>
                <span className="text-[11px] font-black text-amber-300 block mt-1 drop-shadow">
                  {activeCluster.centerLabel}
                </span>
                <span className="text-[9px] text-red-300 font-bold">
                  {activeCluster.centerSub}
                </span>
              </div>

              <div className="flex justify-between items-end">
                {/* Plot 2: Downwind Neighbor with Alert */}
                <div className="text-center">
                  <div className="w-5 h-5 rounded-full bg-red-500 mx-auto shadow-md animate-bounce"></div>
                  <span className="text-[9px] text-red-300 font-bold block mt-0.5">
                    {activeCluster.neighbors[1]?.name} ({activeCluster.neighbors[1]?.dist})
                  </span>
                  <span className="text-[8px] text-yellow-300">🚨 Peer Alert Sent</span>
                </div>

                {/* Plot 3 */}
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500 mx-auto shadow-md"></div>
                  <span className="text-[9px] text-slate-300 font-bold block mt-0.5">
                    {activeCluster.neighbors[2]?.name} ({activeCluster.neighbors[2]?.dist})
                  </span>
                </div>
              </div>
            </div>

            {/* Radar Footer */}
            <div className="relative z-10 bg-black/70 backdrop-blur-xs text-white p-2 rounded-xl text-[10px] flex justify-between">
              <span>Automatic Peer Ring-Fence: Active</span>
              <span className="text-emerald-400 font-bold">4 Neighbors Protected in {villageName}</span>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Neighbor Early Warning List */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              {lang === 'mr' ? 'शेजारील शेतकरी सुरक्षा यादी' : 'Neighboring Farm Risk Matrix'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">GPS Radius: 2 km</span>
          </div>

          <div className="space-y-2.5">
            {activeCluster.neighbors.map((n) => (
              <div key={n.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-xs">{n.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${n.color}`}>
                    {n.risk}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-600">
                  <span>{n.crop} • {n.dist}</span>
                  <span className="font-semibold">{n.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 space-y-1.5">
            <div className="font-bold flex items-center gap-1.5 text-emerald-900">
              <CheckCheck className="w-4 h-4 text-emerald-700" />
              <span>Collective Village Security ({villageName}):</span>
            </div>
            <p className="leading-relaxed">
              When one farm's bio-threat indicators breach thresholds, PIKRAKSHA automatically sends preventive WhatsApp voice alerts to all downwind peers within 2 km, stopping swarm multiplication across {villageName}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

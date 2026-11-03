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

  const neighborFarms = [
    { id: 1, name: 'Ramesh Jadhav (You)', crop: 'Cotton', trapCatch: 10, dist: '0.0 km', status: 'Threshold Crossed (१० पतंग)', risk: 'Origin Swarm', color: 'bg-red-500' },
    { id: 2, name: 'Suresh Rathod', crop: 'Cotton', trapCatch: 8, dist: '0.4 km Downwind', status: 'High Threat in 24h', risk: 'Immediate Threat', color: 'bg-red-500' },
    { id: 3, name: 'Anita Chavan', crop: 'Soybean', trapCatch: 4, dist: '0.9 km East', status: 'Moderate Vigilance', risk: 'Buffer Zone', color: 'bg-amber-500' },
    { id: 4, name: 'Bhagwan Patil', crop: 'Cotton', trapCatch: 2, dist: '1.4 km North', status: 'Safe for Now', risk: 'Low Risk', color: 'bg-emerald-500' },
    { id: 5, name: 'Vithalrao Shinde', crop: 'Pigeonpea (तूर)', trapCatch: 1, dist: '1.8 km North-East', status: 'Safe', risk: 'Low Risk', color: 'bg-emerald-500' }
  ];

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
              {lang === 'mr' ? '२ किमी सामूहिक कीड स्थलांतर इशारा (Community Ring-Fence)' : '2km Swarm Vector Radar: Village-Level Early Alarm'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'कीड शेताची हद्द मानत नाही. शेजारील शेतात पतंग वाढल्यास वाऱ्याच्या दिशेनुसार पुढील २४ तासांत तुमच्या शेतात येणारा धोका आधीच ओळखा.'
                : 'Pests do not obey property fences. Pikraksha links all village traps to predict moth migration vectors across Ner taluka.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-red-50 text-red-800 border border-red-300 text-xs font-extrabold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
              <span>Active Swarm Vector: North-East 7 km/h</span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Swarm Vector Radar Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Visual Geographic Swarm Canvas */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              {lang === 'mr' ? 'नेर शिवार कीड स्थलांतर नकाशा' : 'Ner Village Geographic Swarm Canvas'}
            </h3>
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
                  <div className="font-bold text-emerald-400">Ner Village Cluster</div>
                  <div>Wind: 7 km/h ENE →</div>
                </div>

                {/* Plot 4 */}
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 mx-auto shadow-md"></div>
                  <span className="text-[9px] text-slate-300 font-bold block mt-0.5">Bhagwan Patil (1.4 km)</span>
                </div>
              </div>

              {/* Center Origin: Ramesh Jadhav's farm */}
              <div className="self-center text-center">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white mx-auto shadow-xl flex items-center justify-center text-white text-xs font-black animate-pulse">
                    🚨
                  </div>
                  <div className="w-14 h-14 rounded-full bg-red-500/30 -inset-3 absolute animate-ping pointer-events-none"></div>
                </div>
                <span className="text-[11px] font-black text-amber-300 block mt-1 drop-shadow">
                  Your Farm (10 moths / day)
                </span>
                <span className="text-[9px] text-red-300 font-bold">SWARM ORIGIN</span>
              </div>

              <div className="flex justify-between items-end">
                {/* Plot 2: Downwind */}
                <div className="text-center">
                  <div className="w-5 h-5 rounded-full bg-red-500 mx-auto shadow-md animate-bounce"></div>
                  <span className="text-[9px] text-red-300 font-bold block mt-0.5">Suresh Rathod (0.4 km)</span>
                  <span className="text-[8px] text-yellow-300">🚨 Alert Dispatched</span>
                </div>

                {/* Plot 3 */}
                <div className="text-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500 mx-auto shadow-md"></div>
                  <span className="text-[9px] text-slate-300 font-bold block mt-0.5">Anita Chavan (0.9 km)</span>
                </div>
              </div>
            </div>

            {/* Radar Footer */}
            <div className="relative z-10 bg-black/70 backdrop-blur-xs text-white p-2 rounded-xl text-[10px] flex justify-between">
              <span>Automatic Peer Ring-Fence: Active</span>
              <span className="text-emerald-400 font-bold">4 Neighbors Protected</span>
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
            {neighborFarms.map((n) => (
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
              <span>Collective Village Security:</span>
            </div>
            <p className="leading-relaxed">
              When one farm's pheromone trap crosses threshold, PIKRAKSHA automatically sends gentle preventive WhatsApp voice notes to all 4 downwind neighbors within 2 km.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


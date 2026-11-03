import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Award, 
  Smartphone, 
  Volume2, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  Sparkles,
  Search,
  ExternalLink
} from 'lucide-react';

export default function PikSakhiHubView({ lang = 'en', onPlayAudio }) {
  const [clusterFarmers, setClusterFarmers] = useState([
    {
      id: "wf_1",
      name: "Kamalbai Rathod (कमलबाई राठोड)",
      phone: "+91 98234 *****",
      hasSmartphone: false,
      crop: "Cotton (कापूस)",
      acres: 2.0,
      mothsCaught: 11,
      threshold: 8,
      status: "critical",
      lastScouted: "Today (आज सकाळी)",
      rosetteBollsFound: 6,
      audioDelivered: true
    },
    {
      id: "wf_2",
      name: "Anusaya Jadhav (अनुसया जाधव)",
      phone: "+91 97654 *****",
      hasSmartphone: true,
      crop: "Cotton (कापूस)",
      acres: 2.5,
      mothsCaught: 4,
      threshold: 8,
      status: "safe",
      lastScouted: "Yesterday (काल)",
      rosetteBollsFound: 1,
      audioDelivered: true
    },
    {
      id: "wf_3",
      name: "Meerabai Chavan (मीराबाई चव्हाण)",
      phone: "+91 94218 *****",
      hasSmartphone: false,
      crop: "Cotton (कापूस)",
      acres: 3.0,
      mothsCaught: 9,
      threshold: 8,
      status: "critical",
      lastScouted: "Today (आज दुपारी)",
      rosetteBollsFound: 8,
      audioDelivered: false
    },
    {
      id: "wf_4",
      name: "Shantabai Pawar (शांताबाई पवार)",
      phone: "+91 91583 *****",
      hasSmartphone: false,
      crop: "Cotton (कापूस)",
      acres: 1.5,
      mothsCaught: 5,
      threshold: 8,
      status: "safe",
      lastScouted: "2 days ago",
      rosetteBollsFound: 2,
      audioDelivered: true
    },
    {
      id: "wf_5",
      name: "Kavita Meshram (कविता मेश्राम)",
      phone: "+91 96041 *****",
      hasSmartphone: true,
      crop: "Soybean / Cotton",
      acres: 2.0,
      mothsCaught: 3,
      threshold: 8,
      status: "safe",
      lastScouted: "3 days ago",
      rosetteBollsFound: 0,
      audioDelivered: true
    }
  ]);

  const [selectedFarmerId, setSelectedFarmerId] = useState('wf_1');
  const [newMothCount, setNewMothCount] = useState('');
  const [newRosetteCount, setNewRosetteCount] = useState('');
  const [showAddLogModal, setShowAddLogModal] = useState(false);

  const handleLogScouting = (e) => {
    e.preventDefault();
    const count = parseInt(newMothCount) || 0;
    const rosette = parseInt(newRosetteCount) || 0;
    
    setClusterFarmers(prev => prev.map(f => {
      if (f.id === selectedFarmerId) {
        return {
          ...f,
          mothsCaught: count,
          rosetteBollsFound: rosette,
          status: count >= f.threshold ? "critical" : "safe",
          lastScouted: "Just now (आत्ताच नोंदवले)",
          audioDelivered: true
        };
      }
      return f;
    }));

    setShowAddLogModal(false);
    setNewMothCount('');
    setNewRosetteCount('');
  };

  return (
    <div className="space-y-6">
      {/* 1. SAKHI IDENTITY BANNER - Women Category Core Hero */}
      <div className="rounded-3xl bg-gradient-to-r from-purple-950 via-forest-900 to-emerald-950 text-white p-6 sm:p-7 shadow-xl border border-purple-800/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-3xl shadow-md border-2 border-white/20">
              👩‍🌾
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/30 text-purple-200 text-[10px] font-black uppercase tracking-wider border border-purple-400/30">
                <Sparkles className="w-3 h-3 text-amber-300" />
                {lang === 'mr' ? 'महिला संवर्ग विशेष • कृषी सखी नेटवर्क' : 'Women Category Exclusive • Krishi Sakhi Network'}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                {lang === 'mr' ? 'सुनीताताई राठोड • प्रमाणित पिक सखी' : 'Sunita Tai Rathod • Certified Pik Sakhi'}
              </h2>
              <p className="text-xs text-purple-200 font-medium">
                {lang === 'mr' ? 'नेर शिवार, यवतमाळ • महालक्ष्मी महिला बचत गट (NRLM / MAVIM)' : 'Ner Cluster, Yavatmal • Mahalakshmi SHG (NRLM / MAVIM)'}
              </p>
            </div>
          </div>

          {/* Sakhi Earning & Impact Card */}
          <div className="bg-white/10 backdrop-blur-xs rounded-2xl p-4 border border-white/15 flex items-center gap-4 shrink-0">
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-200 block">
                {lang === 'mr' ? 'मासिक मानधन (लखपती दीदी)' : 'Monthly Incentive Earned'}
              </span>
              <span className="text-2xl font-black text-amber-300">₹४,८००</span>
              <span className="text-[10px] text-emerald-300 block font-semibold">
                {lang === 'mr' ? '४८ शेत पाहण्या पूर्ण' : '48 farm audits completed'}
              </span>
            </div>
            <button
              onClick={() => setShowAddLogModal(true)}
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 text-xs font-black flex items-center gap-1.5 shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              {lang === 'mr' ? 'पाहणी नोंदवा' : 'Log Scouting'}
            </button>
          </div>
        </div>

        {/* Core Statistical Evidence Box */}
        <div className="p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs text-purple-100 flex items-start gap-2.5">
          <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {lang === 'mr' ? (
              <>
                <strong>डिजिटल दरीवर उपाय (NSO 2025 अहवाल):</strong> महाराष्ट्रातील <strong>५१.६% ग्रामीण महिलांकडे स्वतःचा स्मार्टफोन नाही</strong>. पीकरक्षा प्रणालीमध्ये प्रत्येक गावात प्रशिक्षित 'पिक सखी' १० ते १५ महिला शेतकऱ्यांच्या शेतातील सापळ्यांची पाहणी करून थेट मराठी ध्वनी संदेश त्यांच्या कुटुंबीयांपर्यंत पोहोचवते.
              </>
            ) : (
              <>
                <strong>Bridging the Digital Divide (NSO 2025 Data):</strong> Over <strong>51.6% of rural women in Maharashtra do not own a smartphone</strong>. PIKRAKSHA's Pik Sakhi model empowers trained women para-extension workers to scout 10–15 women-headed plots and bridge the digital gap via in-person visits and audio bulletins.
              </>
            )}
          </p>
        </div>
      </div>

      {/* 2. CLUSTER MEMBER STATUS TABLE */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-extrabold text-slate-900">
              {lang === 'mr' ? 'पिक सखी क्लस्टर सदस्य शेतकरी (१२ महिला शेतकरी गट)' : 'Cluster Member Farmers (12 Women Farmers Group)'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'mr' ? 'सापळा संख्या व डोमकळी प्रत्यक्ष शेत तपासणी अहवाल' : 'Pheromone trap catches & rosette flower field inspection logs'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-extrabold border border-purple-200 self-start sm:self-auto">
            {lang === 'mr' ? '२ शेतात आर्थिक नुकसान पातळी ओलांडली' : '2 Farms Exceeded Threshold'}
          </span>
        </div>

        {/* Member Cards */}
        <div className="divide-y divide-slate-100">
          {clusterFarmers.map((farmer) => (
            <div key={farmer.id} className="py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 hover:bg-slate-50/60 p-2 rounded-2xl transition">
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                  farmer.status === 'critical' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {farmer.status === 'critical' ? '⚠️' : '✅'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-extrabold text-slate-900">{farmer.name}</h4>
                    <span className="text-[10px] font-semibold text-slate-500">({farmer.acres} एकर)</span>
                    {!farmer.hasSmartphone && (
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold">
                        {lang === 'mr' ? 'फोन नाही (सखी सहाय्य)' : 'No Smartphone'}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-0.5">
                    <span>{farmer.crop}</span>
                    <span>•</span>
                    <span>तपासणी: {farmer.lastScouted}</span>
                    <span>•</span>
                    <span className={farmer.rosetteBollsFound > 3 ? "text-red-600 font-bold" : ""}>
                      {farmer.rosetteBollsFound} डोमकळ्या नष्ट केल्या
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Audio Trigger */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="text-right">
                  <div className={`text-sm font-black ${farmer.status === 'critical' ? 'text-red-600' : 'text-slate-800'}`}>
                    {farmer.mothsCaught} / {farmer.threshold} पतंग
                  </div>
                  <span className={`text-[10px] font-bold ${farmer.status === 'critical' ? 'text-red-700' : 'text-emerald-700'}`}>
                    {farmer.status === 'critical' ? 'धोकादायक पातळी' : 'सुरक्षित'}
                  </span>
                </div>

                <button
                  onClick={() => onPlayAudio && onPlayAudio(`शेतकरी भगिनी ${farmer.name} यांच्या शेतात आज ${farmer.mothsCaught} पतंग आढळले आहेत. कृपया लगेच डोमकळ्या तोडून निंबोळी अर्काची फवारणी करावी.`)}
                  className="px-3 py-1.5 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-900 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <Volume2 className="w-3.5 h-3.5 text-purple-700" />
                  {lang === 'mr' ? 'ध्वनी संदेश पाठवा' : 'Send Audio'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LOG SCOUTING MODAL */}
      {showAddLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-black text-slate-900">
              {lang === 'mr' ? 'पिक सखी शेत तपासणी नोंद' : 'Log Field Scouting as Pik Sakhi'}
            </h3>

            <form onSubmit={handleLogScouting} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">
                  {lang === 'mr' ? 'शेतकरी निवडा:' : 'Select Cluster Farmer:'}
                </label>
                <select 
                  value={selectedFarmerId}
                  onChange={(e) => setSelectedFarmerId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                >
                  {clusterFarmers.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.acres} एकर)</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">
                  {lang === 'mr' ? 'कामगंध सापळ्यातील आजचे पतंग:' : 'Pheromone Trap Catch Today:'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  required
                  value={newMothCount}
                  onChange={(e) => setNewMothCount(e.target.value)}
                  placeholder="उदा. 10 पतंग"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-700 mb-1">
                  {lang === 'mr' ? '२० बोंडांपैकी आढळलेल्या डोमकळ्या (Rosette Flowers):' : 'Damaged / Rosette Flowers Found (in 20 plants):'}
                </label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  required
                  value={newRosetteCount}
                  onChange={(e) => setNewRosetteCount(e.target.value)}
                  placeholder="उदा. 5 डोमकळ्या"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  रद्द करा (Cancel)
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold shadow-md"
                >
                  नोंद जतन करा व ऑडिओ पाठवा
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
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

const CLUSTER_DATA_BY_REGION = {
  pune: {
    sakhiName: {
      en: "Surekha Tai Shinde • Certified Pik Sakhi",
      mr: "सुरेखाताई शिंदे • प्रमाणित पिक सखी",
      hi: "सुरेखा ताई शिंदे • प्रमाणित पीक सखी"
    },
    clusterTitle: {
      en: "Baramati / Junnar Cluster, Pune • Jijau Mahila SHG (NRLM / MAVIM)",
      mr: "बारामती / जुन्नर क्लस्टर, पुणे • जिजाऊ महिला बचत गट (NRLM / MAVIM)",
      hi: "बारामती / जुन्नर क्लस्टर, पुणे • जिजाऊ महिला स्वयं सहायता समूह"
    },
    farmers: [
      {
        id: "wf_p1",
        name: "Shobhabai Patil (शोभाबाई पाटील)",
        phone: "+91 98234 *****",
        hasSmartphone: false,
        crop: "Grapes (द्राक्ष)",
        acres: 2.0,
        mothsCaught: 6,
        threshold: 5,
        status: "critical",
        lastScouted: "Today (आज सकाळी)",
        rosetteBollsFound: 4,
        audioDelivered: true
      },
      {
        id: "wf_p2",
        name: "Lata Gawade (लताताई गावडे)",
        phone: "+91 97654 *****",
        hasSmartphone: true,
        crop: "Grapes (द्राक्ष)",
        acres: 2.5,
        mothsCaught: 3,
        threshold: 5,
        status: "safe",
        lastScouted: "Yesterday (काल)",
        rosetteBollsFound: 1,
        audioDelivered: true
      },
      {
        id: "wf_p3",
        name: "Sunita Kolekar (सुनिता कोळेकर)",
        phone: "+91 94218 *****",
        hasSmartphone: false,
        crop: "Grapes (द्राक्ष)",
        acres: 3.0,
        mothsCaught: 7,
        threshold: 5,
        status: "critical",
        lastScouted: "Today (आज दुपारी)",
        rosetteBollsFound: 5,
        audioDelivered: false
      },
      {
        id: "wf_p4",
        name: "Shakuntala Jagtap (शकुंतला जगताप)",
        phone: "+91 91583 *****",
        hasSmartphone: false,
        crop: "Grapes (द्राक्ष)",
        acres: 1.5,
        mothsCaught: 2,
        threshold: 5,
        status: "safe",
        lastScouted: "2 days ago",
        rosetteBollsFound: 0,
        audioDelivered: true
      }
    ]
  },
  nashik: {
    sakhiName: {
      en: "Kavita Tai Gaikwad • Certified Pik Sakhi",
      mr: "कविताताई गायकवाड • प्रमाणित पिक सखी",
      hi: "कविता ताई गायकवाड़ • प्रमाणित पीक सखी"
    },
    clusterTitle: {
      en: "Dindori Cluster, Nashik • Kranti Mahila SHG (NRLM / MAVIM)",
      mr: "दिंडोरी क्लस्टर, नाशिक • क्रांती महिला बचत गट (NRLM / MAVIM)",
      hi: "दिंडोरी क्लस्टर, नासिक • क्रांति महिला स्वयं सहायता समूह"
    },
    farmers: [
      {
        id: "wf_n1",
        name: "Usha Gangurde (उषाबाई गांगुर्डे)",
        phone: "+91 98221 *****",
        hasSmartphone: false,
        crop: "Grapes / Onion",
        acres: 2.5,
        mothsCaught: 7,
        threshold: 5,
        status: "critical",
        lastScouted: "Today",
        rosetteBollsFound: 5,
        audioDelivered: true
      },
      {
        id: "wf_n2",
        name: "Suman Bhalerao (सुमन भालेराव)",
        phone: "+91 98222 *****",
        hasSmartphone: true,
        crop: "Grapes (द्राक्ष)",
        acres: 3.0,
        mothsCaught: 3,
        threshold: 5,
        status: "safe",
        lastScouted: "Yesterday",
        rosetteBollsFound: 0,
        audioDelivered: true
      }
    ]
  },
  yavatmal: {
    sakhiName: {
      en: "Sunita Tai Rathod • Certified Pik Sakhi",
      mr: "सुनीताताई राठोड • प्रमाणित पिक सखी",
      hi: "सुनीता ताई राठौड़ • प्रमाणित पीक सखी"
    },
    clusterTitle: {
      en: "Ner Cluster, Yavatmal • Mahalakshmi SHG (NRLM / MAVIM)",
      mr: "नेर क्लस्टर, यवतमाळ • महालक्ष्मी महिला बचत गट (NRLM / MAVIM)",
      hi: "नेर क्लस्टर, यवतमाल • महालक्ष्मी महिला स्वयं सहायता समूह"
    },
    farmers: [
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
      }
    ]
  }
};

export default function PikSakhiHubView({ farm, lang = 'en', onPlayAudio }) {
  const villageStr = typeof farm?.location?.village === 'object'
    ? (farm?.location?.village?.[lang] || farm?.location?.village?.en || 'Ner')
    : (farm?.location?.village || 'Ner');

  const districtStr = typeof farm?.location?.district === 'object'
    ? (farm?.location?.district?.[lang] || farm?.location?.district?.en || 'Yavatmal')
    : (farm?.location?.district || 'Yavatmal');

  const distLower = districtStr.toLowerCase();
  const villLower = villageStr.toLowerCase();

  const regionKey = (distLower.includes('pune') || villLower.includes('baramati') || villLower.includes('junnar')) ? 'pune'
    : (distLower.includes('nashik') || villLower.includes('dindori')) ? 'nashik'
    : 'yavatmal';

  const regionalMeta = CLUSTER_DATA_BY_REGION[regionKey] || CLUSTER_DATA_BY_REGION.yavatmal;

  const [clusterFarmers, setClusterFarmers] = useState(regionalMeta.farmers);
  const [selectedFarmerId, setSelectedFarmerId] = useState(regionalMeta.farmers[0]?.id || 'wf_1');
  const [newMothCount, setNewMothCount] = useState('');
  const [newRosetteCount, setNewRosetteCount] = useState('');
  const [showAddLogModal, setShowAddLogModal] = useState(false);

  useEffect(() => {
    setClusterFarmers(regionalMeta.farmers);
    setSelectedFarmerId(regionalMeta.farmers[0]?.id || 'wf_1');
  }, [regionKey]);

  const sakhiDisplayName = regionalMeta.sakhiName[lang] || regionalMeta.sakhiName.en;
  const clusterDisplayTitle = `${villageStr} Cluster, ${districtStr} • ${lang === 'mr' ? 'महिला बचत गट (NRLM / MAVIM)' : 'Self-Help Group (NRLM / MAVIM)'}`;

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
          lastScouted: lang === 'mr' ? "आत्ताच नोंदवले" : "Just now",
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
                {sakhiDisplayName}
              </h2>
              <p className="text-xs text-purple-200 font-medium">
                {clusterDisplayTitle}
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
              className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-forest-950 text-xs font-black flex items-center gap-1.5 shadow-lg transition cursor-pointer"
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
                <strong>डिजिटल दरीवर उपाय (NSO २०२५ अहवाल):</strong> महाराष्ट्रातील <strong>५१.६% ग्रामीण महिलांकडे स्वतःचा स्मार्टफोन नाही</strong>. पीकरक्षा प्रणालीमध्ये <strong>{villageStr}</strong> गावातील प्रशिक्षित 'पिक सखी' १० ते १५ महिला शेतकऱ्यांच्या शेतातील सापळ्यांची पाहणी करून थेट मराठी ध्वनी संदेश त्यांच्या कुटुंबीयांपर्यंत पोहोचवते.
              </>
            ) : (
              <>
                <strong>Bridging the Digital Divide (NSO 2025 Data):</strong> Over <strong>51.6% of rural women in Maharashtra do not own a smartphone</strong>. In <strong>{villageStr}</strong>, PIKRAKSHA's local Pik Sakhi visits women-headed plots and bridges the digital gap through in-person audits and regional audio bulletins.
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
              {lang === 'mr' ? `${villageStr} क्लस्टर सदस्य शेतकरी महिला गट` : `${villageStr} Cluster Member Farmers Group`}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'mr' ? 'सापळा संख्या व प्रत्यक्ष शेत तपासणी अहवाल' : 'Pheromone trap catches & field inspection logs'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-800 text-xs font-extrabold border border-purple-200 self-start sm:self-auto">
            {lang === 'mr' ? 'स्थानिक महिला बचत गट (NRLM)' : 'Local Women SHG Cluster'}
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
                    <span>{lang === 'mr' ? 'तपासणी' : 'Audited'}: {farmer.lastScouted}</span>
                    <span>•</span>
                    <span className={farmer.rosetteBollsFound > 3 ? "text-red-600 font-bold" : ""}>
                      {farmer.rosetteBollsFound} {lang === 'mr' ? 'कीडग्रस्त फुले नष्ट केली' : 'infested parts destroyed'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Audio Trigger */}
              <div className="flex items-center gap-3 self-end md:self-auto">
                <div className="text-right">
                  <div className={`text-sm font-black ${farmer.status === 'critical' ? 'text-red-600' : 'text-slate-800'}`}>
                    {farmer.mothsCaught} / {farmer.threshold} {lang === 'mr' ? 'पतंग' : 'moths'}
                  </div>
                  <span className={`text-[10px] font-bold ${farmer.status === 'critical' ? 'text-red-700' : 'text-emerald-700'}`}>
                    {farmer.status === 'critical' ? (lang === 'mr' ? 'धोकादायक पातळी' : 'Critical') : (lang === 'mr' ? 'सुरक्षित' : 'Safe')}
                  </span>
                </div>

                <button
                  onClick={() => onPlayAudio && onPlayAudio(
                    lang === 'mr' 
                      ? `${farmer.name} यांच्या शेतात आज ${farmer.mothsCaught} पतंग सापडले असून पीक सुरक्षित राखण्यासाठी तातडीने सेंद्रिय निमार्क फवारणी करावी.`
                      : `Alert for ${farmer.name}. ${farmer.mothsCaught} moths recorded today. Timely biological spray advised.`
                  )}
                  className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition"
                  title="Play Marathi Audio Bulletin"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Scouting Modal */}
      {showAddLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-2xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-purple-100">
            <h3 className="text-lg font-black text-slate-900">
              {lang === 'mr' ? 'नवीन शेत पाहणी नोंदवा (पिक सखी)' : 'Log Field Scouting (Pik Sakhi)'}
            </h3>
            <p className="text-xs text-slate-600">
              {lang === 'mr' ? 'कोणत्या महिला शेतकऱ्याच्या शेताची पाहणी केली ते निवडा:' : 'Select farmer and enter field trap inspection count:'}
            </p>
            <form onSubmit={handleLogScouting} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  {lang === 'mr' ? 'शेतकरी महिला निवडा:' : 'Select Farmer:'}
                </label>
                <select
                  value={selectedFarmerId}
                  onChange={(e) => setSelectedFarmerId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {clusterFarmers.map(f => (
                    <option key={f.id} value={f.id}>{f.name} ({f.crop})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'mr' ? 'सापळ्यातील पतंग:' : 'Moths Caught:'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={newMothCount}
                    onChange={(e) => setNewMothCount(e.target.value)}
                    placeholder="उदा. 8"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    {lang === 'mr' ? 'कीडग्रस्त फुले नष्ट:' : 'Infested Parts:'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={newRosetteCount}
                    onChange={(e) => setNewRosetteCount(e.target.value)}
                    placeholder="उदा. 4"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  {lang === 'mr' ? 'रद्द करा' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-black bg-purple-700 hover:bg-purple-800 text-white shadow-md transition"
                >
                  {lang === 'mr' ? 'पाहणी जतन करा (Save)' : 'Save Scouting Log'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

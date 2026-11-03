import React from 'react';
import { 
  Home, 
  TrendingUp, 
  Camera, 
  Bug, 
  Layers, 
  Info, 
  Users, 
  Sparkles,
  ShieldCheck,
  Radio,
  Clock,
  ListTodo,
  HelpCircle,
  FileCheck2,
  Building2,
  Award,
  Send,
  ClipboardCheck,
  Mic,
  BarChart3,
  Satellite,
  FlaskConical,
  Wind,
  CalendarDays,
  IndianRupee,
  Shield
} from 'lucide-react';

export default function Sidebar({ 
  portal, 
  activeTab, 
  setActiveTab, 
  lang, 
  t 
}) {
  const farmerNav = [
    { id: 'dashboard', label: lang === 'mr' ? 'माझे शेत' : lang === 'hi' ? 'मेरा खेत' : 'Farm Dashboard', icon: Home },
    { id: 'timeline', label: lang === 'mr' ? '७-दिवसीय धोका अंदाज' : lang === 'hi' ? '7-दिवसीय जोखिम' : '7-Day Threat Timeline', icon: TrendingUp, badge: "Core" },
    { id: 'why-risk', label: lang === 'mr' ? 'धोका का निर्माण झाला?' : lang === 'hi' ? 'जोखिम क्यों है?' : 'Why Am I at Risk?', icon: HelpCircle, badge: "XAI" },
    { id: 'action-plan', label: lang === 'mr' ? 'आजचा कृती आराखडा' : lang === 'hi' ? 'आज की कार्ययोजना' : 'Daily Action Plan', icon: ListTodo, badge: "Daily" },
    { id: 'pik-sakhi', label: lang === 'mr' ? 'पिक सखी क्लस्टर हब' : lang === 'hi' ? 'पिक सखी क्लस्टर' : 'Pik Sakhi Hub (Women)', icon: Users, badge: "Women" },
    { id: 'scanner', label: lang === 'mr' ? 'AI पीक रोगनिदान' : lang === 'hi' ? 'AI फसल निदान' : 'AI Crop Scanner', icon: Camera, badge: "AI" },
    { id: 'traps', label: lang === 'mr' ? 'कामगंध सापळे नोंद' : lang === 'hi' ? 'फेरोमोन ट्रैप' : 'Pheromone Traps', icon: Bug },
    { id: 'satellite', label: lang === 'mr' ? 'पीकदृष्टी उपग्रह रडार' : lang === 'hi' ? 'उपग्रह रडार (NDRE)' : 'PikDrishti Satellite Radar', icon: Satellite, badge: "NDRE" },
    { id: 'bio-brewer', label: lang === 'mr' ? 'घरगुती जैविक औषध प्रयोगशाळा' : lang === 'hi' ? 'जैविक अर्क लैब' : 'Bio-Brewer Lab (Zero Chem)', icon: FlaskConical, badge: "Bio" },
    { id: 'weather', label: lang === 'mr' ? 'हवामान व बदल' : lang === 'hi' ? 'मौसम विश्लेषण' : 'Weather Intelligence', icon: Clock },
    { id: 'spray-window', label: lang === 'mr' ? 'डेल्टा-T फवारणी वेळ' : lang === 'hi' ? 'छिड़काव अनुकूल समय' : 'Delta-T Spray Window', icon: Wind, badge: "Delta-T" },
    { id: 'crop-calendar', label: lang === 'mr' ? 'पीक वाढ व कीड दिनदर्शिका' : lang === 'hi' ? 'फसल विकास कैलेंडर' : 'Crop Growth Calendar', icon: CalendarDays, badge: "Growth" },
    { id: 'market-link', label: lang === 'mr' ? 'बाजारभाव व उत्पन्न' : lang === 'hi' ? 'मंडी भाव व आय' : 'Mandi Rates & Revenue', icon: IndianRupee, badge: "Mandi" },
    { id: 'soil-health', label: lang === 'mr' ? 'मृदा आरोग्य व पोषण' : lang === 'hi' ? 'मृदा स्वास्थ्य' : 'Soil Health & Resistance', icon: Layers, badge: "Soil" },
    { id: 'community', label: lang === 'mr' ? '२ किमी सामूहिक रडार' : lang === 'hi' ? '2 किमी कीट रडार' : 'Village Swarm Radar', icon: Radio },
    { id: 'treatment', label: lang === 'mr' ? 'उपाययोजना पडताळणी' : lang === 'hi' ? 'उपाय प्रभाव' : 'Treatment Follow-Up', icon: ClipboardCheck },
    { id: 'kisan-ai', label: lang === 'mr' ? 'किसान AI आवाज संवाद' : lang === 'hi' ? 'किसान AI आवाज' : 'KisanAI Voice Copilot', icon: Mic, badge: "Voice" }
  ];

  const officerNav = [
    { id: 'overview', label: lang === 'mr' ? 'महाराष्ट्र आढावा' : 'Maharashtra Overview', icon: Building2 },
    { id: 'districts', label: lang === 'mr' ? 'जिल्हा देखरेख कक्ष' : 'District Surveillance', icon: Layers },
    { id: 'trap-surveillance', label: lang === 'mr' ? 'सापळे नुकसान पातळी' : 'Trap ETL Surveillance', icon: Bug, badge: "ETL" },
    { id: 'expert-verification', label: lang === 'mr' ? 'तज्ज्ञ पडताळणी कक्ष' : 'Expert Verification', icon: FileCheck2, badge: "Audit" },
    { id: 'sakhi-surveillance', label: lang === 'mr' ? 'पिक सखी महिला नेटवर्क' : 'Pik Sakhi Women Network', icon: Users, badge: "Women" },
    { id: 'village-outbreaks', label: lang === 'mr' ? 'गाव पातळीवरील उद्रेक' : 'Village Outbreak Clusters', icon: Radio, badge: "Swarm" },
    { id: 'broadcasting', label: lang === 'mr' ? 'सामूहिक संदेश प्रसारण' : 'Advisory Broadcasting', icon: Send },
    { id: 'crop-insurance', label: lang === 'mr' ? 'पीक विमा नुकसान पंचनामा' : 'PMFBY Crop Insurance', icon: Shield, badge: "PMFBY" },
    { id: 'impact', label: lang === 'mr' ? 'आर्थिक बचत व प्रभाव' : 'Impact Analytics', icon: Award, badge: "ROI" },
    { id: 'how-it-works', label: lang === 'mr' ? 'प्रणाली कशी चालते?' : 'System Architecture', icon: Info },
    { id: 'team', label: lang === 'mr' ? 'संघ व सेव्हा चॅलेंज' : 'Team & Challenge', icon: Users, badge: "2026" }
  ];

  const currentNav = portal === 'farmer' ? farmerNav : officerNav;

  return (
    <aside className="w-64 bg-[#0d2218] text-[#e2ede7] flex flex-col justify-between shrink-0 min-h-screen border-r border-[#1a382a] shadow-xl">
      <div className="flex flex-col flex-1 min-h-0">
        {/* Brand Header */}
        <div className="p-4 border-b border-[#1b3d2e] bg-[#091a12] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shadow-inner shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <h1 className="text-lg font-extrabold tracking-tight text-white">PIKRAKSHA</h1>
                <span className="text-amber-400 text-xs font-bold">पीकरक्षा</span>
              </div>
              <p className="text-[10px] text-emerald-300 font-medium">
                {portal === 'farmer' ? '👨‍🌾 Farmer Early Warning' : '🏛️ Agriculture Officer Desk'}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list with smooth scroll */}
        <div className="p-2.5 space-y-1 overflow-y-auto flex-1 custom-scrollbar">
          <div className="px-3 pt-2 pb-1.5 text-[10px] font-bold tracking-wider text-[#739b85] uppercase">
            {portal === 'farmer' 
              ? (lang === 'mr' ? 'शेतकरी सेवा मेनू (१७ विभाग)' : lang === 'hi' ? 'किसान सेवा मेनू (17 विभाग)' : 'Farmer Workflow (17 Modules)') 
              : (lang === 'mr' ? 'अधिकारी नियंत्रण कक्ष (११ विभाग)' : lang === 'hi' ? 'अधिकारी नियंत्रण कक्ष (11 विभाग)' : 'Officer Command (11 Modules)')}
          </div>

          {currentNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#1b4332] text-white font-bold shadow-xs border border-emerald-500/40'
                    : 'text-[#bad4c6] hover:bg-[#132e22] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-400' : 'text-[#7da791]'}`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-black shrink-0 ${
                    item.badge === 'Core' ? 'bg-red-500 text-white' :
                    item.badge === 'XAI' ? 'bg-amber-400 text-forest-950' :
                    item.badge === 'Daily' ? 'bg-emerald-400 text-forest-950' :
                    item.badge === 'Voice' ? 'bg-purple-400 text-purple-950' :
                    item.badge === 'NDRE' ? 'bg-cyan-400 text-cyan-950' :
                    item.badge === 'Bio' ? 'bg-lime-400 text-lime-950' :
                    item.badge === 'Delta-T' ? 'bg-sky-400 text-sky-950' :
                    item.badge === 'Growth' ? 'bg-amber-300 text-amber-950' :
                    item.badge === 'Mandi' ? 'bg-yellow-400 text-yellow-950' :
                    item.badge === 'Soil' ? 'bg-emerald-300 text-emerald-950' :
                    item.badge === 'PMFBY' ? 'bg-blue-400 text-blue-950' :
                    'bg-slate-700 text-slate-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[#1a382a] bg-[#0a1c13] text-[10px] text-[#80a593] flex items-center justify-between shrink-0">
        <span>Seva Challenge 2026</span>
        <span className="text-emerald-400 font-bold">VNMKV · MPKV</span>
      </div>
    </aside>
  );
}

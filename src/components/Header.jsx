import React from 'react';
import { 
  Volume2, 
  Share2, 
  Plus, 
  Award, 
  Building2, 
  LogOut,
  MapPin
} from 'lucide-react';

export default function Header({ 
  portal, 
  setPortal, 
  farms = [], 
  selectedFarmId, 
  setSelectedFarmId, 
  lang = 'en', 
  setLang, 
  t = {}, 
  onOpenAudio, 
  onAddNewFarm,
  currentUser,
  onOpenLoginModal,
  onLogout
}) {
  const currentFarm = (farms && farms.find(f => f && f.id === selectedFarmId)) || (farms && farms[0]) || {};
  
  const rawFarmerName = typeof currentFarm?.farmerName === 'object' 
    ? (currentFarm.farmerName[lang] || currentFarm.farmerName.en || 'Farmer') 
    : (currentFarm?.farmerName || 'Farmer');
  const farmerInitial = String(rawFarmerName).charAt(0) || 'F';

  // Role-based portal visibility
  const userRole = currentUser?.role || 'farmer';
  const showFarmerPortal = userRole === 'farmer' || userRole === 'pik_sakhi';
  const showOfficerPortal = userRole === 'officer';
  // If only one portal is available, no need for toggle
  const showPortalToggle = !showFarmerPortal || !showOfficerPortal; // always true since roles are exclusive

  const handleShareWhatsApp = () => {
    const fName = typeof currentFarm?.farmerName === 'object' ? (currentFarm.farmerName[lang] || currentFarm.farmerName.en) : (currentFarm?.farmerName || '');
    const vName = typeof currentFarm?.location?.village === 'object' ? (currentFarm.location.village[lang] || currentFarm.location.village.en) : (currentFarm?.location?.village || '');
    const dName = typeof currentFarm?.location?.district === 'object' ? (currentFarm.location.district[lang] || currentFarm.location.district.en) : (currentFarm?.location?.district || '');
    const cName = typeof currentFarm?.crop?.name === 'object' ? (currentFarm.crop.name[lang] || currentFarm.crop.name.en) : (currentFarm?.crop?.name || '');
    const pName = typeof currentFarm?.primaryAlert?.pestName === 'object' ? (currentFarm.primaryAlert.pestName[lang] || currentFarm.primaryAlert.pestName.en) : (currentFarm?.primaryAlert?.pestName || '');
    const pText = typeof currentFarm?.primaryAlert?.peakText === 'object' ? (currentFarm.primaryAlert.peakText[lang] || currentFarm.primaryAlert.peakText.en) : (currentFarm?.primaryAlert?.peakText || '');

    const text = encodeURIComponent(
      `*PIKRAKSHA (पीकरक्षा) पूर्वसूचना*\n` +
      `शेतकरी: ${fName}\n` +
      `गाव: ${vName}, ${dName}\n` +
      `पीक: ${cName}\n` +
      `धोका: ${pName}\n` +
      `अंदाज: ${pText}\n\n` +
      `Seva First Innovation Challenge 2026 - महाराष्ट्र झोन.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      {/* 3 Core Pitch Deck Commitments Banner */}
      <div className="bg-gradient-to-r from-[#0d2218] via-forest-850 to-[#091a12] text-white text-[11px] px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 font-bold text-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Seva First Innovation Challenge 2026
          </span>
          <span className="text-emerald-400/50">•</span>
          <span className="text-emerald-200">Women Category • Agriculture</span>
        </div>

        <div className="flex items-center gap-3 text-[10px] text-emerald-200">
          <span className="font-semibold text-white">🎯 Targets:</span>
          <span><strong>1,000</strong> Pilot Farms</span>
          <span>•</span>
          <span><strong>2–7 Days</strong> Early Warning</span>
          <span>•</span>
          <span className="text-amber-300 font-bold"><strong>₹0</strong> Cost to Farmer</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Portal label (role-based, NO toggle) + Farm Switcher */}
        <div className="flex items-center gap-3 flex-wrap">
          
          {/* Show ONLY the portal that matches the logged-in role */}
          <div className="inline-flex rounded-xl border border-slate-300 bg-slate-100 p-0.5 shadow-2xs">
            {showFarmerPortal && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-forest-850 text-white shadow-xs">
                <span>{userRole === 'pik_sakhi' ? '👩‍🌾' : '👨‍🌾'}</span>
                <span>
                  {userRole === 'pik_sakhi'
                    ? (lang === 'mr' ? 'पीक सखी पोर्टल' : 'Pik Sakhi Portal')
                    : (lang === 'mr' ? 'शेतकरी पोर्टल' : lang === 'hi' ? 'किसान पोर्टल' : 'Farmer Portal')
                  }
                </span>
              </div>
            )}
            {showOfficerPortal && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-forest-850 text-white shadow-xs">
                <Building2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>{lang === 'mr' ? 'कृषी अधिकारी पोर्टल' : lang === 'hi' ? 'कृषि अधिकारी पोर्टल' : 'Officer Portal'}</span>
              </div>
            )}
          </div>

          {/* Farm Switcher (Active only in Farmer portal) */}
          {portal === 'farmer' && (
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-900 font-extrabold flex items-center justify-center text-xs border border-emerald-300 shrink-0">
                {farmerInitial}
              </div>
              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                className="bg-transparent font-bold text-slate-800 text-xs cursor-pointer focus:outline-none rounded py-1 max-w-[200px] sm:max-w-none truncate"
              >
                {farms.map((f) => {
                  if (!f) return null;
                  const fName = typeof f.farmerName === 'object' ? (f.farmerName[lang] || f.farmerName.en) : f.farmerName;
                  const cName = typeof f.crop?.name === 'object' ? (f.crop.name[lang] || f.crop.name.en) : (f.crop?.name || '');
                  const dName = typeof f.location?.district === 'object' ? (f.location.district[lang] || f.location.district.en) : (f.location?.district || '');
                  return (
                    <option key={f.id} value={f.id}>
                      {fName} • {cName} ({dName})
                    </option>
                  );
                })}
              </select>
              <button 
                onClick={onAddNewFarm}
                title="Add sample farm"
                className="text-xs text-emerald-700 hover:bg-emerald-50 p-1 rounded transition shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Right: Audio, Share, Language, User Badge & Logout */}
        <div className="flex items-center gap-2">
          {/* Audio read-out */}
          <button
            onClick={onOpenAudio}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition"
            title="Listen to automated voice bulletin in regional language"
          >
            <Volume2 className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden sm:inline">{t.btnListen || 'Listen'}</span>
          </button>

          {/* WhatsApp share */}
          <button
            onClick={handleShareWhatsApp}
            className="hidden md:flex items-center gap-1 px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-semibold transition"
          >
            <Share2 className="w-3 h-3" />
            <span>Share</span>
          </button>

          {/* Language Toggle: English | मराठी | हिंदी */}
          <div className="inline-flex rounded-lg border border-slate-300 bg-slate-100 p-0.5">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition ${
                lang === 'en' ? 'bg-forest-850 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('mr')}
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition ${
                lang === 'mr' ? 'bg-forest-850 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition ${
                lang === 'hi' ? 'bg-forest-850 text-white shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Logged-in User Badge */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{userRole === 'officer' ? '🏛️' : userRole === 'pik_sakhi' ? '👩‍🌾' : '👨‍🌾'}</span>
              <span className="truncate max-w-[100px] hidden lg:inline">
                {lang === 'mr' && currentUser?.nameMr ? currentUser.nameMr : (currentUser?.name || 'User')}
              </span>
            </div>

            {/* Sign Out Button */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition cursor-pointer"
                title={lang === 'mr' ? 'बाहेर पडा (Sign Out)' : 'Sign Out'}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{lang === 'mr' ? 'बाहेर पडा' : lang === 'hi' ? 'लॉगआउट' : 'Logout'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

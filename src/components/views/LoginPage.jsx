import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Phone, 
  KeyRound, 
  Sparkles, 
  ArrowRight, 
  MessageSquare,
  Building2,
  Users,
  Sprout,
  CheckCircle2,
  Award,
  Lock,
  UserPlus,
  MapPin
} from 'lucide-react';

export const DEMO_USERS = {
  farmer: [
    {
      id: 'farm-1',
      name: 'Ramesh Jadhav',
      nameMr: 'रमेश जाधव',
      role: 'farmer',
      crop: 'Cotton (कापूस)',
      village: 'Ner, Yavatmal',
      phone: '9822012345',
      farmId: 'farm-1'
    },
    {
      id: 'farm-2',
      name: 'Sopanrao Patil',
      nameMr: 'सोपानराव पाटील',
      role: 'farmer',
      crop: 'Grapes (द्राक्ष)',
      village: 'Dindori, Nashik',
      phone: '9822012346',
      farmId: 'farm-2'
    },
    {
      id: 'farm-3',
      name: 'Sunita Deshmukh',
      nameMr: 'सुनिता देशमुख',
      role: 'farmer',
      crop: 'Soybean (सोयाबीन)',
      village: 'Ausa, Latur',
      phone: '9822012348',
      farmId: 'farm-3'
    },
    {
      id: 'farm-4',
      name: 'Dnyaneshwar Shinde',
      nameMr: 'ज्ञानेश्वर शिंदे',
      role: 'farmer',
      crop: 'Tomato (टोमॅटो)',
      village: 'Junnar, Pune',
      phone: '9822012347',
      farmId: 'farm-4'
    }
  ],
  pik_sakhi: [
    {
      id: 'sakhi-1',
      name: 'Sunita Pawar',
      nameMr: 'सुनीता पवार',
      role: 'pik_sakhi',
      crop: 'Cotton (कापूस)',
      title: 'Pik Sakhi Lead (SHG महिला प्रतिनिधी)',
      village: 'Ner Cluster, Yavatmal',
      phone: '9822054321',
      farmId: 'farm-1'
    }
  ],
  officer: [
    {
      id: 'officer-1',
      name: 'Dr. V. K. Deshmukh',
      nameMr: 'डॉ. व्ही. के. देशमुख',
      role: 'officer',
      title: 'Senior Taluka Agronomist (तालुका कृषी अधिकारी)',
      village: 'Ner Sub-Division, Yavatmal',
      phone: '9822099999',
      farmId: 'farm-1'
    }
  ]
};

const CROP_OPTIONS = [
  'Cotton (कापूस)',
  'Grapes (द्राक्ष)',
  'Soybean (सोयाबीन)',
  'Tomato (टोमॅटो)',
  'Onion (कांदा)',
  'Sugarcane (ऊस)',
  'Pomegranate (डाळिंब)',
  'Wheat (गहू)',
  'Jowar (ज्वारी)',
  'Tur (तूर)'
];

const DISTRICT_OPTIONS = [
  'Yavatmal', 'Nashik', 'Pune', 'Latur', 'Solapur', 'Kolhapur',
  'Nagpur', 'Amravati', 'Wardha', 'Buldhana', 'Jalgaon', 'Sangli',
  'Satara', 'Ahmednagar', 'Aurangabad', 'Beed', 'Osmanabad', 'Nanded'
];

export default function LoginPage({ onLogin, lang = 'en', setLang }) {
  // Tab: 'signin' or 'register'
  const [activeTab, setActiveTab] = useState('signin');

  // --- Sign In State ---
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [phoneInput, setPhoneInput] = useState('9822012345');
  const [otpInput, setOtpInput] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [simulatedSms, setSimulatedSms] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // --- Register State ---
  const [regRole, setRegRole] = useState('farmer');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regVillage, setRegVillage] = useState('');
  const [regDistrict, setRegDistrict] = useState('Yavatmal');
  const [regCrop, setRegCrop] = useState(CROP_OPTIONS[0]);
  const [regTitle, setRegTitle] = useState('');
  const [regOtpSent, setRegOtpSent] = useState(false);
  const [regOtpInput, setRegOtpInput] = useState('');
  const [regSendingOtp, setRegSendingOtp] = useState(false);
  const [regSms, setRegSms] = useState(null);
  const [regError, setRegError] = useState('');

  const currentAccounts = DEMO_USERS[selectedRole] || DEMO_USERS.farmer;
  const activeUser = currentAccounts[selectedAccountIndex] || currentAccounts[0];

  // --- Sign In Handlers ---
  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setSelectedAccountIndex(0);
    const list = DEMO_USERS[role] || DEMO_USERS.farmer;
    const firstAcc = list[0];
    if (firstAcc) setPhoneInput(firstAcc.phone);
    setIsOtpSent(false);
    setOtpInput('');
    setSimulatedSms(null);
    setErrorMsg('');
  };

  const handleAccountChange = (idx) => {
    setSelectedAccountIndex(idx);
    const acc = currentAccounts[idx];
    if (acc) {
      setPhoneInput(acc.phone);
      setIsOtpSent(false);
      setOtpInput('');
      setSimulatedSms(null);
      setErrorMsg('');
    }
  };

  const handleSendOtp = () => {
    if (!phoneInput || phoneInput.length < 10) {
      setErrorMsg(lang === 'mr' ? 'कृपया १० अंकी मोबाईल नंबर टाका.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    setErrorMsg('');
    setIsSendingOtp(true);
    setTimeout(() => {
      setIsSendingOtp(false);
      setIsOtpSent(true);
      setSimulatedSms({
        from: 'PIKRAKSHA (पीकरक्षा)',
        code: '1234',
        text: lang === 'mr' 
          ? `पीकरक्षा: तुमचा सुरक्षित OTP 1234 आहे. कोणालाही सांगू नका. (Valid for 10 mins)`
          : `PIKRAKSHA: Your verification OTP is 1234. Do not share with anyone. (Valid for 10 mins)`
      });
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput.trim() !== '1234') {
      setErrorMsg(lang === 'mr' ? 'OTP चुकीचा आहे. डेमो OTP 1234 टाका.' : 'Invalid OTP. Please enter demo OTP: 1234');
      return;
    }
    onLogin({ ...activeUser, phone: phoneInput });
  };

  const handleQuickLogin = (role, accountIndex) => {
    const list = DEMO_USERS[role] || DEMO_USERS.farmer;
    const targetUser = list[accountIndex] || list[0];
    onLogin(targetUser);
  };

  // --- Register Handlers ---
  const handleRegSendOtp = () => {
    if (!regName.trim()) {
      setRegError(lang === 'mr' ? 'कृपया नाव टाका.' : 'Please enter your full name.');
      return;
    }
    if (!regPhone || regPhone.length < 10) {
      setRegError(lang === 'mr' ? 'कृपया १० अंकी मोबाईल नंबर टाका.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if ((regRole === 'farmer' || regRole === 'pik_sakhi') && !regVillage.trim()) {
      setRegError(lang === 'mr' ? 'कृपया गाव/तालुका टाका.' : 'Please enter your village/taluka.');
      return;
    }
    setRegError('');
    setRegSendingOtp(true);
    setTimeout(() => {
      setRegSendingOtp(false);
      setRegOtpSent(true);
      setRegSms({
        from: 'PIKRAKSHA (पीकरक्षा)',
        code: '1234',
        text: lang === 'mr'
          ? `पीकरक्षा: तुमची नोंदणी OTP 1234 आहे. कोणालाही सांगू नका.`
          : `PIKRAKSHA: Your registration OTP is 1234. Do not share with anyone.`
      });
    }, 800);
  };

  const handleRegVerify = (e) => {
    e.preventDefault();
    if (regOtpInput.trim() !== '1234') {
      setRegError(lang === 'mr' ? 'OTP चुकीचा आहे. डेमो OTP 1234 टाका.' : 'Invalid OTP. Demo OTP is 1234.');
      return;
    }

    const newId = `new-${Date.now()}`;
    const farmId = regRole === 'officer' ? 'farm-1' : `farm-new-${Date.now()}`;
    const newUser = {
      id: newId,
      name: regName.trim(),
      nameMr: regName.trim(),
      role: regRole,
      crop: regRole !== 'officer' ? regCrop : undefined,
      title: regRole === 'officer' ? (regTitle.trim() || 'Agriculture Officer (कृषी अधिकारी)') : (regRole === 'pik_sakhi' ? 'Pik Sakhi (पीक सखी)' : undefined),
      village: regRole === 'officer' ? `${regDistrict} Division` : `${regVillage.trim()}, ${regDistrict}`,
      villageName: regVillage.trim(),
      district: regDistrict,
      phone: regPhone,
      farmId: farmId,
      isNewRegistration: true
    };

    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1e14] via-[#102d1f] to-[#08170f] text-slate-900 flex flex-col justify-between">
      {/* Top Bar with Language Selector */}
      <div className="px-4 sm:px-8 py-3 flex items-center justify-between border-b border-emerald-900/60 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center font-black shadow-md">
            🌱
          </div>
          <div>
            <h1 className="text-white text-base font-black tracking-tight">PIKRAKSHA <span className="text-emerald-400 font-normal">पीकरक्षा</span></h1>
            <p className="text-[10px] text-emerald-300/80 -mt-0.5">AI Early Warning for Crop Pests & Diseases</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex rounded-lg border border-emerald-800 bg-emerald-950/70 p-0.5">
            <button
              onClick={() => setLang && setLang('en')}
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition ${
                lang === 'en' ? 'bg-emerald-500 text-white shadow-xs' : 'text-emerald-200 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang && setLang('mr')}
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition ${
                lang === 'mr' ? 'bg-emerald-500 text-white shadow-xs' : 'text-emerald-200 hover:text-white'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLang && setLang('hi')}
              className={`px-2.5 py-0.5 rounded-md text-xs font-bold transition ${
                lang === 'hi' ? 'bg-emerald-500 text-white shadow-xs' : 'text-emerald-200 hover:text-white'
              }`}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-900/10 overflow-hidden">
          
          {/* Sign In / Register Tab Toggle */}
          <div className="flex border-b border-slate-200">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-3 text-xs font-extrabold text-center transition flex items-center justify-center gap-1.5 ${
                activeTab === 'signin'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                  : 'bg-slate-50 text-slate-500 hover:text-slate-700'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              {lang === 'mr' ? 'लॉगिन (Sign In)' : 'Sign In'}
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 text-xs font-extrabold text-center transition flex items-center justify-center gap-1.5 ${
                activeTab === 'register'
                  ? 'bg-white text-emerald-800 border-b-2 border-emerald-600'
                  : 'bg-slate-50 text-slate-500 hover:text-slate-700'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              {lang === 'mr' ? 'नवीन नोंदणी (Register)' : 'New Registration'}
            </button>
          </div>

          <div className="p-6 sm:p-8 space-y-5">

            {/* =========== SIGN IN TAB =========== */}
            {activeTab === 'signin' && (
              <>
                {/* Header */}
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <Award className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Seva First Innovation Challenge 2026</span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900">
                    {lang === 'mr' ? 'नमस्कार! लॉगिन करा' : lang === 'hi' ? 'नमस्ते! लॉगिन करें' : 'Welcome! Sign In'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {lang === 'mr' 
                      ? 'तुमची भूमिका निवडा, मोबाईल नंबर टाका आणि OTP द्वारे आत जा' 
                      : 'Choose your role, enter registered mobile & verify via OTP'}
                  </p>
                </div>

                {/* Role Tabs */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    {lang === 'mr' ? '१. भूमिका निवडा:' : '1. Select Your Role:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'farmer', icon: '👨‍🌾', label: lang === 'mr' ? 'शेतकरी' : 'Farmer' },
                      { key: 'pik_sakhi', icon: '👩‍🌾', label: lang === 'mr' ? 'पीक सखी' : 'Pik Sakhi' },
                      { key: 'officer', icon: '🏛️', label: lang === 'mr' ? 'कृषी अधिकारी' : 'Officer' }
                    ].map(r => (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => handleRoleChange(r.key)}
                        className={`p-3 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                          selectedRole === r.key
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-extrabold ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-2xl">{r.icon}</span>
                        <span className="text-xs font-bold">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Profile Selector */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    {lang === 'mr' ? '२. खाते निवडा:' : '2. Select Account Profile:'}
                  </label>
                  <select
                    value={selectedAccountIndex}
                    onChange={(e) => handleAccountChange(parseInt(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-extrabold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    {currentAccounts.map((acc, idx) => (
                      <option key={acc.id} value={idx}>
                        {acc.name} — {acc.crop || acc.title} ({acc.village})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Phone Number & Send OTP */}
                <form onSubmit={handleVerifyOtp} className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                      <span>{lang === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number'}</span>
                      <span className="text-emerald-700 font-mono text-[11px]">✓ Demo: {activeUser.phone}</span>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          maxLength={10}
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter 10-digit mobile"
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isSendingOtp}
                        className="px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-xs transition disabled:opacity-50 shrink-0"
                      >
                        {isSendingOtp ? (lang === 'mr' ? 'पाठवत आहे...' : 'Sending...') : isOtpSent ? (lang === 'mr' ? 'पुन्हा पाठवा' : 'Resend') : (lang === 'mr' ? 'OTP पाठवा' : 'Send OTP')}
                      </button>
                    </div>
                  </div>

                  {/* Simulated SMS */}
                  {simulatedSms && (
                    <div className="p-3.5 rounded-2xl bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-extrabold text-[11px] text-emerald-900">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{simulatedSms.from} • Incoming SMS</span>
                        </span>
                        <button type="button" onClick={() => setOtpInput('1234')}
                          className="text-[10px] bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-0.5 rounded font-bold transition">
                          Auto-Fill 1234
                        </button>
                      </div>
                      <p className="font-mono text-emerald-900 text-[11px] bg-white/80 p-2 rounded-xl border border-emerald-200">
                        "{simulatedSms.text}"
                      </p>
                    </div>
                  )}

                  {/* OTP Field & Enter */}
                  {isOtpSent && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          {lang === 'mr' ? 'SMS मध्ये आलेला OTP टाका:' : 'Enter OTP Code from SMS:'}
                        </label>
                        <div className="relative">
                          <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text" maxLength={4} value={otpInput}
                            onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                            placeholder="1234"
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-sm font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            autoFocus
                          />
                        </div>
                      </div>
                      <button type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition flex items-center justify-center gap-2 cursor-pointer">
                        <span>{lang === 'mr' ? 'सत्यापित करा आणि आत जा' : 'Verify OTP & Enter App'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {errorMsg && <p className="text-xs text-red-600 font-bold">{errorMsg}</p>}
                </form>

                {/* Quick Demo Access */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
                    ⚡ Quick 1-Click Jury Demo Access:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button type="button" onClick={() => handleQuickLogin('farmer', 0)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-bold border border-slate-200 text-left transition truncate flex items-center gap-1.5">
                      <span>👨‍🌾</span><span className="truncate">Ramesh (Cotton)</span>
                    </button>
                    <button type="button" onClick={() => handleQuickLogin('farmer', 1)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-bold border border-slate-200 text-left transition truncate flex items-center gap-1.5">
                      <span>🍇</span><span className="truncate">Sopanrao (Grapes)</span>
                    </button>
                    <button type="button" onClick={() => handleQuickLogin('pik_sakhi', 0)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-bold border border-slate-200 text-left transition truncate flex items-center gap-1.5">
                      <span>👩‍🌾</span><span className="truncate">Sunita (Pik Sakhi)</span>
                    </button>
                    <button type="button" onClick={() => handleQuickLogin('officer', 0)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 font-bold border border-slate-200 text-left transition truncate flex items-center gap-1.5">
                      <span>🏛️</span><span className="truncate">Ner Officer Desk</span>
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* =========== REGISTER TAB =========== */}
            {activeTab === 'register' && (
              <>
                {/* Header */}
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-extrabold uppercase tracking-wider mb-1">
                    <UserPlus className="w-3.5 h-3.5 text-blue-700" />
                    <span>{lang === 'mr' ? 'नवीन खाते तयार करा' : 'Create New Account'}</span>
                  </div>
                  <h2 className="text-xl font-black text-slate-900">
                    {lang === 'mr' ? 'नोंदणी करा' : 'Register'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    {lang === 'mr' 
                      ? 'तुमची माहिती भरा आणि OTP सत्यापित करा' 
                      : 'Fill your details and verify via OTP to create account'}
                  </p>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                    {lang === 'mr' ? '१. तुमची भूमिका:' : '1. Your Role:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'farmer', icon: '👨‍🌾', label: lang === 'mr' ? 'शेतकरी' : 'Farmer' },
                      { key: 'pik_sakhi', icon: '👩‍🌾', label: lang === 'mr' ? 'पीक सखी' : 'Pik Sakhi' },
                      { key: 'officer', icon: '🏛️', label: lang === 'mr' ? 'कृषी अधिकारी' : 'Officer' }
                    ].map(r => (
                      <button
                        key={r.key}
                        type="button"
                        onClick={() => { setRegRole(r.key); setRegOtpSent(false); setRegSms(null); setRegOtpInput(''); setRegError(''); }}
                        className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                          regRole === r.key
                            ? 'bg-emerald-50 border-emerald-600 text-emerald-950 font-extrabold ring-2 ring-emerald-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xl">{r.icon}</span>
                        <span className="text-[11px] font-bold">{r.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleRegVerify} className="space-y-3">
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {lang === 'mr' ? 'पूर्ण नाव *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder={lang === 'mr' ? 'उदा. राजेश पाटील' : 'e.g. Rajesh Patil'}
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {lang === 'mr' ? 'मोबाईल नंबर *' : 'Mobile Number *'}
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="tel" maxLength={10}
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ''))}
                        placeholder="98XXXXXXXX"
                        className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  {/* Village / Taluka (for farmer & pik_sakhi) */}
                  {(regRole === 'farmer' || regRole === 'pik_sakhi') && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {lang === 'mr' ? 'गाव / तालुका *' : 'Village / Taluka *'}
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          value={regVillage}
                          onChange={(e) => setRegVillage(e.target.value)}
                          placeholder={lang === 'mr' ? 'उदा. नेर' : 'e.g. Ner'}
                          className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* District */}
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      {lang === 'mr' ? 'जिल्हा *' : 'District *'}
                    </label>
                    <select
                      value={regDistrict}
                      onChange={(e) => setRegDistrict(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      {DISTRICT_OPTIONS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>

                  {/* Crop (for farmer & pik_sakhi) */}
                  {(regRole === 'farmer' || regRole === 'pik_sakhi') && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {lang === 'mr' ? 'मुख्य पीक *' : 'Primary Crop *'}
                      </label>
                      <select
                        value={regCrop}
                        onChange={(e) => setRegCrop(e.target.value)}
                        className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        {CROP_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  )}

                  {/* Title / Designation (for officer) */}
                  {regRole === 'officer' && (
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        {lang === 'mr' ? 'पदनाम / हुद्दा' : 'Designation / Title'}
                      </label>
                      <input
                        type="text"
                        value={regTitle}
                        onChange={(e) => setRegTitle(e.target.value)}
                        placeholder={lang === 'mr' ? 'उदा. तालुका कृषी अधिकारी' : 'e.g. Taluka Agriculture Officer'}
                        className="w-full px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  )}

                  {/* Send OTP Button */}
                  {!regOtpSent && (
                    <button
                      type="button"
                      onClick={handleRegSendOtp}
                      disabled={regSendingOtp}
                      className="w-full py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-black shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{regSendingOtp ? (lang === 'mr' ? 'OTP पाठवत आहे...' : 'Sending OTP...') : (lang === 'mr' ? 'OTP पाठवा आणि पुढे जा' : 'Send OTP & Continue')}</span>
                    </button>
                  )}

                  {/* Simulated SMS for Registration */}
                  {regSms && (
                    <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-1.5">
                      <div className="flex items-center justify-between font-extrabold text-[11px]">
                        <span className="flex items-center gap-1.5">
                          <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
                          <span>{regSms.from} • Registration SMS</span>
                        </span>
                        <button type="button" onClick={() => setRegOtpInput('1234')}
                          className="text-[10px] bg-blue-600 hover:bg-blue-700 text-white px-2 py-0.5 rounded font-bold transition">
                          Auto-Fill 1234
                        </button>
                      </div>
                      <p className="font-mono text-blue-900 text-[11px] bg-white/80 p-2 rounded-xl border border-blue-200">
                        "{regSms.text}"
                      </p>
                    </div>
                  )}

                  {/* OTP + Verify for Registration */}
                  {regOtpSent && (
                    <div className="space-y-3 pt-1">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          {lang === 'mr' ? 'OTP टाका:' : 'Enter OTP:'}
                        </label>
                        <div className="relative">
                          <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                          <input
                            type="text" maxLength={4} value={regOtpInput}
                            onChange={(e) => setRegOtpInput(e.target.value.replace(/\D/g, ''))}
                            placeholder="1234"
                            className="w-full pl-9 pr-3 py-2.5 bg-slate-50 rounded-xl border border-slate-300 text-sm font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            autoFocus
                          />
                        </div>
                      </div>
                      <button type="submit"
                        className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-md transition flex items-center justify-center gap-2 cursor-pointer">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{lang === 'mr' ? 'नोंदणी पूर्ण करा आणि आत जा' : 'Complete Registration & Enter App'}</span>
                      </button>
                    </div>
                  )}

                  {regError && <p className="text-xs text-red-600 font-bold">{regError}</p>}
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-3 text-[11px] text-emerald-300/60 border-t border-emerald-900/40">
        PIKRAKSHA (पीकरक्षा) • Biophysical Early Warning System • VNMKV & MPKV Agro-Protocols
      </div>
    </div>
  );
}

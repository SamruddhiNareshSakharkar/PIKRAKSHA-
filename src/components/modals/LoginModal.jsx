import React, { useState, useEffect } from 'react';
import { 
  X, 
  UserCheck, 
  ShieldCheck, 
  Phone, 
  KeyRound, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  Building2,
  Users,
  Sprout
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

export default function LoginModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  onLogin, 
  lang = 'en' 
}) {
  const [selectedRole, setSelectedRole] = useState(currentUser?.role || 'farmer');
  const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
  const [phoneInput, setPhoneInput] = useState('9822012345');
  const [otpInput, setOtpInput] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [simulatedSms, setSimulatedSms] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync default phone when role or account changes
  useEffect(() => {
    const list = DEMO_USERS[selectedRole] || DEMO_USERS.farmer;
    const activeAcc = list[selectedAccountIndex] || list[0];
    if (activeAcc) {
      setPhoneInput(activeAcc.phone);
      setIsOtpSent(false);
      setOtpInput('');
      setSimulatedSms(null);
      setErrorMsg('');
    }
  }, [selectedRole, selectedAccountIndex]);

  if (!isOpen) return null;

  const currentAccounts = DEMO_USERS[selectedRole] || DEMO_USERS.farmer;
  const activeUser = currentAccounts[selectedAccountIndex] || currentAccounts[0];

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
    }, 700);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput.trim() !== '1234') {
      setErrorMsg(lang === 'mr' ? 'OTP चुकीचा आहे. डेमो OTP 1234 टाका.' : 'Invalid OTP. Please enter demo OTP: 1234');
      return;
    }

    onLogin({
      ...activeUser,
      phone: phoneInput
    });
    onClose();
  };

  const handleQuickLogin = (role, accountIndex) => {
    const list = DEMO_USERS[role] || DEMO_USERS.farmer;
    const targetUser = list[accountIndex] || list[0];
    onLogin(targetUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                {lang === 'mr' ? 'लॉगिन करा (भूमिका व OTP)' : 'Authentication & Role Login'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {lang === 'mr' ? 'शेतकरी, पीक सखी व कृषी अधिकारी प्रवेश' : 'Role-based access with phone OTP verification'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selection Tabs */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5 uppercase tracking-wider">
            {lang === 'mr' ? '१. तुमची भूमिका निवडा:' : '1. Select User Role:'}
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => { setSelectedRole('farmer'); setSelectedAccountIndex(0); }}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                selectedRole === 'farmer'
                  ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">👨‍🌾</span>
              <span className="text-xs font-extrabold">{lang === 'mr' ? 'शेतकरी' : 'Farmer'}</span>
              <span className="text-[10px] text-slate-400">4 Sample Farms</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedRole('pik_sakhi'); setSelectedAccountIndex(0); }}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                selectedRole === 'pik_sakhi'
                  ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">👩‍🌾</span>
              <span className="text-xs font-extrabold">{lang === 'mr' ? 'पीक सखी' : 'Pik Sakhi'}</span>
              <span className="text-[10px] text-slate-400">Women SHG</span>
            </button>

            <button
              type="button"
              onClick={() => { setSelectedRole('officer'); setSelectedAccountIndex(0); }}
              className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center gap-1 ${
                selectedRole === 'officer'
                  ? 'bg-emerald-50/80 border-emerald-600 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span className="text-xl">🏛️</span>
              <span className="text-xs font-extrabold">{lang === 'mr' ? 'कृषी अधिकारी' : 'Officer'}</span>
              <span className="text-[10px] text-slate-400">Taluka Desk</span>
            </button>
          </div>
        </div>

        {/* Profile / Account Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
            {lang === 'mr' ? '२. खाते निवडा:' : '2. Select Account Profile:'}
          </label>
          <div className="space-y-2">
            {currentAccounts.map((acc, idx) => {
              const isSelected = selectedAccountIndex === idx;
              return (
                <div
                  key={acc.id}
                  onClick={() => setSelectedAccountIndex(idx)}
                  className={`p-3 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-500 shadow-xs ring-1 ring-emerald-400'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-xs text-slate-900">{acc.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-700 font-bold">
                        {acc.crop || acc.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                      📍 {acc.village} • Phone: <span className="font-mono text-slate-700">{acc.phone}</span>
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Simulated Phone Input & OTP Verification */}
        <form onSubmit={handleVerifyOtp} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
              <span>{lang === 'mr' ? 'मोबाईल नंबर' : 'Registered Mobile Number'}</span>
              <span className="text-emerald-700 font-mono text-[11px]">✓ Verified Seed ID</span>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="10-digit mobile"
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp}
                className="px-3.5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold shadow-xs transition disabled:opacity-50 shrink-0"
              >
                {isSendingOtp ? (lang === 'mr' ? 'पाठवत आहे...' : 'Sending...') : isOtpSent ? (lang === 'mr' ? 'पुन्हा पाठवा' : 'Resend OTP') : (lang === 'mr' ? 'OTP मागवा' : 'Send OTP')}
              </button>
            </div>
          </div>

          {/* Simulated SMS Toast Arrival Box */}
          {simulatedSms && (
            <div className="p-3 rounded-xl bg-emerald-100/80 border border-emerald-300 text-emerald-950 text-xs space-y-1 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between font-extrabold text-[11px] text-emerald-900">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{simulatedSms.from} • Incoming SMS</span>
                </span>
                <button
                  type="button"
                  onClick={() => setOtpInput('1234')}
                  className="text-[10px] bg-emerald-700 hover:bg-emerald-800 text-white px-2 py-0.5 rounded font-bold transition"
                >
                  Quick Fill 1234
                </button>
              </div>
              <p className="font-mono text-emerald-900 text-[11px] bg-white/70 p-1.5 rounded-lg border border-emerald-200">
                "{simulatedSms.text}"
              </p>
            </div>
          )}

          {/* OTP Box */}
          {isOtpSent && (
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                {lang === 'mr' ? 'SMS मध्ये आलेला ४-अंकी OTP टाका:' : 'Enter 4-Digit OTP Code:'}
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    maxLength={4}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 1234"
                    className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-300 text-xs font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    autoFocus
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-xs transition shrink-0"
                >
                  {lang === 'mr' ? 'प्रवेश करा ✓' : 'Verify & Enter ✓'}
                </button>
              </div>
            </div>
          )}

          {errorMsg && (
            <p className="text-xs text-red-600 font-bold">{errorMsg}</p>
          )}
        </form>

        {/* 1-Click Demo Shortcut Bar for Jury Demo */}
        <div className="pt-2 border-t border-slate-100">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            ⚡ Quick 1-Click Role Login (Demo Shortcuts):
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLogin('farmer', 0)}
              className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-[11px] font-bold text-center transition truncate"
            >
              👨‍🌾 Ramesh (Cotton)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('farmer', 1)}
              className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-[11px] font-bold text-center transition truncate"
            >
              🍇 Sopanrao (Grapes)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('pik_sakhi', 0)}
              className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-[11px] font-bold text-center transition truncate"
            >
              👩‍🌾 Sunita (Pik Sakhi)
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('officer', 0)}
              className="px-2 py-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 hover:text-emerald-900 text-slate-700 text-[11px] font-bold text-center transition truncate"
            >
              🏛️ Ner Officer Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

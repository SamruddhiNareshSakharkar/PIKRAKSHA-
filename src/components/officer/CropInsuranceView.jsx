import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, AlertTriangle, Download, ArrowUpRight, Filter, Building2 } from 'lucide-react';

export default function CropInsuranceView({ lang, t }) {
  const [filterDistrict, setFilterDistrict] = useState('All');

  const claims = [
    {
      id: 'PMFBY-MH-2026-8812',
      farmer: 'Gangaram Dhanvde',
      village: 'Ner, Yavatmal',
      crop: 'Cotton (कापूस)',
      area: '2.5 Acres',
      threat: 'Pink Bollworm (ETL > 10%)',
      lossClaimed: '45% Damage',
      evidenceStatus: 'Geo-Tagged Photo & Trap Log Verified',
      status: 'Approved for Settlement',
      claimAmount: '₹34,500',
      statusColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'PMFBY-MH-2026-9041',
      farmer: 'Sunita Patil',
      village: 'Kalamb, Yavatmal',
      crop: 'Cotton (कापूस)',
      area: '1.8 Acres',
      threat: 'Bollworm & Bacterial Boll Rot',
      lossClaimed: '60% Damage',
      evidenceStatus: 'Pik Sakhi Cluster Audit Passed',
      status: 'Under Verification',
      claimAmount: '₹28,200',
      statusColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'PMFBY-MH-2026-7734',
      farmer: 'Kishor Deshmukh',
      village: 'Dindori, Nashik',
      crop: 'Grapes (द्राक्षे)',
      area: '3.0 Acres',
      threat: 'Downy Mildew Weather Outbreak',
      lossClaimed: '35% Damage',
      evidenceStatus: 'Weather Microclimate Trigger Corroborated',
      status: 'Approved for Settlement',
      claimAmount: '₹62,000',
      statusColor: 'bg-emerald-100 text-emerald-800'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'प्रधानमंत्री पीक विमा योजना एकत्रीकरण' : 'PMFBY Digital Insurance & Damage Claim Audit'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'डिजिटल पीक नुकसान पुरावा व विमा भरपाई व्यवस्थापन' : 'Automated Crop Insurance Evidence & Claims Adjudication'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'पीकरक्षाचे जिओ-टॅग केलेले फोटो, कामगंध सापळे नोंदी आणि उपग्रह डेटा विमा कंपन्यांच्या पंचनाम्यासाठी अधिकृत पुरावा म्हणून जोडले जातात.'
                : 'Pikraksha logs trap history, geo-tagged AI photos, and satellite NDRE depression directly into PMFBY loss assessment dossiers.'}
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-forest-900 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm hover:bg-forest-800">
              <Download className="w-4 h-4" />
              <span>{lang === 'mr' ? 'पंचनामा अहवाल डाऊनलोड' : 'Export PMFBY Dossier'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Verified Claims Ready</span>
          <div className="text-2xl font-black text-slate-900">142 Cases</div>
          <span className="text-[11px] text-emerald-600 font-bold">100% Backed with Trap Data</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Total Compensation Pipeline</span>
          <div className="text-2xl font-black text-emerald-700">₹48.6 Lakhs</div>
          <span className="text-[11px] text-slate-500">Fast-tracked settlement window</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase">Settlement Turnaround</span>
          <div className="text-2xl font-black text-slate-900">6 Days</div>
          <span className="text-[11px] text-slate-500">Down from 60 days via paper panchnama</span>
        </div>
      </div>

      {/* Claims Verification Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            {lang === 'mr' ? 'सक्रिय विमा दावे आणि पुरावे पडताळणी यादी' : 'Active Insurance Claims with Digital Evidence'}
          </h3>
          <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg font-bold">
            Showing 3 High-Priority Claims
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {claims.map((c) => (
            <div key={c.id} className="p-5 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-700">{c.id}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${c.statusColor}`}>
                    {c.status}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">
                  {c.farmer} • {c.village} ({c.crop}, {c.area})
                </h4>
                <div className="text-xs text-slate-600 flex items-center gap-2 flex-wrap">
                  <span className="text-red-700 font-bold">{c.threat}</span>
                  <span>•</span>
                  <span>Claimed: {c.lossClaimed}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-medium">✓ {c.evidenceStatus}</span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xl font-black text-slate-900">{c.claimAmount}</div>
                <button className="mt-1 px-3 py-1 bg-forest-900 hover:bg-forest-800 text-white rounded-lg text-xs font-bold shadow-xs">
                  Review Audit Logs →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

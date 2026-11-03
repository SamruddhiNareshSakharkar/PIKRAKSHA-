import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Clock, 
  Camera, 
  Sparkles, 
  UserCheck, 
  Send,
  Building2
} from 'lucide-react';

export default function ExpertVerificationView({ submissions, onVerifySubmission, lang, t }) {
  const [selectedSub, setSelectedSub] = useState(submissions[0] || null);
  const [officerNotes, setOfficerNotes] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'verified'

  const filteredSubs = submissions.filter(s => {
    if (filter === 'pending') return s.status === 'pending';
    if (filter === 'verified') return s.status === 'verified';
    return true;
  });

  const handleVerify = (verdict) => {
    if (!selectedSub) return;
    onVerifySubmission(selectedSub.id, verdict, officerNotes);
    setSelectedSub(prev => ({
      ...prev,
      status: verdict,
      officerNotes: officerNotes || (verdict === 'verified' ? 'Verified by Agriculture Assistant (VNMKV standards).' : 'Rejected: Insufficient focus or non-pathogenic.')
    }));
    setOfficerNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'कृषी तज्ज्ञ पडताळणी कक्ष' : 'Expert Verification Desk'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'शेतकऱ्यांनी पाठवलेल्या AI रोगनिदानाची तज्ज्ञ पडताळणी' : 'Agriculture Officer & KVK Diagnosis Verification'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'AI रोगनिदानामध्ये शंका असल्यास कृषी अधिकारी स्वतः फोटो तपासून अधिकृत शिक्कामोर्तब करू शकतात.'
                : 'Slide 3 Governance: Bridges AI image classification with human agricultural officer verification to eliminate false positives.'}
            </p>
          </div>

          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              All ({submissions.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filter === 'pending' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Pending ({submissions.filter(s => s.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('verified')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                filter === 'verified' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
              }`}
            >
              Verified ({submissions.filter(s => s.status === 'verified').length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Submissions list & Officer Audit panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (5 cols): Farmer Submissions List */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">
            Farmer Upload Stream
          </h3>

          <div className="space-y-2.5">
            {filteredSubs.map((sub) => {
              const isSelected = selectedSub?.id === sub.id;
              const isPending = sub.status === 'pending';

              return (
                <div
                  key={sub.id}
                  onClick={() => setSelectedSub(sub)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-emerald-50/60 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-xs">
                      {sub.farmerName} • {sub.crop}
                    </span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      isPending ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {sub.status}
                    </span>
                  </div>

                  <div className="mt-1 text-xs text-slate-600">
                    Suspected: <strong>{sub.suspectedPest}</strong>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{sub.village}</span>
                    <span className="font-semibold text-emerald-700">AI: {sub.aiConfidence}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (7 cols): Officer Audit & Approval Panel */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          {selectedSub ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Verification Dossier: {selectedSub.farmerName}
                  </h3>
                  <span className="text-xs text-slate-500">{selectedSub.village} • Submitted: {selectedSub.date}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                  selectedSub.status === 'verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedSub.status}
                </span>
              </div>

              {/* Specimen Visual */}
              <div 
                className="aspect-16/9 rounded-2xl flex flex-col items-center justify-center text-white p-6 shadow-inner"
                style={{ background: selectedSub.sampleBg }}
              >
                <div className="text-5xl mb-2">{selectedSub.icon}</div>
                <span className="text-base font-extrabold">{selectedSub.crop} Field Specimen</span>
                <span className="text-xs text-emerald-200 font-mono mt-1">
                  AI Model Classification: {selectedSub.suspectedPest} ({selectedSub.aiConfidence}%)
                </span>
              </div>

              {/* Verified details / form */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 block">
                  Official Agronomist Endorsement & Directives:
                </label>
                <textarea
                  rows={3}
                  value={officerNotes}
                  onChange={(e) => setOfficerNotes(e.target.value)}
                  placeholder={
                    selectedSub.officerNotes || 
                    "Enter official university IPM directive (e.g., Confirmed Pink Bollworm rosette damage. Apply 5% NSKE. Do not use synthetic pyrethroids)."
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                ></textarea>

                {selectedSub.officerNotes && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-0.5">Recorded Official Remark:</span>
                    <p>{selectedSub.officerNotes}</p>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleVerify('verified')}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Certify Diagnosis</span>
                  </button>

                  <button
                    onClick={() => handleVerify('rejected')}
                    className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-700 border border-slate-300 text-xs font-bold transition"
                  >
                    Reject / Re-sample
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 text-xs">
              Select a farmer submission from the left list to review.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


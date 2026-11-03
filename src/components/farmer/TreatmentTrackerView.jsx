import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FlaskConical, 
  TrendingDown, 
  Plus, 
  Sparkles,
  ClipboardCheck,
  ShieldCheck
} from 'lucide-react';

export default function TreatmentTrackerView({ farm, treatmentLogs, onAddLog, lang, t }) {
  const [intervention, setIntervention] = useState('');
  const [preCount, setPreCount] = useState(10);
  const [postCount, setPostCount] = useState(4);
  const [outcome, setOutcome] = useState('Effective (नियंत्रणात)');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!intervention.trim()) return;

    const newLog = {
      farmId: farm.id,
      date: new Date().toISOString().split('T')[0],
      intervention,
      preTrapCount: parseInt(preCount),
      postTrapCount: parseInt(postCount),
      healthOutcome: outcome,
      notes: notes || "Recorded by farmer following university IPM advice."
    };

    onAddLog(newLog);
    setIntervention('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <ClipboardCheck className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'उपाययोजना परिणामकारकता नोंद' : 'Treatment Follow-Up Tracker'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'केलेल्या उपायांचे परिणाम व किडीची घट तपासा' : 'Treatment Effectiveness & Crop Recovery Follow-Up'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'केवळ सल्ला देऊन थांबत नाही; केलेल्या जैविक उपाययोजनेनंतर कामगंध सापळ्यातील पतंग कमी झाले का याची पाठपुरावा नोंद.'
                : 'Closes the loop: Tracks whether the recommended IPM intervention successfully suppressed trap catches and restored crop health.'}
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-xl text-emerald-950 font-bold text-xs">
            Average Pest Drop: -62%
          </div>
        </div>
      </div>

      {/* Main Grid: Past Logs & Add Follow-Up Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Historical Treatment Effectiveness Ledger */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">
            {lang === 'mr' ? 'उपाययोजना पाठपुरावा इतिहास' : 'Treatment Follow-Up History'}
          </h3>

          <div className="space-y-3">
            {treatmentLogs.map((log, idx) => (
              <div key={log.id || idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">{log.intervention}</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                    {log.healthOutcome}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Pre-Intervention</span>
                    <span className="font-bold text-red-600 text-sm">{log.preTrapCount} moths</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Post-Intervention</span>
                    <span className="font-bold text-emerald-600 text-sm">{log.postTrapCount} moths</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-slate-200">
                    <span className="text-slate-500 block text-[10px]">Reduction</span>
                    <span className="font-black text-emerald-700 text-sm">
                      -{Math.round(((log.preTrapCount - log.postTrapCount) / log.preTrapCount) * 100)}%
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 pt-1 flex justify-between items-center">
                  <span>{log.notes}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 cols): Log New Follow-Up Form */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">
            {lang === 'mr' ? 'नवीन उपाययोजना नोंदवा' : 'Log New Treatment Follow-Up'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Intervention Applied (केलेली उपाययोजना):
              </label>
              <input
                type="text"
                required
                value={intervention}
                onChange={(e) => setIntervention(e.target.value)}
                placeholder="e.g. Sprayed 5% NSKE & picked 20 rosette flowers"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Pre-Count:</label>
                <input
                  type="number"
                  value={preCount}
                  onChange={(e) => setPreCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Post-Count (Day 4):</label>
                <input
                  type="number"
                  value={postCount}
                  onChange={(e) => setPostCount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Outcome Status:</label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                <option value="Effective (नियंत्रणात)">Effective (कीड आटोक्यात)</option>
                <option value="Moderate (मध्यम नियंत्रण)">Moderate (मध्यम नियंत्रण)</option>
                <option value="Respray Advised (पुन्हा उपाय आवश्यक)">Respray Advised (पुन्हा उपाय आवश्यक)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Field Scouting Notes:</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Green bolls showed no new entry holes"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Save Treatment Verification</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


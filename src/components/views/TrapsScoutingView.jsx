import React, { useState } from 'react';
import { 
  Bug, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  Calculator, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  BarChart3
} from 'lucide-react';

export default function TrapsScoutingView({ farm, lang, t }) {
  // 20-Boll Scouting Calculator State
  const [sampledCount, setSampledCount] = useState(20);
  const [damagedCount, setDamagedCount] = useState(2);
  
  // Interactive trap logs
  const [logs, setLogs] = useState([
    { date: '2026-11-03 (Today)', trapId: 'T-01 (Gossyplure)', count: 10, threshold: 8, status: 'Crossed (धोका)' },
    { date: '2026-11-02', trapId: 'T-01 (Gossyplure)', count: 11, threshold: 8, status: 'Crossed (धोका)' },
    { date: '2026-11-01', trapId: 'T-01 (Gossyplure)', count: 9, threshold: 8, status: 'Crossed (धोका)' },
    { date: '2026-10-31', trapId: 'T-01 (Gossyplure)', count: 7, threshold: 8, status: 'Normal (सुरक्षित)' },
    { date: '2026-10-30', trapId: 'T-01 (Gossyplure)', count: 6, threshold: 8, status: 'Normal (सुरक्षित)' },
    { date: '2026-10-29', trapId: 'T-01 (Gossyplure)', count: 4, threshold: 8, status: 'Normal (सुरक्षित)' }
  ]);

  const [newCount, setNewCount] = useState('');
  const [newTrapType, setNewTrapType] = useState('Gossyplure (Pink Bollworm)');

  const damagePercent = Math.round((damagedCount / sampledCount) * 100);
  const isETLCrossed = damagePercent >= 5; // 5% ETL standard

  const handleAddLog = (e) => {
    e.preventDefault();
    const count = parseInt(newCount);
    if (!isNaN(count)) {
      const thresh = newTrapType.includes('Sticky') ? 20 : 8;
      const status = count >= thresh ? 'Crossed (धोका)' : 'Normal (सुरक्षित)';
      setLogs([
        { date: '2026-11-03 (New)', trapId: newTrapType, count, threshold: thresh, status },
        ...logs
      ]);
      setNewCount('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
          <Bug className="w-3.5 h-3.5 text-emerald-700" />
          {lang === 'mr' ? 'कामगंध सापळे व क्षेत्रीय पाहणी' : 'Trap Network & Field Scouting'}
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          {lang === 'mr' ? 'सापळ्यांमधील पतंग संख्या व २० बोंडे तपासणी' : 'Pheromone Trap Logs & 20-Boll Scouting Calculator'}
        </h2>
        <p className="text-sm text-slate-600">
          {lang === 'mr'
            ? 'केवळ आर्थिक नुकसान पातळी (ETL) ओलांडल्यावरच फवारणी करून शेतकऱ्यांचा खर्च वाचवा आणि जमिनीचे आरोग्य राखा.'
            : 'Enforces Economic Threshold Levels (ETL) to avoid pre-mature sprays, saving ₹1,500/acre in pesticide waste.'}
        </p>
      </div>

      {/* Grid: 20-Boll Calculator & Trap Logger Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Interactive 20-Boll Scouting Calculator */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'mr' ? '२० बोंडे / झाडे पाहणी कॅल्क्युलेटर (ICAR मानके)' : '20-Boll / Plant Scouting Calculator'}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
              ETL: 5% Damage
            </span>
          </div>

          <p className="text-xs text-slate-600">
            {lang === 'mr'
              ? 'शेतात झेड (Z) आकारात फिरून २० हिरवी बोंडे किंवा झाडे निवडा आणि नुकसान झालेल्या बोंडांची संख्या नोंदवा:'
              : 'Walk in a Z-pattern across the field, pick 20 random green bolls, crack open, and count internal larvae:'}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {lang === 'mr' ? 'तपासलेली बोंडे (Sampled Bolls):' : 'Sampled Bolls:'}
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={sampledCount}
                onChange={(e) => setSampledCount(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {lang === 'mr' ? 'अळी / नुकसान आढळलेली बोंडे:' : 'Damaged / Larvae Bolls:'}
              </label>
              <input
                type="number"
                min="0"
                max={sampledCount}
                value={damagedCount}
                onChange={(e) => setDamagedCount(Math.min(sampledCount, Math.max(0, parseInt(e.target.value) || 0)))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900"
              />
            </div>
          </div>

          {/* Calculator Output */}
          <div className={`p-5 rounded-xl border space-y-3 transition ${
            isETLCrossed ? 'bg-red-50 border-red-300' : 'bg-emerald-50 border-emerald-300'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isETLCrossed ? (
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                )}
                <span className="font-extrabold text-slate-900 text-sm">
                  {lang === 'mr' ? 'नुकसान प्रमाण:' : 'Calculated Infestation:'} {damagePercent}%
                </span>
              </div>
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                isETLCrossed ? 'bg-red-200 text-red-900' : 'bg-emerald-200 text-emerald-900'
              }`}>
                {isETLCrossed 
                  ? (lang === 'mr' ? 'आर्थिक नुकसान पातळी ओलांडली (ETL Crossed)' : 'Above ETL (>5%)') 
                  : (lang === 'mr' ? 'सुरक्षित पातळीत (Within Safe Limit)' : 'Below ETL (<5%)')}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {isETLCrossed ? (
                lang === 'mr' 
                  ? '५% पेक्षा जास्त नुकसान आढळल्यामुळे वसंतराव नाईक मराठवाडा कृषी विद्यापीठ शिफारशीनुसार निंबोळी अर्क ५% किंवा जैविक बुरशीनाशक फवारणी करावी.'
                  : 'Infestation exceeds 5% threshold. Initiate university-recommended biological control or 5% NSKE spray. Avoid unnecessary chemical tank mixtures.'
              ) : (
                lang === 'mr'
                  ? 'अभिनंदन! नुकसान ५% पेक्षा कमी आहे. सध्या कोणतीही रासायनिक फवारणी करू नका. आपले पैसे वाचवा व मित्रकीटकांचे संवर्धन करा.'
                  : 'Congratulations! Damage is below 5%. No chemical spray required. Save your money and preserve beneficial natural predators.'
              )}
            </p>
          </div>
        </div>

        {/* Right (5 cols): Quick Logger & Trap Types */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'आजची सापळा नोंद करा' : 'Log Today\'s Trap Catch'}
          </h3>

          <form onSubmit={handleAddLog} className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'mr' ? 'सापळ्याचा प्रकार (Trap Type):' : 'Trap Type:'}
              </label>
              <select
                value={newTrapType}
                onChange={(e) => setNewTrapType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-800"
              >
                <option value="Gossyplure (Pink Bollworm)">Gossyplure (Pink Bollworm / बोंडअळी)</option>
                <option value="Spodolure (Spodoptera / लष्करी)">Spodolure (Spodoptera / लष्करी अळी)</option>
                <option value="Helilure (Helicoverpa / घाटेअळी)">Helilure (Helicoverpa / घाटेअळी)</option>
                <option value="Yellow Sticky Trap (Whitefly)">Yellow Sticky Trap (पांढरी माशी)</option>
                <option value="Blue Sticky Trap (Thrips)">Blue Sticky Trap (फुलकिडे)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'mr' ? 'अडकलेल्या किटकांची संख्या:' : 'Moth / Pest Count Captured:'}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={newCount}
                onChange={(e) => setNewCount(e.target.value)}
                placeholder="e.g. 10"
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold shadow-xs transition"
            >
              + {lang === 'mr' ? 'नोंद साठवा व धोका तपासा' : 'Submit Count & Verify Risk'}
            </button>
          </form>

          {/* Quick Guidance Info */}
          <div className="pt-2 text-[11px] text-slate-500 space-y-1">
            <p>• Pheromone lures must be replaced every 21–25 days.</p>
            <p>• Install traps at crop canopy height (१ फूट पिकाच्या उंचीवर).</p>
          </div>
        </div>
      </div>

      {/* Trap Catch History Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'मागील नोंदींचा इतिहास' : 'Recent Trap Log History'}
          </h3>
          <span className="text-xs text-slate-500 font-medium">Synced with CROPSAP</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-y border-slate-200 text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Trap / Lure</th>
                <th className="py-2.5 px-4">Moths</th>
                <th className="py-2.5 px-4">Official ETL</th>
                <th className="py-2.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {logs.map((log, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80">
                  <td className="py-2.5 px-4 text-slate-900 font-semibold">{log.date}</td>
                  <td className="py-2.5 px-4 text-slate-600">{log.trapId}</td>
                  <td className="py-2.5 px-4 font-bold text-slate-900">{log.count}</td>
                  <td className="py-2.5 px-4 text-slate-500">&ge;{log.threshold} / day</td>
                  <td className="py-2.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.count >= log.threshold 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


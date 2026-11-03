import React, { useState } from 'react';
import { 
  Layers, 
  MapPin, 
  Building2, 
  Radio, 
  Send, 
  Download, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  FileText,
  Sparkles,
  Users
} from 'lucide-react';
import { maharashtraDistricts, officerStats } from '../../data/officerData';

export default function OfficerView({ lang, t }) {
  const [selectedDistrict, setSelectedDistrict] = useState(maharashtraDistricts[0]);
  const [broadcastDone, setBroadcastDone] = useState(false);
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  const currentLang = lang || 'en';

  const handleBroadcast = (e) => {
    e.preventDefault();
    setIsBroadcasting(true);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      setTimeout(() => setBroadcastDone(false), 5000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-700" />
              {lang === 'mr' ? 'महाराष्ट्र शासन कृषी विभाग डॅशबोर्ड' : 'Dept of Agriculture, Maharashtra • CROPSAP'}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'तालुका व जिल्हा कृषी अधिकारी देखरेख कक्ष' : 'District & Taluka Surveillance Command Centre'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'महावेध स्वयंचलित हवामान केंद्रे, CROPSAP आणि राष्ट्रीय कीड सर्वेक्षण प्रणाली (NPSS २०२४) एकत्रीकरण.'
                : 'Slide 3 Key USP: Plugs into CROPSAP, NPSS and Mahavedh weather stations to deliver farm-specific intelligence.'}
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold border border-slate-300 transition"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{lang === 'mr' ? 'अधिकृत अहवाल डाउनलोड करा (PDF)' : 'Export CROPSAP Bulletin'}</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Farms Monitored</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{officerStats.totalFarmsCovered.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Across 6 pilot talukas</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Mahavedh AWS Online</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{officerStats.connectedMahavedhAWS}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">100% telemetry active</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Trap Logs Today</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{officerStats.trapCatchesRecordedToday}</div>
          <div className="text-[10px] text-red-600 font-semibold mt-0.5">824 traps &gt; ETL</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-[10px] font-bold text-slate-500 uppercase">Alerts Dispatched (24h)</div>
          <div className="mt-1 text-2xl font-extrabold text-slate-900">{officerStats.alertsDispatched24h}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">99.4% SMS & Voice delivery</div>
        </div>
      </div>

      {/* Main Grid: Maharashtra Talukas Heatmap Table + Mass Broadcast Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): District & Taluka Surveillance Table */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base">
              {lang === 'mr' ? 'जिल्हानिहाय कीड व रोग प्रादुर्भाव स्थिती' : 'District & Taluka Outbreak Surveillance'}
            </h3>
            <span className="text-xs text-slate-500 font-medium">Auto-updated via AWS</span>
          </div>

          <div className="space-y-3">
            {maharashtraDistricts.map((d) => {
              const isSelected = selectedDistrict.id === d.id;
              const etlPct = Math.round((d.trapsAboveETL / d.activeTraps) * 100);

              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDistrict(d)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected 
                      ? 'bg-emerald-50/60 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs' 
                      : 'bg-white border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-3 h-3 rounded-full ${d.riskColor}`}></div>
                      <h4 className="font-bold text-slate-900 text-base">
                        {d.name[currentLang] || d.name.en}
                      </h4>
                      <span className="text-xs text-slate-500">({d.zone})</span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      d.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                      d.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                      d.riskLevel === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {d.riskLevel}
                    </span>
                  </div>

                  <div className="mt-2 text-xs text-slate-600 flex flex-wrap gap-x-4 gap-y-1">
                    <span><strong>Crop:</strong> {d.dominantCrop}</span>
                    <span><strong>Alert:</strong> <span className="text-red-700 font-semibold">{d.activeAlert}</span></span>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>{d.farmsMonitored} farms • {d.activeTraps} traps</span>
                    <span className="font-semibold text-slate-700">{etlPct}% traps above ETL</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (5 cols): Mass Broadcast Tool for Agriculture Assistant */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-slate-900 text-base">
              {lang === 'mr' ? 'शेतकऱ्यांना सामूहिक संदेश पाठवा' : 'Broadcast Advisory to Taluka'}
            </h3>
          </div>

          <p className="text-xs text-slate-600">
            {lang === 'mr'
              ? `कृषी सहाय्यक म्हणून ${selectedDistrict.name[currentLang] || selectedDistrict.name.en} मधील सर्व नोंदणीकृत शेतकऱ्यांना अधिकृत विद्यापीठ सल्ला पाठवा:`
              : `As Agriculture Assistant / Officer, broadcast official VNMKV advisory to all registered farmers in ${selectedDistrict.name.en}:`}
          </p>

          <form onSubmit={handleBroadcast} className="space-y-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Taluka:</label>
              <select className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-800">
                {selectedDistrict.talukas.map((t, i) => (
                  <option key={i} value={t}>{t} Taluka ({selectedDistrict.name[currentLang] || selectedDistrict.name.en})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Crop & Threat Category:</label>
              <input
                type="text"
                readOnly
                value={`${selectedDistrict.dominantCrop} - ${selectedDistrict.activeAlert}`}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 text-xs text-slate-700 font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">University IPM Directive:</label>
              <textarea
                rows={3}
                defaultValue="महावेध हवामान आणि कामगंध सापळ्यांच्या नोंदीनुसार बोंडअळीचा प्रादुर्भाव वाढण्याची शक्यता आहे. शेतकऱ्यांनी आजच २० बोंडांची पाहणी करावी व ५% पेक्षा जास्त नुकसान आढळल्यासच जैविक कीटकनाशक फवारावे."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-800 font-medium"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isBroadcasting}
              className="w-full py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition shadow-xs"
            >
              {isBroadcasting ? (
                <span>Broadcasting to {selectedDistrict.farmsMonitored} farmers...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'mr' 
                      ? `${selectedDistrict.farmsMonitored} शेतकऱ्यांना SMS व व्हॉट्सॲप पाठवा` 
                      : `Broadcast to ${selectedDistrict.farmsMonitored} Farmers`}
                  </span>
                </>
              )}
            </button>
          </form>

          {broadcastDone && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>
                {lang === 'mr'
                  ? `यशस्वी! ${selectedDistrict.farmsMonitored} शेतकऱ्यांच्या मोबाईलवर मराठी/हिंदी ऑडिओ व संदेश पाठवले गेले.`
                  : `Broadcast complete! Dispatched to all registered farmers via CROPSAP gateway.`}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


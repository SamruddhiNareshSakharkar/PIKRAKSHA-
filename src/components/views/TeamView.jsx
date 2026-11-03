import React from 'react';
import { 
  Users, 
  Award, 
  Calendar, 
  Coins, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  Mail, 
  ExternalLink,
  Target,
  Rocket
} from 'lucide-react';
import { teamInfo, pilotBudget } from '../../data/teamData';

export default function TeamView({ lang, t }) {
  const currentLang = lang || 'en';

  return (
    <div className="space-y-6">
      {/* Seva Innovation Challenge 2026 Header Card */}
      <div className="bg-gradient-to-br from-forest-900 via-forest-850 to-emerald-950 text-white rounded-3xl p-8 shadow-xl border border-emerald-800/50 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Seva First Innovation Challenge 2026 • Maharashtra Zone</span>
          </div>
          <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-bold">
            Selected for Prototype Round
          </span>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            PIKRAKSHA (पीकरक्षा)
          </h2>
          <p className="text-emerald-300 font-semibold text-base sm:text-lg">
            पीक • कीड • हवामान | CROP · PEST · WEATHER EARLY WARNING
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-emerald-300 font-bold block uppercase text-[10px]">Selected Category</span>
            <span className="font-extrabold text-white text-sm">Women Category</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-emerald-300 font-bold block uppercase text-[10px]">Selected Sector</span>
            <span className="font-extrabold text-white text-sm">Agriculture</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10">
            <span className="text-emerald-300 font-bold block uppercase text-[10px]">Selected Sub-Theme</span>
            <span className="font-extrabold text-white text-sm">Early Detection of Crop Pests & Diseases</span>
          </div>
        </div>
      </div>

      {/* Team Profiles (Slide 6) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-lg">
          <Users className="w-5 h-5 text-emerald-700" />
          <span>{lang === 'mr' ? 'प्रकल्प चमू व संशोधक' : 'Core Team & Innovators'}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {teamInfo.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-forest-800 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                    {member.initials}
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {member.badge}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{member.name}</h3>
                  <p className="text-xs font-semibold text-emerald-700">
                    {member.role[currentLang] || member.role.en}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {member.bio[currentLang] || member.bio.en}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Verified Contributor</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pilot Plan & 1,000 Farms Feasibility (Slide 4 & Slide 5) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Pilot Budget Breakdown (₹10 Lakh for 1,000 farms) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base">
                {lang === 'mr' ? '१००० शेतकरी प्रायोगिक चाचणी अंदाजपत्रक (₹१० लाख)' : '1 Taluka Pilot Budget (1,000 Farms • ₹10 Lakh)'}
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500">₹1,000 / farm</span>
          </div>

          <p className="text-xs text-slate-600">
            {lang === 'mr'
              ? '१ तालुका, सुमारे १००० शेतकरी, एक हंगाम (खरीप/रब्बी). मोठ्या प्रमाणावर विस्तार केल्यास खर्च प्रति शेतकरी ₹२०० पर्यंत कमी होतो.'
              : 'Pilot in 1 taluka covering ~1,000 farms across one season. Unit cost drops dramatically from ₹1,000 to <₹200 at district scale.'}
          </p>

          <div className="space-y-2.5 pt-1">
            {pilotBudget.map((b, i) => (
              <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">{b.item[currentLang] || b.item.en}</span>
                  <div className="w-32 bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div className="bg-emerald-600 h-full rounded-full" style={{ width: b.pct }}></div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-slate-900 text-sm">{b.cost}</span>
                  <span className="text-[10px] text-slate-500 block">{b.pct} of budget</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (5 cols): 3-6-12 Month Timeline & Support Needed (Slide 4 & 6) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base">Implementation Roadmap</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex gap-3">
                <span className="font-extrabold text-emerald-700 w-16 shrink-0">3 Months:</span>
                <span className="text-slate-600">Rules for 3 crops (Cotton, Grapes, Tomato) validated with KVK and VNMKV / MPKV universities.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-extrabold text-emerald-700 w-16 shrink-0">6 Months:</span>
                <span className="text-slate-600">One-season pilot in 1 taluka (Ner/Dindori) directly with Agriculture Assistants.</span>
              </div>
              <div className="flex gap-3">
                <span className="font-extrabold text-emerald-700 w-16 shrink-0">12 Months:</span>
                <span className="text-slate-600">Expansion to 5+ crops, district dashboard, CROPSAP / NPSS live government link.</span>
              </div>
            </div>
          </div>

          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 shadow-2xs space-y-3">
            <h4 className="font-bold text-emerald-950 text-sm">
              Support We Are Seeking from Seva Innovation Challenge:
            </h4>
            <ul className="text-xs text-emerald-900 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Mentorship & technical guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Pilot with Maharashtra Department of Agriculture</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Grant & incubation support</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Testing, certification & IP support</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


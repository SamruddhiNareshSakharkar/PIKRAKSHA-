import React from 'react';
import { 
  HelpCircle, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Thermometer, 
  Bug, 
  Calendar, 
  Radio, 
  ArrowRight
} from 'lucide-react';

export default function WhyAtRiskView({ farm, riskAnalysis = {}, lang = 'en', t = {}, onNavigateActionPlan }) {
  const currentLang = lang || 'en';
  const totalScore = riskAnalysis?.totalScore || 65;
  const riskLevel = riskAnalysis?.riskLevel || 'Moderate';
  const factors = riskAnalysis?.factors || [];

  const pestNameStr = typeof farm?.primaryAlert?.pestName === 'object' 
    ? (farm.primaryAlert.pestName[currentLang] || farm.primaryAlert.pestName.en) 
    : (farm?.primaryAlert?.pestName || 'Active Threat');

  const cropStageStr = farm?.crop?.stage?.[currentLang] || farm?.crop?.stage?.en || 'Crop Stage';

  return (
    <div className="space-y-6">
      {/* Top Banner explaining the innovation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'पारदर्शक AI: धोका कारणमीमांसा' : 'Explainable AI (XAI) Engine'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'माझ्या शेतात नेमका कशामुळे धोका निर्माण झाला आहे?' : 'Why Is My Farm At Risk? (Explainable Risk Breakdown)'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'केवळ "धोका जास्त आहे" असे न सांगता, कोणत्या हवामान आणि पिकाच्या घटकांमुळे हा धोका वाढला ते पारदर्शकपणे समजून घ्या.'
                : 'Slide 3 Key Innovation: No black-box AI. Transparently decomposes risk into biophysical weather, crop phenology, and pheromone trap factors.'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-right">
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Total Threat Score</span>
            <div className="flex items-baseline gap-1 justify-end">
              <span className={`text-3xl font-black ${totalScore >= 75 ? 'text-red-600' : 'text-amber-600'}`}>
                {totalScore}
              </span>
              <span className="text-slate-400 font-bold text-sm">/ 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Aggregate Score Bar & Summary Card */}
      <div className="bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 p-0.5 rounded-2xl shadow-sm">
        <div className="bg-white rounded-[14px] p-6 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Primary Classified Threat</span>
              <h3 className="text-xl font-extrabold text-slate-900">
                {pestNameStr}
              </h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold text-white uppercase ${
              riskLevel === 'High' ? 'bg-red-600' : 'bg-amber-500'
            }`}>
              {riskLevel} Risk (Peak in 48h)
            </span>
          </div>

          {/* Visual Factor Contribution Stacked Bar */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
              <span>Factor Contribution Breakdown</span>
              <span>100% Total Scale</span>
            </div>
            <div className="h-4 rounded-full overflow-hidden flex bg-slate-100">
              <div className="bg-red-600 h-full" style={{ width: '35%' }} title="Trap Threshold (35%)"></div>
              <div className="bg-orange-500 h-full" style={{ width: '25%' }} title="Crop Stage Sensitivity (25%)"></div>
              <div className="bg-amber-500 h-full" style={{ width: '25%' }} title="Night Temperature & RH (25%)"></div>
              <div className="bg-yellow-400 h-full" style={{ width: '15%' }} title="Village Cluster Density (15%)"></div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1.5 flex-wrap gap-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-600"></span> Trap Breach (35%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> {cropStageStr} (25%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Night Microclimate (25%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400"></span> Swarm Proximity (15%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Factor by Factor Deep Dive Cards */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          {lang === 'mr' ? 'धोक्याला कारणीभूत असलेले ४ मुख्य घटक:' : 'Detailed Biophysical Factor Breakdown:'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {factors.map((factor, idx) => {
            const isCritical = factor.level === 'critical';
            const isWarning = factor.level === 'warning';
            const factorNameStr = typeof factor.name === 'object' ? (factor.name[currentLang] || factor.name.en) : factor.name;
            const factorExplStr = typeof factor.explanation === 'object' ? (factor.explanation[currentLang] || factor.explanation.en) : factor.explanation;

            return (
              <div 
                key={factor.id || idx} 
                className={`rounded-2xl p-5 border transition-all ${
                  isCritical ? 'bg-red-50/50 border-red-200' :
                  isWarning ? 'bg-amber-50/50 border-amber-200' :
                  'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {idx === 0 ? <Bug className="w-5 h-5 text-red-600" /> :
                     idx === 1 ? <Calendar className="w-5 h-5 text-orange-600" /> :
                     idx === 2 ? <Thermometer className="w-5 h-5 text-amber-600" /> :
                     <Radio className="w-5 h-5 text-yellow-600" />}
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {factorNameStr}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-semibold">Weight: {factor.weight}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                    isCritical ? 'bg-red-100 text-red-800' :
                    isWarning ? 'bg-amber-100 text-amber-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    +{factor.contribution} pts
                  </span>
                </div>

                <div className="mt-3 p-2.5 rounded-xl bg-white/80 border border-slate-200/80 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-800">
                    <span>Current Field Reading:</span>
                    <span className="text-slate-900">{factor.value}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 italic">
                    {factor.thresholdText}
                  </div>
                </div>

                <p className="mt-2.5 text-xs text-slate-700 leading-relaxed font-medium">
                  {factorExplStr}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Button to Daily Plan */}
      <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-emerald-950 text-sm">
            {lang === 'mr' ? 'धोका कमी करण्यासाठी आज काय करावे?' : 'Mitigate This Risk Today With Your Action Plan'}
          </h4>
          <p className="text-xs text-emerald-800 mt-0.5">
            {lang === 'mr' 
              ? 'आर्थिक नुकसान पातळी ५% च्या आत ठेवण्यासाठी दैनंदिन कृती आराखडा तपासा.'
              : 'Execute the university-recommended scouting and hand-picking checklist.'}
          </p>
        </div>

        <button
          onClick={onNavigateActionPlan}
          className="px-5 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs shrink-0"
        >
          <span>{lang === 'mr' ? 'आजचा कृती आराखडा उघडा' : 'View Today\'s Action Plan'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

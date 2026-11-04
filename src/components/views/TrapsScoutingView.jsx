import React, { useState, useEffect } from 'react';
import { 
  Bug, 
  CheckCircle2, 
  AlertTriangle, 
  PlusCircle, 
  Calculator, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  BarChart3,
  Layers,
  Leaf
} from 'lucide-react';

export default function TrapsScoutingView({ farm, lang, t }) {
  const currentLang = lang || 'en';
  const farmCrop = farm?.crop?.name?.en || 'Cotton';
  const farmerName = farm?.farmerName?.[currentLang] || farm?.farmerName?.en || 'Farmer';
  const villageName = farm?.location?.village?.[currentLang] || farm?.location?.village?.en || 'Ner';

  // Crop-tailored scouting configuration
  const cropConfig = {
    Cotton: {
      toolTitle: {
        en: '20-Boll Scouting Calculator (ICAR/VNMKV standard)',
        mr: '२० बोंडे पाहणी कॅल्क्युलेटर (ICAR/VNMKV मानके)',
        hi: '20 डोडे जांच कैलकुलेटर'
      },
      sampleUnitLabel: {
        en: 'Random Green Bolls Sampled:',
        mr: 'तपासलेली हिरवी बोंडे:',
        hi: 'जांचे गए हरे डोडे:'
      },
      damageUnitLabel: {
        en: 'Bolls with Internal Pink Larvae / Exit Holes:',
        mr: 'अळी किंवा नुकसान आढळलेली बोंडे:',
        hi: 'सुंडी या छेद वाले डोडे:'
      },
      guidance: {
        en: 'Walk in a Z-pattern across the field, pick 20 random green bolls, crack open, and count internal pink larvae.',
        mr: 'शेतात झेड (Z) आकारात फिरून २० हिरवी बोंडे तोडून फोडा आणि आतील गुलाबी अळ्यांची संख्या मोजा.'
      },
      etlPct: 5,
      defaultLure: 'Gossyplure (Pink Bollworm / बोंडअळी)',
      trapId: 'T-01 (Gossyplure)',
      history: [
        { date: '2026-11-03 (Today)', trapId: 'T-01 (Gossyplure)', count: 10, threshold: 8, status: 'Crossed (धोका)' },
        { date: '2026-11-02', trapId: 'T-01 (Gossyplure)', count: 11, threshold: 8, status: 'Crossed (धोका)' },
        { date: '2026-11-01', trapId: 'T-01 (Gossyplure)', count: 9, threshold: 8, status: 'Crossed (धोका)' },
        { date: '2026-10-31', trapId: 'T-01 (Gossyplure)', count: 7, threshold: 8, status: 'Normal (सुरक्षित)' },
        { date: '2026-10-30', trapId: 'T-01 (Gossyplure)', count: 6, threshold: 8, status: 'Normal (सुरक्षित)' }
      ]
    },
    Grapes: {
      toolTitle: {
        en: '20-Vine / Cluster Scouting Calculator (NRCG standard)',
        mr: '२० द्राक्ष घड व वेल पाहणी कॅल्क्युलेटर (NRCG मानके)',
        hi: '20 अंगूर बेल / गुच्छे जांच कैलकुलेटर'
      },
      sampleUnitLabel: {
        en: 'Grape Vines / Clusters Sampled:',
        mr: 'तपासलेले द्राक्ष घड किंवा वेल:',
        hi: 'जांचे गए अंगूर गुच्छे / बेल:'
      },
      damageUnitLabel: {
        en: 'Clusters with Downy Mildew / Mealybug:',
        mr: 'डाऊनी किंवा पिठ्या ढेकूण आढळलेले घड:',
        hi: 'फफूंद या कीट प्रभावित गुच्छे:'
      },
      guidance: {
        en: 'Scout 20 grape bunches and lower canopy leaves. Look for translucent yellow oil spots underneath leaves or mealybug clusters.',
        mr: 'बागेत २० घड आणि खालची पाने तपासा. पानाच्या खाली पिवळसर तेलकट डाग किंवा पिठ्या ढेकूण तपासा.'
      },
      etlPct: 3,
      defaultLure: 'Delta Trap (Grape Mealybug / Thrips)',
      trapId: 'V-01 (Delta / Sticky)',
      history: [
        { date: '2026-11-03 (Today)', trapId: 'V-01 (Delta Trap)', count: 6, threshold: 5, status: 'Crossed (धोका)' },
        { date: '2026-11-02', trapId: 'V-01 (Delta Trap)', count: 5, threshold: 5, status: 'Crossed (धोका)' },
        { date: '2026-11-01', trapId: 'V-01 (Delta Trap)', count: 4, threshold: 5, status: 'Normal (सुरक्षित)' },
        { date: '2026-10-31', trapId: 'V-01 (Delta Trap)', count: 3, threshold: 5, status: 'Normal (सुरक्षित)' },
        { date: '2026-10-30', trapId: 'V-01 (Delta Trap)', count: 2, threshold: 5, status: 'Normal (सुरक्षित)' }
      ]
    },
    Soybean: {
      toolTitle: {
        en: '20-Plant Scouting Calculator (ICAR-IISR standard)',
        mr: '२० सोयाबीन झाडे पाहणी कॅल्क्युलेटर (ICAR मानके)',
        hi: '20 सोयाबीन पौधे जांच कैलकुलेटर'
      },
      sampleUnitLabel: {
        en: 'Soybean Plants Inspected:',
        mr: 'तपासलेली सोयाबीनची झाडे:',
        hi: 'जांचे गए सोयाबीन पौधे:'
      },
      damageUnitLabel: {
        en: 'Plants with Girdle Rings or Pod Borer Holes:',
        mr: 'चकती भुंग्याचे वळण किंवा अळी असलेली झाडे:',
        hi: 'गर्डल रिंग या सुंडी वाले पौधे:'
      },
      guidance: {
        en: 'Inspect 20 random soybean plants along a diagonal transect. Check main stem for circular girdling rings and pods for borer entry.',
        mr: 'शेतात तिरकस फिरून २० झाडांचे खोड तपासा. खोडावर चकती भुंग्याने केलेले दोन गोलाकार वळण तपासा.'
      },
      etlPct: 5,
      defaultLure: 'Spodolure (Spodoptera / लष्करी अळी)',
      trapId: 'S-01 (Spodolure)',
      history: [
        { date: '2026-11-03 (Today)', trapId: 'S-01 (Spodolure)', count: 5, threshold: 4, status: 'Crossed (धोका)' },
        { date: '2026-11-02', trapId: 'S-01 (Spodolure)', count: 5, threshold: 4, status: 'Crossed (धोका)' },
        { date: '2026-11-01', trapId: 'S-01 (Spodolure)', count: 4, threshold: 4, status: 'Crossed (धोका)' },
        { date: '2026-10-31', trapId: 'S-01 (Spodolure)', count: 3, threshold: 4, status: 'Normal (सुरक्षित)' },
        { date: '2026-10-30', trapId: 'S-01 (Spodolure)', count: 2, threshold: 4, status: 'Normal (सुरक्षित)' }
      ]
    },
    Tomato: {
      toolTitle: {
        en: '20-Plant Scouting Calculator (ICAR-IIHR standard)',
        mr: '२० टोमॅटो झाडे पाहणी कॅल्क्युलेटर (ICAR मानके)',
        hi: '20 टमाटर पौधे जांच कैलकुलेटर'
      },
      sampleUnitLabel: {
        en: 'Tomato Plants Sampled:',
        mr: 'तपासलेली टोमॅटोची झाडे:',
        hi: 'जांचे गए टमाटर पौधे:'
      },
      damageUnitLabel: {
        en: 'Plants with Tuta Mines or Late Blight Spots:',
        mr: 'तुता पिनवर्म किंवा करपा आढळलेली झाडे:',
        hi: 'पिनवर्म या झुलसा प्रभावित पौधे:'
      },
      guidance: {
        en: 'Examine 20 tomato plants. Check middle and top leaves for serpentine blotch mines of Tuta pinworm and stems for water-soaked blight lesions.',
        mr: '२० टोमॅटो झाडे तपासा. पानांमधील पांढऱ्या नागमोडी सुरंगा (तुता) व खोडावरील काळपट-तपकिरी चट्टे (करपा) मोजा.'
      },
      etlPct: 5,
      defaultLure: 'Tuta-Optima (Tuta Absoluta / पिनवर्म)',
      trapId: 'TO-01 (Tuta-Optima)',
      history: [
        { date: '2026-11-03 (Today)', trapId: 'TO-01 (Tuta Pheromone)', count: 14, threshold: 8, status: 'Crossed (धोका)' },
        { date: '2026-11-02', trapId: 'TO-01 (Tuta Pheromone)', count: 13, threshold: 8, status: 'Crossed (धोका)' },
        { date: '2026-11-01', trapId: 'TO-01 (Tuta Pheromone)', count: 11, threshold: 8, status: 'Crossed (धोका)' },
        { date: '2026-10-31', trapId: 'TO-01 (Tuta Pheromone)', count: 9, threshold: 8, status: 'Crossed (धोका)' },
        { date: '2026-10-30', trapId: 'TO-01 (Tuta Pheromone)', count: 6, threshold: 8, status: 'Normal (सुरक्षित)' }
      ]
    }
  };

  const activeConf = cropConfig[farmCrop] || cropConfig.Cotton;

  // 20-Unit Scouting Calculator State
  const [sampledCount, setSampledCount] = useState(20);
  const [damagedCount, setDamagedCount] = useState(2);
  
  // Interactive trap logs
  const [logs, setLogs] = useState(activeConf.history);
  const [newCount, setNewCount] = useState('');
  const [newTrapType, setNewTrapType] = useState(activeConf.defaultLure);

  // Synchronize when farm switches
  useEffect(() => {
    setLogs(activeConf.history);
    setNewTrapType(activeConf.defaultLure);
  }, [farmCrop, farm?.id]);

  const damagePercent = Math.round((damagedCount / sampledCount) * 100);
  const isETLCrossed = damagePercent >= activeConf.etlPct;

  const handleAddLog = (e) => {
    e.preventDefault();
    const count = parseInt(newCount);
    if (!isNaN(count)) {
      const thresh = newTrapType.includes('Sticky') ? 20 : activeConf.history[0]?.threshold || 8;
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
          {lang === 'mr' 
            ? `${farmCrop} सापळ्यांमधील पतंग संख्या व पाहणी कॅल्क्युलेटर (${villageName})` 
            : `${farmCrop} Pheromone Trap Logs & Field Scouting (${villageName})`}
        </h2>
        <p className="text-sm text-slate-600">
          {lang === 'mr'
            ? 'केवळ आर्थिक नुकसान पातळी (ETL) ओलांडल्यावरच फवारणी करून शेतकऱ्यांचा खर्च वाचवा आणि जमिनीचे आरोग्य राखा.'
            : `Enforces Economic Threshold Levels (ETL) for ${farmCrop} to avoid pre-mature sprays, saving ₹1,500/acre in pesticide waste.`}
        </p>
      </div>

      {/* Grid: 20-Unit Calculator & Trap Logger Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (7 cols): Interactive 20-Unit Scouting Calculator */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-base">
                {activeConf.toolTitle[currentLang] || activeConf.toolTitle.en}
              </h3>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
              ETL: {activeConf.etlPct}% Damage
            </span>
          </div>

          <p className="text-xs text-slate-600">
            {activeConf.guidance[currentLang] || activeConf.guidance.en}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {activeConf.sampleUnitLabel[currentLang] || activeConf.sampleUnitLabel.en}
              </label>
              <input
                type="number"
                min="10"
                max="100"
                value={sampledCount}
                onChange={(e) => setSampledCount(Math.max(1, parseInt(e.target.value) || 20))}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                {activeConf.damageUnitLabel[currentLang] || activeConf.damageUnitLabel.en}
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
                  ? (lang === 'mr' ? `आर्थिक नुकसान पातळी ओलांडली (ETL >${activeConf.etlPct}%)` : `Above ETL (>${activeConf.etlPct}%)`) 
                  : (lang === 'mr' ? `सुरक्षित पातळीत (Within Safe Limit <${activeConf.etlPct}%)` : `Below ETL (<${activeConf.etlPct}%)`)}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed">
              {isETLCrossed ? (
                lang === 'mr' 
                  ? `नुकसान ${activeConf.etlPct}% पेक्षा जास्त आढळल्यामुळे कृषी विद्यापीठ शिफारशीनुसार तातडीने जैविक उपाय किंवा निंबोळी अर्क फवारणी करावी. कॉकटेल फवारणी टाळावी.`
                  : `Infestation exceeds ${activeConf.etlPct}% university threshold. Initiate recommended biological control or target bio-pesticide. Avoid unnecessary cocktail sprays.`
              ) : (
                lang === 'mr'
                  ? `अभिनंदन! नुकसान ${activeConf.etlPct}% पेक्षा कमी आहे. सध्या कोणतीही रासायनिक फवारणी करू नका. आपले पैसे वाचवा व मित्रकीटकांचे संवर्धन करा.`
                  : `Congratulations! Damage is below ${activeConf.etlPct}%. No chemical spray required. Save your money and preserve natural predator bio-diversity.`
              )}
            </p>
          </div>
        </div>

        {/* Right (5 cols): Quick Logger & Trap Types */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? 'आजची सापळा नोंद करा' : `Log Today's ${farmCrop} Trap Catch`}
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
                <option value="Gossyplure (Pink Bollworm / बोंडअळी)">Gossyplure (Pink Bollworm / बोंडअळी)</option>
                <option value="Delta Trap (Downy / Mealybug)">Delta Trap (Grape Mealybug / Mildew)</option>
                <option value="Spodolure (Spodoptera / लष्करी अळी)">Spodolure (Spodoptera / लष्करी अळी)</option>
                <option value="Tuta-Optima (Tuta Absoluta / पिनवर्म)">Tuta-Optima (Tuta Pinworm / टोमॅटो)</option>
                <option value="Yellow Sticky Trap (Whitefly / थ्रिप्स)">Yellow Sticky Trap (पांढरी माशी)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'mr' ? 'अडकलेल्या किटकांची संख्या:' : 'Pest Count Captured Today:'}
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
            <p>• Pheromone lures must be replaced every 21–25 days for maximum efficacy.</p>
            <p>• Install traps at crop canopy height (१ फूट पिकाच्या उंचीवर).</p>
          </div>
        </div>
      </div>

      {/* Trap Catch History Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-base">
            {lang === 'mr' ? `${farmCrop} मागील नोंदींचा इतिहास` : `${farmCrop} Recent Trap Log History`}
          </h3>
          <span className="text-xs text-slate-500 font-medium">Synced with CROPSAP & Mahavedh</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-y border-slate-200 text-[10px]">
              <tr>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Trap / Lure</th>
                <th className="py-2.5 px-4">Captured</th>
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

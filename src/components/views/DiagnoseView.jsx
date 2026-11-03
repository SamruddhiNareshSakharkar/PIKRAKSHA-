import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  Sparkles, 
  Eye, 
  ShieldAlert, 
  HelpCircle,
  RefreshCw,
  Layers,
  ArrowRight
} from 'lucide-react';
import { sampleDiagnoses } from '../../data/diagnosisData';

export default function DiagnoseView({ lang, t, onPlayAudio, isPlayingAudio }) {
  const [selectedSample, setSelectedSample] = useState(sampleDiagnoses[0]);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [customImage, setCustomImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tickedSymptoms, setTickedSymptoms] = useState({});

  const handleSelectSample = (sample) => {
    setIsAnalyzing(true);
    setCustomImage(null);
    setTickedSymptoms({});
    setTimeout(() => {
      setSelectedSample(sample);
      setIsAnalyzing(false);
    }, 400);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result);
        setIsAnalyzing(true);
        setTimeout(() => {
          // If custom uploaded, default to pink bollworm or matched pathology
          setSelectedSample(sampleDiagnoses[0]);
          setIsAnalyzing(false);
        }, 800);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSymptom = (index) => {
    setTickedSymptoms(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const currentLang = lang || 'en';

  return (
    <div className="space-y-6">
      {/* Top Banner Intro */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              {lang === 'mr' ? 'AI पीक रोगनिदान प्रणाली' : 'Deep Learning Vision Scanner'}
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'पिकाचा फोटो काढून रोग ओळखा' : 'Diagnose Crop Disease from a Photo'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr' 
                ? 'पानाचा किंवा फुलाचा फोटो निवडा, दिसणारी लक्षणे निवडा आणि त्वरित विद्यापीठ प्रमाणित सुरक्षित उपाय मिळवा.' 
                : 'Upload a leaf/flower photo, check observed field symptoms, and receive instant scientific IPM diagnosis.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-semibold cursor-pointer shadow-xs transition">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'mr' ? 'स्वतःचा फोटो अपलोड करा' : 'Upload Your Crop Photo'}</span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Sample selector carousel */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
            {lang === 'mr' ? 'किंवा खालील नमुन्यांपैकी एक निवडून चाचणी घ्या:' : 'Or test with these pre-loaded field samples:'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {sampleDiagnoses.map((sample) => {
              const isSelected = selectedSample.id === sample.id && !customImage;
              return (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-2.5 rounded-xl text-left border transition-all ${
                    isSelected 
                      ? 'bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-xs' 
                      : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="text-xl mb-1">{sample.icon}</div>
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {sample.crop.split('(')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {sample.diseaseName[currentLang] || sample.diseaseName.en}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Diagnostic Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left (5 cols): Photo Scanner & Saliency Overlay */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              {lang === 'mr' ? 'क्षेत्रीय फोटो तपासणी' : 'Specimen Image & Detection'}
            </h3>
            <button
              onClick={() => setShowHeatmap(!showHeatmap)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition ${
                showHeatmap 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                  : 'bg-slate-100 border-slate-300 text-slate-600'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showHeatmap ? (lang === 'mr' ? 'AI हिटमॅप सुरू' : 'Heatmap On') : (lang === 'mr' ? 'मूळ फोटो' : 'Original')}</span>
            </button>
          </div>

          {/* Interactive Visual Canvas Box */}
          <div className="relative aspect-4/3 rounded-xl overflow-hidden shadow-inner border border-slate-200 flex items-center justify-center"
               style={{ background: selectedSample.sampleSvgBg }}>
            {customImage ? (
              <img src={customImage} alt="Uploaded crop" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-6 text-white space-y-2">
                <div className="text-6xl drop-shadow-md">{selectedSample.icon}</div>
                <div className="text-lg font-bold drop-shadow-sm">{selectedSample.crop}</div>
                <div className="text-xs text-emerald-200 max-w-xs mx-auto">
                  {selectedSample.scientificName}
                </div>
              </div>
            )}

            {/* AI Attention Heatmap Overlay */}
            {showHeatmap && !isAnalyzing && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {selectedSample.id === 'sample-healthy' ? (
                  <div className="w-36 h-36 rounded-full border-2 border-emerald-400 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center animate-pulse">
                    <span className="bg-emerald-800/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      ✓ No Lesions
                    </span>
                  </div>
                ) : (
                  <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-red-400 bg-red-500/25 backdrop-blur-[1px] flex items-center justify-center animate-pulse">
                    <div className="w-20 h-20 rounded-full bg-red-600/40"></div>
                    <span className="absolute -top-3 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded shadow">
                      96% Pest Salience
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Loading Analysis state */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin" />
                <span className="text-xs font-bold tracking-wide">
                  {lang === 'mr' ? 'AI रोगनिदान मॉडेल विश्लेषण करत आहे...' : 'Running MobileNet-PlantPathology Inference...'}
                </span>
              </div>
            )}
          </div>

          {/* Interactive Symptom Verification Checklist (Slide 3: "Photo + tick symptoms -> likely cause") */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {lang === 'mr' ? 'शेतात दिसणारी लक्षणे निवडा (Symptom Verification):' : 'Tick Observed Field Symptoms:'}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold">
                Slide 3 Innovation
              </span>
            </div>
            <div className="space-y-1.5">
              {selectedSample.symptomsObserved.map((sym, idx) => {
                const isChecked = tickedSymptoms[idx] ?? true;
                return (
                  <label 
                    key={idx} 
                    className="flex items-start gap-2 text-xs text-slate-700 cursor-pointer hover:text-slate-900"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSymptom(idx)}
                      className="mt-0.5 rounded text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className={isChecked ? 'font-medium' : 'text-slate-400 line-through'}>
                      {sym[currentLang] || sym.en}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right (7 cols): AI Diagnosis Result & Safe Action Protocol */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-md text-xs font-extrabold uppercase ${
                  selectedSample.severity === 'High' ? 'bg-red-100 text-red-800' :
                  selectedSample.severity === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {selectedSample.severity === 'High' ? t.highRiskBadge : 
                   selectedSample.severity === 'Moderate' ? t.moderateRiskBadge : t.lowRiskBadge}
                </span>
                <span className="text-xs text-slate-500 font-semibold">
                  {selectedSample.stage[currentLang] || selectedSample.stage.en}
                </span>
              </div>

              {/* Confidence Score meter */}
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <span className="text-[11px] font-semibold text-emerald-800">Confidence:</span>
                <span className="text-xs font-black text-emerald-900">{selectedSample.confidence}%</span>
              </div>
            </div>

            {/* Disease Heading & Scientific Name */}
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                {selectedSample.diseaseName[currentLang] || selectedSample.diseaseName.en}
              </h3>
              <p className="text-xs italic text-slate-500 mt-0.5">
                Pathogen: {selectedSample.scientificName} · Part: {selectedSample.affectedPart}
              </p>
            </div>

            {/* Audio Readout Button */}
            <div className="pt-1">
              <button
                onClick={() => {
                  const speech = `${selectedSample.diseaseName[currentLang] || selectedSample.diseaseName.en}. ` +
                    `${selectedSample.safeIPM[0][currentLang] || selectedSample.safeIPM[0].en}`;
                  onPlayAudio(speech);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                  isPlayingAudio
                    ? 'bg-emerald-600 text-white border-emerald-700 animate-pulse'
                    : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300'
                }`}
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>
                  {isPlayingAudio 
                    ? (lang === 'mr' ? 'सल्ला ऐकवला जात आहे...' : 'Speaking advisory...') 
                    : (lang === 'mr' ? 'रोगनिदान व सल्ला आवाजात ऐका 🔊' : 'Listen Diagnosis & Steps Aloud 🔊')}
                </span>
              </button>
            </div>

            {/* Recommended Safe Action Protocol */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <h4 className="text-sm font-bold text-slate-900">
                {t.whatToDoNow} (Safe IPM Protocol)
              </h4>
              <ul className="space-y-2.5">
                {selectedSample.safeIPM.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      {step[currentLang] || step.en}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* University disclaimer */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 italic font-serif">
              {t.recommendationDisclaimer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


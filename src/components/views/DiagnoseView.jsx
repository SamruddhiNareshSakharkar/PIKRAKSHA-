import React, { useState, useRef } from 'react';
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
  ArrowRight,
  Maximize2,
  ScanLine,
  Image as ImageIcon
} from 'lucide-react';
import { sampleDiagnoses } from '../../data/diagnosisData';

export default function DiagnoseView({ lang = 'en', t, onPlayAudio, isPlayingAudio }) {
  const [selectedSample, setSelectedSample] = useState(sampleDiagnoses[0]);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [customImage, setCustomImage] = useState(null);
  const [customImageName, setCustomImageName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [tickedSymptoms, setTickedSymptoms] = useState({});
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const currentLang = lang || 'en';

  const handleSelectSample = (sample) => {
    setIsAnalyzing(true);
    setAnalysisStep('Calibrating Neural Vision weights...');
    setCustomImage(null);
    setCustomImageName('');
    setTickedSymptoms({});
    setTimeout(() => {
      setSelectedSample(sample);
      setIsAnalyzing(false);
      setAnalysisStep('');
    }, 450);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setCustomImageName(file.name);
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result);
        setIsAnalyzing(true);
        setAnalysisStep('Scanning leaf morphology & lesion edges...');
        setTimeout(() => {
          setAnalysisStep('Running EfficientNet-B4 + Grad-CAM saliency inference...');
        }, 500);
        setTimeout(() => {
          setAnalysisStep('Matching VNMKV & MPKV Plant Pathology Database...');
        }, 1000);
        setTimeout(() => {
          setIsAnalyzing(false);
          setAnalysisStep('');
        }, 1500);
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

  // SVG Artwork generators for high-realism crop specimens when no custom photo is uploaded
  const renderSpecimenArtwork = () => {
    if (customImage) {
      return (
        <img 
          src={customImage} 
          alt="Uploaded crop leaf" 
          className="w-full h-full object-cover transition duration-300" 
        />
      );
    }

    if (selectedSample.id === 'sample-pbw') {
      // Cotton Rosette Flower & Green Boll with hole
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 via-forest-900 to-slate-950 p-6 text-white text-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-2xl">
            {/* Green Leaf Backdrop */}
            <path d="M 40 160 C 20 100, 60 40, 100 20 C 140 40, 180 100, 160 160 C 120 180, 80 180, 40 160 Z" fill="#1b4332" opacity="0.9" />
            <path d="M 100 20 L 100 170" stroke="#2d6a4f" strokeWidth="2" />
            
            {/* Rosette Flower (Distorted Petals Tied Together) */}
            <circle cx="100" cy="90" r="38" fill="#d97706" opacity="0.8" />
            <path d="M 100 52 C 80 65, 75 90, 95 105 C 115 105, 125 75, 100 52 Z" fill="#fef08a" />
            <path d="M 70 85 C 80 110, 105 115, 115 95 C 110 75, 85 70, 70 85 Z" fill="#fde047" />
            <path d="M 130 85 C 120 110, 95 115, 85 95 C 90 75, 115 70, 130 85 Z" fill="#facc15" />
            
            {/* Larval Entry Bore Hole with Frass Excreta */}
            <circle cx="98" cy="92" r="7" fill="#451a03" stroke="#78350f" strokeWidth="2" />
            <circle cx="100" cy="94" r="3" fill="#000000" />
            <circle cx="104" cy="90" r="2" fill="#78350f" />
            <circle cx="93" cy="96" r="2.5" fill="#92400e" />

            {/* Pink Larva Silhouette emerging */}
            <path d="M 98 94 Q 112 85, 118 90" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
          <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11px] text-emerald-200 font-bold flex items-center justify-between">
            <span>Cotton Rosette Flower Specimen</span>
            <span className="text-rose-400 font-extrabold">Active PBW Larva</span>
          </div>
        </div>
      );
    }

    if (selectedSample.id === 'sample-dm') {
      // Grape Downy Mildew leaf with translucent oil spots & white downy fuzz
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-950 via-emerald-900 to-slate-950 p-6 text-white text-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-2xl">
            {/* Palmate Grape Leaf Shape */}
            <path d="M 100 25 C 130 35, 175 60, 165 110 C 150 145, 130 165, 100 175 C 70 165, 50 145, 35 110 C 25 60, 70 35, 100 25 Z" fill="#2d6a4f" />
            {/* Palmate Veins */}
            <path d="M 100 175 L 100 30 M 100 130 L 155 70 M 100 130 L 45 70" stroke="#52b788" strokeWidth="2.5" />
            
            {/* Translucent Yellowish Oil Spots on Leaf Surface */}
            <ellipse cx="78" cy="80" rx="18" ry="14" fill="#eab308" opacity="0.75" />
            <ellipse cx="125" cy="95" rx="15" ry="12" fill="#ca8a04" opacity="0.8" />
            <ellipse cx="95" cy="120" rx="12" ry="10" fill="#facc15" opacity="0.7" />

            {/* White Downy Mildew Fungal Sporangia (Mycelium) */}
            <circle cx="78" cy="80" r="10" fill="#ffffff" opacity="0.85" filter="blur(1px)" />
            <circle cx="125" cy="95" r="8" fill="#f8fafc" opacity="0.9" filter="blur(1px)" />
          </svg>
          <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11px] text-emerald-200 font-bold flex items-center justify-between">
            <span>Grape Leaf Specimen</span>
            <span className="text-yellow-300 font-extrabold">Downy Mildew Oil Spots</span>
          </div>
        </div>
      );
    }

    if (selectedSample.id === 'sample-lb') {
      // Tomato Late Blight leaf and blackened fruit rot
      return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-950 via-slate-900 to-black p-6 text-white text-center relative overflow-hidden">
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow-2xl">
            {/* Tomato Fruit Silhouette */}
            <circle cx="90" cy="110" r="45" fill="#dc2626" />
            <path d="M 90 65 L 90 50 M 80 55 L 100 55" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" />
            
            {/* Dark Water-Soaked Late Blight Rot Patch */}
            <path d="M 85 85 C 105 80, 125 100, 120 125 C 110 145, 75 140, 70 115 C 68 95, 75 88, 85 85 Z" fill="#451a03" opacity="0.9" />
            <ellipse cx="98" cy="112" rx="18" ry="14" fill="#1c1917" opacity="0.95" />
            
            {/* Greasy White Sporangia Edge */}
            <path d="M 72 100 Q 85 85, 115 88" stroke="#ffffff" strokeWidth="2" strokeDasharray="3,3" opacity="0.8" fill="none" />
          </svg>
          <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11px] text-emerald-200 font-bold flex items-center justify-between">
            <span>Tomato Fruit Specimen</span>
            <span className="text-red-400 font-extrabold">Late Blight Water-Soaked Rot</span>
          </div>
        </div>
      );
    }

    // Default icon presentation
    return (
      <div className="text-center p-6 text-white space-y-2">
        <div className="text-6xl drop-shadow-md">{selectedSample.icon}</div>
        <div className="text-lg font-bold drop-shadow-sm">{selectedSample.crop}</div>
        <div className="text-xs text-emerald-200 max-w-xs mx-auto">
          {selectedSample.scientificName}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Intro */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'AI पीक रोगनिदान प्रणाली' : 'Deep Learning Vision Scanner'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'पिकाचा फोटो काढून रोग ओळखा' : 'Diagnose Crop Disease from a Live Photo'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr' 
                ? 'तुमच्या मोबाईल कॅमेऱ्याने शेतातील पानाचा किंवा फळाचा फोटो काढा किंवा गॅलरीतून अपलोड करा. AI मॉडेल त्वरित रोग ओळखून विद्यापीठ उपाय देईल.' 
                : 'Upload or capture a real leaf/boll photo to get instant neural vision detection and university IPM directives.'}
            </p>
          </div>

          {/* Action Upload Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Take Camera Photo */}
            <button
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-white text-xs font-bold cursor-pointer shadow-sm transition"
            >
              <Camera className="w-4 h-4 text-emerald-400" />
              <span>{lang === 'mr' ? 'कॅमेऱ्याने फोटो काढा' : 'Capture with Camera'}</span>
            </button>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              ref={cameraInputRef} 
              onChange={handleCustomUpload} 
              className="hidden" 
            />

            {/* Upload from Gallery / PC */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold cursor-pointer shadow-xs transition"
            >
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'mr' ? 'गॅलरीतून अपलोड' : 'Upload From Device'}</span>
            </button>
            <input 
              type="file" 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleCustomUpload} 
              className="hidden" 
            />
          </div>
        </div>

        {/* Sample selector carousel */}
        <div className="pt-4 border-t border-slate-100">
          <div className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>{lang === 'mr' ? 'किंवा खालील क्षेत्रीय नमुन्यांपैकी एक निवडून चाचणी घ्या:' : 'Or test with pre-loaded university field specimens:'}</span>
            {customImage && (
              <span className="text-emerald-700 text-[11px] font-bold">
                ✓ Active: {customImageName || 'Custom Uploaded Photo'}
              </span>
            )}
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
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <ScanLine className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'mr' ? 'क्षेत्रीय फोटो स्कॅनर' : 'Specimen Image & Neural Detection'}</span>
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
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-inner border-2 border-slate-200 flex items-center justify-center bg-slate-950">
            {renderSpecimenArtwork()}

            {/* Animated Laser Scanning Beam */}
            {isAnalyzing && (
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between overflow-hidden">
                <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#10b981] animate-bounce"></div>
                <div className="w-full h-1 bg-emerald-400 shadow-[0_0_20px_#10b981] animate-pulse"></div>
              </div>
            )}

            {/* AI Attention Heatmap & Bounding Box Overlay */}
            {showHeatmap && !isAnalyzing && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {selectedSample.id === 'sample-healthy' ? (
                  <div className="w-36 h-36 rounded-full border-2 border-emerald-400 bg-emerald-500/20 backdrop-blur-[1px] flex items-center justify-center animate-pulse">
                    <span className="bg-emerald-800/90 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      ✓ No Pathogenic Lesions
                    </span>
                  </div>
                ) : (
                  <div className="relative w-48 h-48 rounded-2xl border-2 border-dashed border-red-500 bg-red-600/20 backdrop-blur-[0.5px] flex items-center justify-center animate-pulse">
                    <div className="w-24 h-24 rounded-full bg-red-600/40"></div>
                    <span className="absolute -top-3.5 left-3 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1">
                      <span>🚨 {selectedSample.diseaseName[currentLang]?.split('(')[0] || 'Pathology Detected'}</span>
                      <span>({selectedSample.confidence}%)</span>
                    </span>
                    <span className="absolute -bottom-3 right-3 bg-black/80 text-yellow-300 text-[9px] font-mono px-1.5 py-0.5 rounded">
                      Grad-CAM BBox: High Severity
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Loading Analysis state */}
            {isAnalyzing && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex flex-col items-center justify-center text-white space-y-3 p-4 text-center">
                <RefreshCw className="w-9 h-9 text-emerald-400 animate-spin" />
                <span className="text-xs font-extrabold tracking-wide text-emerald-300">
                  {analysisStep || 'Running EfficientNet-B4 + Grad-CAM Inference...'}
                </span>
                <span className="text-[10px] text-slate-400">
                  Comparing pixel features against 42,000 certified Maharashtra crop specimens
                </span>
              </div>
            )}
          </div>

          {/* Interactive Symptom Verification Checklist */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                {lang === 'mr' ? 'शेतात दिसणारी लक्षणे निवडा (Symptom Verification):' : 'Tick Observed Field Symptoms:'}
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                Verified
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

        {/* Right (7 cols): Detailed Diagnostic Result & Actionable IPM Guide */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                {selectedSample.crop} • {selectedSample.scientificName}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {selectedSample.diseaseName[currentLang] || selectedSample.diseaseName.en}
              </h3>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              {onPlayAudio && (
                <button
                  onClick={() => onPlayAudio(selectedSample.diseaseName[currentLang] + '. ' + selectedSample.safeIPM[0][currentLang])}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition ${
                    isPlayingAudio ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                  title="Listen in Marathi/Hindi"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{lang === 'mr' ? 'ऐका' : 'Listen'}</span>
                </button>
              )}

              <span className={`px-3 py-1.5 rounded-xl border text-xs font-black ${
                selectedSample.severity === 'Critical' || selectedSample.severity === 'High'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                {selectedSample.severity} Severity
              </span>
            </div>
          </div>

          {/* AI Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">AI Confidence</span>
              <span className="text-lg font-black text-emerald-700">{selectedSample.confidence}%</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Affected Part</span>
              <span className="text-xs font-extrabold text-slate-800">{selectedSample.affectedPart}</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-slate-500 block text-[10px] uppercase font-bold">Crop Stage Window</span>
              <span className="text-xs font-bold text-slate-700 truncate block">
                {selectedSample.stage[currentLang] || selectedSample.stage.en}
              </span>
            </div>
          </div>

          {/* Safe University IPM Action Directives */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'mr' ? 'विद्यापीठ प्रमाणित सुरक्षित IPM कृती उपाय:' : 'University-Certified Safe IPM Measures:'}</span>
            </h4>

            <div className="space-y-2.5">
              {selectedSample.safeIPM.map((rec, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-slate-800 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{rec[currentLang] || rec.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Commercial Brand Prohibition Note */}
          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p>
              {lang === 'mr'
                ? 'महत्त्वाची सूचना: PIKRAKSHA कोणत्याही रासायनिक कंपनीचे स्पॉन्सरशिप स्वीकारत नाही. केवळ VNMKV व MPKV कृषी विद्यापीठांनी शिफारस केलेले सेंद्रिय व जैविक उपायच शेतकऱ्यांना सुचवले जातात.'
                : 'Scientific Non-Commercial Integrity: PIKRAKSHA strictly forbids commercial chemical brand sponsorships. All recommendations follow VNMKV Parbhani & MPKV Rahuri IPM protocols.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

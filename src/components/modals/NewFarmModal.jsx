import React, { useState } from 'react';
import { X, Plus, ShieldCheck } from 'lucide-react';

export default function NewFarmModal({ isOpen, onClose, onAddFarm, lang = 'en' }) {
  const [farmerName, setFarmerName] = useState('');
  const [crop, setCrop] = useState('Cotton');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('Yavatmal');
  const [acres, setAcres] = useState(3.0);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!farmerName.trim()) return;

    const cropLabelMr = crop === 'Cotton' ? 'कापूस' : crop === 'Soybean' ? 'सोयाबीन' : crop === 'Grapes' ? 'द्राक्ष' : crop === 'Tomato' ? 'टोमॅटो' : crop;
    const cropLabelHi = crop === 'Cotton' ? 'कपास' : crop === 'Soybean' ? 'सोयाबीन' : crop === 'Grapes' ? 'अंगूर' : crop === 'Tomato' ? 'टमाटर' : crop;

    const newFarm = {
      id: `farm-${Date.now()}`,
      farmerName: { en: farmerName, mr: farmerName, hi: farmerName },
      location: {
        village: { en: village || 'Shiwar', mr: village || 'शिवार', hi: village || 'शिवार' },
        district: { en: district, mr: district, hi: district },
        zone: "Maharashtra Zone"
      },
      crop: {
        name: { en: crop, mr: cropLabelMr, hi: cropLabelHi },
        variety: "Hybrid Standard",
        acres: parseFloat(acres) || 2.0,
        stage: { 
          en: "Vegetative / Flowering", 
          mr: "वाढ व फुलधारणा", 
          hi: "वृद्धि व फूल अवस्था" 
        },
        das: 60,
        sowingDate: "2025-08-01"
      },
      weatherStation: `${district} AWS (Mahavedh - Stn ID: ${Math.floor(10000 + Math.random() * 90000)})`,
      weather: {
        temp: 28.5,
        minTemp: 20.0,
        maxTemp: 32.0,
        humidity: 74,
        rainChance: 20,
        condition: "Normal Weather"
      },
      trapData: {
        currentCount: 4,
        threshold: 8,
        consecutiveDaysAbove: 0,
        trapType: "Pheromone Trap (Standard)",
        history: [2, 3, 3, 4, 3, 4, 4]
      },
      primaryAlert: {
        pestName: { 
          en: "Monitoring Alert", 
          mr: "नियमित पाहणी अलर्ट", 
          hi: "नियमित निगरानी अलर्ट" 
        },
        severity: "moderate",
        peakText: { 
          en: "Low Risk. Weekly trap checks recommended.", 
          mr: "सध्या कमी धोका. साप्ताहिक पाहणी सुरू ठेवा.", 
          hi: "कम जोखिम। नियमित जांच जारी रखें।" 
        },
        trapStatusText: { 
          en: "Trap counts are currently within economic safety threshold.", 
          mr: "सापळ्यातील संख्या आर्थिक नुकसान पातळीच्या आत सुरक्षित आहे.", 
          hi: "संख्या नियंत्रण सीमा के भीतर सुरक्षित है।" 
        },
        audioText: { 
          en: `Farm ${farmerName} in ${district} registered successfully in Pikraksha. Early warning monitoring is active.`, 
          mr: `पीकरक्षा प्रणालीमध्ये ${farmerName} यांचे ${district} मधील शेत यशस्वीरीत्या नोंदवले गेले आहे. पूर्वसूचना देखरेख सुरू झाली आहे.`, 
          hi: `पीकरक्षा प्रणाली में ${farmerName} का ${district} स्थित खेत सफलतापूर्वक दर्ज हुआ।` 
        }
      },
      threatsSummary: { high: 0, moderate: 1, low: 2 },
      threatsList: [
        {
          id: "threat-1",
          name: { en: "Sucking Pests & Aphids", mr: "रसशोषक किडी व मावा", hi: "रसचूसक कीट व माहू" },
          desc: { 
            en: "Under control currently. Inspect under leaves weekly.", 
            mr: "सध्या नियंत्रणात आहे. दर आठवड्याला पानांच्या खाली पाहणी करा.", 
            hi: "अभी नियंत्रण में है। साप्ताहिक जांच करें।" 
          },
          level: "Low",
          levelMr: "कमी",
          levelHi: "कम",
          color: "bg-emerald-500",
          bars: [0.2, 0.2, 0.2, 0.3, 0.2, 0.2, 0.2]
        }
      ],
      ipmSteps: [
        { 
          en: "Install 5 pheromone traps per hectare at crop canopy level.", 
          mr: "प्रति हेक्टरी ५ कामगंध सापळे पिकाच्या उंचीवर लावा.", 
          hi: "प्रति हेक्टेयर 5 फेरोमोन ट्रैप फसल की ऊंचाई पर लगाएं।" 
        },
        { 
          en: "Maintain bird perches and inspect 20 plants weekly.", 
          mr: "पक्षी थांबे उभारा व साप्ताहिक २० झाडांची पाहणी करा.", 
          hi: "पक्षी बसेरे लगाएं व साप्ताहिक 20 पौधों की जांच करें।" 
        }
      ]
    };

    onAddFarm(newFarm);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        <div className="bg-gradient-to-r from-forest-900 to-emerald-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plus className="w-5 h-5 text-emerald-400" />
            <h3 className="font-extrabold text-base">
              {lang === 'mr' ? 'नवीन शेत नोंदवा' : 'Add New Farm to System'}
            </h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              {lang === 'mr' ? 'शेतकऱ्याचे नाव:' : 'Farmer Name:'}
            </label>
            <input
              type="text"
              required
              value={farmerName}
              onChange={(e) => setFarmerName(e.target.value)}
              placeholder="e.g. Dnyaneshwar Patil"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'mr' ? 'मुख्य पीक:' : 'Crop:'}
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                <option value="Cotton">Cotton (कापूस)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
                <option value="Grapes">Grapes (द्राक्ष)</option>
                <option value="Tomato">Tomato (टोमॅटो)</option>
                <option value="Sugarcane">Sugarcane (ऊस)</option>
                <option value="Pomegranate">Pomegranate (डाळिंब)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'mr' ? 'क्षेत्र (एकर):' : 'Land (Acres):'}
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                value={acres}
                onChange={(e) => setAcres(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'mr' ? 'गाव:' : 'Village:'}
              </label>
              <input
                type="text"
                value={village}
                onChange={(e) => setVillage(e.target.value)}
                placeholder="e.g. Ner / Shiwar"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                {lang === 'mr' ? 'जिल्हा:' : 'District:'}
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
              >
                <option value="Yavatmal">Yavatmal (यवतमाळ)</option>
                <option value="Nashik">Nashik (नाशिक)</option>
                <option value="Pune">Pune (पुणे)</option>
                <option value="Latur">Latur (लातूर)</option>
                <option value="Solapur">Solapur (सोलापूर)</option>
                <option value="Kolhapur">Kolhapur (कोल्हापूर)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white text-xs font-bold shadow-xs transition"
            >
              Add Farm to System
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

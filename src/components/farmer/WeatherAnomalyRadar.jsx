import React from 'react';
import { CloudRain, Droplets, ThermometerSun, AlertTriangle, CheckCircle2, Wind } from 'lucide-react';

export default function WeatherAnomalyRadar({ farm, lang = 'en' }) {
  const currentHumidity = farm?.weather?.humidity || 78;
  const currentTemp = farm?.weather?.temp || 29.4;
  const minTemp = farm?.weather?.minTemp || 21.0;
  const rainChance = farm?.weather?.rainChance || 25;

  const anomalies = [
    {
      id: "rh_surge",
      title: {
        en: "Relative Humidity Anomaly (78% RH)",
        mr: "हवेतील आर्द्रता वाढ (७८% RH)",
        hi: "हवा में आर्द्रता वृद्धि (78% RH)"
      },
      status: currentHumidity >= 75 ? "warning" : "safe",
      metric: `${currentHumidity}%`,
      threshold: ">75%",
      cropEffect: {
        en: "Fosters fungal sporulation & fast egg incubation for pink bollworm.",
        mr: "बोंडअळीच्या अंड्यातून अळी बाहेर पडण्यास व बुरशीवाढीस पोषक वातावरण.",
        hi: "सुंडी के अंडे से निकलने और फफूंद प्रसार के लिए अनुकूल स्थिति।"
      },
      icon: Droplets,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      id: "nocturnal_temp",
      title: {
        en: "Night-time Oviposition Temperature (21°C)",
        mr: "रात्रीचे अनुकूल तापमान (२१°C)",
        hi: "रात का अनुकूल तापमान (21°C)"
      },
      status: minTemp >= 20 && minTemp <= 26 ? "warning" : "safe",
      metric: `${minTemp}°C`,
      threshold: "20-25°C",
      cropEffect: {
        en: "Optimal egg-laying temperature for female moths (150-200 eggs/night).",
        mr: "मादी पतंगांसाठी सर्वाधिक अंडी घालण्याचे अनुकूल तापमान (१५०-२०० अंडी/रात्र).",
        hi: "मादा पतंगों के अंडे देने के लिए सर्वाधिक उपयुक्त तापमान।"
      },
      icon: ThermometerSun,
      color: "text-amber-600 bg-amber-50 border-amber-200"
    },
    {
      id: "rain_trigger",
      title: {
        en: "Unseasonal Rain & Wet Leaves Index",
        mr: "अवकाळी पाऊस व पानांचा ओलावा निर्देशांक",
        hi: "बेमौसम बारिश व पत्तों पर नमी सूचकांक"
      },
      status: rainChance >= 30 ? "warning" : "safe",
      metric: `${rainChance}%`,
      threshold: ">30% Chance",
      cropEffect: {
        en: "Wet leaf surface triggers rapid zoospore motility and leaf spot entry.",
        mr: "पाने ओली राहिल्यास डाऊनी मिल्ड्यू व करपा रोगाच्या बीजाणूंचा जलद शिरकाव.",
        hi: "पत्ते गीले रहने से फफूंद बीजाणुओं का तेजी से फैलाव होता है।"
      },
      icon: CloudRain,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
            ⚡
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-slate-900">
              {lang === 'mr' ? 'हवामान विकृती व कीड-रोग ट्रिगर रडार' : lang === 'hi' ? 'मौसम विसंगति व कीट-रोग ट्रिगर रडार' : 'Weather Anomaly & Disease Trigger Radar'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'mr' ? 'महावेध (Mahavedh AWS) सूक्ष्म-हवामान बायो-मॉडेल' : 'Mahavedh automatic weather station biophysical triggers'}
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" />
          {lang === 'mr' ? '२ हवामान धोके सक्रिय' : '2 Active Weather Triggers'}
        </span>
      </div>

      {/* Grid of Anomalies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {anomalies.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className={`p-4 rounded-2xl border transition hover:shadow-xs space-y-2 ${
                item.status === 'warning' ? 'bg-amber-50/60 border-amber-200' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900 block">{item.metric}</span>
                  <span className="text-[10px] text-slate-500 font-medium">ETL {item.threshold}</span>
                </div>
              </div>

              <h4 className="text-xs font-bold text-slate-900">
                {item.title[lang] || item.title.en}
              </h4>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {item.cropEffect[lang] || item.cropEffect.en}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

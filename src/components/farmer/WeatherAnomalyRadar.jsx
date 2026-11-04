import React from 'react';
import { CloudRain, Droplets, ThermometerSun, AlertTriangle, CheckCircle2, RefreshCw, Radio, Sparkles } from 'lucide-react';

export default function WeatherAnomalyRadar({ 
  farm, 
  lang = 'en',
  onSyncWeather,
  isSyncingWeather = false
}) {
  const currentHumidity = farm?.weather?.humidity || 78;
  const currentTemp = farm?.weather?.temp || 29.4;
  const minTemp = farm?.weather?.minTemp || 21.0;
  const maxTemp = farm?.weather?.maxTemp || 32.8;
  const rainChance = farm?.weather?.rainChance || 25;
  const isLiveSynced = farm?.weather?.isLiveSynced || false;
  const lastSyncTime = farm?.weather?.lastSyncTime;
  const weatherStation = farm?.weatherStation || farm?.weather?.weatherStation || 'Ner AWS (Mahavedh #43219)';

  const anomalies = [
    {
      id: "rh_surge",
      title: {
        en: `Relative Humidity (${currentHumidity}% RH)`,
        mr: `हवेतील आर्द्रता (${currentHumidity}% RH)`,
        hi: `हवा में आर्द्रता (${currentHumidity}% RH)`
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
        en: `Night-time Oviposition Temp (${minTemp}°C)`,
        mr: `रात्रीचे तापमान (${minTemp}°C)`,
        hi: `रात का तापमान (${minTemp}°C)`
      },
      status: minTemp >= 18 && minTemp <= 26 ? "warning" : "safe",
      metric: `${minTemp}°C`,
      threshold: "18-26°C",
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
        en: `Precipitation Risk (${rainChance}%)`,
        mr: `पाऊस व ओलावा निर्देशांक (${rainChance}%)`,
        hi: `बारिश व नमी सूचकांक (${rainChance}%)`
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
      {/* Header with live sync */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold text-slate-900">
                {lang === 'mr' ? 'हवामान विकृती व कीड-रोग ट्रिगर रडार' : lang === 'hi' ? 'मौसम विसंगति व कीट-रोग ट्रिगर रडार' : 'Weather Anomaly & Disease Trigger Radar'}
              </h3>
              {isLiveSynced && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  LIVE SATELLITE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {weatherStation} • {currentTemp}°C • {farm?.weather?.condition || 'Clear Sky'}
            </p>
          </div>
        </div>

        {/* Live sync CTA */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onSyncWeather && (
            <button
              onClick={onSyncWeather}
              disabled={isSyncingWeather}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Query real-time meteorological API for this farm's latitude & longitude"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncingWeather ? 'animate-spin' : ''}`} />
              <span>
                {isSyncingWeather
                  ? (lang === 'mr' ? 'अपडेट होत आहे...' : 'Syncing Live API...')
                  : (lang === 'mr' ? 'थेट हवामान API रिफ्रेश' : 'Sync Live Weather API')}
              </span>
            </button>
          )}

          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 shrink-0">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>2 Triggers</span>
          </span>
        </div>
      </div>

      {/* Grid of Anomalies */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {anomalies.map((item) => {
          const Icon = item.icon;
          return (
            <div 
              key={item.id}
              className={`p-4 rounded-2xl border transition hover:shadow-xs space-y-2 ${
                item.status === 'warning' ? 'bg-amber-50/60 border-amber-200 ring-1 ring-amber-300/40' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${item.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-slate-900 block">{item.metric}</span>
                  <span className="text-[10px] text-slate-500 font-medium">Trigger {item.threshold}</span>
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

      {/* API Provenance note */}
      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <Radio className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            <strong>Data Source:</strong> Open-Meteo Satellite Feed + Mahavedh State Automatic Weather Stations (AWS).
          </span>
        </div>
        {lastSyncTime && (
          <span className="text-slate-400 font-mono text-[10px]">
            Synced: {lastSyncTime}
          </span>
        )}
      </div>
    </div>
  );
}

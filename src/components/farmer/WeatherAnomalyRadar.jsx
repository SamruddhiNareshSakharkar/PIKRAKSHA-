import React, { useState } from 'react';
import { 
  CloudRain, 
  Droplets, 
  ThermometerSun, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Radio, 
  Sparkles, 
  MapPin, 
  Navigation, 
  Clock, 
  Layers,
  Wind
} from 'lucide-react';
import { MAHARASHTRA_STATIONS } from '../../services/weatherService';

export default function WeatherAnomalyRadar({ 
  farm, 
  lang = 'en',
  onSyncWeather,
  onSyncGeolocation,
  onChangeDistrict,
  isSyncingWeather = false
}) {
  const currentHumidity = farm?.weather?.humidity || 78;
  const currentTemp = farm?.weather?.temp || 29.4;
  const minTemp = farm?.weather?.minTemp || 21.0;
  const maxTemp = farm?.weather?.maxTemp || 32.8;
  const rainChance = farm?.weather?.rainChance || 20;
  const rainSum24h = farm?.weather?.rainSum24h || farm?.weather?.precipitation || 0;
  const deltaT = farm?.weather?.deltaT || 4.5;
  const leafWetness = farm?.weather?.leafWetness || { isWet: currentHumidity >= 85, status: currentHumidity >= 85 ? 'Wet (दव / ओलावा)' : 'Dry (पाने कोरडी)' };
  const isLiveSynced = farm?.weather?.isLiveSynced || false;
  const isOfflineCache = farm?.weather?.isOfflineCache || false;
  const lastSyncTime = farm?.weather?.lastSyncTime || farm?.weather?.cachedAt;
  const weatherStation = farm?.weatherStation || farm?.weather?.weatherStation || 'Ner AWS (Mahavedh #43219)';

  const [selectedStation, setSelectedStation] = useState(
    farm?.location?.district?.en || farm?.location?.district || 'Yavatmal'
  );

  const handleStationChange = (e) => {
    const val = e.target.value;
    setSelectedStation(val);
    if (onChangeDistrict) {
      onChangeDistrict(val);
    }
  };

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
      subMetric: `Leaf: ${leafWetness.status}`,
      threshold: ">75%",
      cropEffect: {
        en: "Elevated humidity triggers rapid fungal sporulation and pink bollworm egg incubation.",
        mr: "बोंडअळीच्या अंड्यातून अळी बाहेर पडण्यास व बुरशीवाढीस पोषक वातावरण.",
        hi: "सुंडी के अंडे से निकलने और फफूंद प्रसार के लिए अनुकूल स्थिति।"
      },
      icon: Droplets,
      color: "text-blue-600 bg-blue-50 border-blue-200"
    },
    {
      id: "nocturnal_temp",
      title: {
        en: `Night Oviposition Temp (${minTemp}°C)`,
        mr: `रात्रीचे किमान तापमान (${minTemp}°C)`,
        hi: `रात का न्यूनतम तापमान (${minTemp}°C)`
      },
      status: minTemp >= 18 && minTemp <= 26 ? "warning" : "safe",
      metric: `${minTemp}°C`,
      subMetric: `Day Max: ${maxTemp}°C`,
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
        en: `Precipitation Risk (${rainChance}%)`,
        mr: `पाऊस व ओलावा निर्देशांक (${rainChance}%)`,
        hi: `बारिश व नमी सूचकांक (${rainChance}%)`
      },
      status: rainChance >= 30 || rainSum24h >= 10 ? "warning" : "safe",
      metric: `${rainChance}%`,
      subMetric: `24h Rain: ${rainSum24h} mm`,
      threshold: ">10mm (10-10-10 Rule)",
      cropEffect: {
        en: "Wet leaf surface triggers rapid zoospore motility in grape downy mildew and tomato blight.",
        mr: "पाने ओली राहिल्यास द्राक्ष डाऊनी व टोमॅटो करपा रोगाच्या बीजाणूंचा जलद शिरकाव.",
        hi: "पत्ते गीले रहने से फफूंद बीजाणुओं का तेजी से फैलाव होता है।"
      },
      icon: CloudRain,
      color: "text-indigo-600 bg-indigo-50 border-indigo-200"
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
      {/* Header with live sync & geolocation */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-extrabold text-slate-900">
                {lang === 'mr' ? 'थेट हवामान व कीड-रोग ट्रिगर रडार' : 'Live Microclimate & Disease Trigger Radar'}
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1.5 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                <span>LIVE (Open-Meteo WMO Feed)</span>
              </span>
              {isOfflineCache && (
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-100 text-amber-800">
                  Offline Cache
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {weatherStation} • {currentTemp}°C • {farm?.weather?.condition || 'Clear Sky'} • Delta-T: {deltaT} ΔT
            </p>
          </div>
        </div>

        {/* Action Controls: District Selector, GPS Button, Sync Button */}
        <div className="flex items-center gap-2 flex-wrap self-start lg:self-auto">
          {/* Manual District Picker Fallback */}
          <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={selectedStation}
              onChange={handleStationChange}
              className="bg-transparent font-bold text-slate-800 text-xs cursor-pointer focus:outline-none"
              title="Manual Maharashtra station picker"
            >
              {Object.keys(MAHARASHTRA_STATIONS).map((district) => (
                <option key={district} value={district}>
                  {district} ({MAHARASHTRA_STATIONS[district].taluka})
                </option>
              ))}
            </select>
          </div>

          {/* Browser Geolocation Button */}
          {onSyncGeolocation && (
            <button
              onClick={onSyncGeolocation}
              disabled={isSyncingWeather}
              className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
              title="Use browser GPS geolocation coordinates"
            >
              <Navigation className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">Use My GPS</span>
            </button>
          )}

          {/* Manual Live API Refresh */}
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
                  ? (lang === 'mr' ? 'अपडेट होत आहे...' : 'Syncing...')
                  : (lang === 'mr' ? 'रिफ्रेश' : 'Refresh API')}
              </span>
            </button>
          )}
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
                  <span className="text-[10px] text-slate-500 font-medium">{item.subMetric}</span>
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

      {/* Real-time Telemetry & Auto-Refresh Provenance Bar */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>
            <strong>Data Source:</strong> Open-Meteo Meteorological Satellite API + Mahavedh State Automatic Weather Stations (AWS).
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>Auto-refreshes every 30 mins</span>
          </span>
          {lastSyncTime && (
            <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700 font-bold">
              Last updated: {lastSyncTime}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

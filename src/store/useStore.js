// Central state store for PIKRAKSHA with localStorage persistence & Live Weather Feed
import { useState, useEffect, useRef } from 'react';
import { farmsData } from '../data/farmsData';
import { generateDailyActionPlan } from '../engine/actionPlanEngine';
import { calculateExplainableRisk } from '../engine/riskEngine';
import { 
  fetchLiveWeatherData, 
  getBrowserCoordinates, 
  MAHARASHTRA_STATIONS, 
  getCachedWeatherData 
} from '../services/weatherService';

const STORAGE_KEY = 'PIKRAKSHA_STORE_V6';

const defaultState = {
  portal: 'farmer', // 'farmer' | 'officer'
  lang: 'en', // 'en' | 'mr' | 'hi'
  farmerTab: 'dashboard',
  officerTab: 'overview',
  selectedFarmId: 'farm-1',
  farms: farmsData,
  trapCounts: {
    'farm-1': [4, 6, 7, 9, 10, 11, 10],
    'farm-2': [1, 2, 2, 3, 2, 3, 3],
    'farm-3': [3, 4, 4, 5, 5, 4, 5],
    'farm-4': [6, 8, 9, 11, 13, 14, 14]
  },
  actionTasks: {
    'farm-1': generateDailyActionPlan(farmsData[0], calculateExplainableRisk(farmsData[0])),
    'farm-2': generateDailyActionPlan(farmsData[1], calculateExplainableRisk(farmsData[1])),
    'farm-3': generateDailyActionPlan(farmsData[2], calculateExplainableRisk(farmsData[2])),
    'farm-4': generateDailyActionPlan(farmsData[3], calculateExplainableRisk(farmsData[3]))
  },
  farmerSubmissions: [
    {
      id: 'sub_1',
      farmerName: 'Ramesh Jadhav',
      village: 'Ner, Yavatmal',
      crop: 'Cotton',
      photoName: 'rosette_flower_cotton.jpg',
      suspectedPest: 'Pink Bollworm (गुलाबी बोंडअळी)',
      aiConfidence: 96.4,
      date: '2026-11-03 10:15',
      status: 'pending',
      officerNotes: '',
      sampleBg: 'linear-gradient(135deg, #2e5939 0%, #17341e 100%)',
      icon: '🌸'
    },
    {
      id: 'sub_2',
      farmerName: 'Sopanrao Patil',
      village: 'Dindori, Nashik',
      crop: 'Grapes',
      photoName: 'downy_mildew_oil_spots.jpg',
      suspectedPest: 'Downy Mildew (डाऊनी मिल्ड्यू)',
      aiConfidence: 94.8,
      date: '2026-11-03 09:30',
      status: 'verified',
      officerNotes: 'Confirmed 10-10-10 rule sporangia. Verified Boardeaux spray directive.',
      sampleBg: 'linear-gradient(135deg, #3d5a45 0%, #203829 100%)',
      icon: '🍇'
    },
    {
      id: 'sub_3',
      farmerName: 'Dnyaneshwar Shinde',
      village: 'Junnar, Pune',
      crop: 'Tomato',
      photoName: 'late_blight_leaf_stem.jpg',
      suspectedPest: 'Late Blight (करपा रोग)',
      aiConfidence: 97.2,
      date: '2026-11-02 16:45',
      status: 'verified',
      officerNotes: 'Phytophthora confirmed. Instructed water drainage.',
      sampleBg: 'linear-gradient(135deg, #613328 0%, #2e1a15 100%)',
      icon: '🍅'
    }
  ],
  treatmentLogs: [
    {
      id: 'treat_1',
      farmId: 'farm-1',
      date: '2026-10-28',
      intervention: 'Hand-picked 14 rosette flowers & 5% NSKE (Neem Seed Kernel Extract) spray',
      preTrapCount: 11,
      postTrapCount: 7,
      healthOutcome: 'Effective (नियंत्रणात)',
      notes: 'Larval boring arrested in Plot A. Reduced new rosette flower formation.'
    },
    {
      id: 'treat_2',
      farmId: 'farm-2',
      date: '2026-10-29',
      intervention: 'Applied 1% Bordeaux mixture + canopy suckering after 14mm dew event',
      preTrapCount: 8,
      postTrapCount: 2,
      healthOutcome: 'Effective (नियंत्रणात)',
      notes: 'Downy mildew fungal sporulation arrested on young vine leaves. Foliage healthy.'
    },
    {
      id: 'treat_3',
      farmId: 'farm-3',
      date: '2026-10-30',
      intervention: 'Installed 12 T-shaped bird perches & sprayed Nomuraea rileyi bio-agent',
      preTrapCount: 6,
      postTrapCount: 2,
      healthOutcome: 'Effective (नियंत्रणात)',
      notes: 'Natural avian predators actively reducing girdle beetles and leaf folder caterpillars.'
    },
    {
      id: 'treat_4',
      farmId: 'farm-4',
      date: '2026-10-31',
      intervention: 'Soil drenching with Trichoderma harzianum + 6 Tuta absoluta pheromone traps',
      preTrapCount: 14,
      postTrapCount: 4,
      healthOutcome: 'Effective (नियंत्रणात)',
      notes: 'Prevented Late Blight stem collar rot and captured 48 male pinworm moths in 48h.'
    }
  ],
  broadcastHistory: [
    {
      id: 'bc_1',
      taluka: 'Ner Taluka (Yavatmal)',
      targetCount: 1250,
      threat: 'Pink Bollworm 3-Day Threshold Breach',
      message: 'नेर तालुक्यातील कामगंध सापळ्यात सलग ३ दिवस ८ पेक्षा जास्त पतंग आढळले आहेत. सर्व शेतकऱ्यांनी आजच २० बोंडांची पाहणी करावी.',
      date: '2026-11-03 08:00',
      deliveredPct: '99.2%'
    }
  ]
};

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.farms) && parsed.farms.length > 0) {
          const mergedTasks = { ...defaultState.actionTasks };
          if (parsed.actionTasks) {
            for (const fId of ['farm-1', 'farm-2', 'farm-3', 'farm-4']) {
              if (Array.isArray(parsed.actionTasks[fId]) && parsed.actionTasks[fId].length > 0) {
                mergedTasks[fId] = parsed.actionTasks[fId];
              }
            }
          }

          return {
            ...defaultState,
            ...parsed,
            portal: parsed.portal || 'farmer',
            lang: parsed.lang || 'en',
            farmerTab: parsed.farmerTab || 'dashboard',
            officerTab: parsed.officerTab || 'overview',
            selectedFarmId: parsed.selectedFarmId || 'farm-1',
            farms: parsed.farms,
            trapCounts: { ...defaultState.trapCounts, ...(parsed.trapCounts || {}) },
            actionTasks: mergedTasks,
            farmerSubmissions: parsed.farmerSubmissions || defaultState.farmerSubmissions,
            treatmentLogs: parsed.treatmentLogs || defaultState.treatmentLogs,
            broadcastHistory: parsed.broadcastHistory || defaultState.broadcastHistory
          };
        }
      }
    } catch (e) {
      console.error("Failed to parse stored state, using defaults.", e);
    }
  }
  return defaultState;
};

export const useStore = () => {
  const [state, setState] = useState(getInitialState);
  const [isSyncingWeather, setIsSyncingWeather] = useState(false);
  const [weatherSyncError, setWeatherSyncError] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Failed to persist state to localStorage", e);
    }
  }, [state]);

  const setPortal = (portal) => setState(prev => ({ ...prev, portal }));
  const setLang = (lang) => setState(prev => ({ ...prev, lang }));
  const setFarmerTab = (tab) => setState(prev => ({ ...prev, farmerTab: tab }));
  const setOfficerTab = (tab) => setState(prev => ({ ...prev, officerTab: tab }));
  const setSelectedFarmId = (id) => setState(prev => ({ ...prev, selectedFarmId: id }));

  const currentFarm = (state.farms && state.farms.find(f => f && f.id === state.selectedFarmId)) || (state.farms && state.farms[0]) || farmsData[0];
  const farmTrapHistory = (state.trapCounts && state.trapCounts[state.selectedFarmId]) || currentFarm?.trapData?.history || [4, 6, 7, 9, 10, 11, 10];
  const riskAnalysis = calculateExplainableRisk(currentFarm, farmTrapHistory);

  // Sync real-time weather from Open-Meteo & Mahavedh API
  const syncLiveWeather = async (farmId, customLocation = null) => {
    const targetId = farmId || state.selectedFarmId;
    const targetFarm = (state.farms || []).find(f => f.id === targetId) || currentFarm;
    if (!targetFarm) return;

    setIsSyncingWeather(true);
    setWeatherSyncError(null);
    try {
      let queryOptions = {};
      if (customLocation && customLocation.coords) {
        queryOptions = { coords: customLocation.coords };
      } else if (customLocation && customLocation.district) {
        queryOptions = { districtName: customLocation.district };
      } else {
        const district = typeof targetFarm.location?.district === 'object'
          ? (targetFarm.location?.district?.en || 'Yavatmal')
          : (targetFarm.location?.district || 'Yavatmal');
        queryOptions = { districtName: district };
      }

      const liveWeather = await fetchLiveWeatherData(queryOptions);
      if (liveWeather) {
        setState(prev => {
          const updatedFarms = prev.farms.map(f => {
            if (f.id === targetFarm.id) {
              return {
                ...f,
                weatherStation: liveWeather.weatherStation,
                weather: {
                  ...f.weather,
                  ...liveWeather
                }
              };
            }
            return f;
          });
          return {
            ...prev,
            farms: updatedFarms
          };
        });
      }
    } catch (e) {
      console.error('Failed to sync live weather:', e);
      setWeatherSyncError(e.message || 'Live weather network request failed');
    } finally {
      setIsSyncingWeather(false);
    }
  };

  // Browser Geolocation Sync
  const syncWithGeolocation = async () => {
    setIsSyncingWeather(true);
    try {
      const coords = await getBrowserCoordinates();
      if (!coords) {
        alert("Could not access browser location. Please allow GPS permission or select your district manually.");
        return;
      }
      await syncLiveWeather(state.selectedFarmId, { coords });
    } catch (err) {
      console.error("GPS Sync error:", err);
    } finally {
      setIsSyncingWeather(false);
    }
  };

  // Change Farm District to any of the 6 Maharashtra hubs
  const changeFarmDistrict = async (districtName) => {
    if (!MAHARASHTRA_STATIONS[districtName]) return;
    const station = MAHARASHTRA_STATIONS[districtName];
    
    setState(prev => {
      const updatedFarms = prev.farms.map(f => {
        if (f.id === state.selectedFarmId) {
          return {
            ...f,
            location: {
              ...f.location,
              district: { en: station.district, mr: station.district, hi: station.district },
              village: { en: station.taluka, mr: station.taluka, hi: station.taluka },
              zone: station.zone
            },
            weatherStation: station.stationName
          };
        }
        return f;
      });
      return { ...prev, farms: updatedFarms };
    });

    await syncLiveWeather(state.selectedFarmId, { district: districtName });
  };

  // Initial live weather sync on startup
  useEffect(() => {
    syncLiveWeather(state.selectedFarmId);
  }, [state.selectedFarmId]);

  // Auto-refresh live weather every 30 minutes
  useEffect(() => {
    const THIRTY_MINUTES_MS = 30 * 60 * 1000;
    const interval = setInterval(() => {
      syncLiveWeather();
    }, THIRTY_MINUTES_MS);

    return () => clearInterval(interval);
  }, [state.selectedFarmId]);

  // Update trap count and dynamically recalculate risk
  const logTrapCatch = (farmId, newCount) => {
    setState(prev => {
      const history = (prev.trapCounts && prev.trapCounts[farmId]) || [4, 6, 7, 9, 10, 11, 10];
      const updatedHistory = [...history.slice(1), parseInt(newCount) || 0];
      return {
        ...prev,
        trapCounts: {
          ...prev.trapCounts,
          [farmId]: updatedHistory
        }
      };
    });
  };

  // Toggle action task completion
  const toggleActionTask = (farmId, taskId) => {
    setState(prev => {
      const tasks = (prev.actionTasks && prev.actionTasks[farmId]) || [];
      const updatedTasks = tasks.map(t => 
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      return {
        ...prev,
        actionTasks: {
          ...prev.actionTasks,
          [farmId]: updatedTasks
        }
      };
    });
  };

  // Add custom farmer IPM task
  const addCustomActionTask = (farmId, task) => {
    setState(prev => {
      const targetId = farmId || prev.selectedFarmId;
      const targetFarm = (prev.farms || []).find(f => f.id === targetId) || prev.farms[0];
      const existing = (prev.actionTasks && prev.actionTasks[targetId]) || generateDailyActionPlan(targetFarm, calculateExplainableRisk(targetFarm));
      return {
        ...prev,
        actionTasks: {
          ...prev.actionTasks,
          [targetId]: [task, ...existing]
        }
      };
    });
  };

  // Verify or reject diagnosis submission
  const verifyDiagnosisSubmission = (subId, status, notes) => {
    setState(prev => ({
      ...prev,
      farmerSubmissions: prev.farmerSubmissions.map(s => 
        s.id === subId ? { ...s, status, officerNotes: notes || s.officerNotes } : s
      )
    }));
  };

  // Add sample farm
  const addNewFarm = (newFarm) => {
    setState(prev => {
      const newActionPlan = generateDailyActionPlan(newFarm, calculateExplainableRisk(newFarm));
      return {
        ...prev,
        farms: [...prev.farms, newFarm],
        selectedFarmId: newFarm.id,
        farmerTab: 'dashboard',
        trapCounts: {
          ...prev.trapCounts,
          [newFarm.id]: newFarm.trapData?.history || [2, 3, 3, 4, 3, 4, 4]
        },
        actionTasks: {
          ...prev.actionTasks,
          [newFarm.id]: newActionPlan
        }
      };
    });
  };

  // Add broadcast advisory
  const sendBroadcastAdvisory = (advisory) => {
    setState(prev => ({
      ...prev,
      broadcastHistory: [
        {
          id: `bc_${Date.now()}`,
          ...advisory,
          date: new Date().toISOString().replace('T', ' ').substring(0, 16),
          deliveredPct: '99.5%'
        },
        ...(prev.broadcastHistory || [])
      ]
    }));
  };

  // Add treatment follow-up log
  const addTreatmentLog = (log) => {
    setState(prev => ({
      ...prev,
      treatmentLogs: [
        {
          id: `treat_${Date.now()}`,
          ...log
        },
        ...(prev.treatmentLogs || [])
      ]
    }));
  };

  // Factory reset utility
  const resetStore = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState(defaultState);
  };

  return {
    ...state,
    currentFarm,
    farmTrapHistory,
    riskAnalysis,
    setPortal,
    setLang,
    setFarmerTab,
    setOfficerTab,
    setSelectedFarmId,
    logTrapCatch,
    toggleActionTask,
    verifyDiagnosisSubmission,
    addNewFarm,
    sendBroadcastAdvisory,
    addTreatmentLog,
    resetStore,
    addCustomActionTask,
    syncLiveWeather,
    syncWithGeolocation,
    changeFarmDistrict,
    isSyncingWeather,
    weatherSyncError,
    maharashtraStations: MAHARASHTRA_STATIONS
  };
};

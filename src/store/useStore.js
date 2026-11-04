// Central state store for PIKRAKSHA with localStorage persistence
import { useState, useEffect } from 'react';
import { farmsData } from '../data/farmsData';
import { generateDailyActionPlan } from '../engine/actionPlanEngine';
import { calculateExplainableRisk } from '../engine/riskEngine';
import { fetchLiveWeatherData } from '../services/weatherService';

const STORAGE_KEY = 'PIKRAKSHA_STORE_V4';

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
    'farm-1': generateDailyActionPlan(farmsData[0], calculateExplainableRisk(farmsData[0]))
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
      intervention: 'Hand-picked 14 rosette flowers & installed 5 Gossyplure traps',
      preTrapCount: 11,
      postTrapCount: 7,
      healthOutcome: 'Effective (नियंत्रणात)',
      notes: 'Larval boring arrested in Plot A. Reduced new boll entries.'
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
            actionTasks: { ...defaultState.actionTasks, ...(parsed.actionTasks || {}) },
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
      const currentTasks = (prev.actionTasks && prev.actionTasks[farmId]) || generateDailyActionPlan(currentFarm, riskAnalysis);
      const updatedTasks = currentTasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t);
      return {
        ...prev,
        actionTasks: {
          ...prev.actionTasks,
          [farmId]: updatedTasks
        }
      };
    });
  };

  // Verify farmer AI diagnosis submission (Officer action)
  const verifyDiagnosisSubmission = (subId, verdict, officerNotes = '') => {
    setState(prev => ({
      ...prev,
      farmerSubmissions: (prev.farmerSubmissions || []).map(s => s.id === subId ? {
        ...s,
        status: verdict,
        officerNotes: officerNotes || (verdict === 'verified' ? 'Verified by Taluka Agriculture Officer (VNMKV standards).' : 'Rejected: Insufficient focus or non-pathogenic.')
      } : s)
    }));
  };

  // Add new farm safely
  const addNewFarm = (newFarm) => {
    setState(prev => {
      const newActionPlan = generateDailyActionPlan(newFarm, calculateExplainableRisk(newFarm));
      return {
        ...prev,
        farms: [newFarm, ...(prev.farms || [])],
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


  const [isSyncingWeather, setIsSyncingWeather] = useState(false);

  // Sync real-time weather from Open-Meteo & Mahavedh API
  const syncLiveWeather = async (farmId) => {
    const targetId = farmId || state.selectedFarmId;
    const targetFarm = (state.farms || []).find(f => f.id === targetId) || currentFarm;
    if (!targetFarm) return;

    setIsSyncingWeather(true);
    try {
      const district = typeof targetFarm.location?.district === 'object'
        ? targetFarm.location?.district?.en
        : targetFarm.location?.district || 'Yavatmal';

      const liveWeather = await fetchLiveWeatherData(district);
      if (liveWeather) {
        setState(prev => {
          const updatedFarms = prev.farms.map(f => {
            if (f.id === targetFarm.id) {
              return {
                ...f,
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
    } finally {
      setIsSyncingWeather(false);
    }
  };

  // Factory reset utility if ever needed
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
    syncLiveWeather,
    isSyncingWeather
  };
};

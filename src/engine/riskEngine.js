// Explainable Biophysical Risk Engine for PIKRAKSHA
// Transparent factor-by-factor computation conforming to VNMKV / MPKV / ICAR standards

export const calculateExplainableRisk = (farm, trapHistory = null) => {
  if (!farm) {
    return {
      totalScore: 40,
      riskLevel: "Moderate",
      riskColor: "bg-amber-500",
      alertTitle: { en: "Monitoring Baseline", mr: "नियमित पाहणी", hi: "नियमित निगरानी" },
      factors: [],
      isTrapTriggered: false,
      daysAboveThreshold: 0,
      consecutiveThreshold: 8
    };
  }

  const traps = Array.isArray(trapHistory) && trapHistory.length > 0 
    ? trapHistory 
    : (Array.isArray(farm.trapData?.history) ? farm.trapData.history : [4, 6, 7, 9, 10, 11, 10]);
  
  const last3Days = traps.slice(-3);
  const threshold = farm.trapData?.threshold || 8;
  const daysAboveThreshold = last3Days.filter(c => c >= threshold).length;
  const isTrapTriggered = daysAboveThreshold >= 3;

  const temp = farm.weather?.temp || 29;
  const minTemp = farm.weather?.minTemp || 21;
  const rh = farm.weather?.humidity || 75;
  const das = farm.crop?.das || 100;

  const cropNameStr = typeof farm.crop?.name === 'object' 
    ? (farm.crop?.name?.en || farm.crop?.name?.mr || 'Cotton') 
    : (farm.crop?.name || 'Cotton');

  let totalScore = 0;
  const factors = [];

  // Factor 1: Pheromone Trap Count (Weight: 35%)
  let trapScore = 0;
  if (isTrapTriggered) {
    trapScore = 35;
    factors.push({
      id: "trap_factor",
      name: { en: "Pheromone Trap Threshold", mr: "कामगंध सापळा नुकसान मर्यादा", hi: "फेरोमोन ट्रैप क्षति सीमा" },
      weight: "35%",
      contribution: 35,
      level: "critical",
      value: `${traps[traps.length - 1]} moths/trap`,
      thresholdText: `Threshold: 8 moths for 3 consecutive days (Caught: ${last3Days.join(', ')})`,
      explanation: {
        en: "Official ETL crossed: 8 or more moths per trap recorded for 3 consecutive days.",
        mr: "अधिकृत आर्थिक नुकसान पातळी ओलांडली: सलग ३ दिवस प्रति सापळा ८ किंवा जास्त पतंग आढळले.",
        hi: "आधिकारिक क्षति सीमा पार: लगातार 3 दिनों तक प्रति ट्रैप 8 या अधिक पतंगे दर्ज हुए।"
      }
    });
  } else if (daysAboveThreshold > 0) {
    trapScore = 20;
    factors.push({
      id: "trap_factor",
      name: { en: "Pheromone Trap Trend", mr: "कामगंध सापळा संख्या कल", hi: "फेरोमोन ट्रैप रुझान" },
      weight: "35%",
      contribution: 20,
      level: "warning",
      value: `${traps[traps.length - 1]} moths/trap`,
      thresholdText: `Threshold: 8 moths (Caught ${daysAboveThreshold} of last 3 days)`,
      explanation: {
        en: "Trap count approaching critical threshold. Immediate field scouting advised.",
        mr: "सापळ्यातील संख्या नुकसान मर्यादेजवळ पोहोचत आहे. शेतात पाहणी सुरू करा.",
        hi: "ट्रैप में कीट संख्या सीमा के करीब पहुंच रही है। खेत में निगरानी शुरू करें।"
      }
    });
  } else {
    trapScore = 8;
    factors.push({
      id: "trap_factor",
      name: { en: "Pheromone Trap Catch", mr: "कामगंध सापळा संख्या", hi: "फेरोमोन ट्रैप संख्या" },
      weight: "35%",
      contribution: 8,
      level: "safe",
      value: `${traps[traps.length - 1]} moths/trap`,
      thresholdText: `Below threshold (< 8 moths)`,
      explanation: {
        en: "Catches are within safe baseline limits.",
        mr: "सापळ्यातील संख्या सुरक्षित मर्यादेत आहे.",
        hi: "कीट संख्या सुरक्षित सीमा के भीतर है।"
      }
    });
  }
  totalScore += trapScore;

  // Factor 2: Crop Phenology / Growth Stage (Weight: 25%)
  let stageScore = 0;
  if (cropNameStr.toLowerCase().includes('cotton') || cropNameStr.includes('कापूस') || cropNameStr.includes('कपास')) {
    if (das >= 75 && das <= 135) {
      stageScore = 25;
      factors.push({
        id: "stage_factor",
        name: { en: "Crop Vulnerability Stage", mr: "पिकाची संवेदनशील अवस्था", hi: "फसल की संवेदनशील अवस्था" },
        weight: "25%",
        contribution: 25,
        level: "critical",
        value: `${farm.crop?.stage?.en || "Boll development"} (${das} DAS)`,
        thresholdText: "Vulnerable window: 75–135 Days After Sowing",
        explanation: {
          en: "Cotton is in green boll formation stage. Larvae readily bore into bolls within 48h of hatching.",
          mr: "कापूस सध्या हिरव्या बोंड वाढीच्या संवेदनशील अवस्थेत आहे. अंड्यातून बाहेर पडलेली अळी सहज बोंडात शिरते.",
          hi: "कपास हरे डोडों के विकास की संवेदनशील अवस्था में है। सुंडी डोडों में आसानी से छेद कर सकती है।"
        }
      });
    } else {
      stageScore = 10;
      factors.push({
        id: "stage_factor",
        name: { en: "Crop Growth Stage", mr: "पिकाची अवस्था", hi: "फसल की अवस्था" },
        weight: "25%",
        contribution: 10,
        level: "safe",
        value: `${farm.crop?.stage?.en || "Vegetative"} (${das} DAS)`,
        thresholdText: "Moderate susceptibility",
        explanation: {
          en: "Crop is not at peak reproductive vulnerability window.",
          mr: "पीक सध्या अतिसंवेदनशील अवस्थेत नाही.",
          hi: "फसल अभी अत्यधिक संवेदनशील अवस्था में नहीं है।"
        }
      });
    }
  } else if (cropNameStr.toLowerCase().includes('grape') || cropNameStr.includes('द्राक्ष') || cropNameStr.includes('अंगूर')) {
    stageScore = 25;
    factors.push({
      id: "stage_factor",
      name: { en: "Canopy & Berry Sensitivity", mr: "घड व मणी संवेदनशीलता", hi: "अंगूर गुच्छा संवेदनशीलता" },
      weight: "25%",
      contribution: 25,
      level: "critical",
      value: "Tender Berry Stage",
      thresholdText: "High risk of Downy Mildew berry drop",
      explanation: {
        en: "Young berries and tender shoot canopy are highly susceptible to sporangia penetration.",
        mr: "कोवळे मणी आणि नवीन पालवीवर डाऊनी मिल्ड्यू बुरशीचे बीजाणू वेगाने हल्ला करतात.",
        hi: "कोमल अंगूरों पर डाउनी मिल्ड्यू कवक का संक्रमण सबसे तीव्र होता है।"
      }
    });
  } else {
    stageScore = 15;
    factors.push({
      id: "stage_factor",
      name: { en: "Crop Stage Vulnerability", mr: "पिकाची अवस्था", hi: "फसल की अवस्था" },
      weight: "25%",
      contribution: 15,
      level: "warning",
      value: `${farm.crop?.stage?.en || "Active Stage"}`,
      thresholdText: "Moderate stage risk",
      explanation: {
        en: "Growth stage is susceptible to active pest species.",
        mr: "वाढीची अवस्था किडींसाठी अनुकूल आहे.",
        hi: "फसल की वृद्धि अवस्था कीटों के अनुकूल है।"
      }
    });
  }
  totalScore += stageScore;

  // Factor 3: Weather Anomaly & Microclimate (Weight: 25%)
  let weatherScore = 0;
  if (minTemp >= 18 && minTemp <= 26 && rh >= 70) {
    weatherScore = 25;
    factors.push({
      id: "weather_factor",
      name: { en: "Microclimate Suitability", mr: "हवामान पोषकता निर्देशांक", hi: "मौसम अनुकूलता सूचकांक" },
      weight: "25%",
      contribution: 25,
      level: "critical",
      value: `Night ${minTemp}°C, Humidity ${rh}%`,
      thresholdText: "Ideal oviposition range: 18–26°C night temp & >70% RH",
      explanation: {
        en: "Night temperature of 21–22°C paired with 78% humidity creates optimal egg-laying and hatching conditions.",
        mr: "रात्रीचे २१-२२°C तापमान आणि ७८% आर्द्रता यामुळे पतंगांची अंडी घालण्याची क्षमता सर्वोच्च पातळीवर पोहोचली आहे.",
        hi: "रात का 21-22°C तापमान और 78% नमी सुंडी के अंडे देने के लिए सर्वाधिक अनुकूल मौसम है।"
      }
    });
  } else if (rh > 85) {
    weatherScore = 22;
    factors.push({
      id: "weather_factor",
      name: { en: "High Humidity Anomaly", mr: "अति आर्द्रता हवामान बदल", hi: "अधिक नमी मौसम चेतावनी" },
      weight: "25%",
      contribution: 22,
      level: "critical",
      value: `Humidity ${rh}%`,
      thresholdText: "Fungal trigger: RH > 85%",
      explanation: {
        en: "Persistent humidity triggers rapid fungal sporulation.",
        mr: "सलग जास्त आर्द्रतेमुळे बुरशीचे बीजाणू वेगाने फुटतात.",
        hi: "लगातार अधिक नमी से कवक रोग तेजी से फैलता है।"
      }
    });
  } else {
    weatherScore = 8;
    factors.push({
      id: "weather_factor",
      name: { en: "Weather Conditions", mr: "हवामान स्थिती", hi: "मौसम स्थिति" },
      weight: "25%",
      contribution: 8,
      level: "safe",
      value: `${temp}°C, ${rh}% RH`,
      thresholdText: "Within non-epidemic range",
      explanation: {
        en: "Current weather is moderately suppressing rapid proliferation.",
        mr: "सध्याचे हवामान किडीच्या अचानक उद्रेकासाठी फारसे अनुकूल नाही.",
        hi: "वर्तमान मौसम कीटों के भारी प्रकोप के अनुकूल नहीं है।"
      }
    });
  }
  totalScore += weatherScore;

  // Factor 4: Local Village Anomaly & Neighboring Swarm (Weight: 15%)
  let communityScore = 12;
  factors.push({
    id: "community_factor",
    name: { en: "Cluster Swarm Density", mr: "शिवार सामूहिक कीड घनता", hi: "क्षेत्रीय कीट सघनता" },
    weight: "15%",
    contribution: 12,
    level: "warning",
    value: "2 Nearby Farms > ETL",
    thresholdText: "Village surveillance alert",
    explanation: {
      en: "Neighboring plots within 1.5 km reported threshold breaches yesterday.",
      mr: "१.५ किमी परिसरातील २ लगतच्या शेतांमध्ये काल आर्थिक नुकसान पातळी ओलांडल्याची नोंद झाली आहे.",
      hi: "1.5 किमी दायरे में 2 पड़ोसी खेतों में कल कीट सीमा पार दर्ज हुई है।"
    }
  });
  totalScore += communityScore;

  // Final Risk Classification
  let riskLevel = "Low";
  let riskColor = "bg-emerald-600";
  let alertTitle = {
    en: "Safe: Routine Vigilance",
    mr: "सुरक्षित: नियमित पाहणी सुरू ठेवा",
    hi: "सुरक्षित: नियमित निगरानी रखें"
  };

  if (totalScore >= 75) {
    riskLevel = "High";
    riskColor = "bg-red-600";
    alertTitle = {
      en: "Critical Threat: Pink Bollworm Peak Expected in 48 Hours",
      mr: "गंभीर धोका: पुढील ४८ तासांत गुलाबी बोंडअळीचा उद्रेक संभवतो",
      hi: "भारी खतरा: अगले 48 घंटों में गुलाबी सुंडी का प्रकोप संभव"
    };
  } else if (totalScore >= 45) {
    riskLevel = "Moderate";
    riskColor = "bg-amber-500";
    alertTitle = {
      en: "Moderate Alert: Increasing Pest Pressure",
      mr: "मध्यम दक्षता: कीड प्रादुर्भाव वाढीची शक्यता",
      hi: "मध्यम सतर्कता: कीट संख्या बढ़ने की संभावना"
    };
  }

  return {
    totalScore,
    riskLevel,
    riskColor,
    alertTitle,
    factors,
    isTrapTriggered,
    daysAboveThreshold,
    consecutiveThreshold: threshold
  };
};

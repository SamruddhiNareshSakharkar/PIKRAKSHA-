export const sampleDiagnoses = [
  {
    id: "sample-pbw",
    crop: "Cotton (कापूस)",
    diseaseName: {
      en: "Pink Bollworm Larval Entry & Rosette Flower",
      mr: "गुलाबी बोंडअळी प्रादुर्भाव व डोमकळी (Rosette Flower)",
      hi: "गुलाबी सुंडी प्रकोप व मुड़ा हुआ फूल (डोमकली)"
    },
    scientificName: "Pectinophora gossypiella",
    confidence: 96.4,
    stage: {
      en: "Stage 2: Early Square & Flower Infestation",
      mr: "दुसरा टप्पा: फुले व कळ्यांमधील प्रादुर्भाव",
      hi: "दूसरा चरण: फूल व कलियों में संक्रमण"
    },
    severity: "High",
    affectedPart: "Flower bud / Young boll",
    symptomsObserved: [
      { en: "Flower petals tied together like a rosette", mr: "फुलांच्या पाकळ्या एकमेकांना चिकटून डोमकळी तयार होणे", hi: "फूल की पंखुड़ियां आपस में चिपक जाना (डोमकली)" },
      { en: "Tiny pinhole with brown excreta at base of boll", mr: "बोंडाच्या देठाजवळ सूक्ष्म छिद्र व विष्टा दिसणे", hi: "डोडे के आधार पर बारीक छेद व मल दिखना" },
      { en: "Premature square and flower shedding", mr: "पात्या आणि कळ्यांची अकाली गळ होणे", hi: "फूलों और कलियों का असमय झड़ना" }
    ],
    safeIPM: [
      { en: "Collect all rosette flowers by hand in a bucket and bury in soil at 1 meter depth.", mr: "सर्व डोमकळ्या हाताने खुडून बादलीत गोळा करा व जमिनीत १ मीटर खोल पुरा.", hi: "सभी डोमकली फूलों को हाथ से तोड़कर जमीन में गहरा दबा दें।" },
      { en: "Check green bolls: pluck 20 bolls from across the field and cut open. If 2 bolls have larvae (>5% ETL), take action.", mr: "२० हिरवी बोंडे फोडून पाहणी करा; २ बोंडांमध्ये अळी आढळल्यास (५% नुकसान) तात्काळ फवारणी करा.", hi: "20 हरे डोडे काटकर देखें; 2 डोडों में सुंडी मिलने पर ही अनुशंसित स्प्रे करें।" },
      { en: "Spray 5% NSKE (Neem Seed Kernel Extract) or Bt spray at 2 ml/litre. Never use uncertified synthetic pyrethroid mixtures.", mr: "५% निंबोळी अर्क किंवा बॅसिलस थुरिन्जिन्सिस (Bt) २ मिली/लीटर फवारा. अनाधिकृत औषध मिश्रणे टाळा.", hi: "5% नीम गिरी अर्क या अनुमोदित जैविक कीटनाशक का प्रयोग करें।" }
    ],
    sampleSvgBg: "linear-gradient(135deg, #2e5939 0%, #17341e 100%)",
    icon: "🌸"
  },
  {
    id: "sample-dm",
    crop: "Grapes (द्राक्ष)",
    diseaseName: {
      en: "Downy Mildew (केवडा रोग)",
      mr: "द्राक्षावरील डाऊनी मिल्ड्यू (केवडा)",
      hi: "अंगूर का डाउनी मिल्ड्यू (केवड़ा)"
    },
    scientificName: "Plasmopara viticola",
    confidence: 94.8,
    stage: {
      en: "Critical: Active Sporulation Phase",
      mr: "गंभीर: बुरशीचे बीजाणू वेगाने पसरत आहेत",
      hi: "गंभीर: कवक बीजाणु तेजी से फैल रहे हैं"
    },
    severity: "High",
    affectedPart: "Lower leaf surface & Young bunch",
    symptomsObserved: [
      { en: "Translucent yellowish oil spots on upper leaf surface", mr: "पानाच्या वरच्या बाजूवर पिवळसर तेलकट डाग", hi: "पत्तियों की ऊपरी सतह पर तेल जैसे पीले धब्बे" },
      { en: "Dense white cottony fungal growth on underside", mr: "पानाच्या खाली पांढऱ्या मऊ कापूससारखी बुरशी", hi: "पत्ती के नीचे सफेद रुई जैसा कवक जाल" },
      { en: "Browning and drying of tender berries", mr: "कोवळे मणी तपकिरी पडून सुकणे", hi: "छोटे अंगूर के दानों का भूरा पड़कर सूखना" }
    ],
    safeIPM: [
      { en: "Improve sunlight penetration by thinning excess shoot growth.", mr: "जास्त वाढलेली फूट काढून झाडात सूर्यप्रकाश व हवा खेळती ठेवा.", hi: "धूप और हवा के लिए अतिरिक्त शाखाओं की छंटाई करें।" },
      { en: "Apply preventive Boardeaux mixture (1%) or NRCG approved systemic fungicide immediately after rains stop.", mr: "पाऊस थांबताच १% बोर्डो मिश्रण किंवा राष्ट्रीय द्राक्ष संशोधन केंद्र शिफारशीत बुरशीनाशक फवारा.", hi: "बारिश रुकते ही 1% बोर्डो मिश्रण या अनुमोदित फफूंदनाशक का छिड़काव करें।" }
    ],
    sampleSvgBg: "linear-gradient(135deg, #3d5a45 0%, #203829 100%)",
    icon: "🍇"
  },
  {
    id: "sample-lb",
    crop: "Tomato (टोमॅटो)",
    diseaseName: {
      en: "Late Blight / Leaf & Fruit Rot (लेट ब्लाईट करपा)",
      mr: "टोमॅटोवरील लेट ब्लाईट करपा रोग",
      hi: "टमाटर का पछेती झुलसा रोग"
    },
    scientificName: "Phytophthora infestans",
    confidence: 97.2,
    stage: {
      en: "Stage 2: Leaf & Petiole Infection",
      mr: "दुसरा टप्पा: पाने व देठांवर प्रादुर्भाव",
      hi: "दूसरा चरण: पत्तियों व तने पर संक्रमण"
    },
    severity: "High",
    affectedPart: "Leaves, Stems and Green fruits",
    symptomsObserved: [
      { en: "Water-soaked dark brown spots enlarging rapidly", mr: "पाण्यासारखे ओलसर तपकिरी-काळे डाग वेगाने पसरणे", hi: "पानी से भीगे हुए काले-भूरे धब्बे तेजी से बढ़ना" },
      { en: "Foul rotting smell and greasy stem lesions", mr: "देठांवर काळे चट्टे व कुजल्यासारखा दुर्गंध", hi: "तने पर काले चकत्ते व दुर्गंधयुक्त सड़ांध" },
      { en: "White mildew ring around spots in morning dew", mr: "सकाळच्या दवामध्ये डागांभोवती पांढरी बुरशी दिसणे", hi: "सुबह की ओस में धब्बों के चारों ओर सफेद फफूंद" }
    ],
    safeIPM: [
      { en: "Prune and destroy all infected foliage immediately; do not leave inside field.", mr: "करपाग्रस्त सर्व पाने खुडून त्वरित जाळून टाका; शेतात टाकू नका.", hi: "संक्रमित पत्तियों को तोड़कर खेत से दूर नष्ट करें।" },
      { en: "Spray Copper Oxychloride 50 WP (2.5 g/litre) or university-certified bio-agent.", mr: "कॉपर ऑक्सिक्लोराईड २.५ ग्रॅम प्रति लिटर किंवा कृषी विद्यापीठ प्रमाणित जैविक बुरशीनाशक फवारा.", hi: "कॉपर ऑक्सीक्लोराइड 2.5 ग्राम प्रति लीटर पानी में मिलाकर स्प्रे करें।" }
    ],
    sampleSvgBg: "linear-gradient(135deg, #613328 0%, #2e1a15 100%)",
    icon: "🍅"
  },
  {
    id: "sample-rust",
    crop: "Soybean (सोयाबीन)",
    diseaseName: {
      en: "Soybean Rust (सोयाबीन तांबेरा)",
      mr: "सोयाबीनवरील तांबेरा रोग (Rust)",
      hi: "सोयाबीन का गेरूई (रस्ट) रोग"
    },
    scientificName: "Phakopsora pachyrhizi",
    confidence: 93.1,
    stage: {
      en: "Early Foliar Pustules",
      mr: "सुरुवातीचे पानांवरील तांबूस पुरळ",
      hi: "शुरुआती पत्तियों पर लाल-भूरे दाने"
    },
    severity: "Moderate",
    affectedPart: "Lower mature leaves",
    symptomsObserved: [
      { en: "Tiny reddish-brown pustules on underside of leaves", mr: "पानांच्या खाली तांबूस-तपकिरी रंगाचे लहान पुरळ", hi: "पत्तियों की निचली सतह पर बारीक लाल-भूरे दाने" },
      { en: "Premature yellowing and leaf defoliation", mr: "पाने पिवळी पडून गळणे", hi: "पत्तियों का पीला पड़कर गिरना" }
    ],
    safeIPM: [
      { en: "Avoid dense plant stand; maintain proper plant-to-plant aeration.", mr: "झाडांची गर्दी टाळून सूर्यप्रकाश तळापर्यंत पोहोचू द्या.", hi: "पौधों में पर्याप्त दूरी व हवा का संचार बनाए रखें।" },
      { en: "Spray Propiconazole or university-recommended bio-fungicide if 3 leaves per plant show pustules.", mr: "प्रति रोप ३ पानांवर पुरळ दिसल्यास कृषी विद्यापीठ शिफारशीत बुरशीनाशक फवारा.", hi: "अनुशंसित फफूंदनाशक का छिड़काव करें।" }
    ],
    sampleSvgBg: "linear-gradient(135deg, #594d27 0%, #2d2613 100%)",
    icon: "🌱"
  },
  {
    id: "sample-healthy",
    crop: "Cotton (कापूस)",
    diseaseName: {
      en: "Healthy Crop Leaf (निरोगी पान)",
      mr: "निरोगी कापूस पीक पान (कोणताही रोग नाही)",
      hi: "स्वस्थ कपास का पत्ता (कोई रोग नहीं)"
    },
    scientificName: "Gossypium hirsutum (Healthy)",
    confidence: 99.1,
    stage: {
      en: "Optimal Vigour - No Pathogen Detected",
      mr: "उत्कृष्ट वाढ - कोणत्याही रोगाचा किंवा किडीचा प्रादुर्भाव नाही",
      hi: "उत्कृष्ट स्वास्थ्य - कोई कीट या रोग नहीं पाया गया"
    },
    severity: "Low",
    affectedPart: "None",
    symptomsObserved: [
      { en: "Uniform green leaf blade with healthy veins", mr: "एकसमान गडद हिरवे पान आणि सुदृढ शिरा", hi: "स्वस्थ एकसमान हरा पत्ता और नसें" },
      { en: "No curling, discoloration or pest marks", mr: "पानावर कोणताही मुरडा, पिवळेपणा किंवा किडीचे डाग नाहीत", hi: "कोई मुड़ाव, पीलापन या कीट के निशान नहीं" }
    ],
    safeIPM: [
      { en: "No spray required! Save your money and protect beneficial ladybird beetles.", mr: "कोणतीही फवारणी करण्याची अजिबात गरज नाही! आपले पैसे वाचवा व मित्रकीटकांचे रक्षण करा.", hi: "किसी भी स्प्रे की जरूरत नहीं! पैसा बचाएं और मित्र कीटों की रक्षा करें।" },
      { en: "Continue weekly pheromone trap monitoring and keep soil nourished.", mr: "दर आठवड्याला कामगंध सापळ्यांची पाहणी सुरू ठेवा.", hi: "साप्ताहिक फेरोमोन ट्रैप निरीक्षण जारी रखें।" }
    ],
    sampleSvgBg: "linear-gradient(135deg, #1c4e28 0%, #0d2814 100%)",
    icon: "🌿"
  }
];


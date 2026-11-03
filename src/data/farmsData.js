export const farmsData = [
  {
    id: "farm-1",
    farmerName: {
      en: "Ramesh Jadhav",
      mr: "रमेश जाधव",
      hi: "रमेश जाधव"
    },
    location: {
      village: { en: "Ner", mr: "नेर", hi: "नेर" },
      district: { en: "Yavatmal", mr: "यवतमाळ", hi: "यवतमाल" },
      zone: "Vidarbha (विदर्भ)"
    },
    crop: {
      name: { en: "Cotton", mr: "कापूस", hi: "कपास" },
      variety: "Bt Cotton (BG-II)",
      acres: 2.5,
      stage: {
        en: "Boll development",
        mr: "बोंड विकास अवस्था",
        hi: "टिंडे/डोडे विकास अवस्था"
      },
      das: 118, // days after sowing
      sowingDate: "2025-06-28"
    },
    weatherStation: "Ner AWS (Mahavedh - Stn ID: 43219)",
    weather: {
      temp: 29.4,
      minTemp: 21.2,
      maxTemp: 32.8,
      humidity: 78,
      rainChance: 25,
      condition: "Partly Cloudy (ढगाळ हवामान)"
    },
    trapData: {
      currentCount: 10,
      threshold: 8,
      consecutiveDaysAbove: 3,
      trapType: "Gossyplure Pheromone Trap (पेक्टिनोफोरा)",
      history: [4, 6, 7, 9, 10, 11, 10] // last 7 days
    },
    primaryAlert: {
      pestName: {
        en: "Pink bollworm",
        mr: "गुलाबी बोंडअळी (Pink Bollworm)",
        hi: "गुलाबी सुंडी (Pink Bollworm)"
      },
      severity: "high",
      peakText: {
        en: "Peak expected Today. Act in the next 48 hours.",
        mr: "आज उच्चांकी धोका संभवतो. पुढील ४८ तासांत तत्काळ उपाययोजना करा.",
        hi: "आज उच्चतम जोखिम अपेक्षित। अगले 48 घंटों में तुरंत कदम उठाएं।"
      },
      trapStatusText: {
        en: "Pheromone trap: Threshold crossed: 8 or more moths per trap for 3 days in a row. Start control as advised by the agriculture department and check bolls today.",
        mr: "कामगंध सापळा: सलग ३ दिवस प्रति सापळा ८ पेक्षा जास्त पतंग आढळले (आज १० पतंग). कृषी विद्यापीठाच्या सल्ल्यानुसार तात्काळ उपाय सुरू करा व आजच बोंडे तपासा.",
        hi: "फेरोमोन ट्रैप: लगातार 3 दिनों तक प्रति ट्रैप 8 या अधिक पतंगे मिले (आज 10 पतंगे)। कृषि विभाग की सलाह के अनुसार नियंत्रण शुरू करें और आज ही डोडे जांचें।"
      },
      audioText: {
        en: "Urgent advisory from Pikraksha for Ramesh Jadhav, Ner, Yavatmal. Pink bollworm trap catch has crossed threshold for three consecutive days with ten moths per trap. Favorable night temperatures of 22 degrees Celsius mean peak egg-laying is active. Inspect twenty green bolls today for larvae. If damage is above 5%, apply recommended university bio-pesticide. Avoid unauthorized chemical cocktails.",
        mr: "पीकरक्षा महत्त्वाची सूचना! नेर, यवतमाळ येथील शेतकरी रमेश जाधव यांच्या कापूस पिकावर सलग तीन दिवस कामगंध सापळ्यात सरासरी १० पतंग अडकले असून नुकसान पातळी ओलांडली आहे. रात्रीचे अनुकूल तापमान २२ अंश असल्याने अंडी घालण्याचे प्रमाण वाढले आहे. आजच एकरी २० हिरवी बोंडे फोडून अळीची पाहणी करा. ५ टक्क्यांपेक्षा जास्त प्रादुर्भाव असल्यास वसंतराव नाईक मराठवाडा कृषी विद्यापीठाने शिफारस केलेले निंबोळी अर्क ५% किंवा जैविक बुरशीनाशक फवारणी करा. अनाधिकृत रासायनिक कॉकटेल टाळा.",
        hi: "पीकरक्षा जरूरी सूचना! नेर, यवतमाल के किसान रमेश जाधव की कपास फसल पर फेरोमोन ट्रैप में लगातार 3 दिनों से 10 पतंगे आ रहे हैं। रात का तापमान 22 डिग्री होने से गुलाबी सुंडी के अंडे देने की संभावना सर्वाधिक है। आज ही 20 हरे डोडों की जांच करें। यदि 5 प्रतिशत से अधिक नुकसान दिखे तो तुरंत कृषि विश्वविद्यालय द्वारा अनुशंसित नीम अर्क अथवा जैव कीटनाशक का छिड़काव करें।"
      }
    },
    threatsSummary: {
      high: 2,
      moderate: 0,
      low: 1
    },
    threatsList: [
      {
        id: "pbw",
        name: {
          en: "Pink bollworm",
          mr: "गुलाबी बोंडअळी",
          hi: "गुलाबी सुंडी"
        },
        desc: {
          en: "Moths are active on warm nights (about 18–26 °C) and lay eggs on flowers and young bolls.",
          mr: "रात्रीचे उबदार तापमान (१८-२६ अंश से.) पतंगांच्या अंडी घालण्यासाठी अत्यंत पोषक असते.",
          hi: "गर्म रातें (18-26 डिग्री) पतंगों की सक्रियता और फूलों पर अंडे देने के लिए अनुकूल हैं।"
        },
        level: "High",
        levelMr: "तीव्र",
        levelHi: "उच्च",
        color: "bg-red-500",
        bars: [1, 1, 1, 1, 1, 0.8, 0.6] // 7-day risk intensity
      },
      {
        id: "wf",
        name: {
          en: "Whitefly & sucking pests",
          mr: "पांढरी माशी व रसशोषक किडी",
          hi: "सफेद मक्खी व रसचूसक कीट"
        },
        desc: {
          en: "Multiply fast in hot, dry spells with no rain to wash them off.",
          mr: "उष्ण आणि कोरड्या हवामानात पाऊस नसल्याने रसशोषक किडींची वेगाने वाढ होते.",
          hi: "गर्म और शुष्क मौसम में बारिश न होने से इनकी संख्या तेजी से बढ़ती है।"
        },
        level: "High",
        levelMr: "तीव्र",
        levelHi: "उच्च",
        color: "bg-red-500",
        bars: [1, 1, 0.9, 0.7, 0.4, 0.2, 0.1]
      },
      {
        id: "gm",
        name: {
          en: "Grey mildew & leaf spot",
          mr: "दहिया रोग व पानावरील ठिपके",
          hi: "दहिया रोग व पत्तियों पर धब्बे"
        },
        desc: {
          en: "Spreads in humid weather (above 82% RH) with rain or dew at 22–30 °C.",
          mr: "हवेतील आर्द्रता ८२% पेक्षा जास्त आणि दव पडल्यास दहिया रोगाचा प्रादुर्भाव होतो.",
          hi: "82% से अधिक नमी और ओस पड़ने पर यह कवक रोग फैलता है।"
        },
        level: "Low",
        levelMr: "कमी",
        levelHi: "कम",
        color: "bg-emerald-500",
        bars: [0.1, 0.1, 0.1, 0.15, 0.1, 0.1, 0.1]
      }
    ],
    ipmSteps: [
      {
        en: "Install pheromone traps (5 per hectare) and record catches daily.",
        mr: "प्रति हेक्टरी ५ कामगंध सापळे लावा आणि दररोज अडकलेल्या पतंगांची नोंद ठेवा.",
        hi: "प्रति हेक्टेयर 5 फेरोमोन ट्रैप लगाएं और प्रतिदिन पकड़े गए पतंगों की गिनती करें।"
      },
      {
        en: "Pick and destroy rosette flowers (डोमकळ्या) and damaged dropped bolls.",
        mr: "प्रादुर्भावग्रस्त डोमकळ्या (गुलाबी बोंडअळीमुळे मिटलेली फुले) व गळलेली बोंडे तोडून नष्ट करा.",
        hi: "गुलाबी सुंडी से ग्रसित डोमकली (मुड़े हुए फूल) और गिरे हुए डोडे तोड़कर नष्ट करें।"
      },
      {
        en: "Check 20 green bolls per acre each week for internal white or pink larvae.",
        mr: "दर आठवड्याला एकरी २० हिरवी बोंडे फोडून आतील पांढऱ्या किंवा गुलाबी अळीचे अस्तित्व तपासा.",
        hi: "प्रत्येक सप्ताह प्रति एकड़ 20 हरे डोडे तोड़कर अंदर सुंडी की जांच करें।"
      },
      {
        en: "If infestation exceeds 5% damaged bolls, spray 5% Neem seed kernel extract (NSKE) or university-recommended biopesticide.",
        mr: "नुकसान ५% पेक्षा जास्त आढळल्यास ५% निंबोळी अर्क (NSKE) किंवा विद्यापीठ शिफारशीत जैविक कीटकनाशक फवारा.",
        hi: "नुकसान 5% से अधिक होने पर 5% नीम गिरी अर्क (NSKE) या अनुमोदित जैविक कीटनाशक का छिड़काव करें।"
      }
    ]
  },
  {
    id: "farm-2",
    farmerName: {
      en: "Sopanrao Patil",
      mr: "सोपानराव पाटील",
      hi: "सोपानराव पाटिल"
    },
    location: {
      village: { en: "Dindori", mr: "दिंडोरी", hi: "दिंडोरी" },
      district: { en: "Nashik", mr: "नाशिक", hi: "नासिक" },
      zone: "North Maharashtra (उत्तर महाराष्ट्र)"
    },
    crop: {
      name: { en: "Grapes (Thompson Seedless)", mr: "द्राक्ष (थॉमसन सीडलेस)", hi: "अंगूर (थॉमसन)" },
      variety: "Export Quality Table Grapes",
      acres: 3.0,
      stage: {
        en: "Berry elongation & canopy development",
        mr: "मणी वाढ व घड विकास अवस्था",
        hi: "अंगूर का आकार बढ़ना व गुच्छा विकास"
      },
      das: 65,
      sowingDate: "2025-10-15"
    },
    weatherStation: "Dindori AWS (Mahavedh - Stn ID: 22104)",
    weather: {
      temp: 24.2,
      minTemp: 16.5,
      maxTemp: 28.0,
      humidity: 89,
      rainChance: 70,
      condition: "Unseasonal Showers (अवेळी पाऊस)"
    },
    trapData: {
      currentCount: 3,
      threshold: 12,
      consecutiveDaysAbove: 0,
      trapType: "Flea Beetle Sticky Traps (उदबत्त्या)",
      history: [1, 2, 2, 3, 2, 3, 3]
    },
    primaryAlert: {
      pestName: {
        en: "Downy Mildew (डाऊनी मिल्ड्यू / केवडा)",
        mr: "डाऊनी मिल्ड्यू (केवडा रोग)",
        hi: "डाउनी मिल्ड्यू (केवड़ा रोग)"
      },
      severity: "high",
      peakText: {
        en: "Severe Threat: Unseasonal rains & >85% humidity. Spores germinate in 4 hours.",
        mr: "अतिधोका: अवेळी पाऊस आणि हवेत ८९% आर्द्रता. पुढील ४ तासांत बुरशीचा प्रसार वाढू शकतो.",
        hi: "गंभीर चेतावनी: बेमौसम बारिश और 85% से अधिक नमी। 4 घंटे में कवक का संक्रमण संभव।"
      },
      trapStatusText: {
        en: "Weather-disease model trigger: Continuous leaf wetness >6 hours with temperature between 18-24°C satisfies 10-10-10 rule. Immediate preventive canopy protection advised.",
        mr: "हवामान-रोग मॉडेल सूचना: पाने ६ तासांपेक्षा जास्त वेळ ओले राहणे आणि तापमान १८-२४ अंश राहिल्याने १०-१०-१० नियमानुसार प्रादुर्भावाची शक्यता अतिशय दाट आहे.",
        hi: "मौसम-रोग मॉडल चेतावनी: पत्तियां 6 घंटे से अधिक गीली रहने पर डाउनी मिल्ड्यू का संक्रमण बढ़ता है। तुरंत छत्र सुरक्षा उपाय करें।"
      },
      audioText: {
        en: "Warning for Sopanrao Patil, Dindori, Nashik. Due to sudden unseasonal rain and high humidity of 89%, your grape orchard is under severe downy mildew risk. Check underside of leaves for oil spots and white fungal down. Ensure drainage in the vineyard and apply National Research Centre for Grapes approved copper or systemic bio-fungicide immediately after rain stops.",
        mr: "सोपानराव पाटील, दिंडोरी नाशिक यांच्यासाठी सावधानतेचा इशारा! अवेळी पाऊस आणि हवेतील ८९% आर्द्रतेमुळे द्राक्ष बागेवर डाऊनी मिल्ड्यू (केवडा) रोगाचा प्रचंड धोका निर्माण झाला आहे. पानांच्या मागच्या बाजूला तेलकट ठिपके आणि पांढरी बुरशी तपासा. बागेतून पाण्याचा निचरा करा व पाऊस थांबताच राष्ट्रीय द्राक्ष संशोधन केंद्र (NRCG) शिफारशीत संरक्षक बुरशीनाशक फवारा.",
        hi: "सोपानराव पाटिल, दिंडोरी नासिक के लिए जरूरी चेतावनी! बेमौसम बारिश और 89% नमी के कारण अंगूर की फसल पर डाउनी मिल्ड्यू रोग का बड़ा खतरा है। पत्तियों की निचली सतह पर तेल जैसे धब्बे जांचें। बारिश रुकते ही अनुशंसित फफूंदनाशक का स्प्रे करें।"
      }
    },
    threatsSummary: {
      high: 2,
      moderate: 1,
      low: 0
    },
    threatsList: [
      {
        id: "dm",
        name: {
          en: "Downy Mildew",
          mr: "डाऊनी मिल्ड्यू (केवडा)",
          hi: "डाउनी मिल्ड्यू"
        },
        desc: {
          en: "Leaf wetness >6 hours at 18–24 °C causes catastrophic oil spots and berry drop.",
          mr: "पाने ६ तास ओले राहिल्यास व तापमान १८-२४ अंश असल्यास तेलकट डाग पडून घड कुजतात.",
          hi: "पत्तियों के गीले रहने से तेल के धब्बे बनते हैं और फल झड़ने लगते हैं।"
        },
        level: "High",
        levelMr: "तीव्र",
        levelHi: "उच्च",
        color: "bg-red-500",
        bars: [1, 1, 1, 0.9, 0.7, 0.5, 0.3]
      },
      {
        id: "pm",
        name: {
          en: "Powdery Mildew (भुरी)",
          mr: "भुरी रोग (Powdery Mildew)",
          hi: "चूर्णिल आसिता (भूरी रोग)"
        },
        desc: {
          en: "Favored by cloudy weather and dry-warm microclimates.",
          mr: "ढगाळ हवामानात पानांवर पांढऱ्या राखेसारखी बुरशी पसरते.",
          hi: "बादल छाए रहने पर पत्तियों पर सफेद पाउडर जैसा कवक फैलता है।"
        },
        level: "High",
        levelMr: "तीव्र",
        levelHi: "उच्च",
        color: "bg-red-500",
        bars: [0.8, 0.9, 1, 1, 0.8, 0.6, 0.5]
      },
      {
        id: "thrips",
        name: {
          en: "Thrips & Berry Scratches",
          mr: "थ्रीप्स (फुलकिडे)",
          hi: "थ्रिप्स (फूल कीट)"
        },
        desc: {
          en: "Scratch young tender berries causing corky russeting.",
          mr: "कोवळ्या मण्यांवर ओरखडे पाडल्यामुळे मण्यांवर खपली पडते.",
          hi: "कोमल अंगूरों को खुरचकर फलों की गुणवत्ता खराब करते हैं।"
        },
        level: "Moderate",
        levelMr: "मध्यम",
        levelHi: "मध्यम",
        color: "bg-amber-500",
        bars: [0.4, 0.4, 0.5, 0.4, 0.3, 0.2, 0.2]
      }
    ],
    ipmSteps: [
      {
        en: "Ensure rapid water drainage from trenches and avoid water stagnation near root zones.",
        mr: "द्राक्ष बागेतील चर मोकळे करून पाण्याचा तातडीने निचरा करा; खोडाजवळ पाणी साचू देऊ नका.",
        hi: "खेत से जल निकासी तुरंत सुनिश्चित करें और तने के पास पानी न जमने दें।"
      },
      {
        en: "Remove dense interior canopy leaves to improve aeration and accelerate leaf drying.",
        mr: "घडांमधील गर्दी कमी करण्यासाठी आतील अतिरिक्त पाने काढून सूर्यप्रकाश व हवा खेळती ठेवा.",
        hi: "हवा और धूप के लिए अतिरिक्त पत्तों की छंटाई करें ताकि पत्ते जल्दी सूखें।"
      },
      {
        en: "Spray NRCG-recommended preventive bio-agent (Trichoderma harzianum) or Boardeaux mixture once foliage dries.",
        mr: "पाने कोरडी झाल्यावर ट्रायकोडर्मा किंवा राष्ट्रीय द्राक्ष संशोधन केंद्र शिफारशीत बोर्डो मिश्रण फवारा.",
        hi: "पत्ते सूखने के बाद ट्राइकोडर्मा या अनुशंसित बोर्डो मिश्रण का छिड़काव करें।"
      }
    ]
  },
  {
    id: "farm-3",
    farmerName: {
      en: "Sunita Deshmukh",
      mr: "सुनिता देशमुख",
      hi: "सुनीता देशमुख"
    },
    location: {
      village: { en: "Ausa", mr: "औसा", hi: "औसा" },
      district: { en: "Latur", mr: "लातूर", hi: "लातूर" },
      zone: "Marathwada (मराठवाडा)"
    },
    crop: {
      name: { en: "Soybean (JS 335)", mr: "सोयाबीन (जे.एस. ३३५)", hi: "सोयाबीन (JS 335)" },
      variety: "Certified Seed Production",
      acres: 4.0,
      stage: {
        en: "Pod filling & maturation",
        mr: "शेंगा भरण्याची व पक्वतेची अवस्था",
        hi: "फली दाना भरने की अवस्था"
      },
      das: 76,
      sowingDate: "2025-07-04"
    },
    weatherStation: "Ausa AWS (Mahavedh - Stn ID: 31089)",
    weather: {
      temp: 31.0,
      minTemp: 22.0,
      maxTemp: 33.5,
      humidity: 62,
      rainChance: 10,
      condition: "Clear Sky & Moderate Breeze"
    },
    trapData: {
      currentCount: 5,
      threshold: 8,
      consecutiveDaysAbove: 0,
      trapType: "Spodolure Trap (लष्करी अळी)",
      history: [3, 4, 4, 5, 5, 4, 5]
    },
    primaryAlert: {
      pestName: {
        en: "Soybean Rust & Pod Borer (तांबेरा व शेंग पोखरणाऱ्या अळ्या)",
        mr: "सोयाबीन तांबेरा व शेंगा पोखरणारी अळी",
        hi: "सोयाबीन गेरूई (रस्ट) व फली छेदक"
      },
      severity: "moderate",
      peakText: {
        en: "Moderate Alert: Rising Spodoptera moth activity. Pod stage is vulnerable.",
        mr: "मध्यम दक्षता: लष्करी अळीच्या पतंगांची हालचाल सुरू आहे. शेंगा भरताना काळजी घ्या.",
        hi: "मध्यम सतर्कता: फली बनने के समय सुंडी के प्रकोप की संभावना है।"
      },
      trapStatusText: {
        en: "Traps show 5 moths/day (Threshold: 8). Not crossed yet. Continue manual scouting and maintain bird perches.",
        mr: "कामगंध सापळ्यात ५ पतंग आढळले आहेत (नुकसान पातळी: ८). सध्या फवारणीची गरज नाही. पक्षी थांबे उभारा.",
        hi: "ट्रैप में 5 पतंगे मिले हैं (क्षति सीमा: 8)। अभी कीटनाशक स्प्रे की जरूरत नहीं है। पक्षी बसेरे लगाएं।"
      },
      audioText: {
        en: "Advisory for Sunita Deshmukh, Ausa, Latur. Your soybean crop is in the pod formation stage. Trap counts are currently safe below threshold. Install 10 T-shaped bird perches per acre so birds can feed on larvae naturally. Avoid chemical sprays until scouting exceeds 5% damaged pods.",
        mr: "शेतकरी सुनिता देशमुख, औसा, लातूर यांच्यासाठी सल्ला! आपले सोयाबीन पीक सध्या शेंगा भरण्याच्या अवस्थेत आहे. कामगंध सापळ्यातील संख्या सध्या सुरक्षित मर्यादेत आहे. रासायनिक फवारणी न करता एकरी १० 'टी' आकाराचे पक्षी थांबे लावा जेणेकरून पक्षी अळ्या वेचून खातील. शेतात नियमित पाहणी सुरू ठेवा.",
        hi: "सुनीता देशमुख, औसा लातूर के लिए सलाह! आपकी सोयाबीन फसल में दाने भर रहे हैं। अभी कीट संख्या नियंत्रण में है। खेत में टी-आकार के 10 पक्षी अड्डे लगाएं जिससे पक्षी प्राकृतिक रूप से कीड़े खा सकें। अनावश्यक कीटनाशक से बचें।"
      }
    },
    threatsSummary: {
      high: 0,
      moderate: 2,
      low: 1
    },
    threatsList: [
      {
        id: "spodo",
        name: {
          en: "Spodoptera litura (लष्करी अळी)",
          mr: "तंबाखूवरील लष्करी अळी",
          hi: "तम्बाकू की इल्ली"
        },
        desc: {
          en: "Larvae feed gregariously on foliage and young pods during night hours.",
          mr: "अळ्या रात्रीच्या वेळी पानांच्या खाली राहून पाने व कोवळ्या शेंगा कुरतडतात.",
          hi: "सुंडी रात में पत्तों और फलियों को नुकसान पहुंचाती है।"
        },
        level: "Moderate",
        levelMr: "मध्यम",
        levelHi: "मध्यम",
        color: "bg-amber-500",
        bars: [0.4, 0.4, 0.5, 0.5, 0.4, 0.3, 0.3]
      },
      {
        id: "rust",
        name: {
          en: "Soybean Rust (तांबेरा)",
          mr: "तांबेरा रोग (Rust)",
          hi: "सोयाबीन रस्ट (गेरूई)"
        },
        desc: {
          en: "Brownish-red pustules on the lower surface of leaves under intermittent humidity.",
          mr: "पानांच्या खाली तांबूस रंगाचे पुरळ येतात व पाने पिवळी पडून गळतात.",
          hi: "पत्तियों के नीचे भूरे-लाल धब्बे बनते हैं और पत्ते झड़ते हैं।"
        },
        level: "Moderate",
        levelMr: "मध्यम",
        levelHi: "मध्यम",
        color: "bg-amber-500",
        bars: [0.3, 0.4, 0.4, 0.5, 0.4, 0.3, 0.2]
      },
      {
        id: "girdle",
        name: {
          en: "Girdle Beetle (चक्री भुंगा)",
          mr: "चक्री भुंगा (Girdle Beetle)",
          hi: "चक्र भृंग (गर्डल बीटल)"
        },
        desc: {
          en: "Adult cuts rings on the stem; wilted petiole is the early sign.",
          mr: "फांदीवर दोन बांगडीसारखे काप पाडल्यामुळे पुढील भाग सुकतो.",
          hi: "तने पर छल्लेदार कट लगाता है जिससे शाखा सूख जाती है।"
        },
        level: "Low",
        levelMr: "कमी",
        levelHi: "कम",
        color: "bg-emerald-500",
        bars: [0.2, 0.2, 0.2, 0.1, 0.1, 0.1, 0.1]
      }
    ],
    ipmSteps: [
      {
        en: "Erect 10 T-shaped bird perches (पक्षी थांबे) per acre to invite insectivorous birds.",
        mr: "किडींवर उपजीविका करणाऱ्या पक्षांसाठी शेतात एकरी १० 'टी' आकाराचे लाकडी पक्षी थांबे उभारा.",
        hi: "खेत में प्रति एकड़ 10 टी-आकार के पक्षी बसेरे लगाएं ताकि पक्षी कीड़े चुन सकें।"
      },
      {
        en: "Collect and destroy egg masses and gregarious early instar larvae in plastic bags.",
        mr: "पानांच्या मागच्या बाजूला आढळणारे अंड्यांचे पुंजके व लहान अळ्या पाने तोडून गोळा करून नष्ट करा.",
        hi: "पत्तों पर दिखने वाले अंडों के गुच्छे व छोटी इल्लियों को तोड़कर नष्ट करें।"
      },
      {
        en: "Spray Nomuraea rileyi or Beauveria bassiana bio-fungicide if larval population rises.",
        mr: "अळ्यांचे प्रमाण वाढल्यास बिव्हेरिया बॅसियाना किंवा नोमुरिया रिलेई या जैविक बुरशीची फवारणी करा.",
        hi: "इल्ली की संख्या बढ़ने पर ब्युवेरिया बेसियाना जैव-कवक का छिड़काव करें।"
      }
    ]
  },
  {
    id: "farm-4",
    farmerName: {
      en: "Dnyaneshwar Shinde",
      mr: "ज्ञानेश्वर शिंदे",
      hi: "ज्ञानेश्वर शिंदे"
    },
    location: {
      village: { en: "Junnar", mr: "जुन्नर", hi: "जुन्नर" },
      district: { en: "Pune", mr: "पुणे", hi: "पुणे" },
      zone: "Western Maharashtra (पश्चिम महाराष्ट्र)"
    },
    crop: {
      name: { en: "Tomato (Abhinav)", mr: "टोमॅटो (अभिनव)", hi: "टमाटर (अभिनव)" },
      variety: "Hybrid Staked Tomato",
      acres: 1.5,
      stage: {
        en: "Flowering & early fruit setting",
        mr: "फुलधारणा व लहान फळे धरण्याची अवस्था",
        hi: "फूल आना व छोटे फल बनने की अवस्था"
      },
      das: 48,
      sowingDate: "2025-09-12"
    },
    weatherStation: "Narayangaon AWS (Mahavedh - Stn ID: 19821)",
    weather: {
      temp: 23.5,
      minTemp: 17.0,
      maxTemp: 27.2,
      humidity: 86,
      rainChance: 65,
      condition: "Continuous Fog & Drizzle (धुके व बारीक पाऊस)"
    },
    trapData: {
      currentCount: 14,
      threshold: 10,
      consecutiveDaysAbove: 2,
      trapType: "Tuta Absoluta Pheromone Trap (टोमॅटो पिनवॉर्म)",
      history: [6, 8, 9, 11, 13, 14, 14]
    },
    primaryAlert: {
      pestName: {
        en: "Late Blight & Pinworm (करपा रोग व पिनवॉर्म)",
        mr: "लेट ब्लाईट (करपा रोग) व पिनवॉर्म",
        hi: "पछेती झुलसा (लेट ब्लाइट) व पिनवॉर्म"
      },
      severity: "high",
      peakText: {
        en: "Critical Alert: High humidity (>85%) and 18-22°C trigger Late Blight rot within 48h.",
        mr: "अतिदक्षता: धुके व थंड-दमट हवामानामुळे करपा रोग फळांवर पसरण्याची दाट शक्यता.",
        hi: "अति संवेदनशील: कोहरा और नमी के कारण 48 घंटे में झुलसा रोग तेजी से फैल सकता है।"
      },
      trapStatusText: {
        en: "Pinworm trap count is 14 moths/trap (Threshold: 10). Immediate IPM canopy inspection required.",
        mr: "पिनवॉर्म सापळ्यात १४ पतंग आढळले आहेत (मर्यादा: १०). पानांमधील भुयारे व फळांवरील छिद्रे तपासा.",
        hi: "पिनवॉर्म ट्रैप में 14 पतंगे मिले हैं (क्षति सीमा: 10)। तुरंत फसल का निरीक्षण करें।"
      },
      audioText: {
        en: "Critical warning for Dnyaneshwar Shinde in Junnar, Pune. High humidity and cool fog in Narayangaon region are triggering tomato late blight. Look for brown water-soaked blotches on leaves and dark greasy spots on stems. Apply university-approved copper hydroxide or systemic fungicide immediately to prevent fruit rotting.",
        mr: "ज्ञानेश्वर शिंदे, जुन्नर पुणे यांच्यासाठी तातडीची सूचना! जुन्नर परिसरातील धुके आणि ८६% आर्द्रतेमुळे टोमॅटो पिकावर करपा (लेट ब्लाईट) रोगाचा प्रादुर्भाव सुरू झाला आहे. पानांवर काळपट पाणथळ डाग तपासा. फळांना कुजण्यापासून वाचवण्यासाठी महात्मा फुले कृषी विद्यापीठ शिफारशीत कॉपर हायड्रॉक्साइड किंवा जैविक संरक्षक बुरशीनाशक त्वरित फवारा.",
        hi: "ज्ञानेश्वर शिंदे, जुन्नर पुणे के लिए चेतावनी! कोहरा और अधिक नमी से टमाटर पर पछेती झुलसा का खतरा है। पत्तियों और तने पर भूरे धब्बे देखें। तुरंत अनुमोदित सुरक्षात्मक फफूंदनाशक का छिड़काव करें।"
      }
    },
    threatsSummary: {
      high: 2,
      moderate: 1,
      low: 0
    },
    threatsList: [
      {
        id: "lblight",
        name: {
          en: "Late Blight (लेट ब्लाईट करपा)",
          mr: "लेट ब्लाईट करपा",
          hi: "पछेती झुलसा रोग"
        },
        desc: {
          en: "Water-soaked lesions turning dark brown with white mildew on leaf margins.",
          mr: "पानांवर काळपट जळाल्यासारखे डाग पडून फळे डागाळतात व सडतात.",
          hi: "पत्तियों पर पानी जैसे धब्बे जो काले पड़ जाते हैं और फल सड़ने लगते हैं।"
        },
        level: "High",
        levelMr: "तीव्र",
        levelHi: "उच्च",
        color: "bg-red-500",
        bars: [1, 1, 1, 0.9, 0.8, 0.6, 0.4]
      },
      {
        id: "pinworm",
        name: {
          en: "Tuta absoluta / Pinworm (पिनवॉर्म)",
          mr: "टोमॅटो पिनवॉर्म (टुटा)",
          hi: "टमाटर पिनवॉर्म"
        },
        desc: {
          en: "Caterpillars mine blotches inside leaves and burrow pinholes into fruits.",
          mr: "अळ्या पानाच्या आत राहून हिरवा भाग खातात आणि फळांना छिद्रे पाडतात.",
          hi: "सुंडी पत्तियों के अंदर सुरंग बनाती है और फलों में बारीक छेद करती है।"
        },
        level: "High",
        levelMr: "तीव्र",
        levelHi: "उच्च",
        color: "bg-red-500",
        bars: [0.9, 1, 1, 0.9, 0.7, 0.5, 0.4]
      },
      {
        id: "eblight",
        name: {
          en: "Early Blight (अल्टरनेरिया करपा)",
          mr: "अल्टरनेरिया करपा (Early Blight)",
          hi: "अगेती झुलसा"
        },
        desc: {
          en: "Concentric target-board rings on older lower leaves.",
          mr: "खालच्या जुन्या पानांवर चक्राकार रिंगसारखे तपकिरी ठिपके येतात.",
          hi: "निचली पत्तियों पर गोल छल्लेदार भूरे धब्बे बनते हैं।"
        },
        level: "Moderate",
        levelMr: "मध्यम",
        levelHi: "मध्यम",
        color: "bg-amber-500",
        bars: [0.5, 0.5, 0.6, 0.5, 0.4, 0.3, 0.3]
      }
    ],
    ipmSteps: [
      {
        en: "Remove and burn severely infected bottom leaves showing greasy black patches.",
        mr: "जमिनीलगतची करपाग्रस्त काळी पडलेली खालची पाने खुडून शेताबाहेर नेऊन जाळा.",
        hi: "झुलसा रोग से ग्रसित निचली पत्तियों को तोड़कर खेत से दूर नष्ट करें।"
      },
      {
        en: "Maintain clean weed-free bunds and tighten tomato staking wires to prevent soil contact.",
        mr: "बांधावरील तण काढा आणि झाडांचा जमिनीशी संपर्क टाळण्यासाठी तारा घट्ट बांधून आधार द्या.",
        hi: "पौधों को सहारा देकर जमीन से ऊपर रखें ताकि फल मिट्टी के संपर्क में न आएं।"
      },
      {
        en: "Install 16 yellow sticky traps and 6 Tuta pheromone traps per acre.",
        mr: "एकरी १६ पिवळे चिकट सापळे आणि ६ टुटा कामगंध सापळे त्वरित शेतात लावा.",
        hi: "प्रति एकड़ 16 पीले चिपचिपे जाल और 6 टुटा फेरोमोन ट्रैप लगाएं।"
      }
    ]
  }
];


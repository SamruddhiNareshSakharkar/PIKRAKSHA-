// Daily Farmer Action Plan Generator for PIKRAKSHA
// Generates prioritized, IPM-compliant daily task checklists based on crop type & live risk

export const generateDailyActionPlan = (farm = {}, riskAnalysis = {}) => {
  const isHighRisk = (riskAnalysis?.totalScore || 0) >= 70;
  
  const cropStr = typeof farm.crop?.name === 'object'
    ? (farm.crop?.name?.en || 'Cotton')
    : (farm.crop?.name || 'Cotton');

  const isGrapes = cropStr.toLowerCase().includes('grape') || cropStr.toLowerCase().includes('द्राक्ष');
  const isTomato = cropStr.toLowerCase().includes('tomato') || cropStr.toLowerCase().includes('टोमॅटो');
  const isSoybean = cropStr.toLowerCase().includes('soybean') || cropStr.toLowerCase().includes('सोयाबीन');

  if (isGrapes) {
    return [
      {
        id: "task_g1",
        title: {
          en: "Scout 20 vine leaf undersides for white downy mildew cottony growth",
          mr: "द्राक्षाच्या २० पानांच्या खालील बाजूस पांढरी केवडा (डाऊनी) बुरशी तपासा",
          hi: "अंगूर के 20 पत्तों के नीचे सफेद डाउनी मिल्ड्यू कवक की जांच करें"
        },
        priority: "high",
        category: "Scouting",
        timeEstimate: "30 mins",
        completed: false,
        reason: {
          en: "Morning humidity above 85% accelerates downy mildew sporangia eruption.",
          mr: "सकाळची आर्द्रता ८५% पेक्षा जास्त असल्याने डाऊनी मिल्ड्यूचे बीजाणू वेगाने फुटतात.",
          hi: "सुबह की अधिक आर्द्रता फफूंद प्रसार को तेज करती है।"
        }
      },
      {
        id: "task_g2",
        title: {
          en: "Thin dense interior shoot canopy to increase aeration & sunlight",
          mr: "घडांमधील गर्दी कमी करण्यासाठी excess पाने व फुटी काढून हवा खेळती ठेवा",
          hi: "धूप व हवा के लिए अंगूर के गुच्छों के आसपास अतिरिक्त पत्तियां हटाएं"
        },
        priority: "medium",
        category: "Cultural IPM",
        timeEstimate: "45 mins",
        completed: true,
        reason: {
          en: "Rapid leaf drying prevents fungal zoospores from swimming into stomata.",
          mr: "पाने लवकर सुकल्यास बुरशीच्या बीजाणूंना पानात शिरकाव करता येत नाही.",
          hi: "पत्तियां जल्दी सूखने से कवक संक्रमण रुकता है।"
        }
      },
      {
        id: "task_g3",
        title: {
          en: "Prepare & spray 1% fresh Bordeaux mixture before rainfall window",
          mr: "पाऊस सुरू होण्यापूर्वी १% ताजे बोर्डो मिश्रण तयार करून फवारा",
          hi: "बारिश से पहले 1% ताजा बोर्डो मिश्रण तैयार करके छिड़कें"
        },
        priority: isHighRisk ? "high" : "medium",
        category: "Bio-Fungicide",
        timeEstimate: "40 mins",
        completed: false,
        reason: {
          en: "Neutralized copper forms a protective barrier on berries and leaves.",
          mr: "मोरचूद व चुन्याचे मिश्रण मणी व पानांवर संरक्षणात्मक थर तयार करते.",
          hi: "कॉपर का घोल पत्तियों पर सुरक्षात्मक परत बनाता है।"
        }
      },
      {
        id: "task_g4",
        title: {
          en: "Inspect bunch clusters for Mealybug honeydew secretion",
          mr: "घडांच्या आतील बाजूला पिठ्या ढेकणाचा (Mealybug) चिकट थर तपासा",
          hi: "गुच्छों के अंदर मिलीबग का चिपचिपा स्राव जांचें"
        },
        priority: "medium",
        category: "Pest Scouting",
        timeEstimate: "20 mins",
        completed: false,
        reason: {
          en: "Early spot application of Cryptolaemus ladybird predators stops bunch sooty mold.",
          mr: "वेळेवर लेडीबर्ड भुंगेरे सोडल्यास घडांवर काजळी बुरशी येत नाही.",
          hi: "समय पर जैविक परभक्षी कीट छोड़ने से फल सुरक्षित रहते हैं।"
        }
      },
      {
        id: "task_g5",
        title: {
          en: "Verify Delta-T spray safety window before evening application",
          mr: "संध्याकाळच्या फवारणीपूर्वी डेल्टा-T अनुकूल वेळ (४.० ते ६.०) तपासा",
          hi: "शाम के छिड़काव से पहले डेल्टा-T उपयुक्त समय जांचें"
        },
        priority: "low",
        category: "Weather Compliance",
        timeEstimate: "5 mins",
        completed: false,
        reason: {
          en: "Prevents droplet chemical drift and protects foraging bees.",
          mr: "औषधाची वाफ होऊन हवेत उडून जाणे थांबते व मधमाश्यांचे रक्षण होते.",
          hi: "दवा का वाष्पीकरण रुकता है और मधुमक्खियां सुरक्षित रहती हैं।"
        }
      }
    ];
  }

  if (isTomato) {
    return [
      {
        id: "task_t1",
        title: {
          en: "Inspect lower foliage and green fruit for water-soaked Late Blight spots",
          mr: "खालची पाने व हिरव्या टोमॅटोवर काळपट तेलकट करपा डाग तपासा",
          hi: "निचली पत्तियों और हरे फलों पर पछेती झुलसा के काले धब्बे जांचें"
        },
        priority: "high",
        category: "Scouting",
        timeEstimate: "25 mins",
        completed: false,
        reason: {
          en: "Late blight (Phytophthora) can rot an entire tomato acre in 48 hours in cool fog.",
          mr: "थंड धुके व पावसात लेट ब्लाईट ४८ तासांत संपूर्ण टोमॅटो पीक काळे पाडू शकतो.",
          hi: "ठंडे कोहरे में लेट ब्लाइट 48 घंटे में पूरी फसल सड़ा सकता है।"
        }
      },
      {
        id: "task_t2",
        title: {
          en: "Check Tuta absoluta (Pinworm) pheromone trap moth count",
          mr: "टोमॅटो पिनवर्म (तुटा) कामगंध सापळ्यातील पतंगांची संख्या मोजा",
          hi: "टमाटर पिनवर्म फेरोमोन ट्रैप में पकड़े गए पतंगों की गिनती करें"
        },
        priority: "high",
        category: "Traps",
        timeEstimate: "10 mins",
        completed: true,
        reason: {
          en: "If catch crosses 10 moths/trap/day, deploy bio-pesticide spray immediately.",
          mr: "१० पेक्षा जास्त पतंग आढळल्यास त्वरित जैविक नियंत्रणाची फवारणी आवश्यक.",
          hi: "10 से अधिक पतंग मिलने पर तत्काल जैविक नियंत्रण आवश्यक है।"
        }
      },
      {
        id: "task_t3",
        title: {
          en: "Clear standing irrigation water from raised bed drainage furrows",
          mr: "गादीवाफ्यांमधील चरींमधून साचलेले पाणी त्वरित बाहेर काढून निचरा करा",
          hi: "क्यारियों की नालियों से जमा हुआ पानी बाहर निकालकर जल निकासी करें"
        },
        priority: "high",
        category: "Cultural IPM",
        timeEstimate: "35 mins",
        completed: false,
        reason: {
          en: "Waterlogged roots release moisture that multiplies fungal rot spores.",
          mr: "मुळांशी साचलेले पाणी बुरशीवाढीस आमंत्रण देते; कोरड्या जमिनीमुळे करपा रोखला जातो.",
          hi: "जड़ों के पास जलभराव फफूंद प्रसार बढ़ाता है, निकासी जरूरी है।"
        }
      },
      {
        id: "task_t4",
        title: {
          en: "Spray Copper Hydroxide (2.5g/L) or Trichoderma bio-agent on stems",
          mr: "खोडांवर व पानांवर कॉपर हायड्रॉक्साइड (२.५ ग्रॅ/लि) किंवा ट्रायकोडर्मा फवारा",
          hi: "तनों और पत्तियों पर कॉपर हाइड्रोक्साइड या ट्राइकोडर्मा छिड़कें"
        },
        priority: isHighRisk ? "high" : "medium",
        category: "Bio-Fungicide",
        timeEstimate: "30 mins",
        completed: false,
        reason: {
          en: "Arrests stem blackening and protects developing green tomatoes.",
          mr: "खोडांना काळे डाग पडणे थांबवते आणि फळांचे रक्षण करते.",
          hi: "तने को काला पड़ने से रोकता है और फलों की रक्षा करता है।"
        }
      },
      {
        id: "task_t5",
        title: {
          en: "Tie loose heavy fruit branches securely to bamboo staking trellis",
          mr: "फळांनी वाकलेल्या टोमॅटोच्या फांद्या बांबू व सुतळीने वर बांधा",
          hi: "फलों से लदी शाखाओं को बांस के सहारे ऊपर बांधें"
        },
        priority: "medium",
        category: "Mechanical IPM",
        timeEstimate: "30 mins",
        completed: false,
        reason: {
          en: "Fruit touching wet soil immediately catches secondary soil-borne rot.",
          mr: "फळे ओली माती लागल्यास लगेच सडतात; वर बांधल्याने फळे निरोगी राहतात.",
          hi: "फल गीली मिट्टी के संपर्क में आने से तुरंत सड़ने लगते हैं।"
        }
      }
    ];
  }

  if (isSoybean) {
    return [
      {
        id: "task_s1",
        title: {
          en: "Walk field in Z-pattern to inspect 20 plants for Girdle beetle ring cuts",
          mr: "झेड (Z) आकारात फिरून २० झाडांवर चक्री भुंग्याने केलेल्या चक्राकार खाचा तपासा",
          hi: "खेत में घूमकर 20 पौधों पर गर्डल बीटल द्वारा काटे गए छल्ले जांचें"
        },
        priority: "high",
        category: "Scouting",
        timeEstimate: "25 mins",
        completed: false,
        reason: {
          en: "Girdle beetle female cuts ring grooves on petioles to lay eggs inside stems.",
          mr: "मादी भुंगा फांदीवर दोन चक्राकार खाचा करून अंडी घालतो, त्यामुळे फांदी वाळते.",
          hi: "मादा कीट तने पर छल्ले काटकर अंडे देती है जिससे शाखा सूखती है।"
        }
      },
      {
        id: "task_s2",
        title: {
          en: "Hand-pick and bury all dried ring-girdled twigs in morning rounds",
          mr: "सकाळी शेताची फेरी मारून खाच पडलेल्या सुकलेल्या फांद्या खुडून नष्ट करा",
          hi: "सुबह के समय प्रभावित सूखी शाखाओं को तोड़कर जमीन में दबाएं"
        },
        priority: "medium",
        category: "Mechanical IPM",
        timeEstimate: "35 mins",
        completed: true,
        reason: {
          en: "Destroys beetle eggs before larvae hatch and burrow into the main stem.",
          mr: "अंडी अवस्थेतच नष्ट केल्यास अळी मुख्य खोडात जात नाही.",
          hi: "अंडे अवस्था में ही नष्ट करने से सुंडी मुख्य तने में नहीं घुस पाती।"
        }
      },
      {
        id: "task_s3",
        title: {
          en: "Inspect 10 T-shaped bird perches across the 4-acre field",
          mr: "शेतातील १० 'T' आकाराचे पक्षी थांबे व्यवस्थित उभे आहेत का ते तपासा",
          hi: "खेत में 10 टी-आकार के पक्षी बसेरों की जांच करें"
        },
        priority: "low",
        category: "Biological IPM",
        timeEstimate: "15 mins",
        completed: false,
        reason: {
          en: "Insectivorous birds (Drongos/Mynas) perch and eat up to 50 caterpillars per hour for free.",
          mr: "कोतवाल व साळुंकी पक्षी थांब्यांवर बसून दिवसाला शेकडो अळ्या फस्त करतात.",
          hi: "पक्षी बसेरों पर बैठकर प्रति घंटे दर्जनों इल्लियों को खाकर फसल बचाते हैं।"
        }
      },
      {
        id: "task_s4",
        title: {
          en: "Record Spodoptera litura pheromone trap count",
          mr: "तंबाखूच्या लष्करी अळीच्या सापळ्यातील पतंग संख्या नोंदवा",
          hi: "तम्बाकू की लश्करी इल्ली फेरोमोन ट्रैप की गिनती दर्ज करें"
        },
        priority: "medium",
        category: "Traps",
        timeEstimate: "10 mins",
        completed: false,
        reason: {
          en: "Currently safe below ETL threshold. Avoid costly chemical spray.",
          mr: "सध्या पतंग संख्या नुकसान पातळीखाली असल्याने रासायनिक फवारणी टाळा.",
          hi: "वर्तमान में कीट संख्या सीमा के नीचे सुरक्षित है, दवा छिड़काव से बचें।"
        }
      },
      {
        id: "task_s5",
        title: {
          en: "Check root nodules for active pink leghemoglobin nitrogen fixation",
          mr: "एका रोपाची मुळे उपटून रायझोबियम गाठी फोडून आतील गुलाबी रंग तपासा",
          hi: "जड़ की गांठों को दबाकर देखें कि वे सक्रिय गुलाबी रंग की हैं या नहीं"
        },
        priority: "low",
        category: "Soil Health",
        timeEstimate: "10 mins",
        completed: false,
        reason: {
          en: "Pink color confirms active natural nitrogen production; zero urea required.",
          mr: "गुलाबी रंग म्हणजे हवेतील नत्र जमिनीत साठवले जात आहे; युरिया खताची गरज नाही.",
          hi: "गुलाबी रंग प्राकृतिक नाइट्रोजन निर्माण की पुष्टि करता है।"
        }
      }
    ];
  }

  // Cotton default
  return [
    {
      id: "task_c1",
      title: {
        en: "Inspect 20 random green bolls for internal larvae",
        mr: "शेतातील २० हिरवी बोंडे फोडून आतील अळीची पाहणी करा",
        hi: "खेत से 20 हरे डोडे तोड़कर अंदर सुंडी की जांच करें"
      },
      priority: "high",
      category: "Scouting",
      timeEstimate: "25 mins",
      completed: false,
      reason: {
        en: "Determines if field damage exceeds the 5% economic threshold limit.",
        mr: "नुकसान ५% आर्थिक नुकसान पातळीच्या आत आहे की नाही हे ठरवण्यासाठी आवश्यक.",
        hi: "यह निर्धारित करता है कि नुकसान 5% सीमा से अधिक है या नहीं।"
      }
    },
    {
      id: "task_c2",
      title: {
        en: "Record today's pheromone trap moth count",
        mr: "आज कामगंध सापळ्यात अडकलेल्या पतंगांची संख्या नोंदवा",
        hi: "आज फेरोमोन ट्रैप में पकड़े गए पतंगों की गिनती दर्ज करें"
      },
      priority: "high",
      category: "Traps",
      timeEstimate: "10 mins",
      completed: true,
      reason: {
        en: "Crucial to monitor whether trap catches stay above 8 moths/day for 3 days.",
        mr: "सलग ३ दिवस पतंग संख्या ८ च्या वर राहते का हे तपासण्यासाठी दररोज नोंद आवश्यक.",
        hi: "लगातार 3 दिन 8 पतंगों से अधिक रहने की जांच के लिए दैनिक रिकॉर्ड आवश्यक है।"
      }
    },
    {
      id: "task_c3",
      title: {
        en: "Pick and destroy all rosette flowers (डोमकळ्या)",
        mr: "झाडांवरील सर्व डोमकळ्या (मिटलेली फुले) हाताने तोडून नष्ट करा",
        hi: "सभी मुड़े हुए फूल (डोमकली) हाथ से तोड़कर जमीन में दबाएं"
      },
      priority: isHighRisk ? "high" : "medium",
      category: "Mechanical IPM",
      timeEstimate: "35 mins",
      completed: false,
      reason: {
        en: "Kills first-generation larvae inside flowers before they bore into developing bolls.",
        mr: "फुल अवस्थेतच अळी नष्ट केल्यास पुढील बोंडांचे १००% रक्षण होते.",
        hi: "फूलों के अंदर ही सुंडी नष्ट होने से डोडों का शत-प्रतिशत बचाव होता है।"
      }
    },
    {
      id: "task_c4",
      title: {
        en: "Spray 5% Neem Seed Kernel Extract (NSKE) botanical repellent",
        mr: "५% निंबोळी अर्काची (NSKE) पानांवर व कळ्यांवर फवारणी करा",
        hi: "5% नीम बीज अर्क (NSKE) का छिड़काव करें"
      },
      priority: isHighRisk ? "high" : "medium",
      category: "Bio-Pesticide",
      timeEstimate: "40 mins",
      completed: false,
      reason: {
        en: "Acts as an oviposition deterrent preventing female moths from laying eggs.",
        mr: "कडुनिंबातील अझाडिरेक्टिनमुळे मादी पतंग पात्यांवर अंडी घालत नाहीत.",
        hi: "नीम का अर्क मादा पतंगों को अंडे देने से रोकता है।"
      }
    },
    {
      id: "task_c5",
      title: {
        en: "Check pheromone lure expiry date (Replace every 21-25 days)",
        mr: "कामगंध ल्यूरची मुदत तपासा (२१ ते २५ दिवसांनी नवीन ल्यूर बसवा)",
        hi: "फेरोमोन ल्यूर की तारीख जांचें (21-25 दिनों में बदलें)"
      },
      priority: "medium",
      category: "Trap Maintenance",
      timeEstimate: "5 mins",
      completed: false,
      reason: {
        en: "Expired lure loses pheromone potency and gives false zero counts.",
        mr: "जुना झालेला ल्यूर गंध सोडत नाही, ज्यामुळे सापळ्यात पतंग न दिसण्याचा खोटा भास होतो.",
        hi: "पुराना ल्यूर गंध खो देता है जिससे सही गिनती नहीं मिल पाती।"
      }
    }
  ];
};

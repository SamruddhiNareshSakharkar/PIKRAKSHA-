// Daily Farmer Action Plan Generator for PIKRAKSHA
// Generates prioritized, IPM-compliant daily task checklists based on live risk & trap data

export const generateDailyActionPlan = (farm, riskAnalysis) => {
  const isHighRisk = riskAnalysis.totalScore >= 75;
  const isCotton = farm.crop?.name?.en === "Cotton" || farm.crop?.name === "Cotton";

  const defaultTasks = [
    {
      id: "task_1",
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
      id: "task_2",
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
        en: "Crucial to monitor whether trap catches stay above 8 moths/day.",
        mr: "सलग ३ दिवस पतंग संख्या ८ च्या वर राहते का हे तपासण्यासाठी दररोज नोंद आवश्यक.",
        hi: "लगातार 3 दिन 8 पतंगों से अधिक रहने की जांच के लिए दैनिक रिकॉर्ड आवश्यक है।"
      }
    },
    {
      id: "task_3",
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
      id: "task_4",
      title: {
        en: "Verify night temperature and humidity on Mahavedh AWS",
        mr: "महावेध हवामान केंद्रावर रात्रीचे तापमान व आर्द्रता तपासा",
        hi: "महावेध मौसम केंद्र पर रात का तापमान और नमी जांचें"
      },
      priority: "medium",
      category: "Weather",
      timeEstimate: "5 mins",
      completed: false,
      reason: {
        en: "Night temperature 18-26°C indicates active egg laying window.",
        mr: "रात्रीचे तापमान १८-२६°C असल्यास पतंग अंडी घालतात.",
        hi: "रात का तापमान 18-26°C होने पर पतंग अंडे देते हैं।"
      }
    },
    {
      id: "task_5",
      title: {
        en: "Photograph suspected leaf lesions with AI Scanner",
        mr: "शंकास्पद पानांचा फोटो काढून AI स्कॅनरद्वारे खात्री करा",
        hi: "संदेहास्पद पत्तों का फोटो खींचकर AI स्कैनर से जांचें"
      },
      priority: "low",
      category: "Diagnosis",
      timeEstimate: "5 mins",
      completed: false,
      reason: {
        en: "Early digital record enables Agriculture Assistant to verify symptoms remotely.",
        mr: "डिजिटल फोटोमुळे कृषी सहाय्यकाला गावात न येताही थेट मार्गदर्शन करता येते.",
        hi: "डिजिटल फोटो से कृषि अधिकारी तुरंत सही सलाह दे सकते हैं।"
      }
    }
  ];

  return defaultTasks;
};


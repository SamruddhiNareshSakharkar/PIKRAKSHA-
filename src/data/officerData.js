export const maharashtraDistricts = [
  {
    id: "yavatmal",
    name: { en: "Yavatmal", mr: "यवतमाळ", hi: "यवतमाल" },
    zone: "Vidarbha",
    talukas: ["Ner", "Pusad", "Darwha", "Digras", "Kalamb"],
    dominantCrop: "Cotton (कापूस)",
    activeAlert: "Pink Bollworm (गुलाबी बोंडअळी)",
    riskLevel: "Critical",
    riskColor: "bg-red-500",
    farmsMonitored: 3420,
    activeTraps: 520,
    trapsAboveETL: 418, // 80% crossed ETL
    awsStation: "Ner AWS - Mahavedh",
    lastReported: "10 mins ago"
  },
  {
    id: "nashik",
    name: { en: "Nashik", mr: "नाशिक", hi: "नासिक" },
    zone: "North Maharashtra",
    talukas: ["Dindori", "Niphad", "Satana", "Yeola", "Chandwad"],
    dominantCrop: "Grapes (द्राक्ष) & Onion",
    activeAlert: "Downy Mildew & Unseasonal Rain Threat",
    riskLevel: "Critical",
    riskColor: "bg-red-500",
    farmsMonitored: 2890,
    activeTraps: 410,
    trapsAboveETL: 312,
    awsStation: "Dindori AWS - Mahavedh",
    lastReported: "15 mins ago"
  },
  {
    id: "pune",
    name: { en: "Pune", mr: "पुणे", hi: "पुणे" },
    zone: "Western Maharashtra",
    talukas: ["Junnar", "Khed", "Ambegaon", "Shirur", "Baramati"],
    dominantCrop: "Tomato (टोमॅटो) & Vegetables",
    activeAlert: "Late Blight & Tuta Pinworm",
    riskLevel: "High",
    riskColor: "bg-orange-500",
    farmsMonitored: 1950,
    activeTraps: 280,
    trapsAboveETL: 195,
    awsStation: "Narayangaon AWS - Mahavedh",
    lastReported: "22 mins ago"
  },
  {
    id: "latur",
    name: { en: "Latur", mr: "लातूर", hi: "लातूर" },
    zone: "Marathwada",
    talukas: ["Ausa", "Nilanga", "Ahmedpur", "Udgir", "Chakur"],
    dominantCrop: "Soybean (सोयाबीन) & Pulses",
    activeAlert: "Soybean Rust & Spodoptera",
    riskLevel: "Moderate",
    riskColor: "bg-amber-500",
    farmsMonitored: 2150,
    activeTraps: 340,
    trapsAboveETL: 85,
    awsStation: "Ausa AWS - Mahavedh",
    lastReported: "1 hour ago"
  },
  {
    id: "solapur",
    name: { en: "Solapur", mr: "सोलापूर", hi: "सोलापुर" },
    zone: "Western Maharashtra",
    talukas: ["Pandharpur", "Sangola", "Barshi", "Malshiras"],
    dominantCrop: "Pomegranate (डाळिंब)",
    activeAlert: "Bacterial Blight (तेल्या)",
    riskLevel: "Moderate",
    riskColor: "bg-amber-500",
    farmsMonitored: 1680,
    activeTraps: 210,
    trapsAboveETL: 42,
    awsStation: "Pandharpur AWS - Mahavedh",
    lastReported: "45 mins ago"
  },
  {
    id: "kolhapur",
    name: { en: "Kolhapur", mr: "कोल्हापूर", hi: "कोल्हापुर" },
    zone: "Western Maharashtra",
    talukas: ["Karveer", "Hatkanangle", "Shirol", "Kagal"],
    dominantCrop: "Sugarcane (ऊस)",
    activeAlert: "Early Shoot Borer (नियंत्रणात)",
    riskLevel: "Safe",
    riskColor: "bg-emerald-500",
    farmsMonitored: 1420,
    activeTraps: 180,
    trapsAboveETL: 12,
    awsStation: "Karveer AWS - Mahavedh",
    lastReported: "2 hours ago"
  }
];

export const officerStats = {
  totalFarmsCovered: 13510,
  pilotTalukas: 6,
  connectedMahavedhAWS: 48,
  trapCatchesRecordedToday: 1942,
  alertsDispatched24h: 4860,
  smsDelivered: "99.4%",
  voiceCallsCompleted: "88.7%",
  whatsappReadRate: "94.2%"
};


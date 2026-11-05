const fs = require('fs');

// 1. Update App.jsx to pass farm={currentFarm} to PikSakhiHubView
let appCode = fs.readFileSync('src/App.jsx', 'utf8');
appCode = appCode.replace(
  `<PikSakhiHubView\n                  lang={lang}\n                  onPlayAudio={handlePlayAudio}\n                />`,
  `<PikSakhiHubView\n                  farm={currentFarm}\n                  lang={lang}\n                  onPlayAudio={handlePlayAudio}\n                />`
);
appCode = appCode.replace(
  `<PikSakhiHubView\n                  lang={lang}\n                  onPlayAudio={handlePlayAudio}\n                />`,
  `<PikSakhiHubView\n                  farm={currentFarm}\n                  lang={lang}\n                  onPlayAudio={handlePlayAudio}\n                />`
);
fs.writeFileSync('src/App.jsx', appCode, 'utf8');
console.log('App.jsx updated with farm prop for PikSakhiHubView');

// 2. Update PikSakhiHubView.jsx to dynamically adapt to farm's village & district
let sakhiCode = fs.readFileSync('src/components/farmer/PikSakhiHubView.jsx', 'utf8');

const oldHeader = `export default function PikSakhiHubView({ lang = 'en', onPlayAudio }) {
  const [clusterFarmers, setClusterFarmers] = useState([`;

const newHeader = `export default function PikSakhiHubView({ farm, lang = 'en', onPlayAudio }) {
  const villageStr = typeof farm?.location?.village === 'object'
    ? (farm?.location?.village?.[lang] || farm?.location?.village?.en || 'Ner')
    : (farm?.location?.village || 'Ner');

  const districtStr = typeof farm?.location?.district === 'object'
    ? (farm?.location?.district?.[lang] || farm?.location?.district?.en || 'Yavatmal')
    : (farm?.location?.district || 'Yavatmal');

  const cropStr = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.[lang] || farm?.crop?.name?.en || 'Cotton')
    : (farm?.crop?.name || 'Cotton');

  const isPune = districtStr.toLowerCase().includes('pune') || villageStr.toLowerCase().includes('baramati') || villageStr.toLowerCase().includes('junnar');
  const isNashik = districtStr.toLowerCase().includes('nashik') || villageStr.toLowerCase().includes('dindori');
  const isLatur = districtStr.toLowerCase().includes('latur') || villageStr.toLowerCase().includes('ausa');

  // Dynamic Sakhi Persona based on Village/District
  const sakhiName = isPune 
    ? (lang === 'mr' ? 'सुरेखाताई शिंदे • प्रमाणित पिक सखी' : 'Surekha Tai Shinde • Certified Pik Sakhi')
    : isNashik
    ? (lang === 'mr' ? 'कविताताई गायकवाड • प्रमाणित पिक सखी' : 'Kavita Tai Gaikwad • Certified Pik Sakhi')
    : isLatur
    ? (lang === 'mr' ? 'राधाबाई देशमुख • प्रमाणित पिक सखी' : 'Radhabai Deshmukh • Certified Pik Sakhi')
    : (lang === 'mr' ? 'सुनीताताई राठोड • प्रमाणित पिक सखी' : 'Sunita Tai Rathod • Certified Pik Sakhi');

  const clusterTitle = isPune
    ? (lang === 'mr' ? \`\${villageStr} क्लस्टर, पुणे • जिजाऊ महिला बचत गट (NRLM / MAVIM)\` : \`\${villageStr} Cluster, Pune • Jijau Mahila SHG (NRLM / MAVIM)\`)
    : isNashik
    ? (lang === 'mr' ? \`\${villageStr} क्लस्टर, नाशिक • क्रांती महिला बचत गट (NRLM / MAVIM)\` : \`\${villageStr} Cluster, Nashik • Kranti Mahila SHG (NRLM / MAVIM)\`)
    : isLatur
    ? (lang === 'mr' ? \`\${villageStr} क्लस्टर, लातूर • अन्नपूर्णा महिला बचत गट (NRLM / MAVIM)\` : \`\${villageStr} Cluster, Latur • Annapurna Mahila SHG (NRLM / MAVIM)\`)
    : (lang === 'mr' ? \`\${villageStr} क्लस्टर, \${districtStr} • महालक्ष्मी महिला बचत गट (NRLM / MAVIM)\` : \`\${villageStr} Cluster, \${districtStr} • Mahalakshmi SHG (NRLM / MAVIM)\`);

  const initialCluster = isPune ? [
    {
      id: "wf_p1",
      name: lang === 'mr' ? "शोभाबाई पाटील" : "Shobhabai Patil",
      phone: "+91 98234 *****",
      hasSmartphone: false,
      crop: lang === 'mr' ? "द्राक्ष (Grapes)" : "Grapes (द्राक्ष)",
      acres: 2.0,
      mothsCaught: 6,
      threshold: 5,
      status: "critical",
      lastScouted: lang === 'mr' ? "आज सकाळी" : "Today morning",
      rosetteBollsFound: 4,
      audioDelivered: true
    },
    {
      id: "wf_p2",
      name: lang === 'mr' ? "लताताई गावडे" : "Lata Gawade",
      phone: "+91 97654 *****",
      hasSmartphone: true,
      crop: lang === 'mr' ? "द्राक्ष (Grapes)" : "Grapes (द्राक्ष)",
      acres: 2.5,
      mothsCaught: 3,
      threshold: 5,
      status: "safe",
      lastScouted: lang === 'mr' ? "काल दुपारी" : "Yesterday",
      rosetteBollsFound: 1,
      audioDelivered: true
    },
    {
      id: "wf_p3",
      name: lang === 'mr' ? "सुनिता कोळेकर" : "Sunita Kolekar",
      phone: "+91 94218 *****",
      hasSmartphone: false,
      crop: lang === 'mr' ? "द्राक्ष (Grapes)" : "Grapes (द्राक्ष)",
      acres: 3.0,
      mothsCaught: 7,
      threshold: 5,
      status: "critical",
      lastScouted: lang === 'mr' ? "आज दुपारी" : "Today afternoon",
      rosetteBollsFound: 5,
      audioDelivered: false
    },
    {
      id: "wf_p4",
      name: lang === 'mr' ? "शकुंतला जगताप" : "Shakuntala Jagtap",
      phone: "+91 91583 *****",
      hasSmartphone: false,
      crop: lang === 'mr' ? "द्राक्ष (Grapes)" : "Grapes (द्राक्ष)",
      acres: 1.5,
      mothsCaught: 2,
      threshold: 5,
      status: "safe",
      lastScouted: lang === 'mr' ? "२ दिवसांपूर्वी" : "2 days ago",
      rosetteBollsFound: 0,
      audioDelivered: true
    }
  ] : [`;

sakhiCode = sakhiCode.replace(oldHeader, newHeader);

// Replace the hardcoded Sunita Tai Rathod and Ner text in the banner
sakhiCode = sakhiCode.replace(
  "{lang === 'mr' ? 'सुनीताताई राठोड • प्रमाणित पिक सखी' : 'Sunita Tai Rathod • Certified Pik Sakhi'}",
  "{sakhiName}"
);

sakhiCode = sakhiCode.replace(
  "{lang === 'mr' ? 'नेर शिवार, यवतमाळ • महालक्ष्मी महिला बचत गट (NRLM / MAVIM)' : 'Ner Cluster, Yavatmal • Mahalakshmi SHG (NRLM / MAVIM)'}",
  "{clusterTitle}"
);

fs.writeFileSync('src/components/farmer/PikSakhiHubView.jsx', sakhiCode, 'utf8');
console.log('PikSakhiHubView.jsx dynamically personalized by village & district!');

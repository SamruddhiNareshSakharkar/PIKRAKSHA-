const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Add import
const importTarget = "import NewFarmModal from './components/modals/NewFarmModal';";
const importReplacement = "import NewFarmModal from './components/modals/NewFarmModal';\nimport VoiceBulletinModal from './components/modals/VoiceBulletinModal';";
content = content.replace(importTarget, importReplacement);

// 2. Add state
const stateTarget = "const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);";
const stateReplacement = "const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);\n  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);";
content = content.replace(stateTarget, stateReplacement);

// 3. Connect Header onOpenAudio
const headerTarget = "onOpenAudio={() => handlePlayAudio()}";
const headerReplacement = "onOpenAudio={() => setIsVoiceModalOpen(true)}";
content = content.replace(headerTarget, headerReplacement);

// 4. Connect MyFarmView onPlayAudio
const myFarmTarget = "onPlayAudio={handlePlayAudio}";
const myFarmReplacement = "onPlayAudio={() => setIsVoiceModalOpen(true)}";
content = content.replace(myFarmTarget, myFarmReplacement);

// 5. Render VoiceBulletinModal
const modalTarget = "<AlertPreviewModal";
const modalReplacement = "<VoiceBulletinModal\n        isOpen={isVoiceModalOpen}\n        onClose={() => setIsVoiceModalOpen(false)}\n        farm={currentFarm}\n        lang={lang}\n      />\n\n      <AlertPreviewModal";
content = content.replace(modalTarget, modalReplacement);

fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('Successfully updated App.jsx');


import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// Farmer Views
import MyFarmView from './components/views/MyFarmView';
import RiskForecastView from './components/views/RiskForecastView';
import WhyAtRiskView from './components/farmer/WhyAtRiskView';
import ActionPlanView from './components/farmer/ActionPlanView';
import PikSakhiHubView from './components/farmer/PikSakhiHubView';
import DiagnoseView from './components/views/DiagnoseView';
import TrapsScoutingView from './components/views/TrapsScoutingView';
import SprayWindowView from './components/views/SprayWindowView';
import CommunitySwarmView from './components/views/CommunitySwarmView';
import TreatmentTrackerView from './components/farmer/TreatmentTrackerView';
import VoiceCopilotView from './components/views/VoiceCopilotView';
import BioBrewerView from './components/views/BioBrewerView';
import SatelliteView from './components/views/SatelliteView';
import CropCalendarView from './components/farmer/CropCalendarView';
import MarketLinkView from './components/farmer/MarketLinkView';
import SoilHealthView from './components/farmer/SoilHealthView';

// Officer Views
import OfficerView from './components/views/OfficerView';
import ExpertVerificationView from './components/officer/ExpertVerificationView';
import AlertsView from './components/views/AlertsView';
import ImpactAnalyticsView from './components/officer/ImpactAnalyticsView';
import HowItWorksView from './components/views/HowItWorksView';
import TeamView from './components/views/TeamView';
import CropInsuranceView from './components/officer/CropInsuranceView';

// Modals
import AlertPreviewModal from './components/modals/AlertPreviewModal';
import NewFarmModal from './components/modals/NewFarmModal';
import LoginModal from './components/modals/LoginModal';
import VoiceBulletinModal from './components/modals/VoiceBulletinModal';

// Store & Speech
import { useStore } from './store/useStore';
import { translations } from './data/translations';
import { playVoiceAlert, stopVoiceAlert } from './utils/speech';
import { generateDailyActionPlan } from './engine/actionPlanEngine';
import { Menu, X, Volume2, ArrowRight } from 'lucide-react';

export default function App() {
  const store = useStore();
  const {
    portal,
    lang,
    farmerTab,
    officerTab,
    farms,
    selectedFarmId,
    currentFarm,
    farmTrapHistory,
    riskAnalysis,
    actionTasks,
    farmerSubmissions,
    treatmentLogs,
    setPortal,
    setLang,
    setFarmerTab,
    setOfficerTab,
    setSelectedFarmId,
    logTrapCatch,
    toggleActionTask,
    verifyDiagnosisSubmission,
    addNewFarm,
    addTreatmentLog,
    addCustomActionTask,
    syncLiveWeather,
    syncWithGeolocation,
    currentUser,
    loginUser,
    logoutUser,
    changeFarmDistrict,
    isSyncingWeather
  } = store;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isNewFarmModalOpen, setIsNewFarmModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const t = translations[lang] || translations.en;
  const currentTab = portal === 'farmer' ? farmerTab : officerTab;
  const setCurrentTab = portal === 'farmer' ? setFarmerTab : setOfficerTab;

  const currentFarmTasks = (actionTasks && actionTasks[selectedFarmId] && actionTasks[selectedFarmId].length > 0) ? actionTasks[selectedFarmId] : generateDailyActionPlan(currentFarm, riskAnalysis);

  const handlePlayAudio = (text) => {
    if (isPlayingAudio) {
      stopVoiceAlert();
      setIsPlayingAudio(false);
      return;
    }

    const speechText = text || currentFarm.primaryAlert.audioText[lang] || currentFarm.primaryAlert.audioText.en;
    setIsPlayingAudio(true);
    playVoiceAlert(
      speechText, 
      lang, 
      () => setIsPlayingAudio(true), 
      () => setIsPlayingAudio(false)
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAF8] text-slate-900 flex font-sans selection:bg-emerald-200">
      {/* Desktop Navigation Sidebar */}
      <div className="hidden lg:block shrink-0">
        <Sidebar
          portal={portal}
          activeTab={currentTab}
          setActiveTab={setCurrentTab}
          lang={lang}
          t={t}
        />
      </div>

      {/* Mobile Sidebar Backdrop */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        ></div>
      )}

      {/* Mobile Drawer */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:hidden transition-transform duration-300 ${
        isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar
          portal={portal}
          activeTab={currentTab}
          setActiveTab={(tab) => {
            setCurrentTab(tab);
            setIsMobileSidebarOpen(false);
          }}
          lang={lang}
          t={t}
        />
      </div>

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header Nav Trigger */}
        <div className="lg:hidden bg-forest-900 text-white px-4 py-2 flex items-center justify-between border-b border-forest-800">
          <button
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="p-1 rounded-md text-emerald-300 hover:text-white"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-extrabold text-xs">PIKRAKSHA (पीकरक्षा)</span>
          <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded uppercase font-bold">{portal}</span>
        </div>

        {/* Global Header with Portal Switcher */}
        <Header
          portal={portal}
          setPortal={setPortal}
          farms={farms}
          selectedFarmId={selectedFarmId}
          setSelectedFarmId={setSelectedFarmId}
          lang={lang}
          setLang={setLang}
          t={t}
          onOpenAudio={() => setIsVoiceModalOpen(true)}
          onAddNewFarm={() => setIsNewFarmModalOpen(true)}
          currentUser={currentUser}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
        />

        {/* Audio Banner Pill */}
        {isPlayingAudio && (
          <div className="bg-emerald-800 text-white px-6 py-2 flex items-center justify-between text-xs font-bold shadow-xs animate-pulse">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-300 animate-bounce" />
              <span>
                {lang === 'mr' 
                  ? 'पीकरक्षा ध्वनी बुलेटिन सुरू आहे (मराठी आवाज)...' 
                  : lang === 'hi'
                  ? 'पीकरक्षा वॉयस अलर्ट बज रहा है (हिंदी आवाज)...'
                  : 'Playing Pikraksha Audio Advisory...'}
              </span>
            </div>
            <button
              onClick={() => handlePlayAudio()}
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-0.5 rounded-full text-[11px]"
            >
              {lang === 'mr' ? 'थांबवा (Stop)' : 'Stop Audio'}
            </button>
          </div>
        )}

        {/* Dynamic Route Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-7xl mx-auto w-full">
          {/* ================= FARMER PORTAL ROUTING ================= */}
          {portal === 'farmer' && (
            <>
              {farmerTab === 'dashboard' && (
                <div className="space-y-6">
                  <MyFarmView
                    farm={currentFarm}
                    lang={lang}
                    t={t}
                    onPreviewAlert={() => setIsPreviewModalOpen(true)}
                    onNavigateDiagnose={() => setFarmerTab('scanner')}
                    onPlayAudio={() => setIsVoiceModalOpen(true)}
                    isPlayingAudio={isPlayingAudio}
                    onSyncWeather={syncLiveWeather}
                    onSyncGeolocation={syncWithGeolocation}
                    onChangeDistrict={changeFarmDistrict}
                    isSyncingWeather={isSyncingWeather}
                  />

                  {/* Quick Shortcut Banner to Explainable AI & Daily Plan */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => setFarmerTab('why-risk')}
                      className="p-4 rounded-2xl bg-white border border-amber-200 hover:border-amber-400 shadow-2xs hover:shadow-xs transition text-left flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-black uppercase text-amber-600">Explainable AI (XAI)</span>
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-amber-700 transition">
                          {lang === 'mr' ? 'धोका का निर्माण झाला? कारणे पाहा →' : 'Why Am I At Risk? (Factor Breakdown) →'}
                        </h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
                    </button>

                    <button
                      onClick={() => setFarmerTab('action-plan')}
                      className="p-4 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-400 shadow-2xs hover:shadow-xs transition text-left flex items-center justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-black uppercase text-emerald-600">Daily IPM Checklist</span>
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-emerald-700 transition">
                          {lang === 'mr' ? 'आजचा कृती आराखडा (५ कामे) →' : 'Today\'s Farm Action Plan →'}
                        </h4>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition" />
                    </button>
                  </div>
                </div>
              )}

              {farmerTab === 'timeline' && (
                <RiskForecastView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'why-risk' && (
                <WhyAtRiskView
                  farm={currentFarm}
                  riskAnalysis={riskAnalysis}
                  lang={lang}
                  t={t}
                  onNavigateActionPlan={() => setFarmerTab('action-plan')}
                />
              )}

              {farmerTab === 'pik-sakhi' && (
                <PikSakhiHubView
                  lang={lang}
                  onPlayAudio={handlePlayAudio}
                />
              )}

              {farmerTab === 'action-plan' && (
                <ActionPlanView
                  farm={currentFarm}
                  tasks={currentFarmTasks}
                  onToggleTask={toggleActionTask}
                  onAddTask={(newTask) => addCustomActionTask(selectedFarmId, newTask)}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'scanner' && (
                <DiagnoseView
                  lang={lang}
                  t={t}
                  onPlayAudio={handlePlayAudio}
                  isPlayingAudio={isPlayingAudio}
                />
              )}

              {farmerTab === 'traps' && (
                <TrapsScoutingView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'satellite' && (
                <SatelliteView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'bio-brewer' && (
                <BioBrewerView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {(farmerTab === 'weather' || farmerTab === 'spray-window') && (
                <SprayWindowView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'crop-calendar' && (
                <CropCalendarView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'market-link' && (
                <MarketLinkView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'soil-health' && (
                <SoilHealthView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'community' && (
                <CommunitySwarmView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'treatment' && (
                <TreatmentTrackerView
                  farm={currentFarm}
                  treatmentLogs={treatmentLogs}
                  onAddLog={addTreatmentLog}
                  lang={lang}
                  t={t}
                />
              )}

              {farmerTab === 'kisan-ai' && (
                <VoiceCopilotView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}
            </>
          )}

          {/* ================= AGRICULTURE OFFICER PORTAL ROUTING ================= */}
          {portal === 'officer' && (
            <>
              {(officerTab === 'overview' || officerTab === 'districts') && (
                <OfficerView
                  lang={lang}
                  t={t}
                />
              )}

              {officerTab === 'trap-surveillance' && (
                <TrapsScoutingView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {officerTab === 'sakhi-surveillance' && (
                <PikSakhiHubView
                  lang={lang}
                  onPlayAudio={handlePlayAudio}
                />
              )}

              {officerTab === 'village-outbreaks' && (
                <CommunitySwarmView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                />
              )}

              {officerTab === 'expert-verification' && (
                <ExpertVerificationView
                  submissions={farmerSubmissions}
                  onVerifySubmission={verifyDiagnosisSubmission}
                  lang={lang}
                  t={t}
                />
              )}

              {officerTab === 'broadcasting' && (
                <AlertsView
                  farm={currentFarm}
                  lang={lang}
                  t={t}
                  onPlayAudio={handlePlayAudio}
                  isPlayingAudio={isPlayingAudio}
                />
              )}

              {officerTab === 'crop-insurance' && (
                <CropInsuranceView
                  lang={lang}
                  t={t}
                />
              )}

              {officerTab === 'impact' && (
                <ImpactAnalyticsView
                  lang={lang}
                  t={t}
                />
              )}

              {officerTab === 'how-it-works' && (
                <HowItWorksView
                  lang={lang}
                  t={t}
                />
              )}

              {officerTab === 'team' && (
                <TeamView
                  lang={lang}
                  t={t}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <VoiceBulletinModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        farm={currentFarm}
        lang={lang}
      />

      <AlertPreviewModal
        farm={currentFarm}
        lang={lang}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onPlayAudio={handlePlayAudio}
        isPlayingAudio={isPlayingAudio}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUser={currentUser}
        onLogin={loginUser}
        lang={lang}
      />

      <NewFarmModal
        isOpen={isNewFarmModalOpen}
        onClose={() => setIsNewFarmModalOpen(false)}
        onAddFarm={addNewFarm}
        lang={lang}
      />
    </div>
  );
}

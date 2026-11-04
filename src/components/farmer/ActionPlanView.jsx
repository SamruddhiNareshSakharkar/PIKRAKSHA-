import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Square, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Sparkles, 
  Calendar,
  ListTodo,
  Info,
  ShieldCheck,
  Tag,
  Leaf
} from 'lucide-react';
import { generateDailyActionPlan } from '../../engine/actionPlanEngine';

export default function ActionPlanView({ farm, tasks, onToggleTask, onAddTask, lang = 'en', t }) {
  const currentLang = lang || 'en';
  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('Scouting');
  const [customTime, setCustomTime] = useState('20 mins');
  const [showAddModal, setShowAddModal] = useState(false);

  const cropStr = typeof farm?.crop?.name === 'object'
    ? (farm?.crop?.name?.[currentLang] || farm?.crop?.name?.en || 'Crop')
    : (farm?.crop?.name || 'Crop');

  const farmerNameStr = typeof farm?.farmerName === 'object'
    ? (farm?.farmerName?.[currentLang] || farm?.farmerName?.en || 'Farmer')
    : (farm?.farmerName || 'Farmer');

  const districtStr = typeof farm?.location?.district === 'object'
    ? (farm?.location?.district?.[currentLang] || farm?.location?.district?.en || 'Maharashtra')
    : (farm?.location?.district || 'Maharashtra');

  const getEffectiveTasks = () => {
    if (tasks && Array.isArray(tasks) && tasks.length > 0) {
      return tasks;
    }
    return generateDailyActionPlan(farm);
  };

  const [taskList, setTaskList] = useState(getEffectiveTasks);

  useEffect(() => {
    setTaskList(getEffectiveTasks());
  }, [tasks, farm?.id, farm?.crop]);

  const completedCount = taskList.filter(t => t.completed).length;
  const progressPct = taskList.length > 0 ? Math.round((completedCount / taskList.length) * 100) : 0;

  const handleToggle = (id) => {
    setTaskList(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    if (onToggleTask) onToggleTask(farm.id, id);
  };

  const handleAddCustomTask = (e) => {
    e.preventDefault();
    if (!customTaskTitle.trim()) return;

    const newTask = {
      id: `task_custom_${Date.now()}`,
      title: { en: customTaskTitle, mr: customTaskTitle, hi: customTaskTitle },
      priority: "medium",
      category: customCategory,
      timeEstimate: customTime,
      completed: false,
      isCustom: true,
      reason: {
        en: `Custom scheduled task for ${cropStr} by farmer.`,
        mr: `शेतकऱ्याने स्वतः ${cropStr} पिकासाठी नोंदवलेले काम.`,
        hi: `किसान द्वारा फसल हेतु स्वयं निर्धारित कार्य।`
      }
    };

    setTaskList(prev => [newTask, ...prev]);
    if (onAddTask) onAddTask(newTask);
    setCustomTaskTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <ListTodo className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? `${cropStr} दैनिक कृषी सहाय्यक` : `${cropStr} Daily Action Plan`}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'आज शेतात काय करायचे? (दैनिक कृती आराखडा)' : 'What Should I Do Today? (Actionable Farm Plan)'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? `${farmerNameStr} यांच्या ${cropStr} पिकासाठी आज प्राधान्य द्यायची कृषी विद्यापीठ प्रमाणित ५ कामे.`
                : `University-certified daily IPM tasks tailored for ${farmerNameStr}'s ${cropStr} farm in ${districtStr}.`}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowAddModal(prev => !prev)}
              className="px-4 py-2 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>{showAddModal ? (lang === 'mr' ? 'रद्द करा' : 'Cancel') : (lang === 'mr' ? 'नवीन काम जोडा (+)' : 'Add New Task (+)')}</span>
            </button>

            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl min-w-[180px]">
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                <span>{lang === 'mr' ? 'आजची प्रगती:' : "Today's Progress:"}</span>
                <span className="text-emerald-700">{completedCount}/{taskList.length} ({progressPct}%)</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPct}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Add Inline Form */}
      {showAddModal && (
        <form onSubmit={handleAddCustomTask} className="bg-emerald-50 border border-emerald-300 p-4 rounded-2xl shadow-sm space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
              {lang === 'mr' ? 'नवीन शेती काम नोंदवा' : 'Schedule Custom Farm Task'}
            </h4>
            <button 
              type="button" 
              onClick={() => setShowAddModal(false)}
              className="text-slate-400 hover:text-slate-600 text-xs font-bold"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <input
              type="text"
              value={customTaskTitle}
              onChange={(e) => setCustomTaskTitle(e.target.value)}
              placeholder={lang === 'mr' ? `उदा. '${cropStr} शेतात निंबोळी अर्क फवारणी' किंवा 'पक्षी थांबे तपासणे'...` : `e.g. 'Check ${cropStr} field edges' or 'Spray bio-fungicide'...`}
              className="sm:col-span-6 px-3 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900"
              autoFocus
            />

            <select
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              className="sm:col-span-3 px-3 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-slate-700"
            >
              <option value="Scouting">🔍 Scouting (पाहणी)</option>
              <option value="Bio-Pesticide">🌿 Bio-Spray (जैविक फवारणी)</option>
              <option value="Mechanical IPM">✂️ Mechanical (हाताने काढणे)</option>
              <option value="Cultural IPM">🌾 Cultural (हवा खेळती ठेवणे)</option>
              <option value="Traps">🪤 Traps (सापळे तपासणी)</option>
            </select>

            <select
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="sm:col-span-2 px-3 py-2 rounded-xl bg-white border border-emerald-300 text-xs font-bold text-slate-700"
            >
              <option value="15 mins">15 mins</option>
              <option value="25 mins">25 mins</option>
              <option value="40 mins">40 mins</option>
              <option value="1 hour">1 hour</option>
            </select>

            <button
              type="submit"
              className="sm:col-span-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-black py-2 shadow-xs transition"
            >
              Save
            </button>
          </div>
        </form>
      )}

      {/* Task Checklist Items */}
      <div className="space-y-3">
        {taskList.map((task) => {
          const isDone = task.completed;
          const titleStr = typeof task.title === 'object'
            ? (task.title[currentLang] || task.title.en)
            : task.title;

          const reasonStr = typeof task.reason === 'object'
            ? (task.reason[currentLang] || task.reason.en)
            : task.reason;

          return (
            <div
              key={task.id}
              onClick={() => handleToggle(task.id)}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                isDone 
                  ? 'bg-emerald-50/50 border-emerald-200 opacity-80' 
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:shadow-xs'
              }`}
            >
              <button 
                type="button"
                className="mt-0.5 text-emerald-600 shrink-0 focus:outline-none"
              >
                {isDone ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 hover:text-slate-400" />
                )}
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                    task.priority === 'high' ? 'bg-red-100 text-red-800' :
                    task.priority === 'medium' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {task.category}
                  </span>

                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{task.timeEstimate}</span>
                  </span>

                  {task.isCustom && (
                    <span className="text-[9px] bg-purple-100 text-purple-800 font-extrabold px-1.5 py-0.5 rounded">
                      Farmer Custom
                    </span>
                  )}
                </div>

                <h4 className={`text-sm font-extrabold ${isDone ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                  {titleStr}
                </h4>

                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  💡 {reasonStr}
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  isDone ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                }`}>
                  {isDone ? (lang === 'mr' ? 'पूर्ण झाले ✓' : 'Done ✓') : (lang === 'mr' ? 'बाकी' : 'Pending')}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* University Scientific Provenance Banner */}
      <div className="bg-amber-50/70 border border-amber-200/90 rounded-2xl p-4 text-xs text-amber-900 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
        <p className="leading-relaxed">
          {lang === 'mr'
            ? `ह्या ५ कृषी विद्यापीठ प्रमाणित पायऱ्या पूर्ण केल्यास किडींचा प्रादुर्भाव ५% आर्थिक नुकसान पातळीच्या आत राहतो आणि अनावश्यक रासायनिक फवारणीचा खर्च टळतो.`
            : `Completing these 5 verified steps ensures ${cropStr} pests remain below the 5% economic threshold without premature expensive chemical sprays.`}
        </p>
      </div>
    </div>
  );
}

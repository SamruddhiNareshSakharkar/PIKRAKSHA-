import React, { useState } from 'react';
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
  Info
} from 'lucide-react';

export default function ActionPlanView({ farm, tasks, onToggleTask, lang, t }) {
  const currentLang = lang || 'en';
  const [customTaskTitle, setCustomTaskTitle] = useState('');
  const [taskList, setTaskList] = useState(tasks || []);

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
      id: `task_${Date.now()}`,
      title: { en: customTaskTitle, mr: customTaskTitle, hi: customTaskTitle },
      priority: "medium",
      category: "Custom",
      timeEstimate: "15 mins",
      completed: false,
      reason: {
        en: "Farmer custom scheduled task.",
        mr: "शेतकऱ्याने स्वतः नोंदवलेले काम.",
        hi: "किसान द्वारा स्वयं निर्धारित कार्य।"
      }
    };

    setTaskList(prev => [...prev, newTask]);
    setCustomTaskTitle('');
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs space-y-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
              <ListTodo className="w-3.5 h-3.5 text-emerald-700" />
              <span>{lang === 'mr' ? 'दैनिक कृषी सहाय्यक' : 'Daily Farmer Action Plan'}</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {lang === 'mr' ? 'आज शेतात काय करायचे? (दैनिक कृती आराखडा)' : 'What Should I Do Today? (Actionable Farm Plan)'}
            </h2>
            <p className="text-sm text-slate-600">
              {lang === 'mr'
                ? 'माहिती देण्यापुरते मर्यादित न राहता, आज शेतात कोणत्या कामांना प्राधान्य द्यावे याची कृषी विद्यापीठ प्रमाणित दैनंदिन यादी.'
                : 'Transforms PIKRAKSHA from an information app into an actionable daily agricultural assistant.'}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl min-w-[200px]">
            <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
              <span>{lang === 'mr' ? 'आजची प्रगती:' : 'Today\'s Progress:'}</span>
              <span className="text-emerald-700">{completedCount}/{taskList.length} ({progressPct}%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Checklist Items */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Today: {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </h3>
          <span className="text-xs text-slate-500 font-medium">Click to mark complete</span>
        </div>

        <div className="space-y-3 divide-y divide-slate-100">
          {taskList.map((task) => {
            const isCompleted = task.completed;
            const isHighPriority = task.priority === 'high';

            return (
              <div
                key={task.id}
                onClick={() => handleToggle(task.id)}
                className={`pt-3 first:pt-0 flex items-start gap-3.5 p-3 rounded-xl cursor-pointer transition-all ${
                  isCompleted 
                    ? 'bg-emerald-50/40 border border-emerald-200/60' 
                    : 'hover:bg-slate-50 border border-transparent'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-slate-400 hover:text-emerald-600 transition shrink-0"
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className={`text-sm font-bold ${
                      isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}>
                      {task.title[currentLang] || task.title.en}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {task.timeEstimate}
                      </span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isHighPriority ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>

                  <p className={`text-xs ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                    {task.reason[currentLang] || task.reason.en}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add custom task field */}
        <form onSubmit={handleAddCustomTask} className="pt-4 border-t border-slate-100 flex gap-2">
          <input
            type="text"
            value={customTaskTitle}
            onChange={(e) => setCustomTaskTitle(e.target.value)}
            placeholder={
              lang === 'mr' 
                ? 'नवीन काम जोडा (उदा. ५ एकरमध्ये निंबोळी अर्क फवारणी तयारी)...' 
                : 'Add a new farm task for today...'
            }
            className="flex-1 px-4 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{lang === 'mr' ? 'काम जोडा' : 'Add Task'}</span>
          </button>
        </form>
      </div>

      {/* Advisory Note */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <p className="leading-relaxed font-serif italic">
          {lang === 'mr'
            ? 'टीप: सर्व कामे पूर्ण केल्यावर शेतातील कीड प्रादुर्भाव आर्थिक नुकसान पातळीच्या आत राहतो आणि अनावश्यक औषध फवारणी टळते.'
            : 'Completing these 5 verified steps ensures pests remain below the 5% economic threshold without premature expensive sprays.'}
        </p>
      </div>
    </div>
  );
}


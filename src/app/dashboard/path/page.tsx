"use client";

import { motion } from "framer-motion";
import { CheckCircle2, CircleDashed, Lock, Sparkles, BrainCircuit, Play, FileText } from "lucide-react";

export default function LearningPathPage() {
  const roadmapSteps = [
    {
      id: 1,
      title: "Data Structures Basics",
      status: "completed",
      type: "module",
      duration: "4 hours",
    },
    {
      id: 2,
      title: "Recursion & Trees",
      status: "current",
      type: "focus",
      duration: "2 hours",
      reason: "Weakness detected in last quiz",
    },
    {
      id: 3,
      title: "Advanced Recursion Quiz",
      status: "locked",
      type: "quiz",
      duration: "30 mins",
    },
    {
      id: 4,
      title: "Dynamic Programming Intro",
      status: "locked",
      type: "module",
      duration: "3 hours",
    },
    {
      id: 5,
      title: "Algorithms Final Assessment",
      status: "locked",
      type: "exam",
      duration: "1 hour",
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <header className="mb-10 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-gray-200">AI Adaptive Path Enabled</span>
        </motion.div>
        <h1 className="text-3xl font-bold text-white mb-2">Your Personalized Roadmap</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Path dynamically adjusted based on your performance. Prioritizing <strong className="text-secondary">Recursion</strong> to improve your predicted exam score.</p>
      </header>

      <div className="relative border-l-2 border-white/10 ml-6 md:ml-12 space-y-12">
        {roadmapSteps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isCurrent = step.status === "current";
          
          return (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Timeline Dot */}
              <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full border-4 border-[#030014] flex items-center justify-center transition-colors ${
                isCompleted ? "bg-primary" : isCurrent ? "bg-secondary neon-border" : "bg-gray-800"
              }`}>
                {isCompleted && <CheckCircle2 className="w-4 h-4 text-white" />}
                {isCurrent && <CircleDashed className="w-4 h-4 text-[#030014] animate-spin-slow" />}
                {step.status === "locked" && <Lock className="w-3 h-3 text-gray-500" />}
              </div>

              {/* Content Card */}
              <div className={`glass-card p-6 rounded-xl border transition-all ${
                isCurrent ? "border-secondary/50 shadow-[0_0_20px_rgba(0,229,255,0.15)]" : "border-white/5 opacity-80"
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
                        step.type === 'focus' ? 'bg-red-500/20 text-red-400' : 
                        step.type === 'quiz' ? 'bg-primary/20 text-primary-light' : 
                        'bg-white/10 text-gray-300'
                      }`}>
                        {step.type}
                      </span>
                      <span className="text-gray-500 text-sm">{step.duration}</span>
                    </div>
                    <h3 className={`text-xl font-bold ${isCurrent ? 'text-white' : 'text-gray-300'}`}>{step.title}</h3>
                  </div>
                  
                  {isCurrent && (
                    <button className="px-6 py-2 rounded-lg bg-secondary text-[#030014] font-bold flex items-center gap-2 hover:bg-secondary/80 transition-colors">
                      <Play className="w-4 h-4" /> Start Now
                    </button>
                  )}
                  {isCompleted && (
                    <button className="px-4 py-2 rounded-lg border border-white/10 text-white font-medium flex items-center gap-2 hover:bg-white/5 transition-colors">
                      <FileText className="w-4 h-4" /> Review
                    </button>
                  )}
                </div>

                {step.reason && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 flex items-start gap-3 mt-2">
                    <BrainCircuit className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-200">
                      <strong>AI Intervention:</strong> {step.reason}. Mastering this will increase your predicted score by 12%.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

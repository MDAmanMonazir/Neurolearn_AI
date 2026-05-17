"use client";

import { motion } from "framer-motion";
import { Briefcase, Map, Star, Target, ArrowRight, BrainCircuit, Code, Terminal, Database } from "lucide-react";

export default function CareerRoadmapPage() {
  const careerSteps = [
    {
      id: 1,
      title: "Foundational Machine Learning",
      status: "completed",
      icon: <BrainCircuit className="w-5 h-5 text-white" />,
      skills: ["Python", "Scikit-learn", "Data Preprocessing"],
    },
    {
      id: 2,
      title: "Deep Learning & Neural Networks",
      status: "current",
      icon: <Target className="w-5 h-5 text-white" />,
      skills: ["TensorFlow", "PyTorch", "CNNs / RNNs"],
    },
    {
      id: 3,
      title: "LLMs and GenAI (IBM Granite)",
      status: "locked",
      icon: <Terminal className="w-5 h-5 text-gray-500" />,
      skills: ["Prompt Engineering", "Fine-tuning", "RAG"],
    },
    {
      id: 4,
      title: "MLOps & Deployment",
      status: "locked",
      icon: <Database className="w-5 h-5 text-gray-500" />,
      skills: ["Docker", "Kubernetes", "CI/CD for ML"],
    }
  ];

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
          <Briefcase className="w-8 h-8 text-primary" /> AI Career Roadmap
        </h1>
        <p className="text-gray-400">Your personalized path to becoming an <strong className="text-secondary">AI Engineer</strong>.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Roadmap */}
        <div className="lg:col-span-2 space-y-6">
          {careerSteps.map((step, idx) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";

            return (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.15 }}
                className={`glass-card p-6 border-l-4 transition-all ${
                  isCompleted ? "border-l-green-500 opacity-80" :
                  isCurrent ? "border-l-secondary shadow-[0_0_20px_rgba(0,229,255,0.15)]" :
                  "border-l-gray-700 opacity-50"
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? "bg-green-500" :
                    isCurrent ? "bg-gradient-to-r from-primary to-accent" :
                    "bg-gray-800"
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-sm text-gray-400">Step {idx + 1}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pl-14">
                  {step.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="text-xs font-medium px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                      {skill}
                    </span>
                  ))}
                </div>

                {isCurrent && (
                  <div className="pl-14 mt-6">
                    <button className="px-6 py-2 rounded-lg bg-secondary text-[#030014] font-bold flex items-center gap-2 hover:bg-secondary/80 transition-colors">
                      Continue Learning <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Career Stats & Suggestions */}
        <div className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Map className="w-5 h-5 text-primary" /> Goal Tracking
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-300">Overall Readiness</span>
                <span className="text-secondary font-bold">35%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[35%]"></div>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Based on your current learning speed, you are estimated to reach job-readiness by <strong>October 2026</strong>.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" /> Recommended Projects
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Code className="w-4 h-4 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Sentiment Analyzer</h4>
                  <p className="text-xs text-gray-400">Using standard NLP datasets.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Code className="w-4 h-4 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-white">Image Classifier API</h4>
                  <p className="text-xs text-gray-400">Deploy a CNN with FastAPI.</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

      </div>
    </div>
  );
}

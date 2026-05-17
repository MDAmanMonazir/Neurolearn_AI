"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Send, Image as ImageIcon, PlayCircle, BookOpen } from "lucide-react";

export default function AIExplainerPage() {
  const [query, setQuery] = useState("");
  const [isExplaining, setIsExplaining] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsExplaining(true);
    setTimeout(() => {
      setIsExplaining(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <BookOpen className="text-secondary" /> AI Concept Explainer
        </h1>
        <p className="text-gray-400">Ask any complex concept, and AI will break it down visually.</p>
      </header>

      {/* Main Chat/Explainer Area */}
      <div className="flex-1 glass-card p-6 flex flex-col relative overflow-hidden mb-6">
        {!showResult && !isExplaining && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 neon-border">
              <BrainCircuit className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">What do you want to learn today?</h2>
            <p className="text-gray-400 mb-8 max-w-md">Try asking about complex algorithms, mathematical proofs, or system architectures.</p>
            <div className="flex gap-2 flex-wrap justify-center">
              {["Explain recursion visually", "How do DBMS Joins work?", "What is Dynamic Programming?"].map((q) => (
                <button 
                  key={q} 
                  onClick={() => setQuery(q)}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-primary/20 hover:border-primary/50 transition-colors text-sm text-gray-300"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {isExplaining && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mb-4"
            />
            <p className="text-primary font-medium animate-pulse">Generating visual explanation...</p>
          </div>
        )}

        <AnimatePresence>
          {showResult && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 overflow-y-auto pr-2 space-y-6"
            >
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 w-3/4">
                <span className="text-xs text-secondary font-semibold uppercase tracking-wider mb-2 block">You</span>
                <p className="text-white text-lg">{query}</p>
              </div>

              <div className="bg-primary/10 p-6 rounded-xl border border-primary/30 w-full ml-auto space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <BrainCircuit className="text-primary w-5 h-5" />
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider">NeuroLearn AI</span>
                </div>
                
                <p className="text-gray-200 text-lg leading-relaxed">
                  Think of <strong className="text-secondary">Recursion</strong> like Russian nesting dolls or standing between two mirrors. A function calls itself to solve smaller instances of the same problem until it reaches a &quot;base case&quot; (the smallest doll) where it can finally stop.
                </p>

                {/* Simulated Interactive Visualization */}
                <div className="w-full h-64 bg-[#0a0a1a] rounded-xl border border-white/10 relative overflow-hidden flex items-center justify-center group cursor-pointer">
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2 py-1 rounded bg-white/10 text-xs text-white flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Visualization</span>
                  </div>
                  
                  {/* Fake Recursion Tree Animation */}
                  <div className="flex flex-col items-center gap-4">
                    <motion.div 
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                      className="w-12 h-12 rounded-full bg-primary/40 flex items-center justify-center border border-primary shadow-[0_0_15px_rgba(112,0,255,0.5)]"
                    >f(4)</motion.div>
                    <div className="flex gap-16">
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
                        className="w-10 h-10 rounded-full bg-secondary/40 flex items-center justify-center border border-secondary relative"
                      >
                        <svg className="absolute -top-8 left-1/2 w-8 h-8 -translate-x-1/2" viewBox="0 0 24 24"><path d="M12 2L4 10" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                        f(3)
                      </motion.div>
                      <motion.div 
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}
                        className="w-10 h-10 rounded-full bg-secondary/40 flex items-center justify-center border border-secondary relative"
                      >
                        <svg className="absolute -top-8 right-1/2 w-8 h-8 translate-x-1/2" viewBox="0 0 24 24"><path d="M12 2L20 10" stroke="currentColor" strokeWidth="2" fill="none"/></svg>
                        f(3)
                      </motion.div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <PlayCircle className="w-12 h-12 text-white" />
                  </div>
                </div>

                <div className="bg-black/30 p-4 rounded-lg border border-white/5">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Real-world Analogy:</h4>
                  <p className="text-sm text-gray-400">You are looking for a key in a set of boxes. Instead of opening one box and giving up, if you find another box inside, you apply the same &quot;open and look&quot; action to the inner box.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <form onSubmit={handleAsk} className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask me to explain any concept..."
          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 pr-16 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
        />
        <button 
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

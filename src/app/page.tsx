"use client";

import { motion } from "framer-motion";
import { ArrowRight, BrainCircuit, LineChart, Sparkles, UploadCloud, Zap } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10 absolute top-0">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-secondary" />
          <span className="text-2xl font-bold tracking-tight text-white">
            NeuroLearn <span className="text-gradient">AI</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="#features" className="hover:text-white transition-colors">Features</Link>
          <Link href="#demo" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-sm font-medium transition-all neon-border">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-6 mt-32 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-gray-200">The Future of Adaptive Learning</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8 leading-tight"
        >
          AI that learns <br />
          <span className="text-gradient">how YOU learn.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-gray-400 max-w-2xl mb-12"
        >
          NeuroLearn AI creates a fully personalized learning ecosystem that adapts to your unique style, predicts performance, and maximizes study efficiency.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold text-lg hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] transition-all flex items-center justify-center gap-2">
            Start Learning <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="/upload" className="w-full sm:w-auto px-8 py-4 rounded-full glass border border-white/10 hover:bg-white/5 text-white font-semibold text-lg transition-all flex items-center justify-center gap-2">
            <UploadCloud className="w-5 h-5" /> Upload Syllabus
          </Link>
        </motion.div>

        {/* Floating Feature Cards */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          <FeatureCard 
            icon={<BrainCircuit className="w-6 h-6 text-primary" />}
            title="Adaptive Roadmap"
            description="AI analyzes your weaknesses and generates a personalized study path dynamically."
            delay={0.5}
          />
          <FeatureCard 
            icon={<LineChart className="w-6 h-6 text-secondary" />}
            title="Performance Prediction"
            description="Predicts your exam scores and failure probability based on learning behavior."
            delay={0.6}
          />
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-accent" />}
            title="Real-Time Focus"
            description="Detects distraction and study fatigue, alerting you to take optimal breaks."
            delay={0.7}
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className="glass-card p-6 flex flex-col gap-4 group hover:-translate-y-2 transition-transform duration-300"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

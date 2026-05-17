"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, BrainCircuit, CheckCircle2, ArrowRight, FileCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UploadSyllabusPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const [topic, setTopic] = useState("");
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);

  const startAnalysis = async () => {
    if (!file && !topic) return;
    
    setIsAnalyzing(true);
    
    try {
      const formData = new FormData();
      if (file) formData.append("file", file);
      if (topic) formData.append("topic", topic);

      const response = await fetch("/api/generate-course", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate course");
      }

      const data = await response.json();
      setGeneratedCourse(data.course);
      
      setIsAnalyzing(false);
      setAnalysisComplete(true);
    } catch (error) {
      console.error(error);
      setIsAnalyzing(false);
      // Handle error state here if needed
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#030014] p-6">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none" />

      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 z-20">
        <BrainCircuit className="w-8 h-8 text-secondary" />
        <span className="text-xl font-bold tracking-tight text-white">
          NeuroLearn <span className="text-gradient">AI</span>
        </span>
      </Link>

      <div className="w-full max-w-2xl z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your Syllabus</h1>
          <p className="text-gray-400 text-lg">Let our AI analyze your coursework and build your personalized learning twin.</p>
        </div>

        {!isAnalyzing && !analysisComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-card p-12 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-center transition-all ${
              isDragging ? "border-primary bg-primary/5" : "border-white/20 bg-white/5"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="w-full mb-8">
              <input 
                type="text" 
                placeholder="Or enter a topic you want to learn..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-white focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {file ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                  <FileCheck className="w-10 h-10 text-green-400" />
                </div>
                <div>
                  <p className="text-xl font-bold text-white mb-1">{file.name}</p>
                  <p className="text-gray-400 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={startAnalysis}
                  className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all"
                >
                  Analyze with IBM Granite AI <BrainCircuit className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-primary/50 transition-colors">
                  <UploadCloud className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Drag & Drop your syllabus</h3>
                <p className="text-gray-400 mb-6">Supports PDF, DOCX, TXT (Max 10MB)</p>
                <div className="flex items-center gap-4">
                  <span className="h-px w-12 bg-white/10"></span>
                  <span className="text-sm text-gray-500 uppercase font-medium">Or</span>
                  <span className="h-px w-12 bg-white/10"></span>
                </div>
                <label className="mt-6 px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium cursor-pointer transition-all">
                  Browse Files
                  <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx,.txt" />
                </label>
                {topic && (
                  <button
                    onClick={startAnalysis}
                    className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all"
                  >
                    Analyze Topic with IBM Granite AI <BrainCircuit className="w-5 h-5" />
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-12 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center"
          >
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-white/10"></div>
              <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Analyzing Syllabus...</h3>
            <div className="space-y-2 text-gray-400">
              <p className="animate-pulse">Extracting key concepts...</p>
              <p className="animate-pulse" style={{ animationDelay: "0.5s" }}>Mapping dependencies...</p>
              <p className="animate-pulse" style={{ animationDelay: "1s" }}>Generating predictive roadmap...</p>
            </div>
          </motion.div>
        )}

        {analysisComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-12 rounded-3xl border border-green-500/30 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-primary"></div>
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6 neon-border">
              <CheckCircle2 className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Course Generated Successfully</h3>
            <p className="text-gray-400 mb-8 max-w-md">
              We&apos;ve created your AI Learning Twin and mapped out <strong>{generatedCourse?.modules?.length || 3} key modules</strong> for {generatedCourse?.title || "your course"}. Your personalized roadmap is ready.
            </p>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] transition-all flex items-center gap-2"
            >
              Go to Dashboard <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

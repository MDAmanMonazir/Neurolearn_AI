"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, BrainCircuit, Play, Pause, AlertCircle } from "lucide-react";

export default function VoiceTutorPage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const toggleListen = () => {
    if (!isListening) {
      setIsListening(true);
      setTranscript("Listening...");
      setTimeout(() => {
        setTranscript("Can you explain how Dynamic Programming differs from Recursion?");
        setIsListening(false);
        simulateAiResponse();
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  const simulateAiResponse = () => {
    setIsSpeaking(true);
    setAiResponse("Great question! Think of Recursion as solving a problem by breaking it down into smaller, identical problems. However, it often solves the same small problem multiple times, which is inefficient. \n\nDynamic Programming is like Recursion with a memory. It remembers the answers to the small problems so it never has to solve them twice. This 'memory' makes it much faster.");
    setTimeout(() => {
      setIsSpeaking(false);
    }, 8000);
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col relative pb-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Live AI Tutor</h1>
        <p className="text-gray-400">Speak naturally. Powered by IBM Watsonx Voice AI.</p>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* AI Avatar / Voice Visualizer */}
        <div className="relative w-48 h-48 mb-12 flex items-center justify-center">
          {isSpeaking && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full bg-primary/30 blur-2xl"
            />
          )}
          
          <div className={`relative z-10 w-32 h-32 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isSpeaking ? 'border-primary bg-primary/20 shadow-[0_0_40px_rgba(112,0,255,0.6)]' : 'border-white/10 bg-white/5'}`}>
            <BrainCircuit className={`w-16 h-16 transition-colors duration-500 ${isSpeaking ? 'text-white' : 'text-gray-500'}`} />
          </div>

          {/* Voice Waves */}
          {isSpeaking && (
            <div className="absolute -bottom-8 flex gap-1 items-end h-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: ["20%", "100%", "20%"] }}
                  transition={{ duration: 0.5 + (i * 0.1), repeat: Infinity, ease: "easeInOut" }}
                  className="w-1.5 bg-primary rounded-full"
                />
              ))}
            </div>
          )}
        </div>

        {/* Conversation Area */}
        <div className="w-full max-w-2xl glass-card p-6 rounded-2xl min-h-[160px] flex flex-col justify-end space-y-4 mb-12 border-white/10">
          {transcript && (
            <div className="flex justify-end">
              <div className="bg-white/10 text-white p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                {transcript}
              </div>
            </div>
          )}
          {aiResponse && (
            <div className="flex justify-start">
              <div className="bg-primary/20 border border-primary/30 text-white p-4 rounded-2xl rounded-tl-sm max-w-[90%]">
                {aiResponse}
              </div>
            </div>
          )}
          {!transcript && !aiResponse && (
            <div className="text-center text-gray-500 italic h-full flex items-center justify-center">
              Tap the microphone to start asking questions...
            </div>
          )}
        </div>

        {/* Emotion/Focus Alert - WOW Feature */}
        <AnimatePresence>
          {!isSpeaking && !isListening && transcript && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-0 top-0 bg-red-500/10 border border-red-500/30 rounded-xl p-4 max-w-xs"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                <p className="text-sm text-red-200">
                  <strong className="block text-red-400 mb-1">Emotion AI Detected:</strong> 
                  Frustration in voice tone. Tutor pacing has been reduced by 15% for better understanding.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Controls */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
          <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
            <Settings className="w-5 h-5" />
          </button>
          
          <button 
            onClick={toggleListen}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600 shadow-[0_0_30px_rgba(239,68,68,0.5)]' 
                : 'bg-gradient-to-r from-primary to-accent hover:shadow-[0_0_30px_rgba(112,0,255,0.6)]'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </button>

          <button className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors text-white">
            {isSpeaking ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// Dummy Settings component for icon
function Settings(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}


"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Target, ArrowRight, BrainCircuit, AlertCircle } from "lucide-react";

export default function AIQuizPage() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const questions = [
    {
      id: 1,
      topic: "Recursion",
      difficulty: "Medium",
      question: "What is the time complexity of a recursive Fibonacci function without memoization?",
      options: ["O(n)", "O(n log n)", "O(2^n)", "O(1)"],
      correct: 2,
      explanation: "Without memoization, the function recalculates the same subproblems repeatedly, leading to an exponential time complexity of O(2^n)."
    },
    {
      id: 2,
      topic: "DBMS Joins",
      difficulty: "Hard",
      question: "Which JOIN returns all rows from the left table, and the matched rows from the right table?",
      options: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"],
      correct: 1,
      explanation: "A LEFT JOIN returns all records from the left table, and the matched records from the right table. If no match is found, NULL values are returned for right table columns."
    }
  ];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer
    setSelectedAnswer(index);
    setIsCorrect(index === questions[currentQuestion].correct);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      // End of quiz logic
      alert("Quiz Completed! AI is adjusting your roadmap...");
    }
  };

  if (!started) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6 neon-border">
          <Zap className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4">Adaptive AI Quiz</h1>
        <p className="text-gray-400 mb-8 text-lg">
          This quiz will adapt to your answers in real-time. We are focusing on your weak areas: <strong className="text-white">Recursion</strong> and <strong className="text-white">DBMS</strong>.
        </p>
        <button 
          onClick={() => setStarted(true)}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(112,0,255,0.6)] transition-all flex items-center gap-2"
        >
          Start Evaluation <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Target className="text-secondary w-6 h-6" />
          <span className="text-xl font-bold text-white">Question {currentQuestion + 1} of {questions.length}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-400">Topic: <span className="text-white">{q.topic}</span></span>
          <span className="px-3 py-1 rounded bg-orange-500/20 text-orange-400 text-xs font-bold uppercase">{q.difficulty}</span>
        </div>
      </div>

      <motion.div 
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass-card p-8 mb-8"
      >
        <h2 className="text-2xl font-semibold text-white mb-8 leading-relaxed">{q.question}</h2>

        <div className="space-y-4">
          {q.options.map((opt, idx) => {
            let btnClass = "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300";
            if (selectedAnswer !== null) {
              if (idx === q.correct) btnClass = "bg-green-500/20 border-green-500/50 text-green-400";
              else if (idx === selectedAnswer) btnClass = "bg-red-500/20 border-red-500/50 text-red-400";
              else btnClass = "bg-white/5 border-white/10 opacity-50 text-gray-500";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left px-6 py-4 rounded-xl border transition-all ${btnClass} flex items-center justify-between`}
              >
                <span className="text-lg">{opt}</span>
                {selectedAnswer !== null && idx === q.correct && <Zap className="w-5 h-5 text-green-400" />}
              </button>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedAnswer !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 border-l-4 border-l-primary flex flex-col gap-4"
          >
            <div className="flex items-start gap-3">
              <BrainCircuit className={`w-6 h-6 shrink-0 ${isCorrect ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <h3 className={`font-bold text-lg mb-1 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect.'}
                </h3>
                <p className="text-gray-300">{q.explanation}</p>
              </div>
            </div>
            
            {!isCorrect && (
              <div className="bg-white/5 rounded-lg p-3 mt-2 flex items-center gap-2 text-sm text-gray-400">
                <AlertCircle className="w-4 h-4 text-secondary" />
                AI has noted this weakness. Complexity of next question will be reduced.
              </div>
            )}

            <button 
              onClick={nextQuestion}
              className="mt-2 self-end px-6 py-2 rounded-lg bg-primary text-white font-medium hover:bg-primary/80 transition-colors flex items-center gap-2"
            >
              Next Question <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

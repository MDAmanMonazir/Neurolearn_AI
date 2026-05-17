"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Target, Award, Star, ChevronRight, Crown } from "lucide-react";

export default function RewardsPage() {
  const achievements = [
    { id: 1, title: "Consistent Coder", desc: "Studied 7 days in a row", icon: <Flame className="w-6 h-6 text-orange-500" />, unlocked: true },
    { id: 2, title: "Quiz Master", desc: "Scored 100% on 5 hard quizzes", icon: <Star className="w-6 h-6 text-yellow-500" />, unlocked: true },
    { id: 3, title: "Focus Champion", desc: "Maintained deep focus for 2 hours", icon: <Target className="w-6 h-6 text-primary" />, unlocked: false },
    { id: 4, title: "Algorithm God", desc: "Mastered all algorithm modules", icon: <Crown className="w-6 h-6 text-yellow-400" />, unlocked: false },
  ];

  const leaderboards = [
    { rank: 1, name: "Sarah J.", xp: 12450, isUser: false },
    { rank: 2, name: "Michael T.", xp: 11200, isUser: false },
    { rank: 3, name: "Alex (You)", xp: 9850, isUser: true },
    { rank: 4, name: "David L.", xp: 9100, isUser: false },
    { rank: 5, name: "Emma W.", xp: 8400, isUser: false },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Rewards & Gamification</h1>
        <p className="text-gray-400">Keep up the momentum to level up your AI Learning Twin.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Stats */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Level Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
            
            <div className="flex items-center gap-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center">
                  <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">
                    14
                  </span>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                  <Flame className="w-3 h-3" /> 7d
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Level 14 Scholar</h2>
                    <p className="text-gray-400 text-sm">Top 15% in Computer Science</p>
                  </div>
                  <span className="text-primary font-bold">9,850 XP</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-accent w-[75%] relative">
                    <div className="absolute inset-0 bg-white/20 w-full animate-pulse"></div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-right">150 XP to next level</p>
              </div>
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Award className="text-secondary w-5 h-5" /> Badges & Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(ach => (
                <div key={ach.id} className={`p-4 rounded-xl border flex items-center gap-4 transition-all ${ach.unlocked ? 'bg-white/5 border-white/10' : 'bg-white/5 border-white/5 opacity-50 grayscale'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${ach.unlocked ? 'bg-white/10' : 'bg-gray-800'}`}>
                    {ach.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-bold">{ach.title}</h4>
                    <p className="text-xs text-gray-400">{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Leaderboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 flex flex-col"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Trophy className="text-yellow-400 w-5 h-5" /> Leaderboard
            </h3>
            <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 outline-none">
              <option>Global</option>
              <option>Friends</option>
            </select>
          </div>

          <div className="space-y-4 flex-1">
            {leaderboards.map((user) => (
              <div 
                key={user.rank} 
                className={`flex items-center justify-between p-3 rounded-xl transition-all ${user.isUser ? 'bg-primary/20 border border-primary/30' : 'hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 text-center font-bold text-sm ${
                    user.rank === 1 ? 'text-yellow-400' : 
                    user.rank === 2 ? 'text-gray-300' : 
                    user.rank === 3 ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    {user.rank}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10">
                    <span className="text-xs font-bold text-white">{user.name.charAt(0)}</span>
                  </div>
                  <span className={`font-medium text-sm ${user.isUser ? 'text-white' : 'text-gray-300'}`}>{user.name}</span>
                </div>
                <span className="text-sm font-bold text-primary-light">{user.xp} XP</span>
              </div>
            ))}
          </div>

          <button className="mt-6 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors flex items-center justify-center gap-1">
            View Full Rankings <ChevronRight className="w-4 h-4" />
          </button>
        </motion.div>

      </div>
    </div>
  );
}

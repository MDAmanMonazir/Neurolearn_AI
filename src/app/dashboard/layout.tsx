"use client";

import { BrainCircuit, LayoutDashboard, Target, Zap, Settings, BookOpen, BarChart3, LogOut, Trophy, Briefcase, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Overview", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: "Find Courses", href: "/dashboard/courses", icon: <Search className="w-5 h-5" /> },
    { name: "AI Quiz", href: "/dashboard/quiz", icon: <Zap className="w-5 h-5" /> },
    { name: "Learning Path", href: "/dashboard/path", icon: <Target className="w-5 h-5" /> },
    { name: "AI Explainer", href: "/dashboard/explainer", icon: <BookOpen className="w-5 h-5" /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Voice Tutor", href: "/dashboard/tutor", icon: <BrainCircuit className="w-5 h-5" /> },
    { name: "Rewards", href: "/dashboard/rewards", icon: <Trophy className="w-5 h-5" /> },
    { name: "Career Plan", href: "/dashboard/career", icon: <Briefcase className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-[#030014] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 glass-card rounded-none h-screen sticky top-0 flex flex-col hidden md:flex z-50">
        <div className="p-6 flex items-center gap-2">
          <BrainCircuit className="w-8 h-8 text-secondary" />
          <span className="text-xl font-bold tracking-tight">
            NeuroLearn <span className="text-gradient">AI</span>
          </span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-primary/20 text-white border border-primary/30 shadow-[0_0_15px_rgba(112,0,255,0.2)]"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className={`${isActive ? "text-secondary" : "text-gray-400"}`}>{item.icon}</div>
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10">
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all mb-2">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </Link>
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Log Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-64 bg-primary/10 blur-[100px] pointer-events-none" />
        <div className="p-8 w-full max-w-7xl mx-auto z-10">
          {children}
        </div>
      </main>
    </div>
  );
}

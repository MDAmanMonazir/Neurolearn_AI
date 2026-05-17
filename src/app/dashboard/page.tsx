"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "react-circular-progressbar/dist/styles.css";
import { AlertTriangle, TrendingUp, CheckCircle, Zap, Brain, ArrowRight, BrainCircuit } from "lucide-react";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface Topic {
  name: string;
  progress: number;
  status: string;
  color: string;
}

interface CourseData {
  topics: Topic[];
  actionDesc: string;
}

const courseDataMap: Record<string, CourseData> = {
  cs101: {
    topics: [
      { name: "Recursion Trees", progress: 30, status: "Critical", color: "bg-red-500" },
      { name: "DBMS Joins", progress: 45, status: "Needs Work", color: "bg-orange-500" },
      { name: "Dynamic Programming", progress: 60, status: "Improving", color: "bg-yellow-500" },
    ],
    actionDesc: "Focus on Recursion & DBMS to improve weak areas.",
  },
  webdev: {
    topics: [
      { name: "React Server Components", progress: 20, status: "Critical", color: "bg-red-500" },
      { name: "CSS Grid Layout", progress: 50, status: "Needs Work", color: "bg-orange-500" },
      { name: "API Integration", progress: 75, status: "Improving", color: "bg-yellow-500" },
    ],
    actionDesc: "Focus on React Server Components and data fetching.",
  },
  ml: {
    topics: [
      { name: "Backpropagation", progress: 15, status: "Critical", color: "bg-red-500" },
      { name: "CNN Architecture", progress: 40, status: "Needs Work", color: "bg-orange-500" },
      { name: "Gradient Descent", progress: 65, status: "Improving", color: "bg-yellow-500" },
    ],
    actionDesc: "Review Backpropagation math and run CNN simulations.",
  },
  dbms: {
    topics: [
      { name: "B-Tree Indexing", progress: 25, status: "Critical", color: "bg-red-500" },
      { name: "ACID Properties", progress: 55, status: "Needs Work", color: "bg-orange-500" },
      { name: "Query Optimization", progress: 80, status: "Improving", color: "bg-yellow-500" },
    ],
    actionDesc: "Practice B-Tree construction and query plans.",
  }
};

export default function DashboardOverview() {
  const [courseTitle, setCourseTitle] = useState("Computer Science 101");
  const [courseId, setCourseId] = useState("cs101");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedTitle = localStorage.getItem("neurolearn_active_course_title");
    const savedId = localStorage.getItem("neurolearn_active_course_id");
    
    if (savedTitle && savedId) {
      setCourseTitle(savedTitle);
      setCourseId(savedId);
    }
  }, []);

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Learning Efficiency",
        data: [65, 72, 68, 81, 79, 88, 92],
        borderColor: "#00e5ff",
        backgroundColor: "rgba(0, 229, 255, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: "rgba(255, 255, 255, 0.05)" }, border: { dash: [4, 4] } },
      x: { grid: { display: false } },
    },
  };

  const activeData = courseDataMap[courseId] || courseDataMap["cs101"];

  if (!mounted) return null; // Avoid hydration mismatch

  return (
    <div className="space-y-6 pb-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex</h1>
        <p className="text-gray-400">Your AI is optimizing your learning path for <span className="text-secondary font-medium">{courseTitle}</span>.</p>
      </header>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricCard title="Overall Progress" value="78%" icon={<TrendingUp className="text-green-400" />} />
        <MetricCard title="Predicted Score" value="A-" icon={<Zap className="text-secondary" />} subtitle="Up from B+" />
        <MetricCard title="Focus Level" value="High" icon={<Brain className="text-primary" />} subtitle="Optimal state" />
        <MetricCard title="Topics Mastered" value="24/30" icon={<CheckCircle className="text-blue-400" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 lg:col-span-2 flex flex-col"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Efficiency Trend</h2>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-300 outline-none">
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="flex-1 min-h-[250px]">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </motion.div>

        {/* Weak Topics Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass-card p-6 flex flex-col"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-400 w-5 h-5" /> Weak Concepts
          </h2>
          <div className="space-y-4 flex-1">
            {activeData.topics.map((t: Topic, idx: number) => (
              <WeakTopicItem key={idx} name={t.name} progress={t.progress} status={t.status} color={t.color} />
            ))}
          </div>
          <Link href="/dashboard/path" className="mt-6 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium transition-colors">
            Generate Recovery Path <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <BrainCircuit className="text-primary w-5 h-5" /> AI Recommended Action Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard 
            title="Take Adaptive Quiz"
            desc={activeData.actionDesc}
            time="15 mins"
            href="/dashboard/quiz"
          />
          <ActionCard 
            title="Review Visual Concept"
            desc="AI Explainer generated a 3D animation for your weak area."
            time="5 mins"
            href="/dashboard/explainer"
          />
          <ActionCard 
            title="Rest Recommended"
            desc="You've been studying for 2 hours. High fatigue detected."
            time="Break"
            href="#"
            isAlert
          />
        </div>
      </motion.div>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  subtitle?: string;
}

function MetricCard({ title, value, icon, subtitle }: MetricCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass-card p-5 flex flex-col gap-2"
    >
      <div className="flex justify-between items-start">
        <span className="text-gray-400 text-sm font-medium">{title}</span>
        <div className="p-2 rounded-lg bg-white/5">{icon}</div>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
      {subtitle && <div className="text-xs text-gray-500">{subtitle}</div>}
    </motion.div>
  );
}

interface WeakTopicItemProps {
  name: string;
  progress: number;
  status: string;
  color: string;
}

function WeakTopicItem({ name, progress, status, color }: WeakTopicItemProps) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-white font-medium">{name}</span>
        <span className="text-gray-400">{status}</span>
      </div>
      <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  desc: string;
  time: string;
  href: string;
  isAlert?: boolean;
}

function ActionCard({ title, desc, time, href, isAlert }: ActionCardProps) {
  return (
    <Link href={href} className={`block p-5 rounded-xl border transition-all hover:-translate-y-1 ${isAlert ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-white">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-md ${isAlert ? 'bg-red-500/20 text-red-300' : 'bg-primary/20 text-primary-light'}`}>{time}</span>
      </div>
      <p className="text-sm text-gray-400">{desc}</p>
    </Link>
  );
}

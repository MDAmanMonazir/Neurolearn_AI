"use client";

import { motion } from "framer-motion";
import { Bar, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { TrendingUp, Users, AlertTriangle, Target } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const barData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
    datasets: [
      {
        label: "Class Average Score",
        data: [65, 68, 72, 75, 82, 85],
        backgroundColor: "rgba(112, 0, 255, 0.6)",
        borderRadius: 4,
      },
      {
        label: "AI Predicted Score",
        data: [70, 75, 78, 80, 85, 90],
        backgroundColor: "rgba(0, 229, 255, 0.6)",
        borderRadius: 4,
      }
    ],
  };

  const radarData = {
    labels: ["Algorithms", "Data Structures", "Databases", "System Design", "Networking", "OS"],
    datasets: [
      {
        label: "Student Cohort A",
        data: [85, 90, 65, 70, 80, 75],
        backgroundColor: "rgba(112, 0, 255, 0.2)",
        borderColor: "rgba(112, 0, 255, 1)",
        borderWidth: 2,
      },
      {
        label: "Required Benchmark",
        data: [80, 80, 80, 80, 80, 80],
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderDash: [5, 5],
        borderWidth: 2,
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: "rgba(255, 255, 255, 0.7)" } }
    },
    scales: {
      y: { grid: { color: "rgba(255, 255, 255, 0.1)" }, ticks: { color: "rgba(255, 255, 255, 0.7)" } },
      x: { grid: { display: false }, ticks: { color: "rgba(255, 255, 255, 0.7)" } },
    },
  };

  const radarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: { color: "rgba(255, 255, 255, 0.1)" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        pointLabels: { color: "rgba(255, 255, 255, 0.7)", font: { size: 12 } },
        ticks: { display: false, max: 100, min: 0 }
      }
    },
    plugins: {
      legend: { labels: { color: "rgba(255, 255, 255, 0.7)" } }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Predictive Analytics</h1>
          <p className="text-gray-400">Class performance and AI risk detection overview.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/10 rounded-lg text-sm text-white hover:bg-white/20 transition">Export Report</button>
        </div>
      </header>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total Students" value="1,248" icon={<Users />} trend="+12%" />
        <StatCard title="Avg Exam Prediction" value="82%" icon={<TrendingUp />} trend="+4%" color="text-green-400" />
        <StatCard title="At-Risk Students" value="45" icon={<AlertTriangle />} trend="-5" color="text-red-400" />
        <StatCard title="Learning Efficiency" value="94%" icon={<Target />} trend="+2%" color="text-secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 min-h-[400px] flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Performance Trajectory</h2>
          <div className="flex-1">
            <Bar data={barData} options={chartOptions} />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 min-h-[400px] flex flex-col">
          <h2 className="text-xl font-bold text-white mb-6">Cohort Skill Distribution</h2>
          <div className="flex-1">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </motion.div>
      </div>

      {/* Weak Students List */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 mt-6">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <AlertTriangle className="text-red-400" /> AI Risk Detection (Early Warning)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-gray-400 text-sm">
                <th className="pb-3 font-medium">Student Name</th>
                <th className="pb-3 font-medium">Weakest Subject</th>
                <th className="pb-3 font-medium">Failure Probability</th>
                <th className="pb-3 font-medium">AI Action Taken</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-300">
              <tr className="border-b border-white/5">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">JD</div>
                  John Doe
                </td>
                <td className="py-4 text-orange-400">DBMS</td>
                <td className="py-4"><span className="text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">78%</span></td>
                <td className="py-4">Generated 10 basic SQL quizzes</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center font-bold">AS</div>
                  Alice Smith
                </td>
                <td className="py-4 text-orange-400">System Design</td>
                <td className="py-4"><span className="text-orange-400 font-bold bg-orange-500/10 px-2 py-1 rounded">55%</span></td>
                <td className="py-4">Assigned AI Visual Explainer</td>
              </tr>
              <tr>
                <td className="py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">RJ</div>
                  Robert Jones
                </td>
                <td className="py-4 text-orange-400">Recursion</td>
                <td className="py-4"><span className="text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">82%</span></td>
                <td className="py-4 text-primary">Alerted Human Tutor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color?: string;
}

function StatCard({ title, value, icon, trend, color = "text-white" }: StatCardProps) {
  return (
    <div className="glass-card p-5 border-l-4 border-l-primary/50 flex flex-col gap-3">
      <div className="flex justify-between items-start text-gray-400">
        <span className="text-sm font-medium">{title}</span>
        {icon}
      </div>
      <div className="flex items-baseline gap-3">
        <span className={`text-3xl font-bold ${color}`}>{value}</span>
        <span className="text-xs font-medium text-gray-400">{trend}</span>
      </div>
    </div>
  );
}

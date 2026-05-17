"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Database, BrainCircuit, Globe, Cpu, ArrowRight, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Computer Science", "Web Development", "AI & Data", "Systems"];

  const courses = [
    {
      id: "cs101",
      title: "Computer Science 101",
      category: "Computer Science",
      icon: <Cpu className="w-8 h-8 text-blue-400" />,
      color: "from-blue-500/20 to-blue-900/20",
      borderColor: "border-blue-500/30",
      description: "Foundational algorithms, data structures, and problem-solving.",
      students: "12.4k",
      rating: 4.9,
    },
    {
      id: "webdev",
      title: "Modern Web Development",
      category: "Web Development",
      icon: <Globe className="w-8 h-8 text-green-400" />,
      color: "from-green-500/20 to-green-900/20",
      borderColor: "border-green-500/30",
      description: "Master React, Next.js, full-stack architecture, and UI/UX.",
      students: "8.2k",
      rating: 4.8,
    },
    {
      id: "ml",
      title: "Machine Learning & AI",
      category: "AI & Data",
      icon: <BrainCircuit className="w-8 h-8 text-primary" />,
      color: "from-primary/20 to-accent/20",
      borderColor: "border-primary/30",
      description: "Neural networks, deep learning, and generative AI models.",
      students: "15.1k",
      rating: 4.9,
    },
    {
      id: "dbms",
      title: "Advanced Databases",
      category: "Systems",
      icon: <Database className="w-8 h-8 text-orange-400" />,
      color: "from-orange-500/20 to-orange-900/20",
      borderColor: "border-orange-500/30",
      description: "SQL, NoSQL, indexing, transactions, and distributed data.",
      students: "5.6k",
      rating: 4.7,
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || course.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: string, courseTitle: string) => {
    // Save to local storage so the dashboard can update its environment
    localStorage.setItem("neurolearn_active_course_id", courseId);
    localStorage.setItem("neurolearn_active_course_title", courseTitle);
    
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-4">Discover Courses</h1>
        <p className="text-gray-400 text-lg">Search for new subjects. Your AI Twin will instantly adapt the learning environment to your chosen course.</p>
      </header>

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search for algorithms, web dev, Python..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-lg"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-4 rounded-2xl font-medium transition-all ${
                activeCategory === cat 
                  ? "bg-primary text-white shadow-[0_0_20px_rgba(112,0,255,0.4)]" 
                  : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {filteredCourses.map((course) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={course.id}
              className={`glass-card p-6 rounded-3xl border transition-all hover:-translate-y-1 group bg-gradient-to-br ${course.color} ${course.borderColor}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border ${course.borderColor}`}>
                  {course.icon}
                </div>
                <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm font-bold">{course.rating}</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">{course.category}</span>
                <h2 className="text-2xl font-bold text-white mb-2">{course.title}</h2>
                <p className="text-gray-300 line-clamp-2">{course.description}</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Globe className="w-4 h-4" /> {course.students} students
                </div>
                <button 
                  onClick={() => handleEnroll(course.id, course.title)}
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-gray-200 transition-colors"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
          
          {/* Infinite AI Course Generator Card */}
          {searchQuery && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="glass-card p-6 rounded-3xl border border-primary/30 bg-gradient-to-br from-primary/10 to-accent/10 transition-all hover:-translate-y-1 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3">
                <span className="px-2 py-1 rounded bg-primary/20 text-[10px] font-bold text-primary-light uppercase tracking-widest border border-primary/30">AI Generated</span>
              </div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center backdrop-blur-md border border-primary/30 animate-pulse">
                  <BrainCircuit className="w-8 h-8 text-primary" />
                </div>
                <div className="flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-white text-sm font-bold">5.0</span>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-light mb-2 block">New Concept</span>
                <h2 className="text-2xl font-bold text-white mb-2">{searchQuery}</h2>
                <p className="text-gray-300 line-clamp-2">Our AI is ready to generate a personalized curriculum, quizzes, and learning path for "{searchQuery}".</p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Globe className="w-4 h-4" /> Instant Enrollment
                </div>
                <button 
                  onClick={() => handleEnroll(`custom-${searchQuery.toLowerCase().replace(/\s+/g, '-')}`, searchQuery)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(112,0,255,0.4)] transition-all"
                >
                  Generate Course <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredCourses.length === 0 && !searchQuery && (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Search className="w-10 h-10 text-gray-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

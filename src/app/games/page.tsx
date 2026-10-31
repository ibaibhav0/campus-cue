"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const games = [
  {
    title: "Love Calculator",
    description: "Find out your love compatibility with a fun percentage-based calculator!",
    icon: "💘",
    href: "/love-calculator",
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "hover:border-pink-500/40",
    glow: "group-hover:shadow-pink-500/10",
  },
  {
    title: "FLAMES Calculator",
    description: "The classic FLAMES game — discover your relationship destiny!",
    icon: "🔥",
    href: "/flames-calculator",
    gradient: "from-orange-500/20 to-rose-500/20",
    border: "hover:border-orange-500/40",
    glow: "group-hover:shadow-orange-500/10",
  },
  {
    title: "Truth or Dare",
    description: "Spice things up with college-themed truths and daring challenges!",
    icon: "🎯",
    href: "/games/truth-or-dare",
    gradient: "from-purple-500/20 to-indigo-500/20",
    border: "hover:border-purple-500/40",
    glow: "group-hover:shadow-purple-500/10",
  },
  {
    title: "Would You Rather",
    description: "Make tough choices between two fun options and see what it says about you!",
    icon: "🤔",
    href: "/games/would-you-rather",
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "hover:border-cyan-500/40",
    glow: "group-hover:shadow-cyan-500/10",
  },
  {
    title: "This or That",
    description: "Quick-fire choices that reveal your personality. Coffee or tea?",
    icon: "⚡",
    href: "/games/this-or-that",
    gradient: "from-yellow-500/20 to-amber-500/20",
    border: "hover:border-yellow-500/40",
    glow: "group-hover:shadow-yellow-500/10",
  },
  {
    title: "Compatibility Quiz",
    description: "Take a quiz with your partner and discover your compatibility score!",
    icon: "📋",
    href: "/games/compatibility-quiz",
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "hover:border-emerald-500/40",
    glow: "group-hover:shadow-emerald-500/10",
  },
];

export default function GamesHubPage() {
  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Games & Fun
          </h1>
          <p className="text-gray-400 text-lg">
            Break the ice, have fun, and discover more about each other! 🎮
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((game, i) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link href={game.href} className="group block h-full">
                <div
                  className={`h-full rounded-2xl border border-white/10 ${game.border} bg-gradient-to-br ${game.gradient} bg-white/[0.02] backdrop-blur-xl p-6 transition-all duration-300 shadow-lg shadow-transparent ${game.glow} group-hover:-translate-y-1`}
                >
                  <motion.span
                    className="text-4xl block mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {game.icon}
                  </motion.span>
                  <h2 className="text-lg font-semibold text-white mb-2 group-hover:text-pink-300 transition">
                    {game.title}
                  </h2>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {game.description}
                  </p>
                  <div className="mt-4 text-xs text-gray-500 group-hover:text-pink-400/70 transition flex items-center gap-1">
                    Play now →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

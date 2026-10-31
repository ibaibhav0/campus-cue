"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

function hashNames(name1: string, name2: string): number {
  const combined = (name1 + "♥" + name2).toLowerCase().replace(/\s/g, "");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    const char = combined.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash % 101);
}

function getMessage(percent: number) {
  if (percent <= 20) return "Maybe you're better as friends... for now! 💔";
  if (percent <= 40) return "There's a small spark! Keep trying! ✨";
  if (percent <= 60) return "Not bad! There's definitely something there! 💕";
  if (percent <= 80) return "Great chemistry! You two could be amazing together! 💖";
  return "Perfect match! You're meant to be! 💘";
}

function FloatingHearts() {
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 14 + Math.random() * 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-pink-500"
          style={{ left: `${h.x}%`, fontSize: h.size, bottom: -30 }}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -800, opacity: 0 }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </div>
  );
}

function CircularProgress({ percent }: { percent: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-52 h-52 mx-auto">
      <svg className="w-52 h-52 -rotate-90" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#1f1f2e"
          strokeWidth="12"
          fill="none"
        />
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
        </defs>
      </svg>
      <motion.span
        className="absolute text-5xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        {percent}%
      </motion.span>
    </div>
  );
}

export default function LoveCalculatorPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  const calculate = useCallback(() => {
    if (!name1.trim() || !name2.trim()) return;
    setCalculating(true);
    setResult(null);
    setTimeout(() => {
      const percent = hashNames(name1.trim(), name2.trim());
      setResult(percent);
      setCalculating(false);
    }, 1500);
  }, [name1, name2]);

  const reset = () => {
    setName1("");
    setName2("");
    setResult(null);
  };

  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      {result !== null && <FloatingHearts />}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-16">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-pink-400 transition mb-8"
        >
          ← Back to Games
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
            Love Calculator
          </h1>
          <p className="text-gray-400">Find out your love compatibility! 💘</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8"
        >
          <AnimatePresence mode="wait">
            {result === null ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition"
                  />
                </div>

                <div className="flex justify-center">
                  <motion.span
                    className="text-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    💕
                  </motion.span>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">
                    Your Crush&apos;s Name
                  </label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter your crush's name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition"
                  />
                </div>

                <motion.button
                  onClick={calculate}
                  disabled={!name1.trim() || !name2.trim() || calculating}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-shadow"
                >
                  {calculating ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      💫
                    </motion.span>
                  ) : (
                    <>❤️ Calculate</>
                  )}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-6"
              >
                <p className="text-gray-400">
                  <span className="text-pink-400 font-medium">{name1}</span>
                  {" & "}
                  <span className="text-rose-400 font-medium">{name2}</span>
                </p>

                <CircularProgress percent={result} />

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="text-lg text-gray-300"
                >
                  {getMessage(result)}
                </motion.p>

                <motion.button
                  onClick={reset}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl border border-pink-500/30 text-pink-400 hover:bg-pink-500/10 transition font-medium"
                >
                  Try Again 💕
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-600 mt-6"
        >
          ⚡ This is just for fun! Real connections are built through
          conversation.
        </motion.p>
      </div>
    </main>
  );
}

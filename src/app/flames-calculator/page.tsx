"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FLAMES_MAP: Record<string, { label: string; emoji: string; color: string; desc: string }> = {
  F: { label: "Friends", emoji: "👫", color: "from-blue-400 to-cyan-400", desc: "You two are destined to be great friends! A solid bond built on trust and fun." },
  L: { label: "Love", emoji: "❤️", color: "from-pink-500 to-rose-500", desc: "Love is in the air! The stars say romance is your destiny together." },
  A: { label: "Affection", emoji: "💕", color: "from-purple-400 to-pink-400", desc: "There's a sweet affection between you two. Warm feelings and tender moments await!" },
  M: { label: "Marriage", emoji: "💍", color: "from-yellow-400 to-amber-400", desc: "Wedding bells are ringing! Looks like you two might go all the way!" },
  E: { label: "Enemies", emoji: "⚔️", color: "from-red-500 to-orange-500", desc: "Uh oh... rivalry detected! But hey, enemies-to-lovers is a classic trope. 😏" },
  S: { label: "Siblings", emoji: "👨‍👩‍👧", color: "from-green-400 to-emerald-400", desc: "You have a sibling-like bond! Comfortable, caring, and always there for each other." },
};

function computeFlames(n1: string, n2: string): { result: string; steps: string[][] } {
  const a = n1.toLowerCase().replace(/[^a-z]/g, "").split("");
  const b = n2.toLowerCase().replace(/[^a-z]/g, "").split("");

  const usedA = new Array(a.length).fill(false);
  const usedB = new Array(b.length).fill(false);

  for (let i = 0; i < a.length; i++) {
    if (usedA[i]) continue;
    for (let j = 0; j < b.length; j++) {
      if (usedB[j]) continue;
      if (a[i] === b[j]) {
        usedA[i] = true;
        usedB[j] = true;
        break;
      }
    }
  }

  const remaining = usedA.filter((u) => !u).length + usedB.filter((u) => !u).length;
  if (remaining === 0) return { result: "L", steps: [] };

  let flames = ["F", "L", "A", "M", "E", "S"];
  const steps: string[][] = [["F", "L", "A", "M", "E", "S"]];

  let idx = 0;
  while (flames.length > 1) {
    idx = (idx + remaining - 1) % flames.length;
    flames = flames.filter((_, i) => i !== idx);
    steps.push([...flames]);
    if (idx >= flames.length) idx = 0;
  }

  return { result: flames[0], steps };
}

function ConfettiEffect() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: ["#ec4899", "#f43f5e", "#a855f7", "#eab308", "#22d3ee", "#34d399"][
      Math.floor(Math.random() * 6)
    ],
    delay: Math.random() * 0.5,
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-sm"
          style={{
            left: `${p.x}%`,
            top: -10,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          initial={{ y: 0, rotate: 0, opacity: 1 }}
          animate={{ y: 800, rotate: 720, opacity: 0 }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            delay: p.delay,
            ease: "easeIn",
          }}
        />
      ))}
    </div>
  );
}

export default function FlamesCalculatorPage() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[][]>([]);
  const [showSteps, setShowSteps] = useState(false);
  const [calculating, setCalculating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const calculate = useCallback(() => {
    if (!name1.trim() || !name2.trim()) return;
    setCalculating(true);
    setResult(null);
    setShowSteps(false);
    setShowConfetti(false);

    setTimeout(() => {
      const { result: r, steps: s } = computeFlames(name1.trim(), name2.trim());
      setResult(r);
      setSteps(s);
      setCalculating(false);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
    }, 1800);
  }, [name1, name2]);

  const reset = () => {
    setName1("");
    setName2("");
    setResult(null);
    setSteps([]);
    setShowSteps(false);
    setShowConfetti(false);
  };

  const info = result ? FLAMES_MAP[result] : null;

  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      {showConfetti && <ConfettiEffect />}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-16">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-orange-400 transition mb-8"
        >
          ← Back to Games
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-orange-400 via-rose-400 to-pink-500 bg-clip-text text-transparent">
            FLAMES Calculator
          </h1>
          <p className="text-gray-400">
            The classic game — Friends, Love, Affection, Marriage, Enemies, or Siblings? 🔥
          </p>
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
                  <label className="block text-sm text-gray-400 mb-1.5">First Name</label>
                  <input
                    type="text"
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition"
                  />
                </div>

                <div className="flex justify-center">
                  <motion.span
                    className="text-3xl"
                    animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    🔥
                  </motion.span>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Second Name</label>
                  <input
                    type="text"
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter second name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/30 transition"
                  />
                </div>

                <motion.button
                  onClick={calculate}
                  disabled={!name1.trim() || !name2.trim() || calculating}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-rose-500 text-white font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-shadow"
                >
                  {calculating ? (
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="inline-block"
                    >
                      🔥
                    </motion.span>
                  ) : (
                    <>🔥 Calculate FLAMES</>
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
                  <span className="text-orange-400 font-medium">{name1}</span>
                  {" & "}
                  <span className="text-rose-400 font-medium">{name2}</span>
                </p>

                {info && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="text-7xl"
                    >
                      {info.emoji}
                    </motion.div>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className={`text-3xl font-bold bg-gradient-to-r ${info.color} bg-clip-text text-transparent`}
                    >
                      {info.label}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="text-gray-300"
                    >
                      {info.desc}
                    </motion.p>
                  </>
                )}

                {/* FLAMES letters display */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-center gap-2"
                >
                  {["F", "L", "A", "M", "E", "S"].map((letter) => (
                    <span
                      key={letter}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                        letter === result
                          ? `bg-gradient-to-br ${info?.color} text-white`
                          : "bg-white/5 text-gray-600"
                      }`}
                    >
                      {letter}
                    </span>
                  ))}
                </motion.div>

                {/* Step-by-step toggle */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  onClick={() => setShowSteps(!showSteps)}
                  className="text-sm text-gray-500 hover:text-gray-300 underline transition"
                >
                  {showSteps ? "Hide" : "Show"} elimination steps
                </motion.button>

                <AnimatePresence>
                  {showSteps && steps.length > 0 && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-2 pt-2">
                        {steps.map((step, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-2 justify-center"
                          >
                            <span className="text-xs text-gray-500 w-14 text-right">
                              Step {i + 1}:
                            </span>
                            <div className="flex gap-1">
                              {step.map((letter, j) => (
                                <span
                                  key={j}
                                  className={`w-7 h-7 rounded text-xs flex items-center justify-center font-medium ${
                                    i === steps.length - 1
                                      ? `bg-gradient-to-br ${info?.color} text-white`
                                      : "bg-white/5 text-gray-400"
                                  }`}
                                >
                                  {letter}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-3 justify-center pt-2">
                  <motion.button
                    onClick={reset}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-xl border border-orange-500/30 text-orange-400 hover:bg-orange-500/10 transition font-medium"
                  >
                    Try Again 🔥
                  </motion.button>
                </div>
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
          ⚡ This is just for fun! Real connections are built through conversation.
        </motion.p>
      </div>
    </main>
  );
}

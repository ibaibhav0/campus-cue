"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const questions = [
  {
    a: "Go on a surprise blind date",
    b: "Plan the perfect date yourself",
    responseA: "Spontaneous! You love the thrill of the unknown! 🎲",
    responseB: "A planner! You know what you want and go get it! 📋",
  },
  {
    a: "Have a study date at the library",
    b: "Have a coffee date at a cute café",
    responseA: "Intellectual vibes! Brain and beauty! 📚",
    responseB: "Cozy and classic! You appreciate the ambiance! ☕",
  },
  {
    a: "Date someone who texts constantly",
    b: "Date someone who prefers phone calls",
    responseA: "You love staying connected 24/7! 📱",
    responseB: "Old school romance! You value hearing their voice! 📞",
  },
  {
    a: "Always have a first date at a restaurant",
    b: "Always have a first date doing an activity",
    responseA: "Classic and elegant! Nothing wrong with tradition! 🍽️",
    responseB: "Active and adventurous! Memories over meals! 🎯",
  },
  {
    a: "Date your best friend",
    b: "Date a complete stranger",
    responseA: "Friends-to-lovers arc! The best foundation! 💕",
    responseB: "A fresh start! New connections are exciting! ✨",
  },
  {
    a: "Get a love letter every day",
    b: "Get one grand romantic gesture a year",
    responseA: "Consistent love wins your heart! Daily devotion! 💌",
    responseB: "Quality over quantity! You love grand gestures! 🎆",
  },
  {
    a: "Have a partner who cooks amazingly",
    b: "Have a partner who's an amazing dancer",
    responseA: "The way to your heart is through your stomach! 👨‍🍳",
    responseB: "Romance on the dance floor! How dreamy! 💃",
  },
  {
    a: "Only communicate through memes for a day",
    b: "Only communicate through songs for a day",
    responseA: "A true Gen Z communicator! Meme queen/king! 😂",
    responseB: "Musical and romantic! Every moment has a soundtrack! 🎵",
  },
  {
    a: "Have a long-distance relationship",
    b: "Have a relationship but see each other every single day",
    responseA: "Distance makes the heart grow fonder! 🌍",
    responseB: "Proximity is key! Together is better! 🏠",
  },
  {
    a: "Know all your partner's passwords",
    b: "Never know any of their passwords",
    responseA: "Open book policy! Trust through transparency! 🔓",
    responseB: "Privacy is respect! Trust without proof! 🔒",
  },
  {
    a: "Have your crush confess to you first",
    b: "Be the one to confess first",
    responseA: "Patient and mysterious! Let them come to you! 💫",
    responseB: "Bold and brave! You shoot your shot! 🏹",
  },
  {
    a: "Go on a road trip date",
    b: "Go on a movie marathon date",
    responseA: "Adventure awaits! Open road, open hearts! 🚗",
    responseB: "Couch cuddles and popcorn! Comfort is key! 🎬",
  },
  {
    a: "Have matching outfits with your partner",
    b: "Have completely opposite styles",
    responseA: "Couple goals! You love twinning! 👫",
    responseB: "Opposites attract! Variety is the spice of life! 🌈",
  },
  {
    a: "Date someone older than you",
    b: "Date someone younger than you",
    responseA: "Maturity is attractive! You like experience! 🎓",
    responseB: "Young at heart! Energy and enthusiasm! 🌟",
  },
  {
    a: "Have a partner who remembers every detail about you",
    b: "Have a partner who always surprises you",
    responseA: "Attention to detail = love! Feeling seen is everything! 👁️",
    responseB: "Spontaneity keeps the spark alive! Surprise me! 🎁",
  },
  {
    a: "Share all your hobbies with your partner",
    b: "Keep your hobbies completely separate",
    responseA: "Shared interests = stronger bond! Do it together! 🤝",
    responseB: "Independence is healthy! You need your own space! 🧘",
  },
];

export default function WouldYouRatherPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [choice, setChoice] = useState<"a" | "b" | null>(null);
  const [stats, setStats] = useState<{ a: number; b: number }[]>(
    questions.map(() => ({ a: 0, b: 0 }))
  );
  const [choiceHistory, setChoiceHistory] = useState<("a" | "b")[]>([]);

  const handleChoice = useCallback(
    (option: "a" | "b") => {
      if (choice) return;
      setChoice(option);
      setStats((prev) => {
        const updated = [...prev];
        updated[currentIndex] = {
          ...updated[currentIndex],
          [option]: updated[currentIndex][option] + 1,
        };
        return updated;
      });
      setChoiceHistory((prev) => [...prev, option]);
    },
    [choice, currentIndex]
  );

  const nextQuestion = () => {
    setChoice(null);
    setCurrentIndex((prev) => (prev + 1) % questions.length);
  };

  const q = questions[currentIndex];
  const totalVotes = stats[currentIndex].a + stats[currentIndex].b;
  const pctA = totalVotes ? Math.round((stats[currentIndex].a / totalVotes) * 100) : 50;
  const pctB = totalVotes ? 100 - pctA : 50;

  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-16">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-cyan-400 transition mb-8"
        >
          ← Back to Games
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Would You Rather
          </h1>
          <p className="text-gray-400">Make your choice! 🤔</p>
          <p className="text-xs text-gray-600 mt-1">
            Question {currentIndex + 1} of {questions.length} • {choiceHistory.length} answered
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-center text-lg text-gray-300 font-medium mb-6">
              Would you rather...
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {/* Option A */}
              <motion.button
                onClick={() => handleChoice("a")}
                whileHover={!choice ? { scale: 1.02 } : {}}
                whileTap={!choice ? { scale: 0.98 } : {}}
                className={`relative rounded-2xl border p-6 text-left transition-all overflow-hidden ${
                  choice === "a"
                    ? "border-cyan-500/50 bg-cyan-500/10"
                    : choice === "b"
                    ? "border-white/5 bg-white/[0.02] opacity-60"
                    : "border-white/10 bg-white/[0.03] hover:border-cyan-500/30 cursor-pointer"
                }`}
              >
                <p className="text-lg font-medium text-white relative z-10">{q.a}</p>
                {choice && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pctA}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-cyan-500/10 rounded-2xl"
                  />
                )}
                {choice && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-cyan-400"
                  >
                    {pctA}%
                  </motion.span>
                )}
              </motion.button>

              <div className="flex items-center justify-center">
                <span className="text-sm font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                  OR
                </span>
              </div>

              {/* Option B */}
              <motion.button
                onClick={() => handleChoice("b")}
                whileHover={!choice ? { scale: 1.02 } : {}}
                whileTap={!choice ? { scale: 0.98 } : {}}
                className={`relative rounded-2xl border p-6 text-left transition-all overflow-hidden ${
                  choice === "b"
                    ? "border-purple-500/50 bg-purple-500/10"
                    : choice === "a"
                    ? "border-white/5 bg-white/[0.02] opacity-60"
                    : "border-white/10 bg-white/[0.03] hover:border-purple-500/30 cursor-pointer"
                }`}
              >
                <p className="text-lg font-medium text-white relative z-10">{q.b}</p>
                {choice && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pctB}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-y-0 left-0 bg-purple-500/10 rounded-2xl"
                  />
                )}
                {choice && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-purple-400"
                  >
                    {pctB}%
                  </motion.span>
                )}
              </motion.button>
            </div>

            {/* Response */}
            <AnimatePresence>
              {choice && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 text-center"
                >
                  <p className="text-gray-300 mb-4">
                    {choice === "a" ? q.responseA : q.responseB}
                  </p>
                  <motion.button
                    onClick={nextQuestion}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium shadow-lg shadow-cyan-500/20"
                  >
                    Next Question →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}

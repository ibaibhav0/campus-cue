"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const questions = [
  { a: "☕ Coffee", b: "🍵 Tea", category: "Drinks" },
  { a: "🌅 Morning classes", b: "🌙 Night classes", category: "Schedule" },
  { a: "📚 Library", b: "☕ Café", category: "Study spot" },
  { a: "📱 Text", b: "📞 Call", category: "Communication" },
  { a: "🎬 Netflix", b: "🎵 Spotify", category: "Entertainment" },
  { a: "🍕 Pizza", b: "🍔 Burger", category: "Food" },
  { a: "😂 Funny partner", b: "🤓 Smart partner", category: "Dating" },
  { a: "🏠 Stay in", b: "🎉 Go out", category: "Weekend" },
  { a: "📷 Instagram", b: "🐦 Twitter/X", category: "Social media" },
  { a: "🐱 Cat person", b: "🐶 Dog person", category: "Pets" },
  { a: "🎮 Video games", b: "🎬 Movies", category: "Free time" },
  { a: "☀️ Summer", b: "❄️ Winter", category: "Season" },
  { a: "📖 Books", b: "🎧 Podcasts", category: "Learning" },
  { a: "🚗 Road trip", b: "✈️ Flying", category: "Travel" },
  { a: "🍳 Breakfast date", b: "🍷 Dinner date", category: "Date" },
  { a: "🎤 Karaoke night", b: "🎲 Board game night", category: "Party" },
  { a: "💌 Give gifts", b: "🤗 Receive gifts", category: "Love language" },
  { a: "🏋️ Gym", b: "🧘 Yoga", category: "Exercise" },
  { a: "🌊 Beach vacation", b: "🏔️ Mountain trip", category: "Vacation" },
  { a: "😴 Early bird", b: "🦉 Night owl", category: "Lifestyle" },
];

type PersonalitySummary = { title: string; emoji: string; description: string };

function getPersonality(answers: string[]): PersonalitySummary {
  let social = 0;
  let adventurous = 0;
  let cozy = 0;
  let modern = 0;

  answers.forEach((ans, i) => {
    const q = questions[i];
    if (!q) return;
    const isA = ans === "a";
    // Score based on question
    if (i === 0) isA ? (modern += 1) : (cozy += 1);
    if (i === 1) isA ? (adventurous += 1) : (modern += 1);
    if (i === 2) isA ? (cozy += 1) : (social += 1);
    if (i === 3) isA ? (modern += 1) : (social += 1);
    if (i === 4) isA ? (cozy += 1) : (modern += 1);
    if (i === 7) isA ? (cozy += 1) : (social += 1);
    if (i === 9) isA ? (cozy += 1) : (adventurous += 1);
    if (i === 13) isA ? (adventurous += 1) : (modern += 1);
    if (i === 18) isA ? (adventurous += 1) : (cozy += 1);
    if (i === 19) isA ? (adventurous += 1) : (modern += 1);
  });

  const scores = { social, adventurous, cozy, modern };
  const top = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];

  const personalities: Record<string, PersonalitySummary> = {
    social: {
      title: "The Social Butterfly",
      emoji: "🦋",
      description:
        "You thrive on connection! You're the life of the party and love meeting new people. Your ideal campus life is full of events, group studies, and late-night hangouts.",
    },
    adventurous: {
      title: "The Adventure Seeker",
      emoji: "🧗",
      description:
        "You crave excitement and new experiences! You're always up for trying something new, whether it's a spontaneous road trip or a new hobby. Campus life is your playground!",
    },
    cozy: {
      title: "The Cozy Homebody",
      emoji: "🧸",
      description:
        "You cherish comfort and warmth! A good book, a cup of hot cocoa, and your favorite blanket — that's your happy place. Your dorm room is basically a five-star retreat.",
    },
    modern: {
      title: "The Tech-Savvy Trendsetter",
      emoji: "⚡",
      description:
        "You're always ahead of the curve! From the latest apps to new music, you're plugged in and informed. You bring fresh energy and ideas to everything on campus.",
    },
  };

  return personalities[top];
}

export default function ThisOrThatPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleChoice = useCallback(
    (option: "a" | "b") => {
      const newAnswers = [...answers, option];
      setAnswers(newAnswers);

      if (newAnswers.length >= questions.length) {
        setTimeout(() => setShowResult(true), 300);
      } else {
        setTimeout(() => setCurrentIndex((p) => p + 1), 200);
      }
    },
    [answers]
  );

  const restart = () => {
    setCurrentIndex(0);
    setAnswers([]);
    setShowResult(false);
  };

  const q = questions[currentIndex];
  const progress = (answers.length / questions.length) * 100;

  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(234,179,8,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-16">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-yellow-400 transition mb-8"
        >
          ← Back to Games
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
            This or That
          </h1>
          <p className="text-gray-400">Quick-fire choices! ⚡</p>
        </motion.div>

        {/* Progress bar */}
        {!showResult && (
          <div className="mb-8">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{answers.length} / {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-center text-sm text-gray-500 mb-4">{q.category}</p>

              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  onClick={() => handleChoice("a")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:border-yellow-500/40 hover:bg-yellow-500/5 transition-all"
                >
                  <span className="text-2xl md:text-3xl font-bold text-white">{q.a}</span>
                </motion.button>

                <motion.button
                  onClick={() => handleChoice("b")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 text-center hover:border-amber-500/40 hover:bg-amber-500/5 transition-all"
                >
                  <span className="text-2xl md:text-3xl font-bold text-white">{q.b}</span>
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              {(() => {
                const personality = getPersonality(answers);
                return (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 space-y-6">
                    <motion.span
                      className="text-6xl block"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring" }}
                    >
                      {personality.emoji}
                    </motion.span>

                    <motion.h2
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent"
                    >
                      {personality.title}
                    </motion.h2>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-gray-300 leading-relaxed"
                    >
                      {personality.description}
                    </motion.p>

                    {/* Answer summary */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="pt-4"
                    >
                      <p className="text-sm text-gray-500 mb-3">Your choices:</p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {answers.map((ans, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-lg bg-white/5 text-gray-400"
                          >
                            {ans === "a" ? questions[i].a : questions[i].b}
                          </span>
                        ))}
                      </div>
                    </motion.div>

                    <motion.button
                      onClick={restart}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-medium shadow-lg shadow-yellow-500/20"
                    >
                      Play Again ⚡
                    </motion.button>
                  </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

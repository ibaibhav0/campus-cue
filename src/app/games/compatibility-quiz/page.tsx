"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const quizQuestions = [
  {
    question: "What's your ideal weekend plan?",
    options: ["Netflix & chill at home", "Going out with friends", "Exploring a new place", "Working on a hobby"],
  },
  {
    question: "Pick your favorite type of food:",
    options: ["Italian 🍝", "Asian 🍜", "Mexican 🌮", "American 🍔"],
  },
  {
    question: "What's your go-to movie genre?",
    options: ["Comedy 😂", "Romance 💕", "Action 💥", "Horror 👻"],
  },
  {
    question: "How do you handle stress?",
    options: ["Listen to music 🎵", "Exercise 🏋️", "Talk to someone 💬", "Sleep it off 😴"],
  },
  {
    question: "What's your love language?",
    options: ["Words of affirmation 💬", "Physical touch 🤗", "Quality time ⏰", "Gifts 🎁"],
  },
  {
    question: "Pick a dream date location:",
    options: ["Beach sunset 🌅", "Mountain cabin 🏔️", "City rooftop 🌃", "Cozy bookstore 📚"],
  },
  {
    question: "What matters most in a partner?",
    options: ["Sense of humor 😄", "Ambition 🎯", "Kindness ❤️", "Intelligence 🧠"],
  },
  {
    question: "Your studying style is:",
    options: ["Alone in silence 🤫", "With background music 🎶", "In a study group 👥", "Last-minute cramming 😅"],
  },
  {
    question: "Pick a superpower:",
    options: ["Read minds 🧠", "Time travel ⏰", "Teleportation 🌀", "Invisibility 👻"],
  },
  {
    question: "How would your friends describe you?",
    options: ["The funny one 🤡", "The responsible one 📋", "The adventurous one 🧗", "The caring one 💕"],
  },
];

function getCompatibilityMessage(pct: number) {
  if (pct <= 20) return { text: "Very different vibes — but opposites can attract! 🌀", color: "text-red-400" };
  if (pct <= 40) return { text: "Some differences, but that keeps things interesting! 🌶️", color: "text-orange-400" };
  if (pct <= 60) return { text: "Pretty compatible! You have a solid foundation! 🌟", color: "text-yellow-400" };
  if (pct <= 80) return { text: "Great match! You two really click! 💫", color: "text-emerald-400" };
  return { text: "Incredible compatibility! You're practically soulmates! 💘", color: "text-pink-400" };
}

export default function CompatibilityQuizPage() {
  const [phase, setPhase] = useState<"intro" | "p1" | "p2" | "result">("intro");
  const [p1Name, setP1Name] = useState("");
  const [p2Name, setP2Name] = useState("");
  const [p1Answers, setP1Answers] = useState<number[]>([]);
  const [p2Answers, setP2Answers] = useState<number[]>([]);
  const [currentQ, setCurrentQ] = useState(0);

  const startP1 = () => {
    if (!p1Name.trim() || !p2Name.trim()) return;
    setPhase("p1");
    setCurrentQ(0);
    setP1Answers([]);
    setP2Answers([]);
  };

  const answerQuestion = useCallback(
    (optionIndex: number) => {
      if (phase === "p1") {
        const newAnswers = [...p1Answers, optionIndex];
        setP1Answers(newAnswers);
        if (newAnswers.length >= quizQuestions.length) {
          setPhase("p2");
          setCurrentQ(0);
        } else {
          setCurrentQ((p) => p + 1);
        }
      } else if (phase === "p2") {
        const newAnswers = [...p2Answers, optionIndex];
        setP2Answers(newAnswers);
        if (newAnswers.length >= quizQuestions.length) {
          setPhase("result");
        } else {
          setCurrentQ((p) => p + 1);
        }
      }
    },
    [phase, p1Answers, p2Answers]
  );

  const restart = () => {
    setPhase("intro");
    setP1Name("");
    setP2Name("");
    setP1Answers([]);
    setP2Answers([]);
    setCurrentQ(0);
  };

  const compatibility =
    phase === "result"
      ? Math.round(
          (p1Answers.filter((a, i) => a === p2Answers[i]).length /
            quizQuestions.length) *
            100
        )
      : 0;

  const msg = getCompatibilityMessage(compatibility);
  const currentPlayer = phase === "p1" ? p1Name : p2Name;
  const currentAnswers = phase === "p1" ? p1Answers : p2Answers;
  const progress = (currentAnswers.length / quizQuestions.length) * 100;

  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_60%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-16">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-emerald-400 transition mb-8"
        >
          ← Back to Games
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Compatibility Quiz
          </h1>
          <p className="text-gray-400">
            Answer 10 questions each and see how well you match! 📋
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* INTRO */}
          {phase === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8 space-y-5"
            >
              <p className="text-center text-gray-300 mb-2">
                Enter both names to begin. Player 1 answers first, then Player 2.
              </p>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Player 1 Name</label>
                <input
                  type="text"
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Player 2 Name</label>
                <input
                  type="text"
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  placeholder="Enter name"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition"
                />
              </div>
              <motion.button
                onClick={startP1}
                disabled={!p1Name.trim() || !p2Name.trim()}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
              >
                Start Quiz 📋
              </motion.button>
            </motion.div>
          )}

          {/* QUIZ */}
          {(phase === "p1" || phase === "p2") && (
            <motion.div
              key={`${phase}-${currentQ}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.25 }}
            >
              {/* Player indicator */}
              <div className="text-center mb-4">
                <span
                  className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
                    phase === "p1"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                      : "bg-teal-500/10 text-teal-400 border border-teal-500/30"
                  }`}
                >
                  {currentPlayer}&apos;s turn
                </span>
              </div>

              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Question {currentQ + 1} / {quizQuestions.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  {quizQuestions[currentQ].question}
                </h3>
                <div className="space-y-3">
                  {quizQuestions[currentQ].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => answerQuestion(idx)}
                      whileHover={{ scale: 1.02, x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full text-left px-5 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all text-gray-300 hover:text-white"
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>

              {phase === "p1" && (
                <p className="text-center text-xs text-gray-600 mt-4">
                  🤫 Don&apos;t let {p2Name} see your answers!
                </p>
              )}
            </motion.div>
          )}

          {/* RESULT */}
          {phase === "result" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10 text-center space-y-6"
            >
              <p className="text-gray-400">
                <span className="text-emerald-400 font-medium">{p1Name}</span>
                {" & "}
                <span className="text-teal-400 font-medium">{p2Name}</span>
              </p>

              {/* Animated percentage */}
              <div className="relative flex items-center justify-center w-44 h-44 mx-auto">
                <svg className="w-44 h-44 -rotate-90" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="80" stroke="#1f1f2e" strokeWidth="10" fill="none" />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="80"
                    stroke="url(#compatGrad)"
                    strokeWidth="10"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 80}
                    initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                    animate={{
                      strokeDashoffset:
                        2 * Math.PI * 80 - (compatibility / 100) * 2 * Math.PI * 80,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="compatGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <motion.span
                  className="absolute text-4xl font-bold text-emerald-400"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  {compatibility}%
                </motion.span>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className={`text-lg ${msg.color}`}
              >
                {msg.text}
              </motion.p>

              {/* Answer comparison */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="pt-4 space-y-2"
              >
                <p className="text-sm text-gray-500 mb-3">Answer comparison:</p>
                {quizQuestions.map((q, i) => {
                  const match = p1Answers[i] === p2Answers[i];
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 text-xs p-2 rounded-lg ${
                        match ? "bg-emerald-500/10" : "bg-white/[0.02]"
                      }`}
                    >
                      <span className={match ? "text-emerald-400" : "text-gray-600"}>
                        {match ? "✅" : "❌"}
                      </span>
                      <span className="text-gray-400 flex-1 text-left truncate">
                        {q.question}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              <motion.button
                onClick={restart}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium shadow-lg shadow-emerald-500/20"
              >
                Play Again 📋
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-600 mt-6"
        >
          ⚡ This is just for fun! Real compatibility is discovered over time.
        </motion.p>
      </div>
    </main>
  );
}

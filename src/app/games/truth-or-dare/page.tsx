"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const truths = [
  "What's the most embarrassing thing that happened to you on campus?",
  "Have you ever had a crush on a professor?",
  "What's the weirdest thing you've done to impress someone?",
  "Have you ever stalked someone's social media before a first date?",
  "What's your biggest turn-off in a potential partner?",
  "Have you ever pretended to like something to impress someone?",
  "What's the most romantic thing you've ever done?",
  "Have you ever been caught staring at your crush?",
  "What's your most cringeworthy pickup line you've used or heard?",
  "What's the longest you've spent getting ready for a date?",
  "Have you ever ghosted someone? Why?",
  "What's the most embarrassing text you've accidentally sent?",
  "Who was your first crush on campus?",
  "What's a deal-breaker for you in a relationship?",
  "Have you ever lied about your hobbies to seem more interesting?",
  "What's the cheesiest love song you secretly love?",
  "Have you ever written a love letter or poem for someone?",
  "What's the most spontaneous thing you've ever done for love?",
  "Do you believe in love at first sight? Why or why not?",
  "What's the most awkward date you've been on?",
  "Have you ever had a secret relationship?",
  "What's the biggest sacrifice you've made for someone you liked?",
];

const dares = [
  "Send a compliment to the last person you texted.",
  "Post an embarrassing selfie on your story right now.",
  "Call your crush and say 'I was just thinking about you.'",
  "Let the group go through your recent search history.",
  "Do your best impression of someone in this room.",
  "Text your ex 'I miss our conversations' (screenshot required!).",
  "Sing the chorus of a love song out loud.",
  "Let someone else write a DM for you and send it.",
  "Share the last photo in your camera roll.",
  "Do a dramatic love confession to the person on your left.",
  "Change your profile picture to whatever the group decides for 1 hour.",
  "Call a random contact and ask them for dating advice.",
  "Let someone read your last 5 DMs out loud.",
  "Do 10 push-ups while declaring your love for coffee.",
  "Walk up to a stranger and give them a genuine compliment.",
  "Record a 15-second motivational speech about love.",
  "Send a voice note to your best friend saying you're in love with them.",
  "Let the group compose a bio for your dating profile.",
  "Dance for 30 seconds to whatever song the group picks.",
  "Share the most embarrassing photo on your phone.",
  "Do a dramatic reading of your last sent email.",
  "Call your mom and ask her for relationship advice on speaker.",
];

export default function TruthOrDarePage() {
  const [mode, setMode] = useState<"truth" | "dare" | null>(null);
  const [current, setCurrent] = useState<string | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [usedTruths, setUsedTruths] = useState<Set<number>>(new Set());
  const [usedDares, setUsedDares] = useState<Set<number>>(new Set());

  const pickRandom = useCallback(
    (type: "truth" | "dare") => {
      setIsFlipping(true);
      setMode(type);

      const list = type === "truth" ? truths : dares;
      const used = type === "truth" ? usedTruths : usedDares;
      const setUsed = type === "truth" ? setUsedTruths : setUsedDares;

      let available = list.map((_, i) => i).filter((i) => !used.has(i));
      if (available.length === 0) {
        setUsed(new Set());
        available = list.map((_, i) => i);
      }

      const idx = available[Math.floor(Math.random() * available.length)];
      setUsed((prev) => new Set([...prev, idx]));

      setTimeout(() => {
        setCurrent(list[idx]);
        setIsFlipping(false);
      }, 600);
    },
    [usedTruths, usedDares]
  );

  return (
    <main className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.08),transparent_60%)]" />

      <div className="relative z-10 max-w-xl mx-auto px-4 py-16">
        <Link
          href="/games"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition mb-8"
        >
          ← Back to Games
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Truth or Dare
          </h1>
          <p className="text-gray-400">
            Choose wisely... or don&apos;t! 🎯
          </p>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-4 justify-center mb-8">
          <motion.button
            onClick={() => pickRandom("truth")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-shadow"
          >
            🔮 Truth
          </motion.button>
          <motion.button
            onClick={() => pickRandom("dare")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-lg shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-shadow"
          >
            🔥 Dare
          </motion.button>
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          {current && !isFlipping && (
            <motion.div
              key={current}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="perspective-1000"
            >
              <div
                className={`rounded-2xl border p-8 md:p-10 text-center backdrop-blur-xl ${
                  mode === "truth"
                    ? "border-blue-500/30 bg-gradient-to-br from-blue-500/10 to-cyan-500/5"
                    : "border-red-500/30 bg-gradient-to-br from-red-500/10 to-orange-500/5"
                }`}
              >
                <span className="text-sm font-medium uppercase tracking-wider text-gray-500 mb-4 block">
                  {mode === "truth" ? "🔮 Truth" : "🔥 Dare"}
                </span>
                <p className="text-xl md:text-2xl font-medium text-gray-200 leading-relaxed">
                  {current}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isFlipping && (
          <motion.div
            animate={{ rotateY: [0, 180, 360] }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center"
          >
            <span className="text-4xl">🎴</span>
          </motion.div>
        )}

        {!current && !isFlipping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-10 text-center"
          >
            <span className="text-5xl block mb-4">🎴</span>
            <p className="text-gray-500">Pick Truth or Dare to get started!</p>
          </motion.div>
        )}

        {current && !isFlipping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6"
          >
            <motion.button
              onClick={() => pickRandom(mode!)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-3 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 transition font-medium"
            >
              Next {mode === "truth" ? "Truth" : "Dare"} →
            </motion.button>
          </motion.div>
        )}
      </div>
    </main>
  );
}

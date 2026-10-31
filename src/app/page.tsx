"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  Heart,
  ChevronDown,
  UserCheck,
  ShieldCheck,
  EyeOff,
  Gamepad2,
  CalendarHeart,
  Gift,
  Flame,
  Users,
  GraduationCap,
  MapPin,
  ArrowDown,
  MessageCircleHeart,
  Sparkles,
  Clock,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Reusable helpers                                                   */
/* ------------------------------------------------------------------ */

function useSectionInView(amount = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.6 },
  }),
};

/* ------------------------------------------------------------------ */
/*  Floating Hearts (Hero background)                                  */
/* ------------------------------------------------------------------ */

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 10 + Math.random() * 18,
        dur: 6 + Math.random() * 8,
        delay: Math.random() * 4,
        opacity: 0.06 + Math.random() * 0.12,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-primary"
          style={{ left: `${h.x}%`, top: `${h.y}%`, opacity: h.opacity }}
          animate={{ y: [0, -30, 0], x: [0, 10, -10, 0], rotate: [0, 10, -10, 0] }}
          transition={{ duration: h.dur, repeat: Infinity, delay: h.delay, ease: "easeInOut" }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}
      {/* Radial glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  1. Hero Section                                                    */
/* ------------------------------------------------------------------ */

function HeroSection() {
  const { ref, inView } = useSectionInView(0.3);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <FloatingHearts />

      <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 pt-24 pb-16">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-zinc-300 mb-8"
        >
          <Sparkles size={16} className="text-primary" />
          Made for college students in Bangalore
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6"
        >
          Find Your{" "}
          <span className="gradient-text">Campus Connection</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Meet and connect with college students in Bangalore. Match, chat, try
          Blind Date mode, and discover people who understand campus life — all
          completely free.
        </motion.p>

        <motion.a
          href="#blind-date"
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={3}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg hover:scale-105 transition-transform shadow-lg shadow-primary/20"
        >
          Learn More
          <ArrowDown size={20} />
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-20 text-zinc-500"
        >
          <ChevronDown size={28} className="mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Blind Date Mode Section                                         */
/* ------------------------------------------------------------------ */

function BlindDateSection() {
  const { ref, inView } = useSectionInView(0.2);

  return (
    <section
      id="blind-date"
      ref={ref}
      className="py-24 sm:py-32 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={0}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            >
              <span className="gradient-text">Blind Date Mode</span> — Our
              Signature Feature
            </motion.h2>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="text-zinc-400 text-lg leading-relaxed mb-6"
            >
              Blind Date mode lets students chat before profile photos are
              revealed. The feature is designed to put conversation first; both
              people can decide whether to continue after the reveal.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              className="flex items-center gap-3 text-zinc-300"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                <Clock size={20} />
              </div>
              <span className="text-base">
                Chat for <strong className="text-white">24 hours</strong> before photos are revealed
              </span>
            </motion.div>
          </div>

          {/* Visual — animated cards */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={2}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-96 sm:w-80 sm:h-[420px]">
              {/* Card A — blurred / hidden */}
              <motion.div
                animate={{ rotate: [-6, -4, -6], y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-3xl glass gradient-border overflow-hidden flex flex-col items-center justify-center gap-4 p-6"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 blur-sm" />
                <div className="w-32 h-3 rounded bg-white/10" />
                <div className="w-24 h-3 rounded bg-white/5" />
                <div className="flex items-center gap-2 mt-4 text-zinc-400 text-sm">
                  <EyeOff size={16} className="text-primary" />
                  Photo hidden
                </div>
              </motion.div>

              {/* Card B — chat bubble overlay */}
              <motion.div
                animate={{ rotate: [4, 6, 4], y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-right-8 w-64 rounded-2xl glass p-4 shadow-xl shadow-black/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 shrink-0" />
                  <div className="bg-white/5 rounded-xl rounded-tl-none px-3 py-2 text-sm text-zinc-300">
                    Hey! What&apos;s your favourite spot on campus? 😊
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-primary/20 rounded-xl rounded-tr-none px-3 py-2 text-sm text-zinc-200">
                    The library rooftop, hands down! ☀️
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary/20 shrink-0" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  3. How It Works Section                                            */
/* ------------------------------------------------------------------ */

const steps = [
  {
    icon: UserCheck,
    title: "Create Your Profile",
    desc: "Set up your college profile with your interests, bio, and campus details.",
  },
  {
    icon: Users,
    title: "Discover Students",
    desc: "Browse and discover students from NMIT and Manipal Bangalore.",
  },
  {
    icon: MessageCircleHeart,
    title: "Match & Connect",
    desc: "Start chatting when you match. Try Blind Date mode for a unique experience.",
  },
];

function HowItWorksSection() {
  const { ref, inView } = useSectionInView();

  return (
    <section ref={ref} className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
        >
          How <span className="gradient-text">It Works</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="text-zinc-400 text-lg mb-16 max-w-xl mx-auto"
        >
          Getting started on Campus Cue is simple — three easy steps.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i + 2}
              className="relative glass rounded-2xl p-8 gradient-border group hover:bg-card-hover transition-colors"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary mb-6 mx-auto group-hover:scale-110 transition-transform">
                <step.icon size={28} />
              </div>
              <span className="absolute top-4 right-4 text-5xl font-extrabold text-white/[0.03]">
                {i + 1}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Features Section                                                */
/* ------------------------------------------------------------------ */

const features = [
  {
    icon: ShieldCheck,
    title: "Selfie Verification",
    desc: "Profiles can earn a verified badge with a quick selfie check.",
  },
  {
    icon: MessageCircleHeart,
    title: "Matches Only",
    desc: "Only people you match with can message you — no random DMs.",
  },
  {
    icon: EyeOff,
    title: "Blind Date Mode",
    desc: "Photos stay hidden for 24 hours. Let the conversation lead.",
  },
  {
    icon: Gamepad2,
    title: "Games in Chat",
    desc: "Play Truth or Dare, Would You Rather, and This or That while chatting.",
  },
  {
    icon: CalendarHeart,
    title: "Campus Events",
    desc: "Create and join meetups, coffee dates, and study groups on campus.",
  },
  {
    icon: Gift,
    title: "Virtual Gifts",
    desc: "Send roses, coffee, teddy bears, and diamonds to your matches.",
  },
  {
    icon: Flame,
    title: "Daily Streaks",
    desc: "Stay active, earn free boosts and Super Likes to stand out.",
  },
  {
    icon: Users,
    title: "Dual Profiles",
    desc: "Switch between Dating and Connections mode based on what you want.",
  },
  {
    icon: GraduationCap,
    title: "Built for Campus",
    desc: "Made exclusively for college students in Bangalore.",
  },
];

function FeaturesSection() {
  const { ref, inView } = useSectionInView(0.1);

  return (
    <section ref={ref} className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4"
        >
          Everything You{" "}
          <span className="gradient-text">Need</span>
        </motion.h2>
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="text-zinc-400 text-lg text-center mb-16 max-w-xl mx-auto"
        >
          Packed with features designed around college life.
        </motion.p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeIn}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              className="glass rounded-2xl p-6 gradient-border group hover:bg-card-hover transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:scale-110 transition-transform">
                  <f.icon size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">{f.title}</h3>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Available Cities Section                                        */
/* ------------------------------------------------------------------ */

function CitiesSection() {
  const { ref, inView } = useSectionInView();

  return (
    <section ref={ref} className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6"
        >
          Available in{" "}
          <span className="gradient-text">Bangalore</span>
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={1}
          className="relative inline-flex flex-col items-center mb-8"
        >
          {/* Glow ring */}
          <div className="relative">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-4 rounded-full bg-primary/20 blur-xl"
            />
            <div className="relative flex items-center justify-center w-28 h-28 rounded-full glass gradient-border pulse-glow">
              <MapPin size={40} className="text-primary" />
            </div>
          </div>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={2}
          className="text-zinc-400 text-lg leading-relaxed max-w-lg mx-auto"
        >
          Currently available for students at{" "}
          <span className="text-white font-semibold">NMIT Bangalore</span> and{" "}
          <span className="text-white font-semibold">Manipal Bangalore</span>.
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  6. FAQ Section                                                     */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Is Campus Cue free?",
    a: "Yes! Campus Cue is completely free for students. All features including matching, chat, games, and Blind Date mode are free with no hidden charges.",
  },
  {
    q: "Who can use Campus Cue?",
    a: "Campus Cue is currently available for students at NMIT Bangalore and Manipal Bangalore. You must be 18 or older to join.",
  },
  {
    q: "Is Campus Cue safe?",
    a: "Campus Cue provides optional selfie verification, lets only your matches message you, and has tools to block and report users.",
  },
  {
    q: "What is Blind Date Mode?",
    a: "Blind Date mode lets students chat before profile photos are revealed. The feature is designed to put conversation first.",
  },
  {
    q: "How is Campus Cue different?",
    a: "It is built around college life. Filter to your own campus, earn a verified badge, and try Blind Date mode.",
  },
];

function FAQItem({ faq, index, inView }: { faq: typeof faqs[0]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index + 1}
      className="glass rounded-2xl gradient-border overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.02] transition-colors"
      >
        <span className="text-white font-medium text-base pr-4">{faq.q}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0 text-primary"
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQSection() {
  const { ref, inView } = useSectionInView();

  return (
    <section ref={ref} className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-16"
        >
          Frequently Asked{" "}
          <span className="gradient-text">Questions</span>
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <BlindDateSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CitiesSection />
      <FAQSection />
    </>
  );
}

"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldCheck, AlertTriangle, UserX, Search, Flag, Mail } from "lucide-react";

const sections = [
  {
    icon: ShieldCheck,
    title: "Adults Only — 18+ Platform",
    content:
      "Campus Cue is designed exclusively for adults aged 18 and above who are currently enrolled college students at NMIT or Manipal Institute of Technology, Bangalore. The platform is not intended for use by minors under any circumstances.",
  },
  {
    icon: UserX,
    title: "Prohibition of Minors",
    content:
      "Users under the age of 18 are strictly prohibited from creating an account or using Campus Cue. Any account found to belong to a minor will be immediately suspended, and the associated data will be deleted. We take this policy seriously and enforce it at every level of the platform.",
  },
  {
    icon: Search,
    title: "Verification Measures",
    content:
      "Campus Cue employs verification measures to help ensure all users are of legal age and are genuine college students. This includes college email verification, age confirmation during registration, and ongoing monitoring of accounts for suspicious activity. While no system is perfect, we are committed to continually improving our verification processes.",
  },
  {
    icon: Flag,
    title: "Reporting Tools",
    content:
      "Campus Cue provides built-in reporting tools that allow any user to flag suspicious accounts or behavior. Reports related to underage users or child safety concerns are treated with the highest priority and are reviewed promptly. We encourage all users to report anything that seems concerning — you can do so directly within the app or by contacting us via email.",
  },
  {
    icon: AlertTriangle,
    title: "How to Report a Concern",
    content:
      "If you suspect that a minor is using Campus Cue, or if you encounter any content or behavior that raises child safety concerns, please report it immediately. You can use the in-app reporting feature on any profile or conversation, or email us directly at campuscue.info@gmail.com. All reports are confidential and will be investigated within 24 hours.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function ChildSafetyPage() {
  return (
    <div className="min-h-screen bg-[#050507] pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6">
            <ShieldCheck className="text-pink-500" size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
            Child Safety
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Campus Cue is committed to maintaining a safe environment. Our
            platform is strictly for adults aged 18 and above.
          </p>
        </motion.div>

        {/* Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass gradient-border rounded-2xl p-8 mb-10"
        >
          <h2 className="text-xl font-semibold text-white mb-3">
            Our Commitment
          </h2>
          <p className="text-zinc-300 leading-relaxed">
            The safety of our community is our highest priority. Campus Cue has
            zero tolerance for the presence of minors on the platform and takes
            proactive steps to prevent underage access. We work diligently to
            ensure every user is a verified, adult college student.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass gradient-border rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                    <Icon className="text-pink-400" size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white mb-3">
                      {section.title}
                    </h2>
                    <p className="text-zinc-400 leading-relaxed text-[15px]">
                      {section.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="glass gradient-border rounded-2xl p-8 inline-flex flex-col items-center gap-3">
            <Mail className="text-pink-500" size={24} />
            <p className="text-zinc-400 text-sm">
              Report a child safety concern
            </p>
            <a
              href="mailto:campuscue.info@gmail.com"
              className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
            >
              campuscue.info@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

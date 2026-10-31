"use client";

import { motion, type Variants } from "framer-motion";
import { Mail } from "lucide-react";

const sections = [
  {
    title: "1. Eligibility",
    content: [
      "You must be at least 18 years of age to use Campus Cue.",
      "Campus Cue is exclusively available to currently enrolled students of NMIT (Nitte Meenakshi Institute of Technology) and Manipal Institute of Technology, Bangalore.",
      "By creating an account, you confirm that you meet the eligibility requirements and that all information you provide is accurate and truthful.",
      "Campus Cue reserves the right to verify your student status and may terminate accounts that do not meet these requirements.",
    ],
  },
  {
    title: "2. Acceptable Use",
    content: [
      "You agree to use Campus Cue in a respectful and lawful manner. You will not:",
      "• Harass, bully, stalk, intimidate, or threaten any other user.",
      "• Post or share content that is offensive, sexually explicit, defamatory, or promotes violence.",
      "• Impersonate another person or misrepresent your identity or affiliation.",
      "• Use the platform for any commercial or promotional purpose without prior written consent.",
      "• Attempt to gain unauthorized access to other users' accounts or Campus Cue's systems.",
      "• Use automated bots, scrapers, or other means to interact with the platform.",
      "Violation of these terms may result in immediate suspension or permanent ban from Campus Cue.",
    ],
  },
  {
    title: "3. Account",
    content: [
      "You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.",
      "You may only create one account per person. Duplicate accounts will be removed.",
      "You can delete your account at any time through the app settings. Upon deletion, your profile and associated data will be permanently removed in accordance with our Privacy Policy.",
      "Campus Cue may suspend or terminate accounts that violate these Terms of Service or are inactive for extended periods.",
    ],
  },
  {
    title: "4. Content",
    content: [
      "You retain ownership of the content you post on Campus Cue, including photos, bios, and messages.",
      "By posting content, you grant Campus Cue a non-exclusive, royalty-free license to use, display, and distribute your content within the platform for the purpose of providing our services.",
      "You are solely responsible for the content you post. Campus Cue does not endorse any user-generated content.",
      "Campus Cue reserves the right to remove any content that violates these Terms or is reported by other users, without prior notice.",
      "You must not post content that infringes on any third party's intellectual property rights.",
    ],
  },
  {
    title: "5. Privacy",
    content: [
      "Your privacy is important to us. Our collection and use of personal data is governed by our Privacy Policy.",
      "By using Campus Cue, you consent to the collection, processing, and storage of your data as described in our Privacy Policy.",
      "We do not sell your personal information to third parties.",
      "For full details on how we handle your data, please review our Privacy Policy.",
    ],
  },
  {
    title: "6. Contact",
    content: [
      "If you have any questions, concerns, or feedback regarding these Terms of Service, please contact us at:",
      "Email: campuscue.info@gmail.com",
      "We aim to respond to all inquiries within 48 hours.",
    ],
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-4">
            Terms of Service
          </h1>
          <p className="text-zinc-400 text-lg">
            Last updated: October 2026
          </p>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass gradient-border rounded-2xl p-8 mb-10"
        >
          <p className="text-zinc-300 leading-relaxed">
            Welcome to Campus Cue. By accessing or using our platform, you agree
            to be bound by these Terms of Service. Please read them carefully. If
            you do not agree with any part of these terms, you may not use
            Campus Cue.
          </p>
        </motion.div>

        {/* Sections */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass gradient-border rounded-2xl p-8"
            >
              <h2 className="text-2xl font-semibold text-white mb-6">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-zinc-400 leading-relaxed text-[15px]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
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
              Questions? Reach out to us at
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

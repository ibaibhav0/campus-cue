"use client";

import { motion, type Variants } from "framer-motion";
import { Mail, Shield } from "lucide-react";

const sections = [
  {
    title: "1. Data Collection",
    content: [
      "Campus Cue collects the following information when you create and use your account:",
      "• Personal information: name, email address, date of birth, gender, and college affiliation.",
      "• Profile data: photos, bio, interests, and preferences you provide.",
      "• Usage data: app interactions, feature usage, and device information (device type, OS version, app version).",
      "• Location data: approximate location to match you with nearby students (only when you grant permission).",
      "• Communications: messages sent within the platform are stored to provide the messaging service.",
      "We only collect data that is necessary for providing and improving our services.",
    ],
  },
  {
    title: "2. How We Use Your Data",
    content: [
      "We use the information we collect to:",
      "• Create and maintain your Campus Cue account and profile.",
      "• Match you with other users based on your preferences and campus affiliation.",
      "• Provide and personalize our services, including Blind Date mode and campus events.",
      "• Communicate with you about your account, updates, and important notices.",
      "• Monitor for and prevent fraud, abuse, and violations of our Terms of Service.",
      "• Improve and develop new features based on anonymized usage patterns.",
      "We do not use your data for purposes beyond those described in this policy.",
    ],
  },
  {
    title: "3. Data Sharing",
    content: [
      "Campus Cue does not sell your personal information to third parties.",
      "We may share limited data in the following circumstances:",
      "• With other users: your profile information is visible to potential matches as part of the core service.",
      "• Service providers: we use trusted third-party services for hosting, analytics, and notifications. These providers are contractually bound to protect your data.",
      "• Legal requirements: we may disclose data if required by law, court order, or to protect the safety of our users.",
      "• With your consent: we may share data for purposes you have explicitly agreed to.",
    ],
  },
  {
    title: "4. Data Storage",
    content: [
      "Your data is stored securely on cloud servers with industry-standard encryption.",
      "We retain your data for as long as your account is active. If you delete your account, your personal data will be permanently deleted within 30 days, except where retention is required by law.",
      "Anonymized and aggregated data that cannot identify you may be retained for analytics purposes.",
    ],
  },
  {
    title: "5. Security",
    content: [
      "We take the security of your data seriously and implement the following measures:",
      "• Encryption of data in transit (TLS/SSL) and at rest.",
      "• Regular security audits and vulnerability assessments.",
      "• Access controls that limit employee access to personal data on a need-to-know basis.",
      "• Secure authentication mechanisms for your account.",
      "While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We encourage you to use a strong, unique password for your Campus Cue account.",
    ],
  },
  {
    title: "6. Your Rights",
    content: [
      "As a Campus Cue user, you have the right to:",
      "• Access: request a copy of the personal data we hold about you.",
      "• Correction: update or correct inaccurate information in your profile.",
      "• Deletion: delete your account and all associated personal data.",
      "• Portability: request your data in a portable, machine-readable format.",
      "• Withdraw consent: opt out of optional data collection (e.g., location) at any time through your device or app settings.",
      "To exercise any of these rights, contact us at campuscue.info@gmail.com.",
    ],
  },
  {
    title: "7. Contact",
    content: [
      "If you have any questions or concerns about this Privacy Policy or how your data is handled, please contact us:",
      "Email: campuscue.info@gmail.com",
      "We will respond to your inquiry within 48 hours.",
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

export default function PrivacyPage() {
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
            Privacy Policy
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
          <div className="flex items-start gap-4">
            <Shield className="text-pink-500 mt-1 shrink-0" size={24} />
            <p className="text-zinc-300 leading-relaxed">
              At Campus Cue, your privacy is a top priority. This Privacy Policy
              explains what data we collect, how we use it, and the measures we
              take to keep your information safe. By using Campus Cue, you agree
              to the practices described in this policy.
            </p>
          </div>
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
              Privacy questions? Reach out to us at
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

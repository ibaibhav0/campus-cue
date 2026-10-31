"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Mail, Send, User, AtSign, MessageSquare, FileText } from "lucide-react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form doesn't need to actually submit
  };

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
            Contact Us
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Have a question, feedback, or need to report a concern? We&apos;re here
            to help.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
        >
          {/* Contact Info Sidebar */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
            {/* Email Card */}
            <div className="glass gradient-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                  <Mail className="text-pink-400" size={20} />
                </div>
                <h2 className="text-lg font-semibold text-white">Email Us</h2>
              </div>
              <a
                href="mailto:campuscue.info@gmail.com"
                className="text-pink-400 hover:text-pink-300 font-medium transition-colors text-sm break-all"
              >
                campuscue.info@gmail.com
              </a>
              <p className="text-zinc-500 text-sm mt-2">
                We typically respond within 48 hours.
              </p>
            </div>

            {/* Report a Concern */}
            <div className="glass gradient-border rounded-2xl p-8">
              <h2 className="text-lg font-semibold text-white mb-3">
                Report a Concern
              </h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                If you need to report harassment, safety issues, suspicious
                accounts, or any other concern, please use the form or email us
                directly. All reports are treated confidentially and investigated
                promptly.
              </p>
            </div>

            {/* Response Time */}
            <div className="glass gradient-border rounded-2xl p-8">
              <h2 className="text-lg font-semibold text-white mb-3">
                Response Time
              </h2>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">General inquiries</span>
                  <span className="text-zinc-300 text-sm font-medium">48 hours</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Safety reports</span>
                  <span className="text-pink-400 text-sm font-medium">24 hours</span>
                </div>
                <div className="w-full h-px bg-white/5" />
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-sm">Account issues</span>
                  <span className="text-zinc-300 text-sm font-medium">48 hours</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="glass gradient-border rounded-2xl p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Your Name
                  </label>
                  <div className="relative">
                    <User
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <AtSign
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@college.edu"
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Subject
                  </label>
                  <div className="relative">
                    <FileText
                      size={16}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all appearance-none cursor-pointer"
                    >
                      <option value="" className="bg-[#111118]">
                        Select a subject
                      </option>
                      <option value="general" className="bg-[#111118]">
                        General Inquiry
                      </option>
                      <option value="report" className="bg-[#111118]">
                        Report a Concern
                      </option>
                      <option value="safety" className="bg-[#111118]">
                        Safety Issue
                      </option>
                      <option value="account" className="bg-[#111118]">
                        Account Issue
                      </option>
                      <option value="feedback" className="bg-[#111118]">
                        Feedback
                      </option>
                      <option value="bug" className="bg-[#111118]">
                        Bug Report
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-zinc-300 mb-2"
                  >
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare
                      size={16}
                      className="absolute left-4 top-4 text-zinc-500"
                    />
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/30 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-medium rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-pink-500/20"
                >
                  <Send size={18} />
                  Send Message
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

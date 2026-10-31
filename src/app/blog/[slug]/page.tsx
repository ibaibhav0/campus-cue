"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, User, Share2, Sparkles } from "lucide-react";
import { blogPosts } from "@/data/blogs";

export default function BlogPostDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050507] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to all articles
        </Link>

        {/* Article header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 mb-10"
        >
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-pink-500/10 border border-pink-500/20 text-pink-400">
            {post.tag}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-zinc-400 pt-2 border-b border-white/10 pb-6">
            <span className="flex items-center gap-2">
              <User size={16} className="text-pink-400" />
              {post.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar size={16} />
              {post.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={16} />
              {post.readTime}
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6 text-zinc-300 text-lg leading-relaxed glass rounded-3xl p-6 sm:p-10 border border-white/5"
        >
          {post.content.map((paragraph, index) => (
            <p key={index} className="text-zinc-300">
              {paragraph}
            </p>
          ))}

          {/* Call to action inside post */}
          <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent border border-pink-500/20">
            <div className="flex items-center gap-2 text-pink-400 font-semibold mb-2">
              <Sparkles size={18} />
              <span>Campus Cue — Made for NMIT & Manipal Students</span>
            </div>
            <p className="text-sm text-zinc-400 mb-4">
              Connect with real college peers in Bangalore with verified profiles, chat games, and Blind Date Mode. 100% free with no paywalls.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90 transition-opacity"
            >
              Explore Campus Cue
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

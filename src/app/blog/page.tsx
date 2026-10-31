"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/blogs";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#050507] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-pink-400 mb-4">
            <BookOpen size={14} />
            <span>Campus Cue Journal</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold gradient-text mb-4">
            Campus Cue Blog
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Dating tips, feature deep-dives, student stories, and campus life guides for students in Bangalore.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="glass gradient-border rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-pink-500/10">
                  {/* Gradient Accent Bar */}
                  <div className={`h-2 w-full bg-gradient-to-r ${post.gradient}`} />

                  <div className="p-6 flex flex-col flex-1">
                    {/* Tag */}
                    <span
                      className={`inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${post.gradient} text-white mb-4`}
                    >
                      {post.tag}
                    </span>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-pink-400 transition-colors">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                      {post.description}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <div className="flex items-center gap-4 text-zinc-500 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {post.readTime}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-semibold text-pink-400 group-hover:translate-x-1 transition-all">
                        Read
                        <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

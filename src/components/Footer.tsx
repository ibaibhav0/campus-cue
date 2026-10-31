"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Mail, MapPin } from "lucide-react";

const footerLinks = {
  product: [
    { href: "/", label: "Campus Cue" },
    { href: "/blog", label: "Blog" },
    { href: "/love-calculator", label: "Love Calculator" },
    { href: "/flames-calculator", label: "FLAMES Calculator" },
    { href: "/games", label: "Games" },
  ],
  legal: [
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/child-safety", label: "Child Safety" },
    { href: "/contact", label: "Contact / Report a Concern" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#050507] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/logo.png" alt="Campus Cue" width={36} height={36} />
              <span className="text-xl font-bold gradient-text">Campus Cue</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed mb-4 max-w-md">
              Campus Cue is a dating and social app built exclusively for college students
              in Bangalore. Connect with students from NMIT and Manipal who understand
              campus life. Completely free to use.
            </p>
            <div className="flex items-center gap-2 text-zinc-400 text-sm mb-2">
              <Mail size={16} className="text-primary" />
              <a
                href="mailto:campuscue.info@gmail.com"
                className="hover:text-white transition-colors"
              >
                campuscue.info@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <MapPin size={16} className="text-primary" />
              <span>Available in Bangalore</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-zinc-400 text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} Campus Cue. All rights reserved.
          </p>
          <p className="text-zinc-500 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-primary fill-primary" /> for college students in Bangalore
          </p>
        </div>
      </div>
    </footer>
  );
}


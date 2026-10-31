import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://campuscue.online"),
  title: "Campus Cue - College Dating & Social App for Students in Bangalore",
  description:
    "Meet college students in Bangalore on Campus Cue. Match, chat, try Blind Date mode and connect with people who understand campus life. Available for NMIT and Manipal Bangalore students.",
  keywords:
    "college dating app Bangalore, dating app for college students, campus dating app, student dating app, NMIT dating, Manipal Bangalore dating, Campus Cue",
  authors: [{ name: "Campus Cue" }],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    title: "Campus Cue - College Dating & Social App for Students in Bangalore",
    description:
      "Meet college students in Bangalore. Match, chat, try Blind Date mode and connect with people who understand campus life.",
    siteName: "Campus Cue",
    locale: "en_IN",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Campus Cue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Campus Cue - College Dating & Social App for Students in Bangalore",
    description:
      "Meet college students in Bangalore. Match, chat, try Blind Date mode and connect with people who understand campus life.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050507] text-white antialiased min-h-screen flex flex-col font-sans selection:bg-[#e11d73] selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

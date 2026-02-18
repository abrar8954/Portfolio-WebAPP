"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Mail, Download, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const taglines = [
  "Building intelligent automated workflows",
  "Transforming manual processes into bots",
  "Saving businesses thousands of hours",
  "RPA | Web Scraping | Process Automation",
];

interface HeroProps {
  name: string;
  title: string;
  resumeUrl?: string | null;
  linkedin?: string | null;
  github?: string | null;
  upwork?: string | null;
  email?: string | null;
}

export function Hero({ name, title, resumeUrl, linkedin, github, upwork, email }: HeroProps) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = taglines[taglineIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplayText(current.slice(0, displayText.length + 1));
          if (displayText.length === current.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setDisplayText(current.slice(0, displayText.length - 1));
          if (displayText.length === 0) {
            setIsDeleting(false);
            setTaglineIndex((prev) => (prev + 1) % taglines.length);
          }
        }
      },
      isDeleting ? 30 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/5 text-sm text-blue-400"
          >
            Available for freelance &amp; remote work
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4">
            Hi, I&apos;m{" "}
            <span className="text-gradient">{name}</span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl text-muted-foreground mb-6">
            {title}
          </h2>

          <div className="h-8 mb-8">
            <span className="text-lg md:text-xl font-mono text-blue-400">
              {displayText}
              <span className="animate-pulse">|</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Button size="lg" asChild className="glow">
              <a href="#projects">
                View Projects
                <ArrowDown className="ml-2 h-4 w-4" />
              </a>
            </Button>
            {resumeUrl && (
              <Button size="lg" variant="outline" asChild>
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            )}
          </div>

          <div className="flex items-center justify-center gap-4">
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {upwork && (
              <a href={upwork} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

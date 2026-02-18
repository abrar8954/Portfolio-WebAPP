"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Briefcase, Users, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

interface AboutProps {
  about: string;
  photoUrl?: string | null;
  location?: string | null;
  openToWork: boolean;
  yearsExp: number;
  clientsServed: number;
  projectsCount: number;
}

function Counter({ target, label, icon: Icon }: { target: number; label: string; icon: React.ElementType }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const stepTime = duration / target;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <div ref={ref} className="text-center">
      <Icon className="h-6 w-6 mx-auto mb-2 text-blue-400" />
      <div className="text-3xl md:text-4xl font-bold text-gradient">{count}+</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

const specializations = [
  "RPA Development",
  "Web Scraping",
  "Process Automation",
  "Test Automation",
  "Data Pipelines",
  "Bot Development",
];

export function About({ about, photoUrl, location, openToWork, yearsExp, clientsServed, projectsCount }: AboutProps) {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading title="About Me" subtitle="Get to know my background and expertise" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection delay={0.2}>
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto rounded-2xl overflow-hidden border-2 border-blue-500/20 glow-sm">
                {photoUrl ? (
                  <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <span className="text-6xl font-bold text-gradient">AE</span>
                  </div>
                )}
              </div>
              {openToWork && (
                <Badge className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-green-500/10 text-green-400 border-green-500/30 px-4 py-1">
                  Open to Work
                </Badge>
              )}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div>
              <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                {about}
              </p>
              {location && (
                <div className="flex items-center gap-2 text-muted-foreground mb-6">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span>{location}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {specializations.map((spec) => (
                  <Badge key={spec} variant="secondary" className="text-sm">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.4} className="mt-16">
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <Counter target={yearsExp} label="Years Experience" icon={Briefcase} />
            <Counter target={clientsServed} label="Clients Served" icon={Users} />
            <Counter target={projectsCount} label="Projects Done" icon={FolderOpen} />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

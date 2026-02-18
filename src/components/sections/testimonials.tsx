"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

interface Testimonial {
  id: string;
  content: string;
  authorName: string;
  authorTitle: string;
  authorCompany: string;
  authorPhoto: string | null;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export function Testimonials({ testimonials }: TestimonialsProps) {
  const [current, setCurrent] = useState(0);

  if (testimonials.length === 0) return null;

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            title="Testimonials"
            subtitle="What clients and colleagues say about my work"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-3xl mx-auto relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12 text-center"
              >
                <Quote className="h-10 w-10 mx-auto mb-6 text-blue-400/30" />
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mb-8 italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex flex-col items-center gap-3">
                  <Avatar className="h-14 w-14 border-2 border-blue-500/20">
                    <AvatarImage src={testimonial.authorPhoto || undefined} />
                    <AvatarFallback className="bg-blue-500/10 text-blue-400">
                      {testimonial.authorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{testimonial.authorName}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.authorTitle}, {testimonial.authorCompany}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6">
                <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === current ? "bg-blue-500 w-6" : "bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <Button variant="outline" size="icon" onClick={next} className="rounded-full">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

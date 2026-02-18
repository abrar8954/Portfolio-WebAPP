"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

interface Project {
  id: string;
  title: string;
  description: string;
  images: string;
  techStack: string;
  category: string;
  githubUrl: string | null;
  liveUrl: string | null;
  outcome: string | null;
  featured: boolean;
}

interface ProjectsProps {
  projects: Project[];
}

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="text-4xl font-bold text-gradient opacity-30">
          {title.charAt(0)}
        </span>
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    );
  }

  return (
    <div className="relative w-full h-full">
      <img
        src={images[current]}
        alt={`${title} ${current + 1}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Navigation arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((prev) => (prev - 1 + images.length) % images.length);
        }}
        className="absolute left-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setCurrent((prev) => (prev + 1) % images.length);
        }}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => { e.stopPropagation(); setCurrent(idx); }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              idx === current ? "bg-white w-3" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            title="Projects"
            subtitle="Real-world automation solutions I've built for clients"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((project, i) => {
              const imgs = project.images
                ? project.images.split(",").filter(Boolean)
                : [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="group h-full overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-blue-500/30 hover:glow-sm transition-all duration-300">
                    <div className="relative h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 overflow-hidden">
                      <ImageCarousel images={imgs} title={project.title} />
                      {project.featured && (
                        <Badge className="absolute top-3 right-3 bg-blue-500 text-white z-10">
                          Featured
                        </Badge>
                      )}
                      {imgs.length > 1 && (
                        <Badge
                          variant="secondary"
                          className="absolute top-3 left-3 text-xs z-10 bg-black/50 text-white border-0"
                        >
                          {imgs.length} photos
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{project.title}</h3>
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      {project.outcome && (
                        <div className="flex items-center gap-1.5 mb-4 text-sm text-green-400">
                          <TrendingUp className="h-3.5 w-3.5" />
                          <span>{project.outcome}</span>
                        </div>
                      )}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.techStack.split(",").map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech.trim()}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-4 w-4 mr-1" /> Code
                            </a>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-1" /> Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsProps {
  skills: Skill[];
}

export function Skills({ skills }: SkillsProps) {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            title="Skills & Expertise"
            subtitle="Technologies and tools I work with daily"
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {Object.entries(grouped).map(([category, categorySkills], catIdx) => (
            <AnimatedSection key={category} delay={catIdx * 0.1}>
              <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm p-6">
                <h3 className="text-lg font-semibold mb-4 text-gradient">{category}</h3>
                <div className="space-y-4">
                  {categorySkills.map((skill, i) => (
                    <div key={skill.id}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>{skill.name}</span>
                        <span className="text-muted-foreground">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

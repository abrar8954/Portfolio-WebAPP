"use client";

import { Download, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";

interface ResumeSectionProps {
  resumeUrl?: string | null;
  resumeUpdatedAt?: Date | string | null;
}

export function ResumeSection({ resumeUrl, resumeUpdatedAt }: ResumeSectionProps) {
  return (
    <section id="resume" className="py-20 md:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            title="Resume"
            subtitle="Download my resume for a comprehensive overview"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="max-w-lg mx-auto text-center rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 md:p-12">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <FileText className="h-10 w-10 text-blue-400" />
            </div>

            {resumeUrl ? (
              <>
                <p className="text-muted-foreground mb-6">
                  Get a detailed look at my experience, skills, and qualifications.
                </p>
                {resumeUpdatedAt && (
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      Updated{" "}
                      {new Date(resumeUpdatedAt).toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button size="lg" asChild className="glow">
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </>
            ) : (
              <p className="text-muted-foreground">
                Resume will be available soon. Please check back later!
              </p>
            )}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

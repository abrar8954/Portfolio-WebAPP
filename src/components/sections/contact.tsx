"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Linkedin, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AnimatedSection } from "@/components/shared/animated-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { submitContact } from "@/actions/contact";
import { toast } from "sonner";

interface ContactProps {
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  linkedin?: string | null;
  github?: string | null;
  upwork?: string | null;
}

export function Contact({ email, phone, location, linkedin, github, upwork }: ContactProps) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      await submitContact(formData);
      toast.success("Message sent successfully! I'll get back to you soon.");
      (e.target as HTMLFormElement).reset();
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <AnimatedSection>
          <SectionHeading
            title="Get In Touch"
            subtitle="Have a project in mind? Let's discuss how I can help automate your processes."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <AnimatedSection delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Let&apos;s Connect</h3>
              <p className="text-muted-foreground">
                I&apos;m always open to discussing new automation projects, freelance opportunities,
                or potential collaborations.
              </p>

              <div className="space-y-4">
                {email && (
                  <a href={`mailto:${email}`} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>{email}</span>
                  </a>
                )}
                {phone && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Phone className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>{phone}</span>
                  </div>
                )}
                {location && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>{location}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-4">
                {linkedin && (
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {github && (
                  <a href={github} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                )}
                {upwork && (
                  <a href={upwork} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-6 md:p-8">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or how I can help..."
                  rows={5}
                  required
                  minLength={10}
                />
              </div>
              <Button type="submit" className="w-full glow" size="lg" disabled={pending}>
                {pending ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

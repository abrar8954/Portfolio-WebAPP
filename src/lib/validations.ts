import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  tagline: z.string().min(1, "Tagline is required"),
  about: z.string().min(1, "About is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  upwork: z.string().url().optional().or(z.literal("")),
  location: z.string().optional(),
  openToWork: z.boolean().default(true),
  yearsExp: z.coerce.number().int().min(0).default(0),
  clientsServed: z.coerce.number().int().min(0).default(0),
  projectsCount: z.coerce.number().int().min(0).default(0),
});

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  techStack: z.string().min(1, "Tech stack is required"),
  category: z.string().min(1, "Category is required"),
  githubUrl: z.string().url().optional().or(z.literal("")),
  liveUrl: z.string().url().optional().or(z.literal("")),
  outcome: z.string().optional(),
  featured: z.boolean().default(false),
});

export const skillSchema = z.object({
  name: z.string().min(1, "Name is required"),
  category: z.string().min(1, "Category is required"),
  proficiency: z.coerce.number().int().min(0).max(100).default(80),
});

export const testimonialSchema = z.object({
  content: z.string().min(1, "Content is required"),
  authorName: z.string().min(1, "Author name is required"),
  authorTitle: z.string().min(1, "Author title is required"),
  authorCompany: z.string().min(1, "Company is required"),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
export type ProjectFormValues = z.infer<typeof projectSchema>;
export type SkillFormValues = z.infer<typeof skillSchema>;
export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
export type ContactFormValues = z.infer<typeof contactSchema>;

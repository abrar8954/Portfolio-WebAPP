import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Testimonials } from "@/components/sections/testimonials";
import { ResumeSection } from "@/components/sections/resume-section";
import { Contact } from "@/components/sections/contact";

export default async function HomePage() {
  const [profile, projects, skills, testimonials] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
  ]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">
          Portfolio not configured yet. Please set up your profile in the admin dashboard.
        </p>
      </div>
    );
  }

  return (
    <>
      <Hero
        name={profile.name}
        title={profile.title}
        resumeUrl={profile.resumeUrl}
        linkedin={profile.linkedin}
        github={profile.github}
        upwork={profile.upwork}
        email={profile.email}
      />
      <About
        about={profile.about}
        photoUrl={profile.photoUrl}
        location={profile.location}
        openToWork={profile.openToWork}
        yearsExp={profile.yearsExp}
        clientsServed={profile.clientsServed}
        projectsCount={profile.projectsCount}
      />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Testimonials testimonials={testimonials} />
      <ResumeSection
        resumeUrl={profile.resumeUrl}
        resumeUpdatedAt={profile.resumeUpdatedAt}
      />
      <Contact
        email={profile.email}
        phone={profile.phone}
        location={profile.location}
        linkedin={profile.linkedin}
        github={profile.github}
        upwork={profile.upwork}
      />
    </>
  );
}
